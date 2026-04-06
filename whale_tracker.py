import requests
import json
import os

def fetch_market_data():
    print("Gathering Institutional Market Intelligence...")
    symbols = ["BTCUSDT", "ETHUSDT", "SOLUSDT"]
    
    # Standard Headers to prevent being blocked by Bybit
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }

    # 1. FETCH FEAR & GREED INDEX
    fng_data = {}
    try:
        fng_res = requests.get("https://api.alternative.me/fng/", timeout=10).json()
        fng_data = {
            "value": fng_res['data'][0]['value'],
            "classification": fng_res['data'][0]['value_classification'],
            "timestamp": fng_res['data'][0]['timestamp']
        }
    except Exception as e:
        print(f"Sentiment API Error: {e}")
        fng_data = {"value": "50", "classification": "Neutral"}

    # 2. FETCH LIVE PRICES & WHALE TRADES (Using bytick.com for Cloud Stability)
    prices = {}
    whale_list = []

    for symbol in symbols:
        try:
            # Get Price Ticker - using bytick.com
            tick_url = f"https://api.bytick.com/v5/market/tickers?category=spot&symbol={symbol}"
            price_res = requests.get(tick_url, headers=headers, timeout=10).json()
            
            if price_res['retCode'] == 0:
                last_price = price_res['result']['list'][0]['lastPrice']
                prices[symbol.replace("USDT", "")] = last_price
                print(f"Successfully fetched price for {symbol}: {last_price}")

            # Get Recent Trades
            trade_url = f"https://api.bytick.com/v5/market/recent-trade?category=spot&symbol={symbol}&limit=100"
            trade_res = requests.get(trade_url, headers=headers, timeout=10).json()
            
            if trade_res['retCode'] == 0:
                trades = trade_res['result']['list']
                for t in trades:
                    p = float(t['price'])
                    # Bybit V5 uses 'size'
                    s = float(t['size'])
                    val = p * s
                    # Lowered to $500 for testing to ensure the terminal fills up
                    if val > 500:
                        whale_list.append({
                            "symbol": symbol.replace("USDT", ""),
                            "time": t['time'],
                            "side": t['side'],
                            "value": f"${val:,.2f}",
                            "price": f"${p:,.2f}"
                        })
        except Exception as e:
            print(f"Error fetching data for {symbol}: {e}")
            continue

    # 3. CONSOLIDATE & SAVE
    whale_list.sort(key=lambda x: x['time'], reverse=True)
    
    final_output = {
        "sentiment": fng_data,
        "prices": prices,
        "trades": whale_list[:50]
    }

    # Ensure public folder exists locally
    os.makedirs('public', exist_ok=True)
    
    with open('public/whales.json', 'w') as f:
        json.dump(final_output, f, indent=4)
        
    print(f"✅ Market Data Synced. Found {len(whale_list)} trades.")

if __name__ == "__main__":
    fetch_market_data()
