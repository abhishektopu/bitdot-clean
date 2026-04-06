import requests, json, os, time

def fetch_market_data():
    print("--- 🚀 Asset-Specific Intelligence Engine v5.1 ---")
    symbols = ["BTC", "ETH", "SOL", "LTC", "XRP"] 
    session = requests.Session()
    session.headers.update({"User-Agent": "Mozilla/5.0"})

    # 1. Global Sentiment (BTC Only)
    btc_fng = 50
    try:
        res = session.get("https://api.alternative.me/fng/", timeout=10).json()
        btc_fng = int(res['data'][0]['value'])
    except: pass

    prices = {}
    sentiment = {}
    
    # 2. Individual Asset Sentiment Logic
    for sym in symbols:
        try:
            # Fetch Ticker & 24h High/Low for RSI Approximation
            p_url = f"https://api-pub.bitfinex.com/v2/ticker/t{sym}USD"
            p_res = session.get(p_url, timeout=15).json()
            last_price = p_res[6]
            daily_change = p_res[5] # 24h Relative Change
            
            prices[sym] = str(last_price)
            
            # Calculate Individual Sentiment Value (0-100)
            if sym == "BTC":
                val = btc_fng
            else:
                # Institutional Logic: Use daily change + BTC bias to create distinct sentiment
                # This ensures every coin has a unique, moving index
                bias = (btc_fng - 50) * 0.5
                asset_perf = daily_change * 100
                val = max(5, min(95, int(50 + bias + asset_perf)))
            
            # Classification
            label = "Neutral"
            if val <= 25: label = "Extreme Fear"
            elif val <= 45: label = "Fear"
            elif val <= 75: label = "Greed"
            else: label = "Extreme Greed"
            
            sentiment[sym] = {"value": str(val), "classification": label}
            print(f"✅ {sym}: ${last_price} | Index: {val}")
            time.sleep(1)
        except: 
            prices[sym] = "0"; sentiment[sym] = {"value": "50", "classification": "Neutral"}

    # 3. Trade Tape
    trade_tape = []
    for sym in symbols:
        try:
            trades = session.get(f"https://api-pub.bitfinex.com/v2/trades/t{sym}USD/hist?limit=30", timeout=10).json()
            for t in trades:
                amount, price = abs(float(t[2])), float(t[3])
                trade_tape.append({
                    "symbol": sym, "time": str(t[1]), "side": "BUY" if float(t[2]) > 0 else "SELL",
                    "amount": f"{amount:,.4f}", "value": f"${(amount * price):,.2f}", "price": f"${price:,.2f}"
                })
        except: continue

    trade_tape.sort(key=lambda x: int(x['time']), reverse=True)
    final_output = {"prices": prices, "sentiment": sentiment, "trades": trade_tape[:120]}

    os.makedirs('public', exist_ok=True)
    with open('public/whales.json', 'w') as f:
        json.dump(final_output, f, indent=4)
    print(f"✅ Full Terminal Sync Complete.")

if __name__ == "__main__":
    fetch_market_data()
