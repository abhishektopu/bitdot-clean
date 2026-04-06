import requests
import json
import os

def fetch_market_data():
    print("Gathering Institutional Market Intelligence...")
    symbols = ["BTCUSDT", "ETHUSDT", "SOLUSDT"]
    
    # 1. FETCH FEAR & GREED INDEX (Sentiment Backbone)
    fng_data = {}
    try:
        fng_res = requests.get("https://api.alternative.me/fng/").json()
        fng_data = {
            "value": fng_res['data'][0]['value'],
            "classification": fng_res['data'][0]['value_classification'],
            "timestamp": fng_res['data'][0]['timestamp']
        }
    except:
        fng_data = {"value": "50", "classification": "Neutral"}

    # 2. FETCH LIVE PRICES & WHALE TRADES
    prices = {}
    whale_list = []

    for symbol in symbols:
        try:
            # Get Price Ticker
            tick_url = f"https://api.bybit.com/v5/market/tickers?category=spot&symbol={symbol}"
            price_res = requests.get(tick_url).json()
            prices[symbol.replace("USDT", "")] = price_res['result']['list'][0]['lastPrice']

            # Get Recent Trades
            trade_url = f"https://api.bybit.com/v5/market/recent-trade?category=spot&symbol={symbol}&limit=100"
            trades = requests.get(trade_url).json()['result']['list']
            
            for t in trades:
                p = float(t['price'])
                s = float(t['size'])
                val = p * s
                if val > 5000:
                    whale_list.append({
                        "symbol": symbol.replace("USDT", ""),
                        "time": t['time'],
                        "side": t['side'],
                        "value": f"${val:,.2f}",
                        "price": f"${p:,.2f}"
                    })
        except:
            continue

    # 3. CONSOLIDATE & SAVE
    whale_list.sort(key=lambda x: x['time'], reverse=True)
    
    final_output = {
        "sentiment": fng_data,
        "prices": prices,
        "trades": whale_list[:50]
    }

    with open('public/whales.json', 'w') as f:
        json.dump(final_output, f, indent=4)
        
    print(f"✅ Market Data Synced. Sentiment: {fng_data['classification']} ({fng_data['value']})")

if __name__ == "__main__":
    fetch_market_data()
