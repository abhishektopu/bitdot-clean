import React, { useEffect, useState } from "react";

// Components
import Header from "../components/Header/Header.js";
import HeaderLinks from "../components/Header/HeaderLinks.js";

const HomePage = (props) => {
  const [usersOnline, setUsersOnline] = useState(151);
  const [recentUser, setRecentUser] = useState("");
  
  // FIXED: Verified leaderMarks. 
  const traders = [
    { 
        nickname: "Rubedo Engine", 
        roi: "81.28", 
        maxDrawdown: "0.23", 
        color: "#f3ba2f", 
        leaderMark: "AbWEdoxJjic3JRWCtxUL1w%3D%3D" 
    },
    { 
        nickname: "caleon8", 
        roi: "52.08", 
        maxDrawdown: "0.00", 
        color: "#000", 
        leaderMark: "zuhkoRlHodkzaCgGiSSdQw%3D%3D" 
    },
    { 
        nickname: "Liafe", 
        roi: "48.57", 
        maxDrawdown: "4.32", 
        color: "#0088cc", 
        leaderMark: "MzA1NDM4OTI3NDkzNzIzMTM2" 
    }
  ];

  const names = ["Rahul", "Amit", "Priya", "Kiran", "Sneha", "Vikram", "Anjali"];

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Crypto Lakeside - Official Rewards";
    const onlineTimer = setInterval(() => {
      setUsersOnline((prev) => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 10000);
    const notificationTimer = setInterval(() => {
      const name = names[Math.floor(Math.random() * names.length)];
      setRecentUser(`${name} just claimed a $100 bonus! 🎉`);
      setTimeout(() => setRecentUser(""), 5000);
    }, 20000);
    return () => {
      clearInterval(onlineTimer);
      clearInterval(notificationTimer);
    };
  }, []);

  /**
   * BULLETPROOF REDIRECT LOGIC
   * This structure is designed to prevent "Invalid Parameter" errors.
   */
  const handleLeadClick = (destUrl, platformName) => {
    const affiliateId = "157106";
    
    // Default to Rewards Hub if no specific trader is provided
    let finalUrl = `https://partner.bybit.com/b/${affiliateId}`;

    if (destUrl) {
        // We wrap the specific trader URL inside the affiliate redirect
        finalUrl = `https://partner.bybit.com/b/${affiliateId}?dest_url=${encodeURIComponent(destUrl)}`;
    }

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
                <span style={{ color: "#000" }}>CRYPTO</span>
                <span style={{ color: "#f3ba2f" }}>LAKESIDE</span>
            </div>
          </a>
        }
        rightLinks={<HeaderLinks />}
        {...props}
      />

      {/* HERO SECTION */}
      <div className="hero_section text-center" style={{ padding: "120px 20px 40px 20px" }}>
        <div className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h1 style={styles.mainTitle}>Start Crypto Trading <br/> and Unlock Rewards 🚀</h1>
          <h2 style={styles.subTitle}>🎁 New User Bonus: $100 — $600 Vouchers</h2>
          <div style={styles.statusBadge}>
             {usersOnline} active traders online
          </div>
          <div style={{ marginTop: "40px" }}>
            <button
              style={styles.primaryBtn}
              onClick={() => handleLeadClick(null, "Bybit_Hero")}
            >
              CLAIM $100 BONUS ON BYBIT
            </button>
          </div>
        </div>
      </div>

      {/* TRADER SECTION */}
      <div style={styles.traderSection}>
          <div className="container" style={{ maxWidth: "1000px", margin: "0 auto" }}>
              <h3 style={{ fontWeight: "800", marginBottom: "30px", fontSize: "24px" }}>🔥 Top Performing Master Traders</h3>
              <div style={styles.traderGrid}>
                  {traders.map((trader, idx) => (
                      <div key={idx} style={styles.traderCard}>
                          <div style={{...styles.traderIcon, background: trader.color}}>{trader.nickname[0]}</div>
                          <h4 style={{ fontWeight: "700", margin: "10px 0" }}>{trader.nickname}</h4>
                          <div style={styles.statsRow}>
                              <div>
                                  <p style={styles.statLabel}>ROI (30d)</p>
                                  <p style={styles.statValueGreen}>+{trader.roi}%</p>
                              </div>
                              <div style={{ textAlign: "right" }}>
                                  <p style={styles.statLabel}>Drawdown</p>
                                  <p style={{ fontWeight: "700" }}>{trader.maxDrawdown}%</p>
                              </div>
                          </div>
                          <button 
                            style={styles.copyBtn}
                            onClick={() => handleLeadClick(`https://www.bybit.com/copyTrade/trade-center/detail?leaderMark=${trader.leaderMark}`, `Copy-${trader.nickname}`)}
                          >
                            COPY STRATEGY
                          </button>
                      </div>
                  ))}
              </div>
          </div>
      </div>

      {/* BINANCE BUTTON SECTION (RESTORED) */}
      <div className="text-center" style={{ padding: "40px 20px", background: "#fdfdfd", borderTop: "1px solid #eee" }}>
          <p style={{ fontSize: "14px", color: "#666", marginBottom: "15px" }}>Preferred Exchange: Binance</p>
          <button 
            style={styles.binanceBtn}
            onClick={() => {
                if (window.gtag) { window.gtag('event', 'click_binance', { 'platform': 'Binance' }); }
                window.open("https://www.binance.com/activity/referral-entry/CPA?ref=CPA_00M4SS7Z7U", "_blank");
            }}
          >
            Register via Binance
          </button>
      </div>

      {/* SUPPORT SECTION */}
      <div className="text-center" style={{ padding: "60px 20px", background: "#fff" }}>
         <h3 style={{ fontWeight: "800" }}>💬 Need Assistance?</h3>
         <p style={{ color: "#666", fontSize: "15px", marginBottom: "25px" }}>Message our support team for step-by-step guidance.</p>
         <button 
            style={styles.telegramBtn}
            onClick={() => window.open("https://telegram.me/bitcoinblockchain501", "_blank")}
         >
           Message Support Now
         </button>
      </div>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <p style={{ fontSize: "14px", fontWeight: "600", marginBottom: "10px" }}>Official Bybit Partner | SSL Secured</p>
        <p style={{ fontSize: "11px", opacity: 0.7 }}>Risk Warning: Crypto trading involves high risk.</p>
      </footer>

      {/* FLOATING ACTION BUTTON */}
      <div style={styles.floatingContainer}>
        <button
          style={styles.floatingBtn}
          onClick={() => handleLeadClick(null, "Bybit_Floating")}
        >
          🔥 CLAIM YOUR $100 BONUS
        </button>
      </div>

      {recentUser && <div style={styles.recentNotify}>{recentUser}</div>}
    </div>
  );
};

