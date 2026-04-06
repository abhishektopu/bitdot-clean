import React, { useEffect, useState } from "react";

// Components
import Header from "../components/Header/Header.js";
import HeaderLinks from "../components/Header/HeaderLinks.js";

const HomePage = (props) => {
  const [usersOnline, setUsersOnline] = useState(156);
  const [recentUser, setRecentUser] = useState("");
  const [whales, setWhales] = useState([]);
  
  // TRADER DATA - Fixed IDs to match Bybit's exact internal requirements
  const traders = [
    { 
        nickname: "Rubedo Engine", 
        roi: "81.28", 
        maxDrawdown: "0.23", 
        aum: "$1.2M",
        color: "#f3ba2f", 
        leaderMark: "AbWEdoxJjic3JRWCtxUL1w%3D%3D" 
    },
    { 
        nickname: "caleon8", 
        roi: "52.08", 
        maxDrawdown: "0.00", 
        aum: "$850K",
        color: "#000000", 
        leaderMark: "zuhkoRlHodkzaCgGiSSdQw%3D%3D" 
    },
    { 
        nickname: "Liafe", 
        roi: "48.57", 
        maxDrawdown: "4.32", 
        aum: "$500K",
        color: "#0088cc", 
        leaderMark: "MzA1NDM4OTI3NDkzNzIzMTM2" 
    }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Crypto Lakeside | Institutional Trading Terminal";

    const getWhaleData = () => {
        fetch('/whales.json')
            .then(res => res.json())
            .then(data => setWhales(data))
            .catch(err => console.log("Feed syncing..."));
    };
    getWhaleData();
    const whaleInterval = setInterval(getWhaleData, 30000); 
    
    const removeWhatsapp = () => {
        const buttons = document.querySelectorAll('a[href*="wa.me"], div[class*="whatsapp"], button[class*="whatsapp"]');
        buttons.forEach(btn => btn.style.display = 'none');
        const allElements = document.getElementsByTagName('button');
        for (let i = 0; i < allElements.length; i++) {
            if (allElements[i].textContent.includes('Start Earning Now')) {
                allElements[i].style.display = 'none';
            }
        }
    };
    removeWhatsapp();
    setTimeout(removeWhatsapp, 2000);

    const onlineTimer = setInterval(() => {
        setUsersOnline((prev) => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 10000);
    
    const notificationTimer = setInterval(() => {
      const cities = ["Dubai", "London", "Singapore", "New York", "Hong Kong"];
      const city = cities[Math.floor(Math.random() * cities.length)];
      setRecentUser("Institutional VIP connected from " + city + " terminal 🛡️");
      setTimeout(() => setRecentUser(""), 5000);
    }, 25000);

    return () => { 
        clearInterval(onlineTimer); 
        clearInterval(notificationTimer); 
        clearInterval(whaleInterval); 
    };
  }, []);

  // MASTER REFERRAL FUNCTION - SECURED FOR AFFILIATE TRACKING
  const handleLeadClick = (targetUrl, platformName) => {
    const myRef = "157106";
    
    // Logic to correctly append ref without breaking the path
    const finalUrl = targetUrl.includes("?") 
        ? `${targetUrl}&ref=${myRef}` 
        : `${targetUrl}?ref=${myRef}`;

    if (window.gtag) { 
        window.gtag('event', 'generate_lead', { 'platform': platformName }); 
    }

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
                <span style={{ color: "black", fontWeight: "900", marginRight: "6px" }}>CRYPTO</span>
                <span style={{ color: "#f3ba2f", fontWeight: "900" }}>LAKESIDE</span>
            </div>
          </a>
        }
        rightLinks={<HeaderLinks />}
        {...props}
      />

      {/* HERO SECTION */}
      <div style={styles.heroSection}>
        <div className="container" style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h1 style={styles.mainTitle}>Automate Your Portfolio with Institutional Traders</h1>
          <p style={styles.heroSubText}>
            Access high-alpha execution in the world's most liquid derivatives market. 
            Mirror verified Master Traders with institutional-grade performance.
          </p>
          <div style={styles.statusBadge}>
            <span style={styles.pulseDot}></span> {usersOnline} Institutions Active
          </div>
          <div style={{ marginTop: "40px" }}>
            <button style={styles.primaryBtn} onClick={() => handleLeadClick("https://www.bybit.com/en/signup", "Hero_Signup")}>
                ENTER BYBIT TERMINAL
            </button>
          </div>
        </div>
      </div>

      {/* LIVE WHALE TRACKER */}
      <div style={styles.whaleSection}>
          <div className="container" style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <div style={styles.terminalHeader}>
                <div style={styles.terminalDot}></div>
                <span style={{ fontWeight: "800", fontSize: "12px", color: "#94a3b8" }}>LIVE TERMINAL FEED (BYBIT V5 API)</span>
            </div>
            <div style={styles.terminalBody}>
                {whales.length > 0 ? (
                    whales.map((whale, i) => (
                        <div key={i} style={styles.whaleRow}>
                            <span style={{ color: "#64748b" }}>[{new Date(parseInt(whale.time)).toLocaleTimeString()}]</span>
                            <span style={{ color: whale.side === "Buy" ? "#4ade80" : "#ef4444", fontWeight: "bold", marginLeft: "10px" }}>
                                {whale.side.toUpperCase()}
                            </span>
                            <span style={{ color: "#ffffff", marginLeft: "10px", fontWeight: "800" }}>{whale.value} BTCUSDT</span>
                            <span style={{ color: "#94a3b8", marginLeft: "10px" }}>@ {whale.price}</span>
                        </div>
                    ))
                ) : (
                    <div style={{ color: "#94a3b8", padding: "20px", textAlign: "center" }}>
                        Scanning Bybit Order Book for Large Volume Execution...
                    </div>
                )}
            </div>
          </div>
      </div>

      {/* INSTITUTIONAL LEADERBOARD */}
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
                              <div style={styles.statItem}>
                                  <p style={styles.statLabel}>ROI (30D)</p>
                                  <p style={styles.statValueGreen}>+{trader.roi}%</p>
                              </div>
                              <div style={styles.statItem}>
                                  <p style={styles.statLabel}>MAX DRAWDOWN</p>
                                  <p style={styles.statValue}>{trader.maxDrawdown}%</p>
                              </div>
                          </div>
                          <button 
                            style={styles.copyBtn}
                            onClick={() => {
                                // Bybit Deep Link Path (Note: No /en/ here)
                                const traderUrl = `https://www.bybit.com/copyTrade/trade-center/detail?leaderMark=${trader.leaderMark}`;
                                handleLeadClick(traderUrl, "Copy-" + trader.nickname);
                            }}
                          >
                            MIRROR STRATEGY
                          </button>
                      </div>
                  ))}
              </div>
          </div>
      </div>

      {/* TECHNICAL INFRASTRUCTURE */}
      <div style={{ background: "#020617", padding: "60px 20px", borderTop: "1px solid #1e293b" }}>
          <h3 style={{ color: "#f3ba2f", fontWeight: "900", textAlign: "center", marginBottom: "30px" }}>Infrastructure Specifications</h3>
          <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
              <div style={styles.techSpec}>⚡ <b>Latency:</b> &lt; 5ms Execution</div>
              <div style={styles.techSpec}>🛡️ <b>Security:</b> Multi-Sig Cold Storage</div>
              <div style={styles.techSpec}>📊 <b>Liquidity:</b> $20B+ Daily Aggregated</div>
          </div>
      </div>

      {/* BINANCE GATEWAY */}
      <div style={styles.binanceSection}>
          <div className="container" style={{ maxWidth: "1000px", margin: "0 auto" }}>
              <p style={styles.binanceLabel}>SECONDARY INSTITUTIONAL GATEWAY</p>
              <h3 style={{ fontWeight: "800", color: "#ffffff", marginBottom: "20px" }}>Binance Global Liquidity</h3>
              <button 
                style={styles.binanceBtn}
                onClick={() => handleLeadClick("https://www.binance.com/activity/referral-entry/CPA?ref=CPA_00M4SS7Z7U", "Binance_Portal")}
              >
                ACCESS BINANCE TERMINAL
              </button>
          </div>
      </div>

      {/* VIP ONBOARDING */}
      <div style={styles.vipSection}>
          <div className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>
              <h2 style={{ fontWeight: "900", color: "#ffffff" }}>VIP Institutional Access</h2>
              <p style={{ color: "#94a3b8", fontSize: "17px", margin: "20px 0" }}>
                  Trading volumes exceeding $1M monthly? Apply for dedicated rebates and priority API endpoints.
              </p>
              <button 
                style={styles.telegramBtn}
                onClick={() => window.open("https://telegram.me/bitcoinblockchain501", "_blank")}
              >
                REQUEST VIP ONBOARDING
              </button>
          </div>
      </div>

      <footer style={styles.footer}>
        <p style={{ fontSize: "12px", fontWeight: "700", opacity: "0.6" }}>OFFICIAL GLOBAL PARTNER | SECURED DATA FEED</p>
        <p style={{ fontSize: "10px", opacity: "0.4", marginTop: "10px" }}>Capital at risk. Past performance is not indicative of future results.</p>
      </footer>

      {recentUser && <div style={styles.recentNotify}>{recentUser}</div>}
    </div>
  );
};

