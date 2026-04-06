/**
 * PROJECT: Crypto Lakeside Institutional Terminal
 * VERSION: 2.1.0 (Master Build)
 * REFINEMENT: Multi-Asset Data + Sentiment Backbone + Auto-Scroll
 * DEVELOPER: Abhishek Topu (SAP Certified)
 */

import React, { useEffect, useState } from "react";

// Institutional Components
import Header from "../components/Header/Header.js";
import HeaderLinks from "../components/Header/HeaderLinks.js";

const HomePage = (props) => {
  // --- STATE MANAGEMENT ---
  const [usersOnline, setUsersOnline] = useState(157);
  const [recentUser, setRecentUser] = useState("");
  const [lastSync, setLastSync] = useState(new Date().toLocaleTimeString());
  
  // Consolidated Market Intelligence State
  const [marketData, setMarketData] = useState({
      sentiment: { value: "13", classification: "Extreme Fear" },
      prices: { BTC: "0", ETH: "0", SOL: "0" },
      trades: []
  });

  // Institutional Leaderboard Data
  const traders = [
    { 
        nickname: "Rubedo Engine", 
        roi: "81.28", 
        maxDrawdown: "0.23", 
        aum: "$1.2M", 
        color: "#f3ba2f" 
    },
    { 
        nickname: "caleon8", 
        roi: "52.08", 
        maxDrawdown: "0.00", 
        aum: "$850K", 
        color: "#000000" 
    },
    { 
        nickname: "Liafe", 
        roi: "48.57", 
        maxDrawdown: "4.32", 
        aum: "$500K", 
        color: "#0088cc" 
    }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Crypto Lakeside | Institutional Trading Terminal";

    // 1. DATA ACQUISITION LOGIC (Pulls from Python-generated JSON)
    const syncTerminalData = () => {
        fetch('/whales.json')
            .then(res => res.json())
            .then(data => {
                setMarketData(data);
                setLastSync(new Date().toLocaleTimeString());
            })
            .catch(err => console.log("System syncing..."));
    };
    
    // Initial fetch and 30-second heartbeat
    syncTerminalData();
    const interval = setInterval(syncTerminalData, 30000); 

    // 2. UI CLEANUP LOGIC
    const removeExtraneousElements = () => {
        const buttons = document.querySelectorAll('a[href*="wa.me"], div[class*="whatsapp"], button[class*="whatsapp"]');
        buttons.forEach(btn => btn.style.display = 'none');
    };
    removeExtraneousElements();

    // 3. NOTIFICATION LOGIC (VIP CONNECTION ALERTS)
    const notificationTimer = setInterval(() => {
      const cities = ["Dubai", "London", "Singapore", "New York", "Hong Kong", "Zurich"];
      const city = cities[Math.floor(Math.random() * cities.length)];
      setRecentUser("Institutional VIP connected from " + city + " terminal 🛡️");
      setTimeout(() => setRecentUser(""), 5000);
    }, 25000);

    // CLEANUP ON UNMOUNT
    return () => { 
        clearInterval(interval); 
        clearInterval(notificationTimer); 
    };
  }, []);

  // --- BUSINESS LOGIC: REFERRAL REDIRECTS ---
  const handleLeadClick = (platformName) => {
    const myRef = "157106";
    // Using the stable Bybit Hub URL for the Indian market
    const finalUrl = `https://www.bybit.com/copyTrade/?ref=${myRef}`;

    // Capturing lead data for Google Analytics G-2Y9M643E6E
    if (window.gtag) { 
        window.gtag('event', 'generate_lead', { 
            'platform': platformName,
            'event_category': 'Institutional_Redirect'
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
                <span style={{ color: "black", fontWeight: "900" }}>CRYPTO</span>
                <span style={{ color: "#f3ba2f", fontWeight: "900" }}>LAKESIDE</span>
            </div>
          </a>
        }
        rightLinks={<HeaderLinks />}
        {...props}
      />

      {/* --- HERO SECTION --- */}
      <div style={styles.heroSection}>
        <div className="container" style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h1 style={styles.mainTitle}>Institutional Trading Terminal</h1>
          <p style={styles.heroSubText}>
              Mirror Verified Master Traders with Proven Institutional Alpha. 
              Real-time execution monitoring and sentiment-driven analytics.
          </p>
          <div style={styles.statusBadge}>
            <span style={styles.pulseDot}></span> {usersOnline} Institutions Active
          </div>
          <div style={{ marginTop: "40px" }}>
            <button style={styles.primaryBtn} onClick={() => handleLeadClick("Hero_Main")}>
                ENTER BYBIT TERMINAL
            </button>
          </div>
        </div>
      </div>

      {/* --- MARKET INTELLIGENCE DASHBOARD --- */}
      <div style={styles.whaleSection}>
          <div className="container" style={{ maxWidth: "1100px", margin: "0 auto" }}>
            
            {/* Top Stat Bar: Sentiment & Prices */}
            <div style={styles.dashboardGrid}>
                <div style={styles.dashboardCard}>
                    <p style={styles.statLabel}>MARKET SENTIMENT (24H)</p>
                    <h2 style={{ color: marketData.sentiment.value < 40 ? "#ef4444" : "#4ade80", fontWeight: "900", margin: 0 }}>
                        {marketData.sentiment.classification.toUpperCase()} ({marketData.sentiment.value})
                    </h2>
                </div>
                {Object.keys(marketData.prices).map(coin => (
                    <div key={coin} style={styles.dashboardCard}>
                        <p style={styles.statLabel}>{coin} INDEX PRICE (USD)</p>
                        <h2 style={{ color: "#ffffff", fontWeight: "900", margin: 0 }}>
                            ${parseFloat(marketData.prices[coin]).toLocaleString()}
                        </h2>
                    </div>
                ))}
            </div>

            {/* LIVE SCROLLING TERMINAL */}
            <div style={styles.terminalHeader}>
                <div style={styles.terminalDot}></div> 
                <span style={{ fontWeight: "800", fontSize: "12px", color: "#94a3b8", letterSpacing: "1px" }}>
                    LIVE WHALE EXECUTION FLOW (BITFINEX CORE FEED)
                </span>
                <span style={{ marginLeft: "auto", fontSize: "10px", color: "#64748b" }}>
                    LAST SYNC: {lastSync}
                </span>
            </div>
            <div style={styles.terminalBody}>
                <div style={styles.scrollContainer}>
                    {marketData.trades.length > 0 ? marketData.trades.map((trade, i) => (
                        <div key={i} style={styles.whaleRow}>
                            <span style={{ color: "#64748b" }}>[{new Date(parseInt(trade.time)).toLocaleTimeString()}]</span>
                            <span style={{ color: "#f3ba2f", fontWeight: "900", marginLeft: "10px", width: "45px", display: "inline-block" }}>{trade.symbol}</span>
                            <span style={{ color: trade.side === "Buy" ? "#4ade80" : "#ef4444", fontWeight: "bold", marginLeft: "10px", width: "50px", display: "inline-block" }}>{trade.side.toUpperCase()}</span>
                            <span style={{ color: "#ffffff", marginLeft: "10px", fontWeight: "800" }}>{trade.value}</span>
                            <span style={{ color: "#94a3b8", marginLeft: "10px" }}>@ {trade.price}</span>
                        </div>
                    )) : <div style={{ color: "#94a3b8", padding: "20px" }}>Aggregating Global Market Data...</div>}
                    
                    {/* Duplicate set for infinite scroll loop effect */}
                    {marketData.trades.map((trade, i) => (
                        <div key={`dup-${i}`} style={styles.whaleRow}>
                            <span style={{ color: "#64748b" }}>[{new Date(parseInt(trade.time)).toLocaleTimeString()}]</span>
                            <span style={{ color: "#f3ba2f", fontWeight: "900", marginLeft: "10px", width: "45px", display: "inline-block" }}>{trade.symbol}</span>
                            <span style={{ color: trade.side === "Buy" ? "#4ade80" : "#ef4444", fontWeight: "bold", marginLeft: "10px", width: "50px", display: "inline-block" }}>{trade.side.toUpperCase()}</span>
                            <span style={{ color: "#ffffff", marginLeft: "10px", fontWeight: "800" }}>{trade.value}</span>
                            <span style={{ color: "#94a3b8", marginLeft: "10px" }}>@ {trade.price}</span>
                        </div>
                    ))}
                </div>
            </div>
          </div>
      </div>

      {/* --- LEADERBOARD SECTION --- */}
      <div style={styles.traderSection}>
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
                              <div style={styles.statItem}>
                                  <p style={styles.statLabel}>ROI (30D)</p>
                                  <p style={styles.statValueGreen}>+{trader.roi}%</p>
                              </div>
                              <div style={styles.statItem}>
                                  <p style={styles.statLabel}>MAX DRAWDOWN</p>
                                  <p style={styles.statValue}>{trader.maxDrawdown}%</p>
                              </div>
                          </div>
                          <button style={styles.copyBtn} onClick={() => handleLeadClick("Copy-" + trader.nickname)}>
                              MIRROR STRATEGY
                          </button>
                      </div>
                  ))}
              </div>
          </div>
      </div>

      {/* --- TECHNICAL INFRASTRUCTURE --- */}
      <div style={styles.infraSection}>
          <h3 style={{ color: "#f3ba2f", fontWeight: "900", marginBottom: "40px" }}>Technical Specifications</h3>
          <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
              <div style={styles.techSpec}>⚡ &lt; 5ms Latency Response</div>
              <div style={styles.techSpec}>🛡️ Multi-Sig Cold Storage</div>
              <div style={styles.techSpec}>📊 $20B Daily Liquid Aggregation</div>
          </div>
      </div>

      {/* --- CALL TO ACTION SECTION --- */}
      <div style={styles.ctaSection}>
          <p style={styles.statLabel}>ALTERNATIVE GATEWAY</p>
          <h2 style={{ fontWeight: "900", color: "#ffffff", marginBottom: "30px" }}>Secure Access Terminals</h2>
          <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
              <button style={styles.binanceBtn} onClick={() => handleLeadClick("Binance")}>
                  ACCESS BINANCE
              </button>
              <button style={styles.telegramBtn} onClick={() => window.open("https://telegram.me/bitcoinblockchain501", "_blank")}>
                  VIP ONBOARDING
              </button>
          </div>
      </div>

      <footer style={styles.footer}>
        <p style={{ fontSize: "11px", fontWeight: "700", opacity: "0.5", letterSpacing: "1px" }}>
            OFFICIAL GLOBAL PARTNER | SECURED DATA FEED BYBIT V5
        </p>
        <p style={{ fontSize: "10px", opacity: "0.3", marginTop: "15px", maxWidth: "800px", margin: "15px auto" }}>
            Trading involves significant risk. Capital at risk. Past performance is not a reliable indicator of future results. 
            Regulated access may vary by jurisdiction.
        </p>
      </footer>

      {/* --- NOTIFICATION TOAST --- */}
      {recentUser && <div style={styles.recentNotify}>{recentUser}</div>}

      {/* --- DYNAMIC CSS ANIMATIONS --- */}
      <style>{`
        @keyframes scrollTerminal {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
      `}</style>
    </div>
  );
};

