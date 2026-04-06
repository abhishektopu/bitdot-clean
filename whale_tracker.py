import requests
import json
import os
import time

def fetch_market_data():
    print("--- 🚀 Institutional Market Intelligence Start ---")
    symbols = ["BTCUSDT", "ETHUSDT", "SOLUSDT"]
    
    # Use a session for better persistence
    session = requests.Session()
    session.headers.update({
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "Accept": "application/json"
    })

    # 1. FETCH FEAR & GREED
    fng_data = {"value": "50", "classification": "Neutral"}
    try:
        fng_res = session.get("https://api.alternative.me/fng/", timeout=15).json()
        fng_data = {
            "value": fng_res['data'][0]['value'],
            "classification": fng_res['data'][0]['value_classification'],
            "timestamp": fng_res['data'][0]['timestamp']
        }
        print(f"✅ Sentiment: {fng_data['classification']}")
    except Exception as e:
        print(f"❌ Sentiment Fail: {e}")

    # 2. FETCH PRICES & TRADES
    prices = {}
    whale_list = []

    for symbol in symbols:
        try:
            # Try official API first, then fallback
            url = f"https://api.bybit.com/v5/market/tickers?category=spot&symbol={symbol}"
            resp = session.get(url, timeout=15)
            data = resp.json()
            
            if data.get('retCode') == 0:
                price = data['result']['list'][0]['lastPrice']
                prices[symbol.replace("USDT", "")] = price
                print(f"✅ {symbol}: ${price}")
            else:
                print(f"⚠️ Bybit error for {symbol}: {data.get('retMsg')}")

            # Fetch Trades
            t_url = f"https://api.bybit.com/v5/market/recent-trade?category=spot&symbol={symbol}&limit=50"
            t_data = session.get(t_url, timeout=15).json()
            
            if t_data.get('retCode') == 0:
                for t in t_data['result']['list']:
                    p = float(t['price'])
                    s = float(t['size'])
                    val = p * s
                    # Threshold: $1000 to ensure we get data
                    if val > 1000:
                        whale_list.append({
                            "symbol": symbol.replace("USDT", ""),
                            "time": t['time'],
                            "side": t['side'],
                            "value": f"${val:,.2f}",
                            "price": f"${p:,.2f}"
                        })
            
            # Small sleep to avoid rate limits
            time.sleep(1)

        except Exception as e:
            print(f"❌ Bybit Connection Fail for {symbol}: {e}")

    # 3. SAVE DATA
    whale_list.sort(key=lambda x: x['time'], reverse=True)
    final_output = {
        "sentiment": fng_data,
        "prices": prices,
        "trades": whale_list[:50]
    }

    # IMPORTANT: Use absolute paths for GitHub Actions
    os.makedirs('public', exist_ok=True)
    with open('public/whales.json', 'w') as f:
        json.dump(final_output, f, indent=4)
        
    print(f"--- 🏁 Sync Complete. Trades Captured: {len(whale_list)} ---")

if __name__ == "__main__":
    fetch_market_data()
