import requests, json, os, time, random

# --- SECURE CONFIGURATION ---
# This pulls your hidden key from GitHub Settings -> Secrets
CMC_API_KEY = os.environ.get("CMC_API_KEY")

def fetch_market_data():
    print("--- 💎 Institutional Intelligence Engine v10.0 (Hybrid Sync) ---")
    
    if not CMC_API_KEY:
        print("❌ SECURITY ERROR: CMC_API_KEY is missing from Secrets.")
        return

    session = requests.Session()
    session.headers.update({"User-Agent": "InstitutionalWhaleBot/1.0"})
    
    symbols = ["BTC", "ETH", "SOL", "LTC", "XRP"]
    url_cmc = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest"
    
    # 1. FETCH GLOBAL MARKET INTEL (CoinMarketCap)
    prices = {}
    mapped_sentiment = {}
    
    try:
        parameters = {'symbol': ",".join(symbols), 'convert': 'USD'}
        headers = {'Accepts': 'application/json', 'X-CMC_PRO_API_KEY': CMC_API_KEY}
        
        res_cmc = session.get(url_cmc, headers=headers, params=parameters).json()
        data_cmc = res_cmc['data']

        def get_classification(val):
            if val <= 25: return "Extreme Fear"
            if val <= 45: return "Fear"
            if val <= 75: return "Greed"
            return "Extreme Greed"

        for sym in symbols:
            coin_info = data_cmc[sym]['quote']['USD']
            
            # Save clean price for JS ParseFloat (No Commas)
            prices[sym] = f"{coin_info['price']:.2f}"
            
            # Dynamic Sentiment Logic (Based on 24h Volatility)
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

    # 2. FETCH LIVE WHALE TAPE & RADAR (Bitfinex)
    trade_tape = []
    whale_alerts = [] # Special list for trades > $50,000

    print("📡 Scanning Bitfinex Institutional Liquidity Nodes...")
    
    for sym in symbols:
        try:
            # Endpoint for historical trade execution
            trades = session.get(f"https://api-pub.bitfinex.com/v2/trades/t{sym}UST/hist?limit=50", timeout=10).json()
            for t in trades:
                amount = abs(float(t[2]))
                price = float(t[3])
                value = amount * price
                
                trade_data = {
                    "symbol": sym,
                    "time": str(t[1]),
                    "side": "BUY" if float(t[2]) > 0 else "SELL",
                    "amount": f"{amount:,.4f}",
                    "value": f"${value:,.2f}",
                    "price": f"{price:,.2f}"
                }

                # RADAR LOGIC: If trade is massive, add to special alert list
                if value >= 25000:
                    whale_alerts.append(trade_data)
                
                # STANDARD TAPE: Minimum $100 filter
                if value >= 100:
                    trade_tape.append(trade_data)
                    
            time.sleep(0.4) # Rate limit protection
        except: continue

    # Sort both lists by Newest First
    trade_tape.sort(key=lambda x: int(x['time']), reverse=True)
    whale_alerts.sort(key=lambda x: int(x['time']), reverse=True)
    
    # 3. FINAL AGGREGATION & PUBLISH
    final_output = {
        "sentiment": mapped_sentiment,
        "prices": prices,
        "trades": trade_tape[:100],
        "whale_alerts": whale_alerts[:15] # Top 15 massive executions for the UI
    }

    # Ensure public folder exists and write data
    os.makedirs('public', exist_ok=True)
    with open('public/whales.json', 'w') as f:
        json.dump(final_output, f, indent=4)
        
    print(f"🚀 Published: {len(trade_tape)} trades synced | {len(whale_alerts)} Whale Radar alerts active.")

if __name__ == "__main__":
    fetch_market_data()
