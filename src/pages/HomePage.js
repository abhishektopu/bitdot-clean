import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { Link } from "react-router-dom";

// Components
import Header from "../components/Header/Header.js";
import HeaderLinks from "../components/Header/HeaderLinks.js";

function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Crypto Lakeside - Premium Trading";
  }, []);
  return null;
}

const HomePage = (props) => {
  useEffect(() => {
    if (window.fbq) { fbq('track', 'PageView'); }
  }, []);

  const handleLeadClick = (url) => {
    if (window.fbq) { fbq('track', 'Lead'); }
    setTimeout(() => { window.open(url, "_blank"); }, 150); 
  };

  const [showPopup, setShowPopup] = useState(false);
  const [usersOnline, setUsersOnline] = useState(146);
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

      {/* HEADER - FIXED LOGO VISIBILITY */}
      <Header
        color="white"
        brand={
          <a href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <div style={styles.logoCircle}>CL</div>
            <div style={styles.brandText}>
                {/* Changed color to #000 so "CRYPTO" is visible on white background */}
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

          {/* PRIMARY OFFER (Bybit) */}
          <div style={{ marginTop: "30px" }}>
            <button
              style={styles.primaryBtn}
              onClick={() => handleLeadClick("https://partner.bybit.com/b/157106")}
            >
              🚀 CLAIM $100 BONUS & START
            </button>
            <p style={{ color: "#dc2626", fontWeight: "700", marginTop: "12px", fontSize: "14px" }}>
              🔥 Limited Time Offer for Indian Users
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

      {/* SECONDARY OFFER (Binance) - Now more visible but clearly secondary */}
      <div className="text-center" style={{ padding: "30px 20px", background: "#f8f9fa" }}>
          <p style={{ fontSize: "14px", color: "#666", marginBottom: "10px" }}>Prefer Binance? Use the link below:</p>
          <button 
            style={styles.binanceBtn}
            onClick={() => handleLeadClick("https://www.binance.com/activity/referral-entry/CPA?ref=CPA_00M4SS7Z7U")}
          >
            Join via Binance Account
          </button>
          <p style={{ fontSize: "11px", color: "#999", marginTop: "5px" }}>Referral ID: CPA_00M4SS7Z7U</p>
      </div>

      {/* TELEGRAM SUPPORT */}
      <div className="text-center" style={{ padding: "35px 20px" }}>
         <h3 style={{ fontWeight: "800" }}>💬 Need Assistance?</h3>
         <button 
            style={styles.telegramBtn}
            onClick={() => window.location.href = "https://telegram.me/bitcoinblockchain501"}
         >
           Message Support Now
         </button>
      </div>

      {/* FOOTER */}
      <div style={{ background: "#0b0e11", color: "#fff", padding: "50px 20px", textAlign: "center", marginBottom: "80px" }}>
        <p style={{ fontSize: "12px", opacity: 0.5 }}>
          Risk Warning: Trading involves risk. Crypto Lakeside is a verified affiliate partner.
        </p>
      </div>

      {/* FLOATING MOBILE BUTTON */}
      <div style={styles.floating}>
        <button
          style={styles.floatingBtn}
          onClick={() => handleLeadClick("https://partner.bybit.com/b/157106")}
        >
          🔥 CLAIM YOUR $100 BONUS NOW
        </button>
      </div>

      {recentUser && <div style={styles.recent}>{recentUser}</div>}
      {showPopup && <div style={styles.popup}>🔥 Hurry! 4 bonus slots remaining</div>}
    </div>
  );
};

/* ================= STYLES ================= */

const styles = {
  logoCircle: {
    background: "linear-gradient(145deg, #f3ba2f, #d9a31b)",
    color: "#000",
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    fontWeight: "900",
    boxShadow: "0 4px 10px rgba(243, 186, 47, 0.4)"
  },
  brandText: {
    marginLeft: "10px",
    fontWeight: "900",
    fontSize: "18px",
    letterSpacing: "1px"
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
    width: "100%",
    maxWidth: "380px",
    boxShadow: "0 10px 25px rgba(0, 200, 83, 0.3)"
  },
  binanceBtn: {
    background: "#f3ba2f",
    color: "#000",
    padding: "10px 25px",
    borderRadius: "5px",
    border: "none",
    fontWeight: "700",
    cursor: "pointer",
    fontSize: "14px"
  },
  countdownBox: {
    marginTop: "25px", 
    padding: "15px", 
    background: "#fff", 
    borderRadius: "15px", 
    border: "2px solid #ff4d4f",
    display: "inline-block",
    width: "100%",
    maxWidth: "350px"
  },
  telegramBtn: {
    background: "#0088cc",
    color: "#fff",
    padding: "15px 35px",
    borderRadius: "50px",
    border: "none",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 4px 15px rgba(0, 136, 204, 0.3)"
  },
  floating: {
    position: "fixed",
    bottom: "20px",
    left: "50%",
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
    padding: "10px 25px", borderRadius: "50px",
    fontSize: "12px", fontWeight: "bold", zIndex: "2000"
  },
  recent: {
    position: "fixed", top: "90px", right: "20px",
    background: "rgba(255,255,255,0.95)", color: "#333",
    padding: "10px 15px", borderRadius: "10px",
    fontSize: "12px", fontWeight: "600", zIndex: "3000",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)", borderLeft: "4px solid #f3ba2f"
  }
};

export default HomePage;