// --- STYLING ARCHITECTURE ---
const styles = {
  mainWrapper: { backgroundColor: "#0f172a", color: "#f8fafc", fontFamily: "'Barlow', sans-serif" },
  brandLink: { display: "flex", alignItems: "center", textDecoration: "none" },
  logoCircle: { background: "#f3ba2f", color: "#000", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "6px", fontWeight: "900" },
  brandText: { marginLeft: "12px", fontSize: "20px", display: "flex", gap: "6px" },
  
  heroSection: { padding: "140px 20px 60px", textAlign: "center", background: "radial-gradient(circle at center, #1e293b 0%, #0f172a 100%)" },
  mainTitle: { fontWeight: "900", fontSize: "48px", color: "#fff", letterSpacing: "-1.5px", lineHeight: "1.1" },
  heroSubText: { color: "#94a3b8", fontSize: "20px", margin: "20px auto", maxWidth: "700px", lineHeight: "1.5" },
  
  statusBadge: { display: "inline-flex", alignItems: "center", background: "rgba(34, 197, 94, 0.1)", padding: "10px 25px", borderRadius: "6px", color: "#4ade80", fontWeight: "700", marginTop: "20px", border: "1px solid rgba(74, 222, 128, 0.2)" },
  pulseDot: { height: "8px", width: "8px", backgroundColor: "#4ade80", borderRadius: "50%", marginRight: "12px", boxShadow: "0 0 12px #4ade80" },
  
  primaryBtn: { background: "#f3ba2f", color: "#000", padding: "20px 60px", fontSize: "17px", fontWeight: "900", borderRadius: "6px", border: "none", cursor: "pointer", transition: "transform 0.2s" },
  
  dashboardGrid: { display: "flex", gap: "20px", marginBottom: "30px", flexWrap: "wrap" },
  dashboardCard: { flex: 1, background: "#1e293b", padding: "25px", borderRadius: "12px", border: "1px solid #334155", minWidth: "260px", boxShadow: "0 4px 20px rgba(0,0,0,0.2)" },
  statLabel: { fontSize: "11px", color: "#64748b", fontWeight: "900", marginBottom: "8px", letterSpacing: "1.2px", textTransform: "uppercase" },
  
  whaleSection: { padding: "40px 20px" },
  terminalHeader: { background: "#1e293b", padding: "15px 25px", borderRadius: "10px 10px 0 0", borderBottom: "1px solid #334155", display: "flex", alignItems: "center" },
  terminalDot: { height: "10px", width: "10px", background: "#ef4444", borderRadius: "50%", marginRight: "18px", boxShadow: "0 0 10px #ef4444" },
  
  terminalBody: { background: "#020617", borderRadius: "0 0 10px 10px", border: "1px solid #334155", height: "320px", overflow: "hidden", position: "relative" },
  scrollContainer: { padding: "25px", animation: "scrollTerminal 50s linear infinite" },
  whaleRow: { padding: "12px 0", borderBottom: "1px solid #1e293b", fontSize: "14px", fontFamily: "monospace", letterSpacing: "0.8px" },

  traderSection: { padding: "100px 20px", background: "#0f172a" },
  sectionTitle: { fontWeight: "900", fontSize: "36px", color: "#fff", textAlign: "center", marginBottom: "60px" },
  traderGrid: { display: "flex", flexWrap: "wrap", gap: "35px", justifyContent: "center" },
  traderCard: { background: "#1e293b", padding: "35px", borderRadius: "16px", width: "350px", border: "1px solid #334155", textAlign: "center" },
  cardHeader: { display: "flex", alignItems: "center", marginBottom: "30px", justifyContent: "center" },
  traderIcon: { width: "50px", height: "50px", borderRadius: "8px", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "22px" },
  traderName: { fontWeight: "800", marginLeft: "18px", color: "#fff", fontSize: "24px" },
  
  statBox: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "25px", marginBottom: "35px" },
  statItem: { textAlign: "left" },
  statValueGreen: { color: "#4ade80", fontWeight: "900", fontSize: "26px" },
  statValue: { color: "#fff", fontWeight: "900", fontSize: "26px" },
  copyBtn: { width: "100%", padding: "16px", background: "transparent", color: "#f3ba2f", borderRadius: "6px", fontWeight: "800", border: "2px solid #f3ba2f", cursor: "pointer", fontSize: "15px" },
  
  infraSection: { background: "#020617", padding: "100px 20px", borderTop: "1px solid #1e293b", textAlign: "center" },
  techSpec: { color: "#94a3b8", fontSize: "15px", background: "#1e293b", padding: "18px 35px", borderRadius: "8px", border: "1px solid #334155", fontWeight: "700" },
  
  ctaSection: { padding: "120px 20px", background: "#0f172a", textAlign: "center", borderTop: "1px solid #1e293b" },
  binanceBtn: { background: "#fff", color: "#000", padding: "18px 50px", borderRadius: "6px", border: "none", fontWeight: "900", cursor: "pointer", fontSize: "16px", marginRight: "15px" },
  telegramBtn: { background: "transparent", color: "#fff", padding: "18px 50px", borderRadius: "6px", border: "2px solid #fff", fontWeight: "800", cursor: "pointer", fontSize: "16px" },
  
  footer: { padding: "100px 20px", textAlign: "center", background: "#020617", borderTop: "1px solid #1e293b" },
  recentNotify: { position: "fixed", bottom: "40px", left: "40px", background: "#1e293b", color: "#fff", padding: "18px 30px", borderRadius: "8px", fontSize: "14px", borderLeft: "5px solid #f3ba2f", zIndex: 10000, boxShadow: "0 15px 40px rgba(0,0,0,0.6)" }
};

export default HomePage;
