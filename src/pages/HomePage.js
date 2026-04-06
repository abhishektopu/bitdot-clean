import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header.js";
import HeaderLinks from "../components/Header/HeaderLinks.js";

const HomePage = (props) => {
  const [usersOnline, setUsersOnline] = useState(156);
  const [recentUser, setRecentUser] = useState("");
  const [marketData, setMarketData] = useState({
      sentiment: { value: "50", classification: "Neutral" },
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
    setTimeout(removeWhatsapp, 2000);

    const notificationTimer = setInterval(() => {
      const cities = ["Dubai", "London", "Singapore", "New York", "Hong Kong"];
      const city = cities[Math.floor(Math.random() * cities.length)];
      setRecentUser("Institutional VIP connected from " + city + " 🛡️");
      setTimeout(() => setRecentUser(""), 5000);
    }, 25000);

    return () => { clearInterval(interval); clearInterval(notificationTimer); };
  }, []);

  const handleLeadClick = (name, customUrl = null) => {
    const url = customUrl || `https://www.bybit.com/copyTrade/?ref=157106`;
    if (window.gtag) { window.gtag('event', 'generate_lead', { 'platform': name }); }
    window.open(url, "_blank");
  };

  const getFngColor = (val) => {
      if (val <= 35) return "#ef4444"; 
      if (val >= 65) return "#4ade80"; 
      return "#f3ba2f"; 
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

      {/* HERO */}
      <div style={styles.heroSection}>
        <div className="container">
          <h1 style={styles.mainTitle}>Institutional Trading Terminal</h1>
          <p style={styles.heroSubText}>The Backbone of Sentiment-Driven Asset Management.</p>
          <div style={styles.statusBadge}>
            <span style={styles.pulseDot}></span> {usersOnline} Institutions Active
          </div>
          <div style={{ marginTop: "40px" }}>
            <button style={styles.primaryBtn} onClick={() => handleLeadClick("Hero")}>ENTER BYBIT TERMINAL</button>
          </div>
        </div>
      </div>

      {/* MARKET INTELLIGENCE DASHBOARD */}
      <div style={styles.whaleSection}>
          <div className="container" style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <div style={styles.dashboardGrid}>
                <div style={styles.dashboardCard}>
                    <p style={styles.statLabel}>MARKET SENTIMENT (FEAR & GREED)</p>
                    <h2 style={{ color: getFngColor(marketData.sentiment.value), fontWeight: "900", margin: 0 }}>
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

            <div style={styles.terminalHeader}><div style={styles.terminalDot}></div> <span style={{ fontWeight: "800", fontSize: "12px", color: "#94a3b8" }}>LIVE WHALE EXECUTION FLOW</span></div>
            <div style={styles.terminalBody}>
                {marketData.trades.length > 0 ? marketData.trades.map((trade, i) => (
                    <div key={i} style={styles.whaleRow}>
                        <span style={{ color: "#64748b" }}>[{new Date(parseInt(trade.time)).toLocaleTimeString()}]</span>
                        <span style={{ color: "#f3ba2f", fontWeight: "900", marginLeft: "10px", width: "40px", display: "inline-block" }}>{trade.symbol}</span>
                        <span style={{ color: trade.side === "Buy" ? "#4ade80" : "#ef4444", fontWeight: "bold", marginLeft: "10px" }}>{trade.side.toUpperCase()}</span>
                        <span style={{ color: "#ffffff", marginLeft: "10px", fontWeight: "800" }}>{trade.value}</span>
                        <span style={{ color: "#94a3b8", marginLeft: "10px" }}>@ {trade.price}</span>
                    </div>
                )) : <div style={{ color: "#94a3b8", padding: "20px", textAlign: "center" }}>Aggregating Market Data...</div>}
            </div>
          </div>
      </div>

      {/* LEADERBOARD */}
      <div style={styles.traderSection}>
          <div className="container" style={{ maxWidth: "1100px", margin: "0 auto" }}>
              <h3 style={styles.sectionTitle}>Asset Management Leaderboard</h3>
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

      {/* INFRASTRUCTURE */}
      <div style={{ background: "#020617", padding: "60px 20px", borderTop: "1px solid #1e293b", textAlign: "center" }}>
          <h3 style={{ color: "#f3ba2f", fontWeight: "900", marginBottom: "30px" }}>Institutional Infrastructure</h3>
          <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
              <div style={styles.techSpec}>⚡ &lt; 5ms Latency</div>
              <div style={styles.techSpec}>🛡️ Multi-Sig Security</div>
              <div style={styles.techSpec}>📊 $20B+ Liquidity</div>
          </div>
      </div>

      {/* BINANCE & VIP */}
      <div style={{ background: "#0f172a", padding: "80px 20px", textAlign: "center", borderTop: "1px solid #1e293b" }}>
          <p style={{ color: "#f3ba2f", fontWeight: "800", fontSize: "12px", letterSpacing: "2px" }}>VIP ONBOARDING</p>
          <h2 style={{ fontWeight: "900", marginBottom: "30px" }}>Institutional Gateway</h2>
          <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
              <button style={styles.binanceBtn} onClick={() => handleLeadClick("Binance", "https://www.binance.com/activity/referral-entry/CPA?ref=CPA_00M4SS7Z7U")}>ACCESS BINANCE</button>
              <button style={styles.telegramBtn} onClick={() => window.open("https://telegram.me/bitcoinblockchain501", "_blank")}>REQUEST VIP ACCESS</button>
          </div>
      </div>

      <footer style={styles.footer}>
        <p style={{ fontSize: "10px", opacity: "0.4" }}>OFFICIAL GLOBAL PARTNER | SECURED DATA FEED</p>
        <p style={{ fontSize: "10px", opacity: "0.2", marginTop: "10px" }}>Trading involves risk. Past performance is not indicative of future results.</p>
      </footer>

      {recentUser && <div style={styles.recentNotify}>{recentUser}</div>}
    </div>
  );
};

