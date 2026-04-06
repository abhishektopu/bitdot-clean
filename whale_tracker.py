import requests
import json
import os

def fetch_whale_trades():
    print("Searching for Whales on Bybit...")
    # Bybit V5 API endpoint
    url = "https://api.bybit.com/v5/market/recent-trade?category=spot&symbol=BTCUSDT&limit=200"
    
    try:
        response = requests.get(url)
        data = response.json()
        trades = data['result']['list']
        
        whale_list = []
        
        for t in trades:
            # Bybit V5 uses 'price' and 'size'
            price = float(t['price'])
            size = float(t['size']) 
            value = price * size
            
            # If trade is over $50,000
            if value > 1000:
                whale_list.append({
                    "time": t['time'],
                    "side": t['side'],
                    "value": f"${value:,.2f}",
                    "price": f"${price:,.2f}"
                })
        
        output_path = 'public/whales.json'
        
        with open(output_path, 'w') as f:
            json.dump(whale_list, f, indent=4)
            
        print(f"✅ Success! Found {len(whale_list)} whales. Data saved to {output_path}")

    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    fetch_whale_trades()