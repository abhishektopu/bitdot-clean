import requests, json, os, time

def fetch_market_data():
    print("--- 🚀 Institutional Order Book Engine: Version 4.2 ---")
    symbols = ["BTC", "ETH", "SOL", "LTC", "XRP"] 
    session = requests.Session()
    session.headers.update({"User-Agent": "Mozilla/5.0"})

    # 1. Sentiment Feed
    fng_data = {"value": "13", "classification": "Extreme Fear"}
    try:
        res = session.get("https://api.alternative.me/fng/", timeout=10).json()
        fng_data = {"value": res['data'][0]['value'], "classification": res['data'][0]['value_classification']}
        print(f"✅ Sentiment: {fng_data['classification']}")
    except: pass

    # 2. Institutional Price Aggregator (BTC, ETH, SOL, LTC, XRP)
    prices = {}
    try:
        # Fetching ALL 5 tickers from Bitfinex
        sym_str = ",".join([f"t{s}USD" for s in symbols])
        tickers_url = f"https://api-pub.bitfinex.com/v2/tickers?symbols={sym_str}"
        tickers_res = session.get(tickers_url, timeout=10).json()
        for t in tickers_res:
            clean_sym = t[0].replace("t", "").replace("USD", "")
            prices[clean_sym] = str(t[7])
            print(f"✅ Price {clean_sym}: ${t[7]}")
    except Exception as e:
        print(f"❌ Price Fetch Error: {e}")

    # 3. Order Book Tape Feed
    trade_tape = []
    for sym in symbols:
        try:
            trades = session.get(f"https://api-pub.bitfinex.com/v2/trades/t{sym}USD/hist?limit=40", timeout=10).json()
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

    trade_tape.sort(key=lambda x: int(x['time']), reverse=True)
    
    final_output = {
        "sentiment": fng_data,
        "prices": prices,
        "trades": trade_tape[:120] # Expanded for smoother scrolling
    }

    os.makedirs('public', exist_ok=True)
    with open('public/whales.json', 'w') as f:
        json.dump(final_output, f, indent=4)
    print(f"✅ Final Sync Complete. Data saved for all 5 assets.")

if __name__ == "__main__":
    fetch_market_data()
