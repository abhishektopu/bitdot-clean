import requests
import json
import os
import time

def fetch_market_data():
    print("--- 🚀 Institutional Market Intelligence: Binance Engine ---")
    # Mapping symbols for Binance
    symbols = ["BTCUSDT", "ETHUSDT", "SOLUSDT"]
    
    session = requests.Session()
    session.headers.update({
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    })

    # 1. FETCH FEAR & GREED (Alternative.me - Already Working)
    fng_data = {"value": "50", "classification": "Neutral"}
    try:
        fng_res = session.get("https://api.alternative.me/fng/", timeout=15).json()
        fng_data = {
            "value": fng_res['data'][0]['value'],
            "classification": fng_res['data'][0]['value_classification'],
            "timestamp": fng_res['data'][0]['timestamp']
        }
        print(f"✅ Sentiment Synced: {fng_data['classification']}")
    except:
        print("⚠️ Sentiment API throttle - using default.")

    # 2. FETCH PRICES & TRADES FROM BINANCE (More stable for Cloud)
    prices = {}
    whale_list = []

    for symbol in symbols:
        try:
            # Get Price from Binance
            p_url = f"https://api.binance.com/api/v3/ticker/price?symbol={symbol}"
            p_data = session.get(p_url, timeout=15).json()
            price = p_data['price']
            prices[symbol.replace("USDT", "")] = price
            print(f"✅ {symbol} Price: ${float(price):,.2f}")

            # Get Recent Trades from Binance
            t_url = f"https://api.binance.com/api/v3/trades?symbol={symbol}&limit=50"
            trades = session.get(t_url, timeout=15).json()
            
            for t in trades:
                p = float(t['price'])
                q = float(t['qty'])
                val = p * q
                # Keeping threshold at $1000 to keep terminal busy
                if val > 1000:
                    whale_list.append({
                        "symbol": symbol.replace("USDT", ""),
                        "time": str(t['time']),
                        "side": "Buy" if t['isBuyerMaker'] == False else "Sell",
                        "value": f"${val:,.2f}",
                        "price": f"${p:,.2f}"
                    })
            time.sleep(0.5) # Prevent rate limiting

        except Exception as e:
            print(f"❌ Binance Error for {symbol}: {e}")

    # 3. CONSOLIDATE & SAVE
    # Sort by time (Binance uses milliseconds)
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
