import requests, json, os, time, random

# --- SECURE CONFIGURATION ---
CMC_API_KEY = os.environ.get("CMC_API_KEY")

def fetch_market_data():
    print("--- 💎 Institutional Intelligence Engine v11.0 (CMC Live Sync) ---")
    
    if not CMC_API_KEY:
        print("❌ SECURITY ERROR: CMC_API_KEY is missing from Secrets.")
        return

    session = requests.Session()
    headers = {
        'Accepts': 'application/json',
        'X-CMC_PRO_API_KEY': CMC_API_KEY,
        'User-Agent': 'InstitutionalWhaleBot/1.1'
    }
    
    # 1. FETCH ACTUAL GLOBAL FEAR & GREED INDEX FROM CMC
    try:
        # Note: CMC v3 endpoint for Fear & Greed
        fg_url = "https://pro-api.coinmarketcap.com/v3/fear-and-greed/latest"
        res_fg = session.get(fg_url, headers=headers).json()
        global_fng_value = int(res_fg['data']['value'])
        print(f"✅ CMC Global Fear & Greed Synced: {global_fng_value}")
    except Exception as e:
        print(f"⚠️ F&G API Latency: {e}. Using 50 (Neutral) as fallback.")
        global_fng_value = 50

    # 2. FETCH GLOBAL MARKET PRICES
    symbols = ["BTC", "ETH", "SOL", "LTC", "XRP"]
    url_cmc = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest"
    
    prices = {}
    mapped_sentiment = {}
    
    try:
        parameters = {'symbol': ",".join(symbols), 'convert': 'USD'}
        res_cmc = session.get(url_cmc, headers=headers, params=parameters).json()
        data_cmc = res_cmc['data']

        def get_classification(val):
            if val <= 25: return "Extreme Fear"
            if val <= 45: return "Fear"
            if val <= 55: return "Neutral"
            if val <= 75: return "Greed"
            return "Extreme Greed"

        for sym in symbols:
            coin_info = data_cmc[sym]['quote']['USD']
            prices[sym] = f"{coin_info['price']:.2f}"
            
            # LOGIC: Use the Official Global Index, but tilt it +/- 5 pts 
            # based on how this specific coin is performing vs the market.
            change_24h = coin_info['percent_change_24h']
            coin_specific_sentiment = int(global_fng_value + (change_24h * 1.5))
            
            # Clamp value between 5 and 95
            final_idx = max(5, min(95, coin_specific_sentiment))

            mapped_sentiment[sym] = {
                "value": str(final_idx),
                "classification": get_classification(final_idx)
            }
        print("✅ Live CMC Sentiment & Prices Synced.")
    except Exception as e:
        print(f"⚠️ CMC Data Sync Failed: {e}")
        return

    # 3. FETCH LIVE WHALE TAPE & RADAR (Bitfinex)
    trade_tape = []
    whale_alerts = [] # Filtered for Institutional Entries

    print("📡 Scanning Bitfinex Institutional Liquidity Nodes...")
    
    for sym in symbols:
        try:
            # Depth: 200 trades per coin
            trades = session.get(f"https://api-pub.bitfinex.com/v2/trades/t{sym}UST/hist?limit=200", timeout=10).json()
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

                # RADAR THRESHOLD: $10,000
                if value >= 10000:
                    whale_alerts.append(trade_data)
                
                if value >= 100:
                    trade_tape.append(trade_data)
                    
            time.sleep(0.5) # Rate limit protection
        except: continue

    # Sort by Timestamp
    trade_tape.sort(key=lambda x: int(x['time']), reverse=True)
    whale_alerts.sort(key=lambda x: int(x['time']), reverse=True)
    
    # 4. FINAL AGGREGATION & PUBLISH
    final_output = {
        "sentiment": mapped_sentiment,
        "prices": prices,
        "trades": trade_tape[:100],
        "whale_alerts": whale_alerts[:20] 
    }

    os.makedirs('public', exist_ok=True)
    with open('public/whales.json', 'w') as f:
        json.dump(final_output, f, indent=4)
        
    print(f"🚀 Published: {len(trade_tape)} trades synced | {len(whale_alerts)} Whale Radar alerts active.")

if __name__ == "__main__":
    fetch_market_data()
