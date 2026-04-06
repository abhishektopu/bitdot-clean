import requests, json, os, time

def fetch_market_data():
    print("--- 🚀 Institutional Order Book Engine Started ---")
    # Full Asset Suite
    symbols = ["BTC", "ETH", "SOL", "LTC", "XRP"] 
    session = requests.Session()
    session.headers.update({"User-Agent": "Mozilla/5.0"})

    # 1. Sentiment Feed
    fng_data = {"value": "50", "classification": "Neutral"}
    try:
        res = session.get("https://api.alternative.me/fng/", timeout=10).json()
        fng_data = {"value": res['data'][0]['value'], "classification": res['data'][0]['value_classification']}
    except: pass

    # 2. Institutional Price Aggregator
    prices = {}
    try:
        # Fetching all 5 tickers from Bitfinex
        sym_str = ",".join([f"t{s}USD" for s in symbols])
        tickers = session.get(f"https://api-pub.bitfinex.com/v2/tickers?symbols={sym_str}", timeout=10).json()
        for t in tickers:
            prices[t[0].replace("t", "").replace("USD", "")] = str(t[7])
    except: pass

    # 3. Order Book Tape Feed
    trade_tape = []
    for sym in symbols:
        try:
            trades = session.get(f"https://api-pub.bitfinex.com/v2/trades/t{sym}USD/hist?limit=50", timeout=10).json()
            for t in trades:
                trade_tape.append({
                    "symbol": sym,
                    "time": str(t[1]),
                    "side": "BUY" if float(t[2]) > 0 else "SELL",
                    "amount": f"{abs(float(t[2])):,.4f}",
                    "value": f"${abs(float(t[2]) * float(t[3])):,.2f}",
                    "price": f"${float(t[3]):,.2f}"
                })
        except: continue

    # Sort by time (Newest First)
    trade_tape.sort(key=lambda x: int(x['time']), reverse=True)
    
    final_output = {
        "sentiment": fng_data,
        "prices": prices,
        "trades": trade_tape[:100] # 100 rows for smooth scrolling
    }

    os.makedirs('public', exist_ok=True)
    with open('public/whales.json', 'w') as f:
        json.dump(final_output, f, indent=4)
    print(f"✅ Order Book Synced: {len(trade_tape)} entries.")

if __name__ == "__main__":
    fetch_market_data()
