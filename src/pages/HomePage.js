import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { Button } from "@material-ui/core";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";

// Components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";

function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}

const HomePage = (props) => {
  const [showPopup, setShowPopup] = useState(false);
  const names = ["Rahul", "Amit", "Priya", "Kiran", "Sneha"];
const [recentUser, setRecentUser] = useState("");
  const [usersOnline, setUsersOnline] = useState(127);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 4000);
    }, 20000);
      return () => clearInterval(interval);
}, []);
    
useEffect(() => {
  const interval = setInterval(() => {
    setUsersOnline((prev) => prev + Math.floor(Math.random() * 3));
  }, 5000);

 return () => clearInterval(interval);
  }, []);
  useEffect(() => {
  const interval = setInterval(() => {
    const random = names[Math.floor(Math.random() * names.length)];
    setRecentUser(`${random} just signed up! 🎉`);
    setTimeout(() => setRecentUser(""), 3000);
  }, 15000);

  return () => clearInterval(interval);
}, []);

  return (
    <div className="page_wrap">
      <ScrollToTopOnMount />

      {/* HEADER */}
  <Header
  color="transparent"
  brand={
    <a href="/" style={{ display: "flex", alignItems: "center" }}>
      <img
        src={logo}
        alt="logo"
        style={{ height: "38px", display: "block" }}
      />
    </a>
  }
  rightLinks={<HeaderLinks />}
  changeColorOnScroll={{
    height: 20,
    color: "dark"
  }}
  {...props}
/>

      {/* HERO SECTION */}
      <div className="hero_section text-center" style={{ padding: "80px 20px" }}>
        <div className="container">

          <h1 style={{ fontWeight: "800", fontSize: "36px" }}>
            Start Crypto Trading in 5 Minutes 🚀
          </h1>
<p style={{ color: "#28a745", fontWeight: "600", marginTop: "5px" }}>
  👥 {usersOnline}+ users are trading now
</p>
          <h2 style={{ color: "#f4b52c", marginTop: "10px" }}>

            🎁 Get $100+ Bonus on Signup
          </h2>

          <p style={{ color: "red", fontSize: "14px", marginTop: "8px" }}>
            ⚠️ Crypto involves risk. Start small & learn first.
          </p>
              <p style={{ fontSize: "13px", color: "#888", marginTop: "10px" }}>
  👇 Click below to start in under 2 minutes
</p>

<div className="text-center my-5">
  <h3>📚 Learn Before You Trade</h3>
  <p>Read our beginner guides and platform reviews.</p>

  <Link to="/blog">
  <button style={styles.secondaryBtn}>
    Read Guides
  </button>
</Link>
</div>
          {/* COUNTDOWN */}
          <div style={{ marginTop: "15px", fontWeight: "700", color: "red" }}>
            ⏳ Bonus expires in:
            <Countdown date={Date.now() + 86400000} />
              <p style={{ color: "#ff4d4f", fontWeight: "600", marginTop: "5px" }}>
  ⚡ Limited-time bonus – don’t miss this!
</p>
    <p style={{ color: "#ff4d4f", fontWeight: "700" }}>
  ⏳ Offer expires today for new users only
</p>
          </div>

          {/* CTA BUTTONS */}
       <div>
  <a href="https://partner.bybit.com/b/157106" target="_blank" rel="noopener noreferrer">
    <button style={styles.primaryBtn}>
      🚀 Start Trading & Earn Daily
    </button>
  </a>

  <p style={{ color: "#ff4d4f", fontWeight: "600", marginTop: "8px" }}>
    ⚡ 87% users start within 2 minutes
  </p>

  <p style={{ color: "#28a745", fontWeight: "700", marginTop: "6px" }}>
    ✅ Verified payouts | Trusted by 2000+ users
  </p>
</div>

            <div style={{ marginTop: "10px" }}>
              <a href="https://www.binance.com/en/register?ref=35886743" target="_blank" rel="noopener noreferrer">
                <button style={styles.secondaryBtn}>
                  Open Binance Account
                </button>
              </a>
            </div>
          </div>

          {/* TRUST */}
          <p style={{ marginTop: "15px", fontSize: "14px" }}>
            ✔ Trusted by Millions | ✔ Secure | ✔ Beginner Friendly
          </p>
              <p style={{ fontSize: "13px", color: "#28a745", fontWeight: "600" }}>
  🔐 100% Secure Signup | No KYC Delay
</p>
              <p style={{ fontSize: "13px", color: "#888" }}>
  🔒 Official Bybit Partner | Instant Signup | No Hidden Fees
   </p>

        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="text-center my-5">
        <h3>How to Start</h3>
        <p>1️⃣ Create a free account</p>
        <p>2️⃣ Deposit small amount ($10–$50)</p>
        <p>3️⃣ Start learning & trading</p>
      </div>

      {/* BENEFITS */}
      <div className="text-center my-5">
        <h3>Why Choose These Platforms?</h3>
        <p>✔ No experience needed</p>
        <p>✔ Start with small investment</p>
        <p>✔ Beginner-friendly tools</p>
        <p>✔ Mobile app available</p>
      </div>

      {/* SOCIAL PROOF */}
      <div className="text-center my-5">
        <h3 style={{ color: "#f4b52c" }}>🔥 2,000+ users joined this week</h3>
      </div>

      {/* FINAL CTA */}
      <div className="text-center my-5">
        <a href="https://partner.bybit.com/b/157106" target="_blank" rel="noopener noreferrer">
          <Button style={styles.ctaBtn}>
            🚀 Start Learning Now
          </Button>
        </a>
      </div>
{recentUser && (
  <div style={styles.recent}>
    🔥 {recentUser} — earning now!
  </div>
)}
      {/* FLOATING BUTTON */}
      <div style={styles.floating}>
        <a href="https://partner.bybit.com/b/157106" target="_blank" rel="noopener noreferrer">
          <button style={styles.floatingBtn}>
          🔥 Claim Your Bonus Now
          </button>
        </a>
      </div>

      {/* POPUP */}
      {showPopup && (
        <div style={styles.popup}>
          🔥 Only few bonus slots left today!
        </div>
      )}
{/* BACK TO HOME */}
<div style={{ textAlign: "center", marginTop: "30px" }}>
  <a href="/" style={{
    display: "inline-block",
    padding: "12px 20px",
    background: "#1f3b4d",
    color: "#fff",
    borderRadius: "30px",
    textDecoration: "none",
    fontWeight: "600"
  }}>
    ⬅ Back to Home
  </a>
</div>


      {/* FOOTER */}
      <p style={styles.footer}>
        Risk Disclaimer: Crypto trading involves risk. Do your own research.
      </p>

    </div>
  );
};

