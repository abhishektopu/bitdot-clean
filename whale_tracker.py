import requests
import json
import os
import time

def fetch_market_data():
    print("--- 🚀 Institutional Market Intelligence: High-Density Feed ---")
    symbols = ["BTC", "ETH", "SOL"]
    session = requests.Session()
    session.headers.update({"User-Agent": "Mozilla/5.0"})

    # 1. FETCH SENTIMENT
    fng_data = {"value": "50", "classification": "Neutral"}
    try:
        fng_res = session.get("https://api.alternative.me/fng/", timeout=10).json()
        fng_data = {"value": fng_res['data'][0]['value'], "classification": fng_res['data'][0]['value_classification']}
    except: pass

    # 2. FETCH PRICES
    prices = {}
    try:
        ticker_url = "https://api-pub.bitfinex.com/v2/tickers?symbols=tBTCUSD,tETHUSD,tSOLUSD"
        tickers = session.get(ticker_url, timeout=10).json()
        for t in tickers:
            sym = t[0].replace("t", "").replace("USD", "")
            prices[sym] = str(t[7])
    except: pass

    # 3. FETCH TRADES (High Density)
    whale_list = []
    for sym in symbols:
        try:
            # Increased limit to 100 trades
            t_url = f"https://api-pub.bitfinex.com/v2/trades/t{sym}USD/hist?limit=100"
            trades = session.get(t_url, timeout=10).json()
            for t in trades:
                amount, price = abs(float(t[2])), float(t[3])
                val = amount * price
                # Lowered threshold to $200 to ensure the terminal is "busy"
                if val > 200:
                    whale_list.append({
                        "symbol": sym,
                        "time": str(t[1]),
                        "side": "Buy" if float(t[2]) > 0 else "Sell",
                        "value": f"${val:,.2f}",
                        "price": f"${price:,.2f}"
                    })
        except: continue

    whale_list.sort(key=lambda x: int(x['time']), reverse=True)
    
    final_output = {
        "sentiment": fng_data,
        "prices": prices,
        "trades": whale_list[:60] # Keep top 60 for a long scrolling list
    }

    os.makedirs('public', exist_ok=True)
    with open('public/whales.json', 'w') as f:
        json.dump(final_output, f, indent=4)
    print(f"✅ Sync Complete. Captured: {len(whale_list)} trades.")

if __name__ == "__main__":
    fetch_market_data()
