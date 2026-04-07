import requests, json, os, time, random

# --- SECURE CONFIGURATION ---
CMC_API_KEY = os.environ.get("CMC_API_KEY")

def fetch_market_data():
    print("--- 💎 Institutional Hybrid Intelligence Engine v9.0 ---")
    
    if not CMC_API_KEY:
        print("❌ SECURITY ERROR: CMC_API_KEY is missing from Secrets.")
        return

    session = requests.Session()
    session.headers.update({"User-Agent": "WhaleBot/1.0"})
    
    symbols = ["BTC", "ETH", "SOL", "LTC", "XRP"]
    url_cmc = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest"
    
    # 1. FETCH GLOBAL INTEL (CoinMarketCap)
    try:
        parameters = {'symbol': ",".join(symbols), 'convert': 'USD'}
        headers = {'Accepts': 'application/json', 'X-CMC_PRO_API_KEY': CMC_API_KEY}
        
        res_cmc = session.get(url_cmc, headers=headers, params=parameters).json()
        data_cmc = res_cmc['data']
        
        prices = {}
        mapped_sentiment = {}

        def get_classification(val):
            if val <= 25: return "Extreme Fear"
            if val <= 45: return "Fear"
            if val <= 75: return "Greed"
            return "Extreme Greed"

        for sym in symbols:
            coin_info = data_cmc[sym]['quote']['USD']
            prices[sym] = f"{coin_info['price']:.2f}"
            
            # Real-Time Sentiment (Price Change Correlation)
            change = coin_info['percent_change_24h']
            index = int(50 + (change * 7) + random.randint(-2, 2))
            final_idx = max(5, min(95, index))

            mapped_sentiment[sym] = {
                "value": str(final_idx),
                "classification": get_classification(final_idx)
            }
        print("✅ Global Prices & Sentiment Synced.")
    except Exception as e:
        print(f"⚠️ CMC Sync Failed: {e}")
        return

    # 2. FETCH LIVE WHALE TAPE (Bitfinex)
    # Filter: Trades >= $100 (Dust Filter)
    trade_tape = []
    print("📡 Aggregating Bitfinex Institutional Tape...")
    
    for sym in symbols:
        try:
            # tBTCUST, tETHUST, etc.
            trades = session.get(f"https://api-pub.bitfinex.com/v2/trades/t{sym}UST/hist?limit=50", timeout=10).json()
            for t in trades:
                amount = abs(float(t[2]))
                price = float(t[3])
                value = amount * price
                
                if value >= 100: # Institutional Filter
                    trade_tape.append({
                        "symbol": sym,
                        "time": str(t[1]),
                        "side": "BUY" if float(t[2]) > 0 else "SELL",
                        "amount": f"{amount:,.4f}",
                        "value": f"${value:,.2f}",
                        "price": f"{price:,.2f}"
                    })
            time.sleep(0.5) # Rate limit safety
        except: continue

    # Sort by time (Newest First) and limit to 150 for UI performance
    trade_tape.sort(key=lambda x: int(x['time']), reverse=True)
    
    # 3. FINAL AGGREGATION & PUBLISH
    final_output = {
        "sentiment": mapped_sentiment,
        "prices": prices,
        "trades": trade_tape[:150] 
    }

    os.makedirs('public', exist_ok=True)
    with open('public/whales.json', 'w') as f:
        json.dump(final_output, f, indent=4)
    print(f"🚀 Terminal Live: {len(trade_tape)} trades in active buffer.")

if __name__ == "__main__":
    fetch_market_data()
