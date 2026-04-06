import requests, json, os, time

def fetch_market_data():
    print("--- 🚀 High-Speed Data Engine Started ---")
    symbols = ["BTC", "ETH", "SOL", "LTC", "XRP"] # Added more coins for more data
    session = requests.Session()
    session.headers.update({"User-Agent": "Mozilla/5.0"})

    # 1. Sentiment
    fng_data = {"value": "50", "classification": "Neutral"}
    try:
        res = session.get("https://api.alternative.me/fng/", timeout=10).json()
        fng_data = {"value": res['data'][0]['value'], "classification": res['data'][0]['value_classification']}
    except: pass

    # 2. Prices
    prices = {}
    try:
        tickers = session.get("https://api-pub.bitfinex.com/v2/tickers?symbols=tBTCUSD,tETHUSD,tSOLUSD", timeout=10).json()
        for t in tickers:
            prices[t[0].replace("t", "").replace("USD", "")] = str(t[7])
    except: pass

    # 3. High-Frequency Trade Feed
    whale_list = []
    for sym in symbols:
        try:
            # Fetch 100 trades per coin to ensure the terminal scrolls!
            trades = session.get(f"https://api-pub.bitfinex.com/v2/trades/t{sym}USD/hist?limit=100", timeout=10).json()
            for t in trades:
                whale_list.append({
                    "symbol": sym,
                    "time": str(t[1]),
                    "side": "Buy" if float(t[2]) > 0 else "Sell",
                    "value": f"${abs(float(t[2]) * float(t[3])):,.2f}",
                    "price": f"${float(t[3]):,.2f}"
                })
        except: continue

    # Sort and save
    whale_list.sort(key=lambda x: int(x['time']), reverse=True)
    final_output = {"sentiment": fng_data, "prices": prices, "trades": whale_list[:150]} # Send 150 trades

    os.makedirs('public', exist_ok=True)
    with open('public/whales.json', 'w') as f:
        json.dump(final_output, f, indent=4)
    print(f"✅ Success: {len(whale_list)} trades synced.")

if __name__ == "__main__":
    fetch_market_data()
