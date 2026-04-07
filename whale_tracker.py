import requests, json, os, time, random

# --- SECURE CONFIGURATION ---
# This pulls the key from the hidden GitHub vault (Phase 1)
CMC_API_KEY = os.environ.get("CMC_API_KEY")

def fetch_market_data():
    print("--- 💎 CoinMarketCap Global Intelligence Engine v8.0 ---")
    
    if not CMC_API_KEY:
        print("❌ SECURITY ERROR: CMC_API_KEY is missing from Secrets.")
        return

    url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest"
    symbols = ["BTC", "ETH", "SOL", "LTC", "XRP"]
    
    parameters = {
        'symbol': ",".join(symbols),
        'convert': 'USD'
    }
    headers = {
        'Accepts': 'application/json',
        'X-CMC_PRO_API_KEY': CMC_API_KEY,
    }

    try:
        response = requests.get(url, headers=headers, params=parameters)
        raw_data = response.json()
        
        if 'data' not in raw_data:
            print(f"⚠️ CMC API Error: {raw_data.get('status', {}).get('error_message')}")
            return

        data = raw_data['data']
        prices = {}
        mapped_sentiment = {}

        def get_classification(val):
            if val <= 25: return "Extreme Fear"
            if val <= 45: return "Fear"
            if val <= 75: return "Greed"
            return "Extreme Greed"

        for sym in symbols:
            coin_info = data[sym]['quote']['USD']
            price = coin_info['price']
            change_24h = coin_info['percent_change_24h']
            
            # 1. Update Global Weighted Price
            prices[sym] = f"{price:,.2f}"

            # 2. Calculate Real-Time Sentiment (Whale Alpha Logic)
            # Starts at 50 (Neutral). Moves ~7 points per 1% change.
            sentiment_index = int(50 + (change_24h * 7))
            sentiment_index += random.randint(-2, 2) # Add live jitter
            final_index = max(5, min(95, sentiment_index))

            mapped_sentiment[sym] = {
                "value": str(final_index),
                "classification": get_classification(final_index)
            }
            
            print(f"📡 Sync: {sym} | Price: ${prices[sym]} | Sentiment: {final_index}")

        # 3. Final Aggregation
        final_output = {
            "sentiment": mapped_sentiment,
            "prices": prices,
            "trades": [] # Keeping this empty for now
        }

        os.makedirs('public', exist_ok=True)
        with open('public/whales.json', 'w') as f:
            json.dump(final_output, f, indent=4)
        print("✅ Global Market Intel Published to Terminal.")

    except Exception as e:
        print(f"❌ Critical Uplink Error: {e}")

if __name__ == "__main__":
    fetch_market_data()
