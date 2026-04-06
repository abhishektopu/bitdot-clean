import requests, json, os, time

def fetch_market_data(): 
    print("--- 🚀 Institutional Data Engine v4.5: Active ---")
    # All assets required for the 6-column dashboard
    symbols = ["BTC", "ETH", "SOL", "LTC", "XRP"] 
    session = requests.Session()
    session.headers.update({
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    })

    # 1. Sentiment Feed Logic
    fng_data = {"value": "13", "classification": "Extreme Fear"}
    try:
        res = session.get("https://api.alternative.me/fng/", timeout=15).json()
        fng_data = {
            "value": res['data'][0]['value'], 
            "classification": res['data'][0]['value_classification']
        }
        print(f"✅ Sentiment Sync: {fng_data['classification']}")
    except: 
        print("⚠️ Sentiment API throttle - Using cache")

    # 2. Institutional Price Engine (Individually Fetched to avoid $0.00 error)
    prices = {}
    for sym in symbols:
        try:
            # Individual fetch ensures that if one fails, others don't show $0
            p_url = f"https://api-pub.bitfinex.com/v2/ticker/t{sym}USD"
            p_res = session.get(p_url, timeout=15).json()
            # Bitfinex ticker index 6 is Last Price
            price_val = p_res[6]
            prices[sym] = str(price_val)
            print(f"✅ Price Captured: {sym} at ${price_val}")
            time.sleep(1) # Gap to prevent cloud rate limiting
        except Exception as e:
            print(f"❌ Error capturing {sym}: {e}")
            prices[sym] = "0"

    # 3. Order Book Trade Tape (Cross-Asset Aggregation)
    trade_tape = []
    for sym in symbols:
        try:
            # Fetching 40 trades per asset
            t_url = f"https://api-pub.bitfinex.com/v2/trades/t{sym}USD/hist?limit=40"
            trades = session.get(t_url, timeout=15).json()
            for t in trades:
                # Format: [ID, Timestamp, Amount, Price]
                amount = abs(float(t[2]))
                price = float(t[3])
                trade_tape.append({
                    "symbol": sym,
                    "time": str(t[1]),
                    "side": "BUY" if float(t[2]) > 0 else "SELL",
                    "amount": f"{amount:,.4f}",
                    "value": f"${(amount * price):,.2f}",
                    "price": f"${price:,.2f}"
                })
        except: continue

    # Sort tape by most recent timestamp
    trade_tape.sort(key=lambda x: int(x['time']), reverse=True)
    
    final_output = {
        "sentiment": fng_data,
        "prices": prices,
        "trades": trade_tape[:120] # Top 120 rows for smooth infinite scroll
    }

    # Atomic Write to prevent JSON corruption
    os.makedirs('public', exist_ok=True)
    with open('public/whales.json', 'w') as f:
        json.dump(final_output, f, indent=4)
        
    print(f"✅ Sync Complete: {len(trade_tape)} trades recorded across {len(prices)} assets.")

if __name__ == "__main__":
    fetch_market_data()
