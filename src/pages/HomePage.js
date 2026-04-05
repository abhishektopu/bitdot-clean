import React, { useEffect, useState } from "react";
import { getTopTraders } from "../services/bybitService"; 
 
// Components
import Header from "../components/Header/Header.js";
import HeaderLinks from "../components/Header/HeaderLinks.js";

const HomePage = (props) => {
  const [usersOnline, setUsersOnline] = useState(149);
  const [recentUser, setRecentUser] = useState("");
  
  // Default values used while API is fetching or as fallback
  const [traders, setTraders] = useState([
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
  ]);

  const names = ["Rahul", "Amit", "Priya", "Kiran", "Sneha", "Vikram", "Anjali"];

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Crypto Lakeside - Official Rewards";

    // FETCH LIVE BYBIT DATA FROM YOUR SERVICE
    getTopTraders().then((liveData) => {
      if (liveData && liveData.length > 0) {
        setTraders(liveData);
      }
    });

    // Social Proof: Online Counter
    const onlineTimer = setInterval(() => {
      setUsersOnline((prev) => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 10000);

    // Social Proof: Fake Claim Notifications
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
   * CORE FUNCTION: handleLeadClick
   * Fixes the "Homepage Redirection" by properly encoding the deep link.
   */
  const handleLeadClick = (destUrl, platformName) => {
    const affiliateId = "157106";
    let finalUrl = `https://partner.bybit.com/b/${affiliateId}`;

    // If we have a specific page (like a trader profile), we wrap it in dest_url
    if (destUrl) {
        finalUrl += `?dest_url=${encodeURIComponent(destUrl)}`;
    }

    // Track event in Google Analytics
    if (window.gtag) {
      window.gtag('event', 'generate_lead', {
        'platform': platformName,
        'currency': 'USD',
        'value': 1.0
      });
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
            <span style={styles.pulseDot}></span> {usersOnline} active traders online
          </div>
          <div style={{ marginTop: "40px" }}>
            <button
              style={styles.primaryBtn}
              onClick={() => handleLeadClick("https://www.bybit.com/en/promo/global/rewards-hub", "Hero_Main_Button")}
            >
              CLAIM $100 BONUS ON BYBIT
            </button>
          </div>
        </div>
      </div>

      {/* TRADER SECTION: LIVE COPY TRADING DATA */}
      <div style={styles.traderSection}>
          <div className="container" style={{ maxWidth: "1000px", margin: "0 auto" }}>
              <h3 style={{ fontWeight: "800", marginBottom: "30px", fontSize: "24px" }}>🔥 Top Performing Master Traders</h3>
              <div style={styles.traderGrid}>
                  {traders.slice(0, 3).map((trader, idx) => (
                      <div key={idx} style={styles.traderCard}>
                          <div style={{...styles.traderIcon, background: trader.color || "#000"}}>{trader.nickname[0]}</div>
                          <h4 style={{ fontWeight: "700", margin: "10px 0" }}>{trader.nickname}</h4>
                          <div style={styles.statsRow}>
                              <div>
                                  <p style={styles.statLabel}>ROI (30d)</p>
                                  <p style={styles.statValueGreen}>+{trader.roi}%</p>
                              </div>
                              <div style={{ textAlign: "right" }}>
                                  <p style={styles.statLabel}>Drawdown</p>
                                  <p style={{ fontWeight: "700", color: "#333" }}>{trader.maxDrawdown}%</p>
                              </div>
                          </div>
                          <button 
                            style={styles.copyBtn}
                            onClick={() => handleLeadClick(`https://www.bybit.com/copyTrading/trade-center/detail?leaderMark=${trader.leaderMark}`, `Copy-${trader.nickname}`)}
                          >
                            COPY STRATEGY
                          </button>
                      </div>
                  ))}
              </div>
              <p style={{ marginTop: "25px", fontSize: "13px", color: "#666" }}>
                Click any trader to see their <b>Full Live Performance</b> on the Bybit Leaderboard.
              </p>
          </div>
      </div>

      {/* REWARD GUIDE SECTION */}
      <div style={styles.rewardSection}>
          <h3 style={{ fontWeight: "800", color: "#000", marginBottom: "20px" }}>Step-by-Step Reward Guide</h3>
          <div style={styles.guideContent}>
              <p><strong>1. Register:</strong> Sign up through the official link above.</p>
              <p><strong>2. Identity:</strong> Complete quick ID verification (KYC) in the Bybit app.</p>
              <p><strong>3. Claim:</strong> Visit the <b>"Rewards Hub"</b> to instantly unlock your signup vouchers.</p>
          </div>
      </div>

      {/* SUPPORT SECTION */}
      <div className="text-center" style={{ padding: "60px 20px", background: "#fff" }}>
         <h3 style={{ fontWeight: "800" }}>💬 Need Assistance?</h3>
         <p style={{ color: "#666", fontSize: "15px", marginBottom: "25px" }}>Message our support team for step-by-step guidance.</p>
         <button 
            style={styles.telegramBtn}
            onClick={() => {
                if (window.gtag) { window.gtag('event', 'click_support', { 'platform': 'Telegram' }); }
                window.open("https://telegram.me/bitcoinblockchain501", "_blank");
            }}
         >
           Message Support Now
         </button>
      </div>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <p style={{ fontSize: "14px", fontWeight: "600", marginBottom: "10px" }}>Official Bybit Partner | SSL Secured</p>
        <p style={styles.disclaimer}>
          Risk Warning: Crypto trading involves high risk. Bonuses and vouchers are subject to platform terms and conditions.
        </p>
      </footer>

      {/* FLOATING ACTION BUTTON (MOBILE) */}
      <div style={styles.floatingContainer}>
        <button
          style={styles.floatingBtn}
          onClick={() => handleLeadClick("https://www.bybit.com/en/promo/global/rewards-hub", "Floating_Mobile_Button")}
        >
          🔥 CLAIM YOUR $100 BONUS
        </button>
      </div>

      {/* Notification popup */}
      {recentUser && <div style={styles.recentNotify}>{recentUser}</div>}
    </div>
  );
};

/* ================= BEAUTIFUL STYLES ================= */

const styles = {
  mainWrapper: { backgroundColor: "#fff", color: "#333", fontFamily: "'Inter', sans-serif" },
  brandLink: { display: "flex", alignItems: "center", textDecoration: "none" },
  logoCircle: {
    background: "#f3ba2f", color: "#000",
    width: "36px", height: "36px",
    display: "flex", alignItems: "center", justifyContent: "center",
    borderRadius: "50%", fontWeight: "900", fontSize: "14px"
  },
  brandText: { marginLeft: "10px", fontWeight: "800", fontSize: "17px", letterSpacing: "0.5px" },
  mainTitle: { fontWeight: "900", fontSize: "36px", color: "#000", lineHeight: "1.2" },
  subTitle: { color: "#b45309", marginTop: "15px", fontWeight: "700", fontSize: "22px" },
  statusBadge: { 
    display: "inline-flex", alignItems: "center", background: "#f0fdf4", 
    padding: "6px 15px", borderRadius: "20px", color: "#16a34a", 
    fontWeight: "700", marginTop: "20px", fontSize: "14px" 
  },
  pulseDot: { height: "8px", width: "8px", backgroundColor: "#16a34a", borderRadius: "50%", marginRight: "8px" },
  primaryBtn: {
    background: "#000", color: "#fff",
    padding: "20px 40px", fontSize: "18px", fontWeight: "800",
    borderRadius: "8px", border: "none", cursor: "pointer",
    width: "100%", maxWidth: "400px"
  },
  traderSection: { padding: "60px 20px", background: "#f9fafb", textAlign: "center", borderTop: "1px solid #eee" },
  traderGrid: { display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" },
  traderCard: { 
    background: "#fff", padding: "20px", borderRadius: "12px", width: "280px", 
    boxShadow: "0 4px 15px rgba(0,0,0,0.05)", border: "1px solid #eee" 
  },
  traderIcon: { width: "50px", height: "50px", borderRadius: "50%", color: "#fff", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "20px" },
  statsRow: { display: "flex", justifyContent: "space-between", margin: "20px 0", textAlign: "left" },
  statLabel: { fontSize: "11px", color: "#888", margin: 0 },
  statValueGreen: { color: "#10b981", fontWeight: "800", fontSize: "18px", margin: 0 },
  copyBtn: { width: "100%", padding: "12px", background: "#f3ba2f", color: "#000", borderRadius: "6px", fontWeight: "800", border: "none", cursor: "pointer" },

  rewardSection: {
      background: "#fff", border: "1px solid #eee",
      borderRadius: "12px", margin: "40px auto",
      padding: "30px", maxWidth: "500px", textAlign: "center"
  },
  guideContent: { textAlign: "left", fontSize: "15px", lineHeight: "1.8", color: "#444" },
  telegramBtn: {
    background: "#0088cc", color: "#fff",
    padding: "16px 40px", borderRadius: "8px",
    border: "none", fontWeight: "700", cursor: "pointer"
  },
  footer: { background: "#0b0e11", color: "#9ca3af", padding: "60px 20px", textAlign: "center", marginBottom: "80px" },
  disclaimer: { fontSize: "11px", lineHeight: "1.6", maxWidth: "600px", margin: "0 auto", opacity: 0.7 },
  floatingContainer: { position: "fixed", bottom: "20px", left: "50%", transform: "translateX(-50%)", width: "90%", zIndex: 3000, maxWidth: "500px" },
  floatingBtn: {
    width: "100%", background: "#16a34a", color: "#fff",
    padding: "18px", borderRadius: "10px", border: "none",
    fontWeight: "800", fontSize: "17px", boxShadow: "0 10px 25px rgba(22, 163, 74, 0.3)"
  },
  recentNotify: {
    position: "fixed", bottom: "110px", right: "20px",
    background: "#fff", color: "#333",
    padding: "15px 25px", borderRadius: "12px",
    fontSize: "13px", fontWeight: "600", zIndex: "3000",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)", borderLeft: "5px solid #f3ba2f"
  }
};

export default HomePage;