const styles = {
  mainWrapper: { backgroundColor: "#0f172a", color: "#f8fafc", fontFamily: "sans-serif" },
  brandLink: { display: "flex", alignItems: "center", textDecoration: "none" },
  logoCircle: { background: "#f3ba2f", color: "#000", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "6px", fontWeight: "900" },
  brandText: { marginLeft: "12px", fontSize: "20px", display: "flex", gap: "5px" },
  heroSection: { padding: "120px 20px 60px", textAlign: "center", background: "radial-gradient(circle at center, #1e293b 0%, #0f172a 100%)" },
  mainTitle: { fontWeight: "900", fontSize: "40px", color: "#fff" },
  heroSubText: { color: "#94a3b8", fontSize: "18px", margin: "20px auto", maxWidth: "600px" },
  statusBadge: { display: "inline-flex", alignItems: "center", background: "rgba(34, 197, 94, 0.1)", padding: "8px 20px", borderRadius: "4px", color: "#4ade80", fontWeight: "700" },
  pulseDot: { height: "8px", width: "8px", backgroundColor: "#4ade80", borderRadius: "50%", marginRight: "10px", boxShadow: "0 0 10px #4ade80" },
  primaryBtn: { background: "#f3ba2f", color: "#000", padding: "18px 50px", fontSize: "16px", fontWeight: "900", borderRadius: "4px", border: "none", cursor: "pointer" },
  dashboardGrid: { display: "flex", gap: "15px", marginBottom: "20px", flexWrap: "wrap" },
  dashboardCard: { flex: 1, background: "#1e293b", padding: "20px", borderRadius: "8px", border: "1px solid #334155", minWidth: "200px" },
  statLabel: { fontSize: "10px", color: "#64748b", fontWeight: "900", marginBottom: "5px" },
  whaleSection: { padding: "20px" },
  terminalHeader: { background: "#1e293b", padding: "10px 20px", borderRadius: "8px 8px 0 0", borderBottom: "1px solid #334155", display: "flex", alignItems: "center" },
  terminalDot: { height: "10px", width: "10px", background: "#ef4444", borderRadius: "50%", marginRight: "15px" },
  terminalBody: { background: "#020617", padding: "20px", borderRadius: "0 0 8px 8px", border: "1px solid #334155", height: "250px", overflowY: "auto", fontFamily: "monospace" },
  whaleRow: { padding: "8px 0", borderBottom: "1px solid #1e293b", fontSize: "13px" },
  traderSection: { padding: "60px 20px" },
  sectionTitle: { fontWeight: "900", fontSize: "24px", color: "#fff", textAlign: "center", marginBottom: "40px" },
  traderGrid: { display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" },
  traderCard: { background: "#1e293b", padding: "25px", borderRadius: "8px", width: "300px", border: "1px solid #334155" },
  cardHeader: { display: "flex", alignItems: "center", marginBottom: "20px" },
  traderIcon: { width: "40px", height: "40px", borderRadius: "4px", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" },
  traderName: { fontWeight: "800", marginLeft: "12px", color: "#fff" },
  statBox: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "20px" },
  statValueGreen: { color: "#4ade80", fontWeight: "900", fontSize: "20px" },
  statValue: { color: "#fff", fontWeight: "900", fontSize: "20px" },
  copyBtn: { width: "100%", padding: "12px", background: "transparent", color: "#f3ba2f", borderRadius: "4px", fontWeight: "800", border: "2px solid #f3ba2f", cursor: "pointer" },
  techSpec: { color: "#94a3b8", fontSize: "14px", background: "#1e293b", padding: "10px 20px", borderRadius: "4px", border: "1px solid #334155" },
  binanceBtn: { background: "#fff", color: "#000", padding: "15px 35px", borderRadius: "4px", border: "none", fontWeight: "900", cursor: "pointer" },
  telegramBtn: { background: "transparent", color: "#fff", padding: "15px 35px", borderRadius: "4px", border: "2px solid #fff", fontWeight: "800", cursor: "pointer" },
  footer: { padding: "60px 20px", textAlign: "center", background: "#020617" },
  recentNotify: { position: "fixed", bottom: "30px", left: "30px", background: "#1e293b", color: "#fff", padding: "12px 20px", borderRadius: "4px", fontSize: "12px", borderLeft: "4px solid #f3ba2f", zIndex: 1000 }
};

export default HomePage;
