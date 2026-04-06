import requests

def run_test():
    print("--- Testing Connection to Bybit ---")
    # API for Bitcoin Price
    url = "https://api.bybit.com/v5/market/tickers?category=spot&symbol=BTCUSDT"
    
    try:
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            price = response.json()['result']['list'][0]['lastPrice']
            print(f"✅ SUCCESS! Bybit is responding.")
            print(f"Current BTC Price: ${price}")
        else:
            print(f"❌ FAILED. Status Code: {response.status_code}")
    except Exception as e:
        print(f"❌ ERROR: {e}")
        print("\nNote: If you see 'SSL' or 'Certificate' errors, the 2026 date is blocking you.")

if __name__ == "__main__":
    run_test()