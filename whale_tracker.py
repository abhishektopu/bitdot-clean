import requests
import json
import os
import time

def fetch_market_data():
    print("--- 🚀 Institutional Market Intelligence: Bitfinex Engine ---")
    # Mapping for Bitfinex symbols
    symbols = ["BTC", "ETH", "SOL"]
    
    session = requests.Session()
    session.headers.update({
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    })

    # 1. FETCH FEAR & GREED (Sentiment)
    fng_data = {"value": "50", "classification": "Neutral"}
    try:
        fng_res = session.get("https://api.alternative.me/fng/", timeout=10).json()
        fng_data = {
            "value": fng_res['data'][0]['value'],
            "classification": fng_res['data'][0]['value_classification'],
            "timestamp": fng_res['data'][0]['timestamp']
        }
        print(f"✅ Sentiment: {fng_data['classification']}")
    except:
        print("⚠️ Sentiment API throttle")

    # 2. FETCH PRICES & TRADES (Unified Bitfinex Engine)
    prices = {}
    whale_list = []

    # Get Tickers for all prices in one go
    try:
        ticker_url = "https://api-pub.bitfinex.com/v2/tickers?symbols=tBTCUSD,tETHUSD,tSOLUSD"
        tickers = session.get(ticker_url, timeout=10).json()
        for t in tickers:
            sym = t[0].replace("t", "").replace("USD", "")
            last_price = t[7]
            prices[sym] = str(last_price)
            print(f"✅ Price {sym}: ${last_price:,.2f}")
    except Exception as e:
        print(f"❌ Ticker Error: {e}")

    # Get Trades for each symbol
    for sym in symbols:
        try:
            t_url = f"https://api-pub.bitfinex.com/v2/trades/t{sym}USD/hist?limit=30"
            trades = session.get(t_url, timeout=10).json()
            
            for t in trades:
                amount = abs(float(t[2]))
                price = float(t[3])
                val = amount * price
                
                if val > 1000: # Institutional threshold
                    whale_list.append({
                        "symbol": sym,
                        "time": str(t[1]),
                        "side": "Buy" if float(t[2]) > 0 else "Sell",
                        "value": f"${val:,.2f}",
                        "price": f"${price:,.2f}"
                    })
            print(f"✅ Captured {sym} Whale Flow")
        except:
            print(f"⚠️ Skipping {sym} trades")

    # 3. CONSOLIDATE & SAVE
    whale_list.sort(key=lambda x: int(x['time']), reverse=True)
    
    final_output = {
        "sentiment": fng_data,
        "prices": prices,
        "trades": whale_list[:50]
    }

    os.makedirs('public', exist_ok=True)
    with open('public/whales.json', 'w') as f:
        json.dump(final_output, f, indent=4)
        
    print(f"--- 🏁 Final Sync Complete. Captured: {len(whale_list)} trades ---")

if __name__ == "__main__":
    fetch_market_data()
