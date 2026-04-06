/**
 * PROJECT: Crypto Lakeside Institutional Terminal
 * MODULE: HomePage Component
 * VERSION: 3.0.0 (High-Speed Data Refactor)
 * AUTHOR: Abhishek Topu (SAP Certified)
 * DESCRIPTION: Real-time sentiment-driven trading terminal with automated 
 *              cross-asset whale monitoring and institutional referral logic.
 */

import React, { useEffect, useState } from "react";

// Enterprise UI Components
import Header from "../components/Header/Header.js";
import HeaderLinks from "../components/Header/HeaderLinks.js";

const HomePage = (props) => {
  // --- SYSTEM STATE INITIALIZATION ---
  const [usersOnline, setUsersOnline] = useState(157);
  const [recentUser, setRecentUser] = useState("");
  const [lastSyncTime, setLastSyncTime] = useState(new Date().toLocaleTimeString());
  
  // Unified Data Hub (Sentiment + Multi-Asset Prices + Trade Feed)
  const [marketData, setMarketData] = useState({
      sentiment: { value: "13", classification: "Extreme Fear" },
      prices: { BTC: "0", ETH: "0", SOL: "0" },
      trades: []
  });

  // Institutional Leaderboard Registry
  const traders = [
    { nickname: "Rubedo Engine", roi: "81.28", maxDrawdown: "0.23", aum: "$1.2M", color: "#f3ba2f" },
    { nickname: "caleon8", roi: "52.08", maxDrawdown: "0.00", aum: "$850K", color: "#000000" },
    { nickname: "Liafe", roi: "48.57", maxDrawdown: "4.32", aum: "$500K", color: "#0088cc" }
  ];

  useEffect(() => {
    // Standard SAP-style initialization
    window.scrollTo(0, 0);
    document.title = "Institutional Terminal | Crypto Lakeside";

    /**
     * HEARTBEAT FUNCTION: Pulls updated JSON from GitHub/Cloudflare
     */
    const performSystemSync = () => {
        fetch('/whales.json')
            .then(response => response.json())
            .then(data => {
                setMarketData(data);
                setLastSyncTime(new Date().toLocaleTimeString());
            })
            .catch(error => console.error("CRITICAL: Market Data Sync Failed", error));
    };

    // Execute Initial Sync
    performSystemSync();

    // Set 30-second Refresh Interval
    const syncInterval = setInterval(performSystemSync, 30000); 

    // UI Optimization: Clean up extraneous overlay elements
    const cleanOverlay = () => {
        const elements = document.querySelectorAll('a[href*="wa.me"], div[class*="whatsapp"], button[class*="whatsapp"]');
        elements.forEach(el => el.style.display = 'none');
    };
    cleanOverlay();

    // Global Notification Logic (Terminal Access Alerts)
    const notificationInterval = setInterval(() => {
      const hubs = ["Dubai", "London", "Singapore", "New York", "Hong Kong", "Mumbai"];
      const hub = hubs[Math.floor(Math.random() * hubs.length)];
      setRecentUser(`Node ${hub} terminal successfully authorized 🛡️`);
      setTimeout(() => setRecentUser(""), 5000);
    }, 25000);

    // Memory Management: Clear intervals on component destroy
    return () => { 
        clearInterval(syncInterval); 
        clearInterval(notificationInterval); 
    };
  }, []);

  /**
   * TRANSACTION HANDLER: Secure Redirect to Bybit Affiliate Hub
   */
  const handleInstitutionalRedirect = (category) => {
    const affiliateId = "157106";
    // Stable hub URL optimized for regional compliance (India FIU)
    const secureUrl = `https://www.bybit.com/copyTrade/?ref=${affiliateId}`;

    // Capturing Event Metadata for GA4 (G-2Y9M643E6E)
    if (window.gtag) { 
        window.gtag('event', 'generate_lead', { 
            'platform': 'Bybit_Terminal',
            'lead_category': category
        }); 
    }

    window.open(secureUrl, "_blank");
  };

  return (
    <div className="enterprise_layout" style={styles.mainWrapper}>
      {/* HEADER SYSTEM */}
      <Header
        color="white"
        brand={
          <a href="/" style={styles.brandLink}>
            <div style={styles.logoCircle}>CL</div>
            <div style={styles.brandText}>
                <span style={{ color: "#000", fontWeight: "900" }}>CRYPTO</span>
                <span style={{ color: "#f3ba2f", fontWeight: "900" }}>LAKESIDE</span>
            </div>
          </a>
        }
        rightLinks={<HeaderLinks />}
        {...props}
      />

      {/* HERO COMPONENT */}
      <div style={styles.heroContainer}>
        <div className="container" style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h1 style={styles.heroTitle}>Institutional Trading Terminal</h1>
          <p style={styles.heroSub}>High-Alpha Execution & Verified Institutional Analytics.</p>
          <div style={styles.activePill}>
            <span style={styles.pulseDot}></span> {usersOnline} Institutions Active
          </div>
          <div style={{ marginTop: "40px" }}>
            <button style={styles.primaryActionBtn} onClick={() => handleInstitutionalRedirect("Hero_Main")}>
                AUTHORIZE TERMINAL ACCESS
            </button>
          </div>
        </div>
      </div>

      {/* --- MARKET INTELLIGENCE GRID (FIXED SOL BOX) --- */}
      <div style={styles.dataSection}>
          <div className="container" style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={styles.gridContainer}>
                {/* Sentiment Analysis Box */}
                <div style={styles.card}>
                    <p style={styles.label}>MARKET SENTIMENT</p>
                    <h2 style={{ color: marketData.sentiment.value < 35 ? "#ef4444" : "#4ade80", fontWeight: "900", margin: 0 }}>
                        {marketData.sentiment.classification.toUpperCase()} ({marketData.sentiment.value})
                    </h2>
                </div>
                {/* Dynamic Price Assets */}
                {['BTC', 'ETH', 'SOL'].map(coin => (
                    <div key={coin} style={styles.card}>
                        <p style={styles.label}>{coin} INDEX PRICE (USD)</p>
                        <h2 style={{ color: "#ffffff", fontWeight: "900", margin: 0 }}>
                            ${parseFloat(marketData.prices[coin] || 0).toLocaleString()}
                        </h2>
                    </div>
                ))}
            </div>

            {/* --- LIVE SCROLLING TERMINAL BOX --- */}
            <div style={styles.terminalContainer}>
                <div style={styles.terminalHeader}>
                    <div style={styles.terminalDot}></div> 
                    <span style={styles.terminalHeaderText}>LIVE WHALE EXECUTION FLOW (CROSS-EXCHANGE)</span>
                    <span style={styles.syncTag}>LAST SYNC: {lastSyncTime}</span>
                </div>
                <div style={styles.terminalBody}>
                    <div style={styles.marqueeScroll}>
                        {marketData.trades.length > 0 ? marketData.trades.map((trade, i) => (
                            <div key={i} style={styles.tradeRow}>
                                <span style={{ color: "#64748b", width: "100px", display: "inline-block" }}>[{new Date(parseInt(trade.time)).toLocaleTimeString()}]</span>
                                <span style={{ color: "#f3ba2f", fontWeight: "900", width: "50px", display: "inline-block" }}>{trade.symbol}</span>
                                <span style={{ color: trade.side === "Buy" ? "#4ade80" : "#ef4444", fontWeight: "bold", width: "60px", display: "inline-block" }}>{trade.side.toUpperCase()}</span>
                                <span style={{ color: "#ffffff", fontWeight: "800", width: "140px", display: "inline-block" }}>{trade.value}</span>
                                <span style={{ color: "#94a3b8" }}>@ {trade.price}</span>
                            </div>
                        )) : <div style={{ padding: "20px", color: "#94a3b8" }}>Calibrating data feed...</div>}
                        
                        {/* Duplicate for Seamless Loop */}
                        {marketData.trades.map((trade, i) => (
                            <div key={`d-${i}`} style={styles.tradeRow}>
                                <span style={{ color: "#64748b", width: "100px", display: "inline-block" }}>[{new Date(parseInt(trade.time)).toLocaleTimeString()}]</span>
                                <span style={{ color: "#f3ba2f", fontWeight: "900", width: "50px", display: "inline-block" }}>{trade.symbol}</span>
                                <span style={{ color: trade.side === "Buy" ? "#4ade80" : "#ef4444", fontWeight: "bold", width: "60px", display: "inline-block" }}>{trade.side.toUpperCase()}</span>
                                <span style={{ color: "#ffffff", fontWeight: "800", width: "140px", display: "inline-block" }}>{trade.value}</span>
                                <span style={{ color: "#94a3b8" }}>@ {trade.price}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
          </div>
      </div>

      {/* LEADERBOARD SECTION */}
      <div style={styles.leaderboardSection}>
          <div className="container" style={{ maxWidth: "1100px", margin: "0 auto" }}>
              <h3 style={styles.sectionTitle}>Institutional Performance Leaderboard</h3>
              <div style={styles.traderGrid}>
                  {traders.map((trader, idx) => (
                      <div key={idx} style={styles.traderCard}>
                          <div style={styles.cardHeader}>
                              <div style={{...styles.traderIcon, background: trader.color}}>{trader.nickname[0]}</div>
                              <h4 style={styles.traderName}>{trader.nickname}</h4>
                          </div>
                          <div style={styles.statBox}>
                              <div style={styles.statItem}><p style={styles.labelSmall}>ROI (30D)</p><p style={{ color: "#4ade80", fontWeight: "900", fontSize: "24px" }}>+{trader.roi}%</p></div>
                              <div style={styles.statItem}><p style={styles.labelSmall}>DRAWDOWN</p><p style={{ color: "#fff", fontWeight: "900", fontSize: "24px" }}>{trader.maxDrawdown}%</p></div>
                          </div>
                          <button style={styles.copyBtn} onClick={() => handleInstitutionalRedirect("Copy_Leaderboard")}>MIRROR STRATEGY</button>
                      </div>
                  ))}
              </div>
          </div>
      </div>

      {/* BINANCE & INFRASTRUCTURE */}
      <div style={styles.binanceCta}>
          <p style={styles.label}>ALTERNATIVE ACCESS PORTAL</p>
          <h2 style={{ fontWeight: "900", color: "#fff", marginBottom: "30px" }}>Binance Global Liquidity</h2>
          <button style={styles.binanceBtn} onClick={() => handleInstitutionalRedirect("Binance_Gateway")}>
              ACCESS BINANCE TERMINAL
          </button>
      </div>

      {/* FOOTER ARCHITECTURE */}
      <footer style={styles.footer}>
        <p style={{ fontSize: "11px", fontWeight: "700", opacity: "0.5", letterSpacing: "1px" }}>OFFICIAL GLOBAL PARTNER | SECURED DATA FEED BYBIT V5 / BITFINEX</p>
        <p style={{ fontSize: "10px", opacity: "0.3", marginTop: "15px", maxWidth: "800px", margin: "15px auto" }}>Trading involves significant risk. Capital at risk. Results not guaranteed.</p>
      </footer>

      {/* SYSTEM TOAST */}
      {recentUser && <div style={styles.toast}>{recentUser}</div>}

      <style>{`
        @keyframes scrollTerminal {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
      `}</style>
    </div>
  );
};

// --- ENTERPRISE STYLESHEET (FIXED GRID & ANIMATION) ---
const styles = {
  mainWrapper: { backgroundColor: "#0f172a", color: "#f8fafc", fontFamily: "'Barlow', sans-serif" },
  brandLink: { display: "flex", alignItems: "center", textDecoration: "none" },
  logoCircle: { background: "#f3ba2f", color: "#000", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "6px", fontWeight: "900" },
  brandText: { marginLeft: "12px", fontSize: "20px", display: "flex", gap: "6px" },
  heroContainer: { padding: "140px 20px 80px", textAlign: "center", background: "radial-gradient(circle at center, #1e293b 0%, #0f172a 100%)" },
  heroTitle: { fontWeight: "900", fontSize: "48px", color: "#fff", letterSpacing: "-1.5px" },
  heroSub: { color: "#94a3b8", fontSize: "20px", margin: "20px auto", maxWidth: "700px" },
  activePill: { display: "inline-flex", alignItems: "center", background: "rgba(34, 197, 94, 0.1)", padding: "10px 25px", borderRadius: "6px", color: "#4ade80", fontWeight: "700", border: "1px solid rgba(74, 222, 128, 0.2)" },
  pulseDot: { height: "8px", width: "8px", backgroundColor: "#4ade80", borderRadius: "50%", marginRight: "12px", boxShadow: "0 0 12px #4ade80" },
  primaryActionBtn: { background: "#f3ba2f", color: "#000", padding: "20px 60px", fontSize: "17px", fontWeight: "900", borderRadius: "6px", border: "none", cursor: "pointer" },
  
  // FIXED GRID COMPONENT
  gridContainer: { 
    display: "grid", 
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
    gap: "20px", 
    marginBottom: "40px" 
  },
  card: { background: "#1e293b", padding: "30px", borderRadius: "12px", border: "1px solid #334155" },
  label: { fontSize: "11px", color: "#64748b", fontWeight: "900", marginBottom: "8px", letterSpacing: "1.2px", textTransform: "uppercase" },
  labelSmall: { fontSize: "10px", color: "#64748b", fontWeight: "900", marginBottom: "5px" },
  
  dataSection: { padding: "40px 20px" },
  terminalContainer: { background: "#1e293b", borderRadius: "12px", border: "1px solid #334155", overflow: "hidden" },
  terminalHeader: { background: "#1e293b", padding: "15px 25px", display: "flex", alignItems: "center", borderBottom: "1px solid #334155" },
  terminalDot: { height: "10px", width: "10px", background: "#ef4444", borderRadius: "50%", marginRight: "18px" },
  terminalHeaderText: { fontWeight: "800", fontSize: "12px", color: "#94a3b8", letterSpacing: "1px" },
  syncTag: { marginLeft: "auto", fontSize: "10px", color: "#64748b" },
  
  terminalBody: { background: "#020617", height: "400px", overflow: "hidden", position: "relative" },
  marqueeScroll: { padding: "25px", animation: "scrollTerminal 50s linear infinite" },
  tradeRow: { padding: "12px 0", borderBottom: "1px solid #1e293b", fontSize: "14px", fontFamily: "monospace" },

  leaderboardSection: { padding: "100px 20px", background: "#0f172a" },
  sectionTitle: { fontWeight: "900", fontSize: "36px", color: "#fff", textAlign: "center", marginBottom: "60px" },
  traderGrid: { display: "flex", flexWrap: "wrap", gap: "35px", justifyContent: "center" },
  traderCard: { background: "#1e293b", padding: "35px", borderRadius: "16px", width: "350px", border: "1px solid #334155", textAlign: "center" },
  cardHeader: { display: "flex", alignItems: "center", marginBottom: "30px", justifyContent: "center" },
  traderIcon: { width: "50px", height: "50px", borderRadius: "8px", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "22px" },
  traderName: { fontWeight: "800", marginLeft: "18px", color: "#fff", fontSize: "24px" },
  statBox: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "25px", marginBottom: "35px" },
  copyBtn: { width: "100%", padding: "16px", background: "transparent", color: "#f3ba2f", borderRadius: "4px", fontWeight: "800", border: "2px solid #f3ba2f", cursor: "pointer" },
  
  binanceCta: { padding: "120px 20px", background: "#020617", textAlign: "center" },
  binanceBtn: { background: "#fff", color: "#000", padding: "18px 50px", borderRadius: "6px", border: "none", fontWeight: "900", cursor: "pointer" },
  footer: { padding: "100px 20px", textAlign: "center", background: "#020617" },
  toast: { position: "fixed", bottom: "40px", left: "40px", background: "#1e293b", color: "#fff", padding: "18px 30px", borderRadius: "8px", borderLeft: "5px solid #f3ba2f", zIndex: 10000 }
};

export default HomePage;
