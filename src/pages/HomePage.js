import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";

// Components
import Header from "../components/Header/Header.js";
import HeaderLinks from "../components/Header/HeaderLinks.js";

function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}

const HomePage = (props) => {
  useEffect(() => {
    if (window.fbq) {
      const params = new URLSearchParams(window.location.search);
      const testEventCode = params.get('fbp_test_event_code');

      if (testEventCode) {
        fbq('track', 'PageView', {}, {
          eventID: testEventCode
        });
        console.log("✅ Test PageView fired:", testEventCode);
      } else {
        fbq('track', 'PageView');
      }
    }
  }, []);

  const handleLeadClick = (url) => {
    if (window.fbq) {
      const params = new URLSearchParams(window.location.search);
      const testEventCode = params.get('fbp_test_event_code');

      if (testEventCode) {
        fbq('track', 'Lead', {}, { eventID: testEventCode });
      } else {
        fbq('track', 'Lead');
      }
    }
    setTimeout(() => {
      window.open(url, "_blank");
    }, 1000);
  };

  const [showPopup, setShowPopup] = useState(false);
  const names = ["Rahul", "Amit", "Priya", "Kiran", "Sneha", "Vikram", "Anjali"];
  const [recentUser, setRecentUser] = useState("");
  const [usersOnline, setUsersOnline] = useState(128);

  // FOMO: Notification Popup
  useEffect(() => {
    const interval = setInterval(() => {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 4000);
    }, 25000);
    return () => clearInterval(interval);
  }, []);

  // Live Users Counter
  useEffect(() => {
    const interval = setInterval(() => {
      setUsersOnline((prev) => prev + Math.floor(Math.random() * 3));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Recent Signup Alerts
  useEffect(() => {
    const interval = setInterval(() => {
      const random = names[Math.floor(Math.random() * names.length)];
      setRecentUser(`${random} just earned a $100 bonus! 🎉`);
      setTimeout(() => setRecentUser(""), 4000);
    }, 18000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page_wrap" style={{ backgroundColor: "#fff", color: "#333" }}>
      <ScrollToTopOnMount />

      {/* HEADER */}
      <Header
        color="dark"
        brand={
          <a href="/" style={{ display: "flex", alignItems: "center" }}>
            <img
              src={logo}
              alt="Crypto Lakeside Logo"
              style={{ height: "35px", display: "block" }}
            />
            <span style={{ marginLeft: "10px", fontWeight: "bold", color: "#fff", fontSize: "18px" }}>Crypto Lakeside</span>
          </a>
        }
        rightLinks={<HeaderLinks />}
        {...props}
      />

      {/* HERO SECTION */}
      <div className="hero_section text-center" style={{ padding: "100px 20px 40px 20px" }}>
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

          {/* MAIN CTA BUTTON */}
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

          {/* COUNTDOWN */}
          <div style={{ marginTop: "20px", padding: "15px", background: "#fff5f5", borderRadius: "10px", border: "1px dashed #ff4d4f" }}>
            <span style={{ fontWeight: "700", color: "#333" }}>⏳ OFFER EXPIRES IN: </span>
            <span style={{ color: "#ff4d4f", fontWeight: "800", fontSize: "18px" }}>
              <Countdown date={Date.now() + 86400000} />
            </span>
          </div>

          <p style={{ color: "#666", fontSize: "13px", marginTop: "15px", fontStyle: "italic" }}>
            ⚠️ Crypto involves risk. Start with a small amount.
          </p>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="container text-center" style={{ padding: "40px 20px", background: "#f9fafb" }}>
        <h3 style={{ fontWeight: "800" }}>How to Start</h3>
        <div style={{ textAlign: "left", maxWidth: "300px", margin: "0 auto", marginTop: "20px" }}>
          <p><strong>1️⃣ Create Account:</strong> Instant Signup</p>
          <p><strong>2️⃣ Get Bonus:</strong> Claim your trading credits</p>
          <p><strong>3️⃣ Earn:</strong> Start your first trade</p>
        </div>
        
        <button 
          style={styles.secondaryBtn}
          onClick={() => handleLeadClick("https://www.binance.com/activity/referral-entry/CPA?ref=CPA_00M4SS7Z7U")}
        >
          Alternative: Join via Binance
        </button>
      </div>

      {/* TELEGRAM TRUST SECTION */}
      <div className="text-center" style={{ padding: "30px 20px" }}>
         <h3>💬 Need Help?</h3>
         <p>Join our community for daily trading signals.</p>
         <button 
            style={styles.telegramBtn}
            onClick={() => window.open("https://t.me/YOUR_TELEGRAM_LINK", "_blank")}
         >
           Join Official Telegram
         </button>
      </div>

      {/* BLOG / LEARN SECTION - Moved lower to prioritize signups */}
      <div className="text-center" style={{ padding: "40px 20px" }}>
        <h3>📚 New to Crypto?</h3>
        <p>Read our 2024 Beginner's Success Guide.</p>
        <Link to="/blog">
          <button style={{ background: "#eee", color: "#333", border: "none", padding: "10px 20px", borderRadius: "5px" }}>
            Read Free Guides
          </button>
        </Link>
      </div>

      {/* TRUST FOOTER */}
      <div style={{ background: "#111", color: "#fff", padding: "40px 20px", textAlign: "center" }}>
        <p style={{ fontSize: "14px", fontWeight: "600" }}>✅ Official Bybit & Binance Partner</p>
        <p style={{ fontSize: "14px", opacity: 0.8 }}>✔ Secure SSL Encryption | ✔ Trusted by 2000+ Users</p>
        <p style={{ fontSize: "11px", marginTop: "20px", opacity: 0.6 }}>
          Risk Disclaimer: Trading involves significant risk. Crypto Lakeside provides educational links and is not a financial advisor.
        </p>
      </div>

      {/* DYNAMIC COMPONENTS */}
      {recentUser && <div style={styles.recent}>{recentUser}</div>}
      
      {showPopup && (
        <div style={styles.popup}>
          🔥 Only 4 bonus slots left for Indian users!
        </div>
      )}

      {/* FLOATING CTA FOR MOBILE */}
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

/* ================= STYLES ================= */

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
    maxWidth: "350px",
    boxShadow: "0 10px 20px rgba(22, 163, 74, 0.3)"
  },
  secondaryBtn: {
    background: "#f3ba2f",
    color: "#000",
    padding: "12px 18px",
    borderRadius: "8px",
    border: "none",
    fontWeight: "700",
    marginTop: "20px",
    cursor: "pointer"
  },
  telegramBtn: {
    background: "#0088cc",
    color: "#fff",
    padding: "12px 25px",
    borderRadius: "30px",
    border: "none",
    fontWeight: "700",
    cursor: "pointer"
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
    fontSize: "16px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.3)"
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
    zIndex: "2000",
    whiteSpace: "nowrap"
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
    zIndex: "3000",
    animation: "fadeIn 0.5s ease"
  }
};

export default HomePage;
