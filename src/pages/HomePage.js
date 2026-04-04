import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { Link } from "react-router-dom";

// Components
import Header from "../components/Header/Header.js";
import HeaderLinks from "../components/Header/HeaderLinks.js";

function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
    // FIX FOR BROWSER TAB TITLE
    document.title = "Crypto Lakeside - Start Trading";
  }, []);
  return null;
}

const HomePage = (props) => {
  useEffect(() => {
    if (window.fbq) {
      fbq('track', 'PageView');
    }
  }, []);

  const handleLeadClick = (url) => {
    if (window.fbq) {
      fbq('track', 'Lead');
    }
    // REDUCED DELAY FROM 1000ms to 100ms for instant feeling
    setTimeout(() => {
      window.open(url, "_blank");
    }, 100); 
  };

  const [showPopup, setShowPopup] = useState(false);
  const names = ["Rahul", "Amit", "Priya", "Kiran", "Sneha", "Vikram", "Anjali"];
  const [recentUser, setRecentUser] = useState("");
  const [usersOnline, setUsersOnline] = useState(141);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 4000);
    }, 25000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setUsersOnline((prev) => prev + Math.floor(Math.random() * 2));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const random = names[Math.floor(Math.random() * names.length)];
      setRecentUser(`${random} just claimed $100 bonus! 🎉`);
      setTimeout(() => setRecentUser(""), 4000);
    }, 18000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page_wrap" style={{ backgroundColor: "#fff", color: "#333" }}>
      <ScrollToTopOnMount />

      {/* HEADER - LOGO FIX APPLIED HERE */}
      <Header
        color="dark"
        brand={
          <a href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            {/* Removed the <img> tag that showed "BitDot" */}
            <div style={{ 
                background: "#f3ba2f", 
                color: "#000", 
                padding: "5px 10px", 
                borderRadius: "5px", 
                fontWeight: "900", 
                fontSize: "20px" 
            }}>
                CL
            </div>
            <span style={{ marginLeft: "10px", fontWeight: "bold", color: "#fff", fontSize: "18px" }}>
                Crypto Lakeside
            </span>
          </a>
        }
        rightLinks={<HeaderLinks />}
        {...props}
      />

      {/* HERO SECTION */}
      <div className="hero_section text-center" style={{ padding: "100px 20px 20px 20px" }}>
        <div className="container">
          
          <h1 style={{ fontWeight: "800", fontSize: "32px", lineHeight: "1.2", color: "#111" }}>
            Start Crypto Trading <br/> in 5 Minutes 🚀
          </h1>

          <h2 style={{ color: "#d97706", marginTop: "15px", fontWeight: "700", fontSize: "24px" }}>
            🎁 Get $100+ Bonus on Signup
          </h2>

          <p style={{ color: "#16a34a", fontWeight: "700", marginTop: "10px", fontSize: "16px" }}>
            ● {usersOnline} traders active now
          </p>

          <div style={{ marginTop: "25px" }}>
            <button
              style={styles.primaryBtn}
              onClick={() => handleLeadClick("https://partner.bybit.com/b/157106")}
            >
              🚀 CLAIM $100 BONUS & START
            </button>
            <p style={{ color: "#dc2626", fontWeight: "600", marginTop: "10px", fontSize: "13px" }}>
              ⚠️ Limited Spots Available Today
            </p>
          </div>

          <div style={{ marginTop: "20px", padding: "15px", background: "#fff5f5", borderRadius: "10px", border: "1px dashed #ff4d4f" }}>
            <span style={{ fontWeight: "700", color: "#333" }}>⏳ OFFER EXPIRES IN: </span>
            <span style={{ color: "#ff4d4f", fontWeight: "800", fontSize: "18px" }}>
              <Countdown date={Date.now() + 86400000} />
            </span>
          </div>

          <p style={{ color: "#666", fontSize: "13px", marginTop: "15px" }}>
            ⚠️ Crypto involves risk. Start with a small amount.
          </p>
        </div>
      </div>

      {/* TELEGRAM SUPPORT - SPEED FIX APPLIED HERE */}
      <div className="text-center" style={{ padding: "30px 20px", background: "#f0f9ff" }}>
         <h3>💬 Direct Support</h3>
         <p>Questions? Message us on Telegram for instant help.</p>
         <button 
            style={styles.telegramBtn}
            onClick={() => window.location.href = "https://t.me/bitcoinblockchain501"}
         >
           Contact Official Support
         </button>
      </div>

      <div className="container text-center" style={{ padding: "40px 20px" }}>
        <h3 style={{ fontWeight: "800" }}>How to Start</h3>
        <p>1️⃣ Create Account | 2️⃣ Claim Bonus | 3️⃣ Start Trading</p>
        
        <button 
          style={styles.secondaryBtn}
          onClick={() => handleLeadClick("https://www.binance.com/activity/referral-entry/CPA?ref=CPA_00M4SS7Z7U")}
        >
          Join via Binance Account
        </button>
      </div>

      <div style={{ background: "#111", color: "#fff", padding: "40px 20px", textAlign: "center", marginBottom: "80px" }}>
        <p style={{ fontSize: "14px", fontWeight: "600" }}>✅ Official Bybit & Binance Partner</p>
        <p style={{ fontSize: "14px", opacity: 0.8 }}>✔ Secure SSL Encryption | ✔ Trusted by 2000+ Users</p>
      </div>

      {recentUser && <div style={styles.recent}>{recentUser}</div>}
      {showPopup && <div style={styles.popup}>🔥 4 Bonus Slots Left!</div>}

      <div style={styles.floating}>
        <button
          style={styles.floatingBtn}
          onClick={() => handleLeadClick("https://partner.bybit.com/b/157106")}
        >
          🔥 CLAIM YOUR $100 BONUS NOW
        </button>
      </div>
    </div>
  );
};

const styles = {
  primaryBtn: {
    background: "linear-gradient(45deg, #16a34a, #22c55e)",
    color: "#fff",
    padding: "18px 30px",
    fontSize: "18px",
    fontWeight: "800",
    borderRadius: "50px",
    border: "none",
    cursor: "pointer",
    width: "100%",
    maxWidth: "350px"
  },
  secondaryBtn: {
    background: "#f3ba2f",
    color: "#000",
    padding: "12px 18px",
    borderRadius: "8px",
    border: "none",
    fontWeight: "700",
    marginTop: "10px",
    cursor: "pointer"
  },
  telegramBtn: {
    background: "#0088cc",
    color: "#fff",
    padding: "15px 30px",
    borderRadius: "30px",
    border: "none",
    fontWeight: "700",
    cursor: "pointer",
    fontSize: "16px"
  },
  floating: {
    position: "fixed",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "90%",
    zIndex: 3000
  },
  floatingBtn: {
    width: "100%",
    background: "linear-gradient(45deg, #ff4d8d, #ff7a18)",
    color: "#fff",
    padding: "16px",
    borderRadius: "40px",
    border: "none",
    fontWeight: "800",
    fontSize: "16px"
  },
  popup: {
    position: "fixed",
    bottom: "100px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "#dc2626",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "30px",
    fontSize: "12px",
    fontWeight: "bold",
    zIndex: "2000"
  },
  recent: {
    position: "fixed",
    top: "80px",
    right: "20px",
    background: "rgba(0,0,0,0.85)",
    color: "#fff",
    padding: "10px 15px",
    borderRadius: "8px",
    fontSize: "12px",
    zIndex: "3000"
  }
};

export default HomePage;
