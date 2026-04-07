# 2. FETCH LIVE WHALE TAPE & FILTER ALERTS
    trade_tape = []
    whale_alerts = [] # New list for big money
    
    for sym in symbols:
        try:
            trades = session.get(f"https://api-pub.bitfinex.com/v2/trades/t{sym}UST/hist?limit=50", timeout=10).json()
            for t in trades:
                amount = abs(float(t[2]))
                price = float(t[3])
                value = amount * price
                
                trade_data = {
                    "symbol": sym,
                    "time": str(t[1]),
                    "side": "BUY" if float(t[2]) > 0 else "SELL",
                    "amount": f"{amount:,.4f}",
                    "value": f"${value:,.2f}",
                    "price": f"{price:,.2f}"
                }

                # LOGIC: If trade is > $50,000, put it in the "Whale Radar"
                if value >= 50000:
                    whale_alerts.append(trade_data)
                
                # Standard Tape Filter
                if value >= 100:
                    trade_tape.append(trade_data)
        except: continue

    # Sort and Aggregation
    whale_alerts.sort(key=lambda x: int(x['time']), reverse=True)
    trade_tape.sort(key=lambda x: int(x['time']), reverse=True)
    
    final_output = {
        "sentiment": mapped_sentiment,
        "prices": prices,
        "trades": trade_tape[:100],
        "whale_alerts": whale_alerts[:15] # Top 15 massive executions
    }
