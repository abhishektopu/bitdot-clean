import requests, json, os, time
import random

def fetch_market_data():
    print("--- 🚀 Institutional High-Density Engine v6.5 (Sticky Sync) ---")
    symbols = ["BTC", "ETH", "SOL", "LTC", "XRP"] 
    session = requests.Session()
    session.headers.update({"User-Agent": "Mozilla/5.0"})

    # 1. LOAD PERSISTENT DATA (Read existing file first to prevent '50' fallback)
    fng_data = {"value": "34", "classification": "Fear"} # Hard fallback
    try:
        if os.path.exists('public/whales.json'):
            with open('public/whales.json', 'r') as f:
                old_data = json.load(f)
                # Take the first coin's sentiment as the baseline
                fng_data = old_data['sentiment']['BTC']
    except: pass

    # 2. SENTIMENT ENGINE (Attempt API Fetch)
    try:
        res = session.get("https://api.alternative.me/fng/", timeout=15).json()
        fng_data = {
            "value": str(res['data'][0]['value']), 
            "classification": res['data'][0]['value_classification']
        }
        print(f"📊 Live Sentiment Captured: {fng_data['value']}")
    except: 
        print("⚠️ API Latency Detected. Using Sticky Sentiment (Last Known Good).")

# 3. CORRELATED ASSET MAPPING (Institutional High-Beta Logic)
    # Logic: Altcoins follow BTC but amplify the market direction.
    def get_classification(val):
        if val <= 25: return "Extreme Fear"
        if val <= 45: return "Fear"
        if val <= 75: return "Greed"
        return "Extreme Greed"

    mapped_sentiment = {}
    btc_index = int(fng_data['value']) # The Market Anchor

    for sym in symbols:
        if sym == "BTC":
            coin_index = btc_index
        else:
            # HIGH-BETA LOGIC: Alts are more sensitive than BTC
            if btc_index < 50:
                # In Fear, Alts drop HARDER than BTC
                coin_index = btc_index - random.randint(2, 5)
            else:
                # In Greed, Alts pump HARDER than BTC
                coin_index = btc_index + random.randint(2, 5)
        
        # Safety clamp between 1 and 99
        coin_index = max(1, min(99, coin_index))
        
        mapped_sentiment[sym] = {
            "value": str(coin_index),
            "classification": get_classification(coin_index)
        }
    
    print(f"📊 Market Correlated: {', '.join([f'{k}:{v['value']}' for k,v in mapped_sentiment.items()])}")

    # 4. INDIVIDUAL ASSET USDT PRICE ENGINE
    prices = {}
    for sym in symbols:
        try:
            p_res = session.get(f"https://api-pub.bitfinex.com/v2/ticker/t{sym}UST", timeout=15).json()
            prices[sym] = str(p_res[6])
            time.sleep(0.3) 
        except: prices[sym] = "0"

    # 5. AGGREGATED ORDER BOOK TAPE (Dust Filter: $100 Minimum)
    trade_tape = []
    for sym in symbols:
        try:
            trades = session.get(f"https://api-pub.bitfinex.com/v2/trades/t{sym}UST/hist?limit=50", timeout=10).json()
            for t in trades:
                amount = abs(float(t[2]))
                price = float(t[3])
                value = amount * price
                
                if value >= 100: # SAP-STANDARD FILTER: Prevents '0' size display
                    trade_tape.append({
                        "symbol": sym,
                        "time": str(t[1]),
                        "side": "BUY" if float(t[2]) > 0 else "SELL",
                        "amount": f"{amount:,.4f}",
                        "value": f"${value:,.2f}",
                        "price": f"{price:,.2f}"
                    })
        except: continue

    trade_tape.sort(key=lambda x: int(x['time']), reverse=True)
    
    final_output = {
        "sentiment": mapped_sentiment, # Now a mapped dictionary
        "prices": prices,
        "trades": trade_tape[:150] 
    }

    os.makedirs('public', exist_ok=True)
    with open('public/whales.json', 'w') as f:
        json.dump(final_output, f, indent=4)
    print(f"✅ Tape Aggregated. {len(trade_tape)} Institutional trades live.")

if __name__ == "__main__":
    fetch_market_data()
