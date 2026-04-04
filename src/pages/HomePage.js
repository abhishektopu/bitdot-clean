import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { Link } from "react-router-dom";

// Components
import Header from "../components/Header/Header.js";
import HeaderLinks from "../components/Header/HeaderLinks.js";

function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Crypto Lakeside - Premium Trading Rewards";
  }, []);
  return null;
}

const HomePage = (props) => {
  useEffect(() => {
    if (window.fbq) { fbq('track', 'PageView'); }
  }, []);

  const handleLeadClick = (url) => {
    if (window.fbq) { fbq('track', 'Lead'); }
    // Faster redirect for better user experience
    setTimeout(() => { window.open(url, "_blank"); }, 100); 
  };

  const [showPopup, setShowPopup] = useState(false);
  const [usersOnline, setUsersOnline] = useState(148);
  const [recentUser, setRecentUser] = useState("");
  const names = ["Rahul", "Amit", "Priya", "Kiran", "Sneha", "Vikram", "Anjali"];

  useEffect(() => {
    const interval = setInterval(() => {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 4000);
    }, 22000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setUsersOnline((prev) => prev + Math.floor(Math.random() * 2));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const random = names[Math.floor(Math.random() * names.length)];
      setRecentUser(`${random} just claimed $100 bonus! 🎉`);
      setTimeout(() => setRecentUser(""), 4000);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page_wrap" style={{ backgroundColor: "#fff", color: "#333", fontFamily: "'Inter', sans-serif" }}>
      <ScrollToTopOnMount />

      {/* HEADER - BRANDING FIXED */}
      <Header
        color="white"
        brand={
          <a href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
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
      <div className="hero_section text-center" style={{ padding: "110px 20px 20px 20px" }}>
        <div className="container">
          <h1 style={{ fontWeight: "900", fontSize: "34px", letterSpacing: "-1px", color: "#000" }}>
            Start Crypto Trading <br/> in 5 Minutes 🚀
          </h1>

          <h2 style={{ color: "#d97706", marginTop: "15px", fontWeight: "800", fontSize: "26px" }}>
            🎁 Get $100+ Bonus on Signup
          </h2>

          <p style={{ color: "#16a34a", fontWeight: "700", marginTop: "10px" }}>
            <span style={styles.pulseDot}></span> {usersOnline} traders active now
          </p>

          {/* PRIMARY BUTTON (BYBIT) */}
          <div style={{ marginTop: "30px" }}>
            <button
              style={styles.primaryBtn}
              onClick={() => handleLeadClick("https://partner.bybit.com/b/157106")}
            >
              🚀 CLAIM $100 BONUS & START
            </button>
            <p style={{ color: "#dc2626", fontWeight: "700", marginTop: "12px", fontSize: "14px" }}>
              🔥 Limited Time Offer for New Accounts
            </p>
          </div>

          <div style={styles.countdownBox}>
            <span style={{ fontWeight: "700" }}>⏳ OFFER EXPIRES: </span>
            <span style={{ color: "#ff4d4f", fontWeight: "800", fontSize: "20px" }}>
              <Countdown date={Date.now() + 86400000} />
            </span>
          </div>
        </div>
      </div>

      {/* REWARD GUIDE SECTION - (Satisfies "Auliaa" & Scammers request) */}
      <div style={styles.rewardCard}>
          <h3 style={{ fontWeight: "800", color: "#000", marginBottom: "15px" }}>⭐ How to Claim Instant Rewards</h3>
          <div style={{ textAlign: "left", fontSize: "14px", lineHeight: "1.8" }}>
              <p><strong>1. Register:</strong> Sign up using the official buttons below.</p>
              <p><strong>2. Identity:</strong> Complete a quick ID verification (KYC).</p>
              <p><strong>3. Claim:</strong> Visit the <b>"Rewards Hub"</b> in the app to unlock your $100 - $600 welcome vouchers instantly.</p>
          </div>
      </div>

      {/* SECONDARY BUTTON (BINANCE) */}
      <div className="text-center" style={{ padding: "30px 20px", background: "#f8f9fa" }}>
          <p style={{ fontSize: "14px", color: "#666", marginBottom: "15px" }}>Prefer using Binance?</p>
          <button 
            style={styles.binanceBtn}
            onClick={() => handleLeadClick("https://www.binance.com/activity/referral-entry/CPA?ref=CPA_00M4SS7Z7U")}
          >
            Join via Binance Account
          </button>
          <p style={{ fontSize: "11px", color: "#999", marginTop: "8px" }}>Official Referral ID: <b>CPA_00M4SS7Z7U</b></p>
      </div>

      {/* TELEGRAM SUPPORT - COMPATIBILITY LINK */}
      <div className="text-center" style={{ padding: "35px 20px" }}>
         <h3 style={{ fontWeight: "800" }}>💬 Need Assistance?</h3>
         <p style={{ color: "#555", fontSize: "14px" }}>Our team is online to guide you step-by-step.</p>
         <button 
            style={styles.telegramBtn}
            onClick={() => window.location.href = "https://telegram.me/bitcoinblockchain501"}
         >
           Message Support Now
         </button>
      </div>

      {/* TRUST FOOTER */}
      <div style={{ background: "#0b0e11", color: "#fff", padding: "50px 20px", textAlign: "center", marginBottom: "80px" }}>
        <p style={{ fontSize: "14px", fontWeight: "600" }}>✅ Verified Global Partner | 🔒 SSL Secured</p>
        <p style={{ fontSize: "11px", marginTop: "20px", opacity: 0.5, maxWidth: "600px", margin: "0 auto" }}>
          Risk Disclaimer: Trading crypto involves high risk. Ensure you complete KYC to unlock bonus vouchers.
        </p>
      </div>

      {/* FLOATING MOBILE BUTTON */}
      <div style={styles.floating}>
        <button
          style={styles.floatingBtn}
          onClick={() => handleLeadClick("https://partner.bybit.com/b/157106")}
        >
          🔥 CLAIM $100 BONUS NOW
        </button>
      </div>

      {/* NOTIFICATIONS */}
      {recentUser && <div style={styles.recent}>{recentUser}</div>}
      {showPopup && <div style={styles.popup}>🔥 Only 4 bonus slots left!</div>}
    </div>
  );
};

/* ================= BEAUTIFUL STYLES ================= */

const styles = {
  logoCircle: {
    background: "linear-gradient(145deg, #f3ba2f, #d9a31b)",
    color: "#000",
    width: "40px", height: "40px",
    display: "flex", alignItems: "center", justifyContent: "center",
    borderRadius: "50%", fontWeight: "900",
    boxShadow: "0 4px 10px rgba(243, 186, 47, 0.4)"
  },
  brandText: {
    marginLeft: "10px",
    fontWeight: "900",
    fontSize: "18px",
    letterSpacing: "0.5px"
  },
  primaryBtn: {
    background: "linear-gradient(45deg, #00c853, #64dd17)",
    color: "#fff",
    padding: "20px 30px",
    fontSize: "18px",
    fontWeight: "800",
    borderRadius: "50px",
    border: "none",
    cursor: "pointer",
    width: "100%", maxWidth: "380px",
    boxShadow: "0 10px 25px rgba(0, 200, 83, 0.3)"
  },
  binanceBtn: {
    background: "#f3ba2f",
    color: "#000",
    padding: "12px 30px",
    borderRadius: "8px",
    border: "none",
    fontWeight: "700",
    cursor: "pointer",
    fontSize: "15px",
    boxShadow: "0 4px 10px rgba(243, 186, 47, 0.2)"
  },
  rewardCard: {
      background: "#fff",
      border: "2px solid #f3ba2f",
      borderRadius: "15px",
      margin: "20px auto",
      padding: "20px",
      maxWidth: "350px",
      boxShadow: "0 5px 15px rgba(0,0,0,0.05)"
  },
  countdownBox: {
    marginTop: "25px", 
    padding: "15px", 
    background: "#fff", 
    borderRadius: "15px", 
    border: "2px solid #ff4d4f",
    display: "inline-block",
    width: "100%", maxWidth: "350px"
  },
  telegramBtn: {
    background: "#0088cc",
    color: "#fff",
    padding: "16px 35px",
    borderRadius: "50px",
    border: "none",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 4px 15px rgba(0, 136, 204, 0.3)"
  },
  floating: {
    position: "fixed",
    bottom: "20px", left: "50%",
    transform: "translateX(-50%)",
    width: "92%",
    zIndex: 3000
  },
  floatingBtn: {
    width: "100%",
    background: "linear-gradient(45deg, #ff416c, #ff4b2b)",
    color: "#fff",
    padding: "18px",
    borderRadius: "50px",
    border: "none",
    fontWeight: "800",
    fontSize: "16px",
    boxShadow: "0 8px 25px rgba(255, 65, 108, 0.4)"
  },
  pulseDot: {
    height: "10px", width: "10px",
    backgroundColor: "#16a34a",
    borderRadius: "50%",
    display: "inline-block",
    marginRight: "5px",
    boxShadow: "0 0 8px #16a34a"
  },
  popup: {
    position: "fixed", bottom: "110px", left: "50%",
    transform: "translateX(-50%)",
    background: "#000", color: "#fff",
    padding: "12px 25px", borderRadius: "50px",
    fontSize: "12px", fontWeight: "bold", zIndex: "2000"
  },
  recent: {
    position: "fixed", top: "90px", right: "20px",
    background: "rgba(255,255,255,0.95)", color: "#333",
    padding: "12px 20px", borderRadius: "10px",
    fontSize: "12px", fontWeight: "600", zIndex: "3000",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)", borderLeft: "4px solid #f3ba2f"
  }
};

export default HomePage;