/* ================= STYLES ================= */

const styles = {
  mainWrapper: { backgroundColor: "#0f172a", color: "#f8fafc", fontFamily: "sans-serif" },
  brandLink: { display: "flex", alignItems: "center", textDecoration: "none" },
  logoCircle: { background: "#f3ba2f", color: "#000000", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "6px", fontWeight: "900", fontSize: "16px" },
  brandText: { marginLeft: "12px", fontWeight: "900", fontSize: "20px", letterSpacing: "0.5px", display: "flex", alignItems: "center" },
  heroSection: { padding: "140px 20px 80px 20px", textAlign: "center", background: "radial-gradient(circle at center, #1e293b 0%, #0f172a 100%)" },
  mainTitle: { fontWeight: "900", fontSize: "44px", color: "#ffffff", lineHeight: "1.1", letterSpacing: "-1px" },
  heroSubText: { color: "#94a3b8", fontSize: "18px", marginTop: "20px", maxWidth: "700px", margin: "20px auto" },
  statusBadge: { display: "inline-flex", alignItems: "center", background: "rgba(34, 197, 94, 0.1)", padding: "8px 20px", borderRadius: "4px", color: "#4ade80", fontWeight: "700", marginTop: "30px", fontSize: "14px" },
  pulseDot: { height: "8px", width: "8px", backgroundColor: "#4ade80", borderRadius: "50%", marginRight: "10px", boxShadow: "0 0 10px #4ade80" },
  primaryBtn: { background: "#f3ba2f", color: "#000000", padding: "20px 50px", fontSize: "16px", fontWeight: "900", borderRadius: "4px", border: "none", cursor: "pointer" },
  
  whaleSection: { padding: "40px 20px", background: "#0f172a" },
  terminalHeader: { background: "#1e293b", padding: "10px 20px", borderRadius: "8px 8px 0 0", borderBottom: "1px solid #334155", display: "flex", alignItems: "center" },
  terminalDot: { height: "10px", width: "10px", background: "#ef4444", borderRadius: "50%", marginRight: "15px", boxShadow: "0 0 8px #ef4444" },
  terminalBody: { background: "#020617", padding: "20px", borderRadius: "0 0 8px 8px", border: "1px solid #334155", height: "200px", overflowY: "auto", fontFamily: "'Courier New', Courier, monospace" },
  whaleRow: { padding: "8px 0", borderBottom: "1px solid #1e293b", fontSize: "14px", letterSpacing: "0.5px" },

  traderSection: { padding: "80px 20px", background: "#0f172a" },
  sectionTitle: { fontWeight: "900", fontSize: "28px", color: "#ffffff", marginBottom: "40px", textAlign: "center" },
  traderGrid: { display: "flex", flexWrap: "wrap", gap: "30px", justifyContent: "center" },
  traderCard: { background: "#1e293b", padding: "30px", borderRadius: "8px", width: "320px", border: "1px solid #334155" },
  cardHeader: { display: "flex", alignItems: "center", marginBottom: "25px" },
  traderIcon: { width: "45px", height: "45px", borderRadius: "4px", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "18px" },
  traderName: { fontWeight: "800", marginLeft: "15px", color: "#ffffff", fontSize: "20px" },
  statBox: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "30px" },
  statItem: { textAlign: "left" },
  statLabel: { fontSize: "10px", color: "#64748b", fontWeight: "800", textTransform: "uppercase", marginBottom: "5px" },
  statValueGreen: { color: "#4ade80", fontWeight: "900", fontSize: "22px" },
  statValue: { color: "#ffffff", fontWeight: "900", fontSize: "22px" },
  copyBtn: { width: "100%", padding: "15px", background: "transparent", color: "#f3ba2f", borderRadius: "4px", fontWeight: "800", border: "2px solid #f3ba2f", cursor: "pointer" },
  techSpec: { color: "#94a3b8", fontSize: "14px", background: "#1e293b", padding: "15px 25px", borderRadius: "4px", border: "1px solid #334155" },
  binanceSection: { padding: "80px 20px", background: "#020617", textAlign: "center", borderTop: "1px solid #1e293b" },
  binanceLabel: { fontSize: "11px", letterSpacing: "2px", color: "#f3ba2f", fontWeight: "800", marginBottom: "10px" },
  binanceBtn: { background: "#ffffff", color: "#000000", padding: "18px 45px", borderRadius: "4px", border: "none", fontWeight: "900", cursor: "pointer", fontSize: "16px" },
  vipSection: { padding: "100px 20px", background: "#0f172a", textAlign: "center", borderTop: "1px solid #1e293b" },
  telegramBtn: { background: "transparent", color: "#ffffff", padding: "16px 40px", borderRadius: "4px", border: "2px solid #ffffff", fontWeight: "800", cursor: "pointer" },
  footer: { padding: "60px 20px", textAlign: "center", background: "#020617" },
  recentNotify: { position: "fixed", bottom: "30px", left: "30px", background: "#1e293b", color: "#ffffff", padding: "15px 25px", borderRadius: "4px", fontSize: "13px", fontWeight: "600", zIndex: "3000", borderLeft: "4px solid #f3ba2f" }
};

export default HomePage;
