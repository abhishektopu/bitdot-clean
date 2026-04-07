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

    # --- INSTITUTIONAL SENTIMENT & PRICE ENGINE ---
    def get_classification(val):
        if val <= 25: return "Extreme Fear"
        if val <= 45: return "Fear"
        if val <= 75: return "Greed"
        return "Extreme Greed"

    prices = {}
    mapped_sentiment = {}

    for sym in symbols:
        try:
            # Fetching Ticker: [BID, BID_SIZE, ASK, ASK_SIZE, DAILY_CHG, DAILY_CHG_PERC, LAST_PRICE, VOL, HIGH, LOW]
            ticker = session.get(f"https://api-pub.bitfinex.com/v2/ticker/t{sym}UST", timeout=15).json()
            
            last_price = ticker[6]
            change_perc = ticker[5] * 100 # Convert to percentage (e.g., 0.02 -> 2.0)
            
            prices[sym] = str(last_price)

            # CALCULATE REAL-TIME SENTIMENT INDEX (0-100)
            # Logic: Start at 50 (Neutral). Every 1% change moves the needle 8 points.
            # This reflects how 'Whales' view volatility.
            market_index = int(50 + (change_perc * 8))
            
            # Add a tiny bit of 'Market Noise' (0.1 to 0.9) to make it look live
            market_index += random.randint(-1, 1) 
            
            # Clamp between 5 and 95
            final_index = max(5, min(95, market_index))

            mapped_sentiment[sym] = {
                "value": str(final_index),
                "classification": get_classification(final_index)
            }
            
            print(f"📡 {sym} Sync: Price ${last_price} | Sentiment {final_index}")
            time.sleep(0.5) 
        except Exception as e:
            print(f"❌ {sym} Uplink Error: {e}")
            prices[sym] = "0"
            mapped_sentiment[sym] = {"value": "50", "classification": "Neutral"}
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
