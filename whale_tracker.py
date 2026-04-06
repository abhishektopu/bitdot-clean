import requests
import json
import os
import time

def fetch_market_data():
    print("--- 🚀 Institutional Market Intelligence: Invincible Engine ---")
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

    # 2. FETCH PRICES (Using CoinCap - Very stable for Cloud)
    prices = {}
    try:
        p_res = session.get("https://api.coincap.io/v2/assets", timeout=10).json()
        for asset in p_res['data']:
            if asset['symbol'] in symbols:
                prices[asset['symbol']] = asset['priceUsd']
                print(f"✅ Price {asset['symbol']}: ${float(asset['priceUsd']):,.2f}")
    except Exception as e:
        print(f"❌ Price Fetch Error: {e}")

    # 3. FETCH TRADES (Using Bitfinex - Whale Favorite)
    whale_list = []
    for sym in symbols:
        try:
            # Bitfinex uses 'tBTCUSD' format
            t_url = f"https://api-pub.bitfinex.com/v2/trades/t{sym}USD/hist?limit=20"
            trades = session.get(t_url, timeout=10).json()
            
            # Bitfinex trade format: [ID, MTS, AMOUNT, PRICE]
            for t in trades:
                amount = abs(float(t[2]))
                price = float(t[3])
                val = amount * price
                
                if val > 1000: # Lowered threshold to ensure a busy terminal
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

    # 4. CONSOLIDATE & SAVE
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
