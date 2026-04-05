import React, { useEffect, useState } from "react";

// Components
import Header from "../components/Header/Header.js";
import HeaderLinks from "../components/Header/HeaderLinks.js";

const HomePage = (props) => {
  const [usersOnline, setUsersOnline] = useState(151);
  const [recentUser, setRecentUser] = useState("");
  
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
        color: "#000", 
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
    const onlineTimer = setInterval(() => setUsersOnline((prev) => prev + (Math.random() > 0.5 ? 1 : -1)), 10000);
    
    const notificationTimer = setInterval(() => {
      const cities = ["Dubai", "London", "Singapore", "New York", "Hong Kong"];
      const city = cities[Math.floor(Math.random() * cities.length)];
      setRecentUser(`New VIP Client connected from ${city} terminal 🛡️`);
      setTimeout(() => setRecentUser(""), 5000);
    }, 25000);

    return () => { clearInterval(onlineTimer); clearInterval(notificationTimer); };
  }, []);

  const handleLeadClick = (baseUrl, platformName) => {
    const myRef = "157106";
    const target = baseUrl || "https://www.bybit.com/en/promo/global/rewards-hub";
    const finalUrl = target.includes("?") ? `${target}&ref=${myRef}` : `${target}?ref=${myRef}`;
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
            <div style={styles.brandText}>CRYPTO<span style={{ color: "#f3ba2f" }}>LAKESIDE</span></div>
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
            Access the world's most liquid derivatives market. Mirror the execution of verified Master Traders 
            with proven 99% win rates and near-zero drawdown.
          </p>
          <div style={styles.statusBadge}>
            <span style={styles.pulseDot}></span> {usersOnline} Institutions Active
          </div>
          <div style={{ marginTop: "40px" }}>
            <button style={styles.primaryBtn} onClick={() => handleLeadClick(null, "Hero_Main")}>
                ENTER BYBIT TERMINAL
            </button>
          </div>
        </div>
      </div>

      {/* TRADER GRID */}
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
                            onClick={() => handleLeadClick(`https://www.bybit.com/en/copyTrade/trade-center/detail?leaderMark=${trader.leaderMark}`, `Copy-${trader.nickname}`)}
                          >
                            MIRROR STRATEGY
                          </button>
                      </div>
                  ))}
              </div>
          </div>
      </div>

      {/* BINANCE GATEWAY SECTION (RESTORED IN WHALE STYLE) */}
      <div style={styles.binanceSection}>
          <div className="container" style={{ maxWidth: "1000px", margin: "0 auto" }}>
              <p style={styles.binanceLabel}>ALTERNATIVE INSTITUTIONAL GATEWAY</p>
              <h3 style={{ fontWeight: "800", color: "#fff", marginBottom: "20px" }}>Binance Global Liquidity</h3>
              <button 
                style={styles.binanceBtn}
                onClick={() => {
                    if (window.gtag) { window.gtag('event', 'click_binance', { 'platform': 'Binance' }); }
                    window.open("https://www.binance.com/activity/referral-entry/CPA?ref=CPA_00M4SS7Z7U", "_blank");
                }}
              >
                ACCESS BINANCE TERMINAL
              </button>
          </div>
      </div>

      {/* WHALE VIP SECTION */}
      <div style={styles.vipSection}>
          <div className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>
              <h2 style={{ fontWeight: "900", color: "#fff" }}>VIP Institutional Program</h2>
              <p style={{ color: "#94a3b8", fontSize: "17px", margin: "20px 0" }}>
                  Trading over $1,000,000 monthly? Access dedicated VIP rebates, private API endpoints, 
                  and 24/7 priority execution.
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
        <p style={{ fontSize: "12px", fontWeight: "700", opacity: 0.6 }}>OFFICIAL GLOBAL PARTNER | SECURED DATA FEED</p>
        <p style={{ fontSize: "10px", opacity: 0.4, marginTop: "10px" }}>Capital at risk. All trading activities involve significant financial exposure.</p>
      </footer>

      {recentUser && <div style={styles.recentNotify}>{recentUser}</div>}
    </div>
  );
};

/* ================= WHALE OPTIMIZED STYLES ================= */

