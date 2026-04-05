import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";

// Components
import Header from "../components/Header/Header.js";
import HeaderLinks from "../components/Header/HeaderLinks.js";

const HomePage = (props) => {
  const [usersOnline, setUsersOnline] = useState(148);
  const [recentUser, setRecentUser] = useState("");
  const names = ["Rahul", "Amit", "Priya", "Kiran", "Sneha", "Vikram", "Anjali"];

  // 1. GATEWAY DATA: These are the traders from your screenshots.
  // When clicked, they go directly to the Bybit Copy Trading Leaderboard.
  const featuredTraders = [
    { name: "Rubedo Engine", roi: "+81.28%", drawdown: "0.23%", color: "#f3ba2f" },
    { name: "caleon8", roi: "+52.08%", drawdown: "0.00%", color: "#000" },
    { name: "Liafe", roi: "+48.57%", drawdown: "4.32%", color: "#0088cc" }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Crypto Lakeside - Official Rewards";
    
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: 'Home - Crypto Lakeside',
        page_location: window.location.href
      });
    }

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

  const handleLeadClick = (url, platformName) => {
    if (window.gtag) {
      window.gtag('event', 'generate_lead', {
        'event_category': 'Affiliate Link',
        'event_label': platformName,
        'value': 1.0
      });
    }
    window.open(url, "_blank");
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
              onClick={() => handleLeadClick("https://partner.bybit.com/b/157106", "Bybit Hero")}
            >
              CLAIM $100 BONUS ON BYBIT
            </button>
          </div>
        </div>
      </div>

      {/* 2. NEW GATEWAY SECTION: FEATURED TRADERS */}
      <div style={styles.traderSection}>
          <div className="container" style={{ maxWidth: "1000px", margin: "0 auto" }}>
              <h3 style={{ fontWeight: "800", marginBottom: "30px", fontSize: "24px" }}>🔥 Top Performing Master Traders</h3>
              <div style={styles.traderGrid}>
                  {featuredTraders.map((trader, idx) => (
                      <div key={idx} style={styles.traderCard}>
                          <div style={{...styles.traderIcon, background: trader.color}}>{trader.name[0]}</div>
                          <h4 style={{ fontWeight: "700", margin: "10px 0" }}>{trader.name}</h4>
                          <div style={styles.statsRow}>
                              <div>
                                  <p style={styles.statLabel}>ROI (30d)</p>
                                  <p style={styles.statValueGreen}>{trader.roi}</p>
                              </div>
                              <div style={{ textAlign: "right" }}>
                                  <p style={styles.statLabel}>Drawdown</p>
                                  <p style={{ fontWeight: "700", color: "#333" }}>{trader.drawdown}</p>
                              </div>
                          </div>
                          <button 
                            style={styles.copyBtn}
                            onClick={() => handleLeadClick("https://www.bybit.com/copyTrading?ref=157106", `Copy-${trader.name}`)}
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
              <p><strong>2. Identity:</strong> Complete quick ID verification (KYC) in the app.</p>
              <p><strong>3. Claim:</strong> Visit the <b>"Rewards Hub"</b> to instantly unlock your signup vouchers.</p>
          </div>
      </div>

      {/* BINANCE OPTION */}
      <div className="text-center" style={{ padding: "40px 20px", background: "#fdfdfd", borderTop: "1px solid #eee" }}>
          <p style={{ fontSize: "14px", color: "#666", marginBottom: "15px" }}>Preferred Exchange: Binance</p>
          <button 
            style={styles.binanceBtn}
            onClick={() => handleLeadClick("https://www.binance.com/activity/referral-entry/CPA?ref=CPA_00M4SS7Z7U", "Binance Alt")}
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
            onClick={() => {
                if (window.gtag) { window.gtag('event', 'click_support', { 'platform': 'Telegram' }); }
                window.location.href = "https://telegram.me/bitcoinblockchain501";
            }}
         >
           Message Support Now
         </button>
      </div>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <p style={{ fontSize: "14px", fontWeight: "600", marginBottom: "10px" }}>Official Global Partner | SSL Secured</p>
        <p style={styles.disclaimer}>
          Risk Warning: Crypto trading involves high risk. Bonuses and vouchers are subject to platform terms and conditions.
        </p>
      </footer>

      {/* FLOATING ACTION BUTTON */}
      <div style={styles.floatingContainer}>
        <button
          style={styles.floatingBtn}
          onClick={() => handleLeadClick("https://partner.bybit.com/b/157106", "Bybit Floating")}
        >
          🔥 CLAIM YOUR $100 BONUS
        </button>
      </div>

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
  // NEW STYLES FOR TRADER SECTION
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
  copyBtn: { width: "100%", padding: "12px", background: "#000", color: "#fff", borderRadius: "6px", fontWeight: "700", border: "none", cursor: "pointer" },

  rewardSection: {
      background: "#fff", border: "1px solid #eee",
      borderRadius: "12px", margin: "40px auto",
      padding: "30px", maxWidth: "500px", textAlign: "center"
  },
  guideContent: { textAlign: "left", fontSize: "15px", lineHeight: "1.8", color: "#444" },
  binanceBtn: {
    background: "#f3ba2f", color: "#000",
    padding: "12px 35px", borderRadius: "6px",
    border: "none", fontWeight: "700", cursor: "pointer", fontSize: "15px"
  },
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