/* ================= STYLES ================= */

const styles = {
  primaryBtn: {
  background: "linear-gradient(45deg, #ff4d8d, #ff7a18)",
  color: "#fff",
  padding: "14px 22px",
  fontSize: "16px",
  fontWeight: "700",
  borderRadius: "30px",
  border: "none",
  cursor: "pointer",
  boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
},
  secondaryBtn: {
    background: "#f3ba2f",
    color: "#000",
    padding: "12px 18px",
    borderRadius: "8px",
    border: "none",
    fontWeight: "600",
    cursor: "pointer"
  },
  ctaBtn: {
    background: "#f4b52c",
    color: "#000",
    fontWeight: "700",
    padding: "12px 20px"
  },
  floating: {
  position: "fixed",
  bottom: "15px",
  left: "50%",
  transform: "translateX(-50%)",
  width: "90%",
  zIndex: "3000"
},
floatingBtn: {
  width: "100%",
  background: "linear-gradient(45deg, #25D366, #1ebe5d)",
  color: "#fff",
  padding: "16px",
  borderRadius: "40px",
  border: "none",
  fontWeight: "800",
  fontSize: "16px",
  cursor: "pointer",
  boxShadow: "0 6px 20px rgba(0,0,0,0.3)"
},
  popup: {
  position: "fixed",
  bottom: "120px",   // 👈 increased spacing
  left: "50%",
  transform: "translateX(-50%)", // 👈 center align
  background: "#000",
  color: "#fff",
  padding: "12px 16px",
  borderRadius: "10px",
  fontSize: "14px",
  zIndex: "2000"
},
recent: {
  position: "fixed",
  bottom: "180px",
  left: "50%",
  transform: "translateX(-50%)",
  background: "linear-gradient(45deg, #000, #222)",
  color: "#fff",
  padding: "12px 16px",
  borderRadius: "10px",
  fontSize: "13px",
  zIndex: "2000",
  boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
  animation: "fadeIn 0.3s ease"
},
  footer: {
    textAlign: "center",
    fontSize: "12px",
    color: "#777",
    marginTop: "20px"
  }
};

export default HomePage;
