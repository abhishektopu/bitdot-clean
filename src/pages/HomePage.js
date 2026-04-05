import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";

// Components
import Header from "../components/Header/Header.js";
import HeaderLinks from "../components/Header/HeaderLinks.js";

const HomePage = (props) => {
  const [usersOnline, setUsersOnline] = useState(148);
  const [recentUser, setRecentUser] = useState("");
  const names = ["Rahul", "Amit", "Priya", "Kiran", "Sneha", "Vikram", "Anjali"];

  useEffect(() => {
    // 1. Setup Page View and Title
    window.scrollTo(0, 0);
    document.title = "Crypto Lakeside - Official Rewards";
    
    // 2. Track Page View in Analytics
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: 'Home - Crypto Lakeside',
        page_location: window.location.href
      });
    }

    // 3. Realistic Online Users fluctuation
    const onlineTimer = setInterval(() => {
      setUsersOnline((prev) => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 10000);

    // 4. Recent Claims notification
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
    // Track the click in Google Analytics
    if (window.gtag) {
      window.gtag('event', 'generate_lead', {
        'event_category': 'Affiliate Link',
        'event_label': platformName,
        'value': 1.0
      });
    }
    // Open affiliate link in new tab
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
          <h1 style={styles.mainTitle}>
            Start Crypto Trading <br/> and Unlock Rewards 🚀
          </h1>

          <h2 style={styles.subTitle}>
            🎁 New User Bonus: $100 — $600 Vouchers
          </h2>

          <div style={styles.statusBadge}>
            <span style={styles.pulseDot}></span> {usersOnline} active traders online
          </div>

          <div style={{ marginTop: "40px" }}>
            <button
              style={styles.primaryBtn}
              onClick={() => handleLeadClick("https://partner.bybit.com/b/157106", "Bybit Main")}
            >
              CLAIM $100 BONUS ON BYBIT
            </button>
            <p style={styles.urgencyText}>
              ⚠️ Limited Time Offer for New Accounts
            </p>
          </div>

          <div style={styles.countdownBox}>
            <span style={{ fontWeight: "600", fontSize: "14px" }}>OFFER EXPIRES IN: </span>
            <span style={styles.timerNumbers}>
              <Countdown date={Date.now() + 86400000} />
            </span>
          </div>
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

      {/* NOTIFICATIONS */}
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
    width: "100%", maxWidth: "400px", transition: "0.3s"
  },
  urgencyText: { color: "#dc2626", fontWeight: "700", marginTop: "12px", fontSize: "13px" },
  countdownBox: {
    marginTop: "30px", padding: "12px 20px", 
    background: "#fef2f2", borderRadius: "8px", 
    border: "1px solid #fecaca", display: "inline-block"
  },
  timerNumbers: { color: "#ef4444", fontWeight: "800", fontSize: "22px", marginLeft: "10px" },
  rewardSection: {
      background: "#fafafa", border: "1px solid #eee",
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
