import React, { useEffect, useState } from "react";

// Components
import Header from "../components/Header/Header.js";
import HeaderLinks from "../components/Header/HeaderLinks.js";

const HomePage = (props) => {
  const [usersOnline, setUsersOnline] = useState(157);
  const [recentUser, setRecentUser] = useState("");
  const [marketData, setMarketData] = useState({
      sentiment: { value: "13", classification: "Extreme Fear" },
      prices: { BTC: "0", ETH: "0", SOL: "0" },
      trades: []
  });

  const traders = [
    { nickname: "Rubedo Engine", roi: "81.28", maxDrawdown: "0.23", aum: "$1.2M", color: "#f3ba2f" },
    { nickname: "caleon8", roi: "52.08", maxDrawdown: "0.00", aum: "$850K", color: "#000000" },
    { nickname: "Liafe", roi: "48.57", maxDrawdown: "4.32", aum: "$500K", color: "#0088cc" }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Crypto Lakeside | Institutional Terminal";

    const getData = () => {
        fetch('/whales.json')
            .then(res => res.json())
            .then(data => setMarketData(data))
            .catch(err => console.log("Terminal Syncing..."));
    };
    getData();
    const interval = setInterval(getData, 30000); 

    const removeWhatsapp = () => {
        const buttons = document.querySelectorAll('a[href*="wa.me"], div[class*="whatsapp"], button[class*="whatsapp"]');
        buttons.forEach(btn => btn.style.display = 'none');
    };
    removeWhatsapp();

    const notificationTimer = setInterval(() => {
      const cities = ["Dubai", "London", "Singapore", "New York", "Hong Kong"];
      const city = cities[Math.floor(Math.random() * cities.length)];
      setRecentUser("Institutional VIP connected from " + city + " terminal 🛡️");
      setTimeout(() => setRecentUser(""), 5000);
    }, 25000);

    return () => { clearInterval(interval); clearInterval(notificationTimer); };
  }, []);

  const handleLeadClick = (platformName) => {
    const myRef = "157106";
    // Failsafe Hub URL for India
    const finalUrl = `https://www.bybit.com/copyTrade/?ref=${myRef}`;
    if (window.gtag) { window.gtag('event', 'generate_lead', { 'platform': platformName }); }
    window.open(finalUrl, "_blank");
  };

  return (
    <div className="page_wrap" style={styles.mainWrapper}>
      <Header
        color="white"
        brand={
          <a href="/" style={styles.brandLink}>
            <div style={styles.logoCircle}>CL</div>
            <div style={styles.brandText}>
                <span style={{ color: "black", fontWeight: "900" }}>CRYPTO</span>
                <span style={{ color: "#f3ba2f", fontWeight: "900" }}>LAKESIDE</span>
            </div>
          </a>
        }
        rightLinks={<HeaderLinks />}
        {...props}
      />

      {/* HERO SECTION */}
      <div style={styles.heroSection}>
        <div className="container">
          <h1 style={styles.mainTitle}>Institutional Trading Terminal</h1>
          <p style={styles.heroSubText}>Mirror Verified Master Traders with Proven Institutional Alpha.</p>
          <div style={styles.statusBadge}>
            <span style={styles.pulseDot}></span> {usersOnline} Institutions Active
          </div>
          <div style={{ marginTop: "40px" }}>
            <button style={styles.primaryBtn} onClick={() => handleLeadClick("Hero_Main")}>
                ENTER BYBIT TERMINAL
            </button>
          </div>
        </div>
      </div>

      {/* MARKET INTELLIGENCE BAR */}
      <div style={styles.whaleSection}>
          <div className="container" style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={styles.dashboardGrid}>
                <div style={styles.dashboardCard}>
                    <p style={styles.statLabel}>MARKET SENTIMENT</p>
                    <h2 style={{ color: marketData.sentiment.value < 40 ? "#ef4444" : "#4ade80", fontWeight: "900", margin: 0 }}>
                        {marketData.sentiment.classification.toUpperCase()} ({marketData.sentiment.value})
                    </h2>
                </div>
                {Object.keys(marketData.prices).map(coin => (
                    <div key={coin} style={styles.dashboardCard}>
                        <p style={styles.statLabel}>{coin} INDEX PRICE</p>
                        <h2 style={{ color: "#fff", fontWeight: "900", margin: 0 }}>${parseFloat(marketData.prices[coin]).toLocaleString()}</h2>
                    </div>
                ))}
            </div>

            {/* SCROLLING TERMINAL */}
            <div style={styles.terminalHeader}>
                <div style={styles.terminalDot}></div> 
                <span style={{ fontWeight: "800", fontSize: "12px", color: "#94a3b8" }}>LIVE WHALE EXECUTION FLOW (BITFINEX CORE)</span>
            </div>
            <div style={styles.terminalBody}>
                <div style={styles.scrollContainer}>
                    {marketData.trades.length > 0 ? marketData.trades.map((trade, i) => (
                        <div key={i} style={styles.whaleRow}>
                            <span style={{ color: "#64748b" }}>[{new Date(parseInt(trade.time)).toLocaleTimeString()}]</span>
                            <span style={{ color: "#f3ba2f", fontWeight: "900", marginLeft: "10px", width: "45px", display: "inline-block" }}>{trade.symbol}</span>
                            <span style={{ color: trade.side === "Buy" ? "#4ade80" : "#ef4444", fontWeight: "bold", marginLeft: "10px", width: "50px", display: "inline-block" }}>{trade.side.toUpperCase()}</span>
                            <span style={{ color: "#ffffff", marginLeft: "10px", fontWeight: "800" }}>{trade.value}</span>
                            <span style={{ color: "#94a3b8", marginLeft: "10px" }}>@ {trade.price}</span>
                        </div>
                    )) : <div style={{ color: "#94a3b8", padding: "20px" }}>Aggregating Market Data...</div>}
                    {/* Repeat the list to ensure smooth infinite loop */}
                    {marketData.trades.map((trade, i) => (
                        <div key={`dup-${i}`} style={styles.whaleRow}>
                            <span style={{ color: "#64748b" }}>[{new Date(parseInt(trade.time)).toLocaleTimeString()}]</span>
                            <span style={{ color: "#f3ba2f", fontWeight: "900", marginLeft: "10px", width: "45px", display: "inline-block" }}>{trade.symbol}</span>
                            <span style={{ color: trade.side === "Buy" ? "#4ade80" : "#ef4444", fontWeight: "bold", marginLeft: "10px", width: "50px", display: "inline-block" }}>{trade.side.toUpperCase()}</span>
                            <span style={{ color: "#ffffff", marginLeft: "10px", fontWeight: "800" }}>{trade.value}</span>
                            <span style={{ color: "#94a3b8", marginLeft: "10px" }}>@ {trade.price}</span>
                        </div>
                    ))}
                </div>
            </div>
          </div>
      </div>

      {/* LEADERBOARD GRID */}
      <div style={styles.traderSection}>
          <div className="container" style={{ maxWidth: "1100px", margin: "0 auto" }}>
              <h3 style={styles.sectionTitle}>Institutional Leaderboard</h3>
              <div style={styles.traderGrid}>
                  {traders.map((trader, idx) => (
                      <div key={idx} style={styles.traderCard}>
                          <div style={styles.cardHeader}>
                              <div style={{...styles.traderIcon, background: trader.color}}>{trader.nickname[0]}</div>
                              <h4 style={styles.traderName}>{trader.nickname}</h4>
                          </div>
                          <div style={styles.statBox}>
                              <div style={styles.statItem}><p style={styles.statLabel}>ROI (30D)</p><p style={styles.statValueGreen}>+{trader.roi}%</p></div>
                              <div style={styles.statItem}><p style={styles.statLabel}>MAX DRAWDOWN</p><p style={styles.statValue}>{trader.maxDrawdown}%</p></div>
                          </div>
                          <button style={styles.copyBtn} onClick={() => handleLeadClick("Copy-" + trader.nickname)}>MIRROR STRATEGY</button>
                      </div>
                  ))}
              </div>
          </div>
      </div>

      {/* INFRASTRUCTURE SPECS */}
      <div style={{ background: "#020617", padding: "80px 20px", borderTop: "1px solid #1e293b", textAlign: "center" }}>
          <h3 style={{ color: "#f3ba2f", fontWeight: "900", marginBottom: "40px" }}>Technical Infrastructure</h3>
          <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
              <div style={styles.techSpec}>⚡ &lt; 5ms Latency Response</div>
              <div style={styles.techSpec}>🛡️ Multi-Sig Cold Storage</div>
              <div style={styles.techSpec}>📊 $20B Daily Liquid Aggregation</div>
          </div>
      </div>

      {/* BINANCE & VIP GATEWAY */}
      <div style={styles.binanceSection}>
          <p style={styles.statLabel}>ALTERNATIVE INSTITUTIONAL GATEWAY</p>
          <h2 style={{ fontWeight: "900", color: "#fff", marginBottom: "30px" }}>Secure Access Terminals</h2>
          <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
              <button style={styles.binanceBtn} onClick={() => handleLeadClick("Binance")}>ACCESS BINANCE</button>
              <button style={styles.telegramBtn} onClick={() => window.open("https://telegram.me/bitcoinblockchain501", "_blank")}>VIP ONBOARDING</button>
          </div>
      </div>

      <footer style={styles.footer}>
        <p style={{ fontSize: "11px", fontWeight: "700", opacity: "0.5" }}>OFFICIAL GLOBAL PARTNER | SECURED DATA FEED</p>
        <p style={{ fontSize: "10px", opacity: "0.3", marginTop: "15px" }}>Capital at risk. Past performance is not indicative of future results.</p>
      </footer>

      {recentUser && <div style={styles.recentNotify}>{recentUser}</div>}

      <style>{`
        @keyframes scrollTerminal {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
      `}</style>
    </div>
  );
};

