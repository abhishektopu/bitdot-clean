import requests, json, os, time

def fetch_market_data():
    print("--- 🚀 Institutional High-Density Engine v6.0 ---")
    symbols = ["BTC", "ETH", "SOL", "LTC", "XRP"] 
    session = requests.Session()
    session.headers.update({"User-Agent": "Mozilla/5.0"})

    # 1. Sentiment Engine
    fng_data = {"value": "13", "classification": "Extreme Fear"}
    try:
        res = session.get("https://api.alternative.me/fng/", timeout=15).json()
        fng_data = {"value": res['data'][0]['value'], "classification": res['data'][0]['value_classification']}
    except: pass

    # 2. Individual Asset USDT Price Engine
    prices = {}
    for sym in symbols:
        try:
            p_res = session.get(f"https://api-pub.bitfinex.com/v2/ticker/t{sym}UST", timeout=15).json()
            prices[sym] = str(p_res[6])
            time.sleep(0.5) 
        except: prices[sym] = "0"

    # 3. Aggregated Order Book Tape (Dust Filter Applied)
    trade_tape = []
    for sym in symbols:
        try:
            trades = session.get(f"https://api-pub.bitfinex.com/v2/trades/t{sym}UST/hist?limit=50", timeout=10).json()
            for t in trades:
                amount = abs(float(t[2]))
                price = float(t[3])
                value = amount * price
                
                # SAP-STANDARD FILTER: Remove trades under $100 to prevent '0' size display
                if value >= 100:
                    trade_tape.append({
                        "symbol": sym,
                        "time": str(t[1]),
                        "side": "BUY" if float(t[2]) > 0 else "SELL",
                        "amount": f"{amount:,.4f}",
                        "value": f"${value:,.2f}",
                        "price": f"{price:,.2f}"
                    })
        except: continue

    trade_tape.sort(key=lambda x: int(x['time']), reverse=True)
    
    final_output = {
        "sentiment": fng_data,
        "prices": prices,
        "trades": trade_tape[:150] # High-density for infinite scroll
    }

    os.makedirs('public', exist_ok=True)
    with open('public/whales.json', 'w') as f:
        json.dump(final_output, f, indent=4)
    print(f"✅ Tape Aggregated. Filtered Dust. {len(trade_tape)} trades live.")

if __name__ == "__main__":
    fetch_market_data()
