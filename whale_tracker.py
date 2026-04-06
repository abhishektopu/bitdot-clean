import requests
import json
import os

def fetch_whale_trades():
    # 1. Define the Market Trend Leaders
    symbols = ["BTCUSDT", "ETHUSDT", "SOLUSDT"]
    whale_list = []
    
    print(f"Monitoring Market Trends: {symbols}")

    for symbol in symbols:
        url = f"https://api.bybit.com/v5/market/recent-trade?category=spot&symbol={symbol}&limit=100"
        
        try:
            response = requests.get(url)
            data = response.json()
            trades = data['result']['list']
            
            for t in trades:
                price = float(t['price'])
                size = float(t['size'])
                value = price * size
                
                # Filter for 'Whale' activity based on the coin's trend
                # We use > $5000 to keep the feed active and 'busy'
                if value > 5000:
                    whale_list.append({
                        "symbol": symbol.replace("USDT", ""), # Clean name: BTC, ETH, etc.
                        "time": t['time'],
                        "side": t['side'],
                        "value": f"${value:,.2f}",
                        "price": f"${price:,.2f}"
                    })
        except Exception as e:
            print(f"Error skipping {symbol}: {e}")

    # 2. Sort by time so the newest trades from ALL coins are at the top
    whale_list.sort(key=lambda x: x['time'], reverse=True)

    # 3. Save the top 50 most recent trend-setting trades
    output_path = 'public/whales.json'
    with open(output_path, 'w') as f:
        json.dump(whale_list[:50], f, indent=4)
        
    print(f"✅ Success! Captured {len(whale_list)} trend-based trades.")

if __name__ == "__main__":
    fetch_whale_trades()