const styles = {
  mainWrapper: { backgroundColor: "#0f172a", color: "#f8fafc", fontFamily: "'Inter', sans-serif" },
  brandLink: { display: "flex", alignItems: "center", textDecoration: "none" },
  logoCircle: { background: "#f3ba2f", color: "#000", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "4px", fontWeight: "900" },
  brandText: { marginLeft: "10px", fontWeight: "800", fontSize: "18px", color: "#fff" },
  
  heroSection: { padding: "140px 20px 80px 20px", textAlign: "center", background: "radial-gradient(circle at center, #1e293b 0%, #0f172a 100%)" },
  mainTitle: { fontWeight: "900", fontSize: "44px", color: "#fff", lineHeight: "1.1", letterSpacing: "-1px" },
  heroSubText: { color: "#94a3b8", fontSize: "18px", marginTop: "20px", maxWidth: "700px", margin: "20px auto" },
  
  statusBadge: { display: "inline-flex", alignItems: "center", background: "rgba(34, 197, 94, 0.1)", padding: "8px 20px", borderRadius: "4px", color: "#4ade80", fontWeight: "700", marginTop: "30px", fontSize: "14px" },
  pulseDot: { height: "8px", width: "8px", backgroundColor: "#4ade80", borderRadius: "50%", marginRight: "10px", boxShadow: "0 0 10px #4ade80" },
  
  primaryBtn: { background: "#f3ba2f", color: "#000", padding: "20px 50px", fontSize: "16px", fontWeight: "900", borderRadius: "4px", border: "none", cursor: "pointer" },
  
  traderSection: { padding: "80px 20px", background: "#0f172a" },
  sectionTitle: { fontWeight: "900", fontSize: "28px", color: "#fff", marginBottom: "40px", textAlign: "center" },
  traderGrid: { display: "flex", flexWrap: "wrap", gap: "30px", justifyContent: "center" },
  
  traderCard: { background: "#1e293b", padding: "30px", borderRadius: "8px", width: "320px", border: "1px solid #334155" },
  cardHeader: { display: "flex", alignItems: "center", marginBottom: "25px" },
  traderIcon: { width: "45px", height: "45px", borderRadius: "4px", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "18px" },
  traderName: { fontWeight: "800", marginLeft: "15px", color: "#fff", fontSize: "20px" },
  
  statBox: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "30px" },
  statItem: { textAlign: "left" },
  statLabel: { fontSize: "10px", color: "#64748b", fontWeight: "800", textTransform: "uppercase", marginBottom: "5px" },
  statValueGreen: { color: "#4ade80", fontWeight: "900", fontSize: "22px" },
  statValue: { color: "#fff", fontWeight: "900", fontSize: "22px" },
  
  copyBtn: { width: "100%", padding: "15px", background: "transparent", color: "#f3ba2f", borderRadius: "4px", fontWeight: "800", border: "2px solid #f3ba2f", cursor: "pointer" },
  
  binanceSection: { padding: "80px 20px", background: "#020617", textAlign: "center", borderTop: "1px solid #1e293b" },
  binanceLabel: { fontSize: "11px", letterSpacing: "2px", color: "#f3ba2f", fontWeight: "800", marginBottom: "10px" },
  binanceBtn: { background: "#fff", color: "#000", padding: "18px 45px", borderRadius: "4px", border: "none", fontWeight: "900", cursor: "pointer", fontSize: "16px" },

  vipSection: { padding: "100px 20px", background: "#0f172a", textAlign: "center", borderTop: "1px solid #1e293b" },
  telegramBtn: { background: "transparent", color: "#fff", padding: "16px 40px", borderRadius: "4px", border: "2px solid #fff", fontWeight: "800", cursor: "pointer" },
  
  footer: { padding: "60px 20px", textAlign: "center", background: "#020617" },
  recentNotify: { position: "fixed", bottom: "30px", left: "30px", background: "#1e293b", color: "#fff", padding: "15px 25px", borderRadius: "4px", fontSize: "13px", fontWeight: "600", zIndex: "3000", borderLeft: "4px solid #f3ba2f" }
};

export default HomePage;