const styles = {
  mainWrapper: { backgroundColor: "#0f172a", color: "#f8fafc", fontFamily: "'Barlow', sans-serif" },
  brandLink: { display: "flex", alignItems: "center", textDecoration: "none" },
  logoCircle: { background: "#f3ba2f", color: "#000", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "6px", fontWeight: "900" },
  brandText: { marginLeft: "12px", fontSize: "20px", display: "flex", gap: "6px" },
  heroSection: { padding: "140px 20px 60px", textAlign: "center", background: "radial-gradient(circle at center, #1e293b 0%, #0f172a 100%)" },
  mainTitle: { fontWeight: "900", fontSize: "48px", color: "#fff", letterSpacing: "-1px" },
  heroSubText: { color: "#94a3b8", fontSize: "20px", margin: "20px auto", maxWidth: "600px" },
  statusBadge: { display: "inline-flex", alignItems: "center", background: "rgba(34, 197, 94, 0.1)", padding: "8px 20px", borderRadius: "4px", color: "#4ade80", fontWeight: "700", marginTop: "20px" },
  pulseDot: { height: "8px", width: "8px", backgroundColor: "#4ade80", borderRadius: "50%", marginRight: "10px", boxShadow: "0 0 10px #4ade80" },
  primaryBtn: { background: "#f3ba2f", color: "#000", padding: "18px 50px", fontSize: "16px", fontWeight: "900", borderRadius: "4px", border: "none", cursor: "pointer" },
  
  dashboardGrid: { display: "flex", gap: "15px", marginBottom: "20px", flexWrap: "wrap" },
  dashboardCard: { flex: 1, background: "#1e293b", padding: "20px", borderRadius: "8px", border: "1px solid #334155", minWidth: "240px" },
  statLabel: { fontSize: "10px", color: "#64748b", fontWeight: "900", marginBottom: "5px", letterSpacing: "1px", textTransform: "uppercase" },
  
  whaleSection: { padding: "20px" },
  terminalHeader: { background: "#1e293b", padding: "12px 20px", borderRadius: "8px 8px 0 0", borderBottom: "1px solid #334155", display: "flex", alignItems: "center" },
  terminalDot: { height: "10px", width: "10px", background: "#ef4444", borderRadius: "50%", marginRight: "15px", boxShadow: "0 0 8px #ef4444" },
  terminalBody: { background: "#020617", borderRadius: "0 0 8px 8px", border: "1px solid #334155", height: "300px", overflow: "hidden", position: "relative" },
  scrollContainer: { padding: "20px", animation: "scrollTerminal 45s linear infinite" },
  whaleRow: { padding: "10px 0", borderBottom: "1px solid #1e293b", fontSize: "14px", fontFamily: "monospace", letterSpacing: "0.5px" },

  traderSection: { padding: "80px 20px", background: "#0f172a" },
  sectionTitle: { fontWeight: "900", fontSize: "32px", color: "#fff", textAlign: "center", marginBottom: "50px" },
  traderGrid: { display: "flex", flexWrap: "wrap", gap: "30px", justifyContent: "center" },
  traderCard: { background: "#1e293b", padding: "30px", borderRadius: "12px", width: "340px", border: "1px solid #334155" },
  cardHeader: { display: "flex", alignItems: "center", marginBottom: "25px" },
  traderIcon: { width: "45px", height: "45px", borderRadius: "6px", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "20px" },
  traderName: { fontWeight: "800", marginLeft: "15px", color: "#fff", fontSize: "22px" },
  statBox: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "30px" },
  statItem: { textAlign: "left" },
  statValueGreen: { color: "#4ade80", fontWeight: "900", fontSize: "24px" },
  statValue: { color: "#fff", fontWeight: "900", fontSize: "24px" },
  copyBtn: { width: "100%", padding: "15px", background: "transparent", color: "#f3ba2f", borderRadius: "4px", fontWeight: "800", border: "2px solid #f3ba2f", cursor: "pointer" },
  
  techSpec: { color: "#94a3b8", fontSize: "14px", background: "#1e293b", padding: "15px 30px", borderRadius: "4px", border: "1px solid #334155", fontWeight: "700" },
  binanceSection: { padding: "100px 20px", background: "#0f172a", textAlign: "center", borderTop: "1px solid #1e293b" },
  binanceBtn: { background: "#fff", color: "#000", padding: "18px 45px", borderRadius: "4px", border: "none", fontWeight: "900", cursor: "pointer", fontSize: "16px" },
  telegramBtn: { background: "transparent", color: "#fff", padding: "18px 45px", borderRadius: "4px", border: "2px solid #fff", fontWeight: "800", cursor: "pointer", fontSize: "16px" },
  footer: { padding: "80px 20px", textAlign: "center", background: "#020617", borderTop: "1px solid #1e293b" },
  recentNotify: { position: "fixed", bottom: "30px", left: "30px", background: "#1e293b", color: "#fff", padding: "15px 25px", borderRadius: "4px", fontSize: "13px", borderLeft: "4px solid #f3ba2f", zIndex: 10000, boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }
};

export default HomePage;