const styles = {
  mainWrapper: { backgroundColor: "#fff", color: "#333", fontFamily: "sans-serif" },
  brandLink: { display: "flex", alignItems: "center", textDecoration: "none" },
  logoCircle: { background: "#f3ba2f", color: "#000", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", fontWeight: "900", fontSize: "14px" },
  brandText: { marginLeft: "10px", fontWeight: "800", fontSize: "17px" },
  mainTitle: { fontWeight: "900", fontSize: "36px", color: "#000", lineHeight: "1.2" },
  subTitle: { color: "#b45309", marginTop: "15px", fontWeight: "700", fontSize: "22px" },
  statusBadge: { display: "inline-flex", alignItems: "center", background: "#f0fdf4", padding: "6px 15px", borderRadius: "20px", color: "#16a34a", fontWeight: "700", marginTop: "20px", fontSize: "14px" },
  primaryBtn: { background: "#000", color: "#fff", padding: "20px 40px", fontSize: "18px", fontWeight: "800", borderRadius: "8px", border: "none", cursor: "pointer", width: "100%", maxWidth: "400px" },
  traderSection: { padding: "60px 20px", background: "#f9fafb", textAlign: "center", borderTop: "1px solid #eee" },
  traderGrid: { display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" },
  traderCard: { background: "#fff", padding: "20px", borderRadius: "12px", width: "280px", boxShadow: "0 4px 15px rgba(0,0,0,0.05)", border: "1px solid #eee" },
  traderIcon: { width: "50px", height: "50px", borderRadius: "50%", color: "#fff", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "20px" },
  statsRow: { display: "flex", justifyContent: "space-between", margin: "20px 0" },
  statLabel: { fontSize: "11px", color: "#888" },
  statValueGreen: { color: "#10b981", fontWeight: "800", fontSize: "18px" },
  copyBtn: { width: "100%", padding: "12px", background: "#f3ba2f", color: "#000", borderRadius: "6px", fontWeight: "800", border: "none", cursor: "pointer" },
  binanceBtn: { background: "#f3ba2f", color: "#000", padding: "12px 35px", borderRadius: "6px", border: "none", fontWeight: "700", cursor: "pointer", fontSize: "15px" },
  telegramBtn: { background: "#0088cc", color: "#fff", padding: "16px 40px", borderRadius: "8px", border: "none", fontWeight: "700", cursor: "pointer" },
  footer: { background: "#0b0e11", color: "#9ca3af", padding: "40px 20px", textAlign: "center", marginBottom: "80px" },
  floatingContainer: { position: "fixed", bottom: "20px", left: "50%", transform: "translateX(-50%)", width: "90%", zIndex: 3000, maxWidth: "500px" },
  floatingBtn: { width: "100%", background: "#16a34a", color: "#fff", padding: "18px", borderRadius: "10px", border: "none", fontWeight: "800", fontSize: "17px", boxShadow: "0 10px 25px rgba(22, 163, 74, 0.3)" },
  recentNotify: { position: "fixed", bottom: "110px", right: "20px", background: "#fff", color: "#333", padding: "15px 25px", borderRadius: "12px", fontSize: "13px", fontWeight: "600", zIndex: "3000", boxShadow: "0 10px 30px rgba(0,0,0,0.15)", borderLeft: "5px solid #f3ba2f" }
};

export default HomePage;
