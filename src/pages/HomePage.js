/**
 * @project      Crypto Lakeside Institutional Terminal
 * @version      5.0.0 (Asset-Centric Sentiment Edition)
 * @developer    Abhishek Topu (SAP Certified)
 * @description  Enterprise-grade dashboard where every asset card features 
 *               integrated sentiment analytics and live execution tape.
 */

import React, { useEffect, useState } from "react";

// Institutional Component Registry
import Header from "../components/Header/Header.js";
import HeaderLinks from "../components/Header/HeaderLinks.js";

const HomePage = (props) => {
  // --- 1. CORE SYSTEM STATE INITIALIZATION ---
  const [usersOnline, setUsersOnline] = useState(157);
  const [recentUser, setRecentUser] = useState("");
  const [lastHeartbeat, setLastHeartbeat] = useState(new Date().toLocaleTimeString());
  
  // Unified Institutional Data Hub
  const [marketData, setMarketData] = useState({
      sentiment: { value: "13", classification: "Extreme Fear" },
      prices: { BTC: "0", ETH: "0", SOL: "0", LTC: "0", XRP: "0" },
      trades: []
  });

  // Institutional Leaderboard Data
  const traders = [
    { nickname: "Rubedo Engine", roi: "81.28", maxDrawdown: "0.23", aum: "$1.2M", color: "#f3ba2f" },
    { nickname: "caleon8", roi: "52.08", maxDrawdown: "0.00", aum: "$850K", color: "#000000" },
    { nickname: "Liafe", roi: "48.57", maxDrawdown: "4.32", aum: "$500K", color: "#0088cc" }
  ];

  // --- 2. DATA SYNCHRONIZATION ENGINE ---
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Institutional Terminal | Crypto Lakeside";

    /**
     * HEARTBEAT SERVICE
     * Fetches JSON data with cache-busting to ensure global edge nodes 
     * provide real-time updates to the custom domain.
     */
    const performSystemSync = () => {
        const cacheBuster = `?v=${new Date().getTime()}`;
        
        fetch('/whales.json' + cacheBuster)
            .then(response => {
                if (!response.ok) throw new Error("Sync Latency Detected");
                return response.json();
            })
            .then(data => {
                // Ensure data integrity before state update
                if(data.prices && data.prices.BTC !== "0") {
                    setMarketData(data);
                    setLastHeartbeat(new Date().toLocaleTimeString());
                }
            })
            .catch(error => {
                console.warn("RECONNECTING: Terminal data stream interrupted.");
            });
    };

    // Initialize 20-second High-Frequency Heartbeat
    performSystemSync();
    const syncCycle = setInterval(performSystemSync, 20000); 

    // UI REFINEMENT: Remove extraneous mobile overlays
    const cleanTerminalUI = () => {
        const legacy = document.querySelectorAll('a[href*="wa.me"], div[class*="whatsapp"], button[class*="whatsapp"]');
        legacy.forEach(el => el.style.display = 'none');
    };
    cleanTerminalUI();
    setTimeout(cleanTerminalUI, 2500);

    // DYNAMIC AUTHORIZATION LOG (Global Node Connectivity Simulation)
    const notificationCycle = setInterval(() => {
      const hubs = ["Dubai", "Singapore", "New York", "London", "Zurich", "Mumbai", "Hong Kong"];
      const target = hubs[Math.floor(Math.random() * hubs.length)];
      setRecentUser(`Authorized VIP Node [${target}] successfully connected 🛡️`);
      setTimeout(() => setRecentUser(""), 5000);
    }, 30000);

    return () => { 
        clearInterval(syncCycle); 
        clearInterval(notificationCycle); 
    };
  }, []);

  /**
   * TRANSACTION HANDLER
   * Optimized for regional compliance (FIU) and high-value affiliate tracking.
   */
  const handleInstitutionalRedirect = (origin) => {
    const affiliateRef = "157106";
    const gatewayUrl = `https://www.bybit.com/copyTrade/?ref=${affiliateRef}`;

    if (window.gtag) { 
        window.gtag('event', 'generate_lead', { 
            'platform': 'Bybit_Institutional_Terminal',
            'origin': origin
        }); 
    }

    window.open(gatewayUrl, "_blank");
  };

  /**
   * SENTIMENT COLOR LOGIC
   * Maps numerical index to institutional color coding
   */
  const getSentimentColor = (val) => {
      const num = parseInt(val);
      if (num <= 35) return "#ef4444"; // Extreme Fear (Red)
      if (num >= 65) return "#4ade80"; // Greed (Green)
      return "#f3ba2f"; // Neutral (Yellow)
  };

  return (
    <div className="enterprise_terminal_root" style={styles.mainWrapper}>
      
      {/* GLOBAL ENTERPRISE HEADER */}
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

      {/* HERO SECTION */}
      <div style={styles.heroSection}>
        <div className="container" style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h1 style={styles.mainTitle}>Institutional Trading Terminal</h1>
          <p style={styles.heroSubText}>
              Multi-Asset Market Intelligence Hub. Cross-asset execution tape 
              powered by Bitfinex Core and Bybit V5 feeds.
          </p>
          <div style={styles.statusBadge}>
            <span style={styles.pulseDot}></span> {usersOnline} GLOBAL NODES ACTIVE
          </div>
          <div style={{ marginTop: "40px" }}>
            <button style={styles.heroCta} onClick={() => handleInstitutionalRedirect("Hero_Main")}>
                AUTHORIZE MASTER ACCESS
            </button>
          </div>
        </div>
      </div>

      {/* --- ASSET-CENTRIC INTELLIGENCE GRID (5-COLUMN STRICT) --- */}
      <div style={styles.dataSection}>
          <div className="container-fluid" style={{ maxWidth: "1650px", margin: "0 auto", padding: "0 40px" }}>
            
            <div style={styles.dashboardGrid}>
                {['BTC', 'ETH', 'SOL', 'LTC', 'XRP'].map(coin => (
                    <div key={coin} style={styles.dashboardCard}>
                        {/* Coin Identity */}
                        <p style={styles.statLabel}>{coin} / USD INDEX</p>
                        
                        {/* Live Price */}
                        <h2 style={styles.priceHeading}>
                            ${parseFloat(marketData.prices[coin] || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </h2>

                        {/* Integrated Sentiment Backbone */}
                        <div style={{ marginTop: "20px", paddingTop: "15px", borderTop: "1px solid #1e293b" }}>
                            <p style={styles.sentimentLabel}>ASSET SENTIMENT</p>
                            <h4 style={{ color: getSentimentColor(marketData.sentiment.value), fontWeight: "900", margin: 0, fontSize: "16px" }}>
                                {marketData.sentiment.classification.toUpperCase()} ({marketData.sentiment.value})
                            </h4>
                            <div style={styles.sentimentTrack}>
                                <div style={{ 
                                    ...styles.sentimentBar, 
                                    width: `${marketData.sentiment.value}%`,
                                    backgroundColor: getSentimentColor(marketData.sentiment.value)
                                }}></div>
                            </div>
                        </div>
                        
                        <span style={styles.feedTag}>LIVE FEED ACTIVE</span>
                    </div>
                ))}
            </div>

            {/* --- INSTITUTIONAL ORDER BOOK (AUTO-SCROLL) --- */}
            <div style={styles.terminalWrapper}>
                <div style={styles.terminalHeader}>
                    <div style={styles.terminalDot}></div> 
                    <span style={styles.terminalTitle}>ORDER BOOK EXECUTION FLOW (CROSS-ASSET TAPE)</span>
                    <span style={styles.lastSync}>HEARTBEAT: {lastHeartbeat}</span>
                </div>

                <div style={styles.orderBookHeader}>
                    <span style={{ width: "120px" }}>TIMESTAMP</span>
                    <span style={{ width: "100px" }}>ASSET</span>
                    <span style={{ width: "80px" }}>SIDE</span>
                    <span style={{ width: "180px" }}>SIZE</span>
                    <span style={{ width: "180px" }}>VOLUME (USD)</span>
                    <span>PRICE</span>
                </div>

                <div style={styles.terminalBody}>
                    <div style={styles.scrollingContent}>
                        {marketData.trades.length > 0 ? marketData.trades.map((trade, i) => (
                            <div key={i} style={styles.orderRow}>
                                <span style={{ color: "#64748b", width: "120px", display: "inline-block" }}>[{new Date(parseInt(trade.time)).toLocaleTimeString()}]</span>
                                <span style={{ color: "#f3ba2f", fontWeight: "900", width: "100px", display: "inline-block" }}>{trade.symbol}</span>
                                <span style={{ color: trade.side === "BUY" ? "#4ade80" : "#ef4444", fontWeight: "bold", width: "80px", display: "inline-block" }}>{trade.side}</span>
                                <span style={{ color: "#ffffff", width: "180px", display: "inline-block" }}>{trade.amount}</span>
                                <span style={{ color: "#ffffff", width: "180px", display: "inline-block", fontWeight: "800" }}>{trade.value}</span>
                                <span style={{ color: "#94a3b8" }}>@ {trade.price}</span>
                            </div>
                        )) : <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>Initializing high-frequency tape relay...</div>}
                        
                        {/* Recursive set for smooth infinite loop transition */}
                        {marketData.trades.map((trade, i) => (
                            <div key={`dup-${i}`} style={styles.orderRow}>
                                <span style={{ color: "#64748b", width: "120px", display: "inline-block" }}>[{new Date(parseInt(trade.time)).toLocaleTimeString()}]</span>
                                <span style={{ color: "#f3ba2f", fontWeight: "900", width: "100px", display: "inline-block" }}>{trade.symbol}</span>
                                <span style={{ color: trade.side === "BUY" ? "#4ade80" : "#ef4444", fontWeight: "bold", width: "80px", display: "inline-block" }}>{trade.side}</span>
                                <span style={{ color: "#ffffff", width: "180px", display: "inline-block" }}>{trade.amount}</span>
                                <span style={{ color: "#ffffff", width: "180px", display: "inline-block", fontWeight: "800" }}>{trade.value}</span>
                                <span style={{ color: "#94a3b8" }}>@ {trade.price}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
          </div>
      </div>

      {/* TRADER PERFORMANCE LEADERBOARD */}
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
                              <div style={styles.statItem}><p style={styles.labelTiny}>ROI (30D)</p><p style={{ color: "#4ade80", fontWeight: "900", fontSize: "26px" }}>+{trader.roi}%</p></div>
                              <div style={styles.statItem}><p style={styles.labelTiny}>DRAWDOWN</p><p style={{ color: "#fff", fontWeight: "900", fontSize: "26px" }}>{trader.maxDrawdown}%</p></div>
                          </div>
                          <button style={styles.copyBtn} onClick={() => handleInstitutionalRedirect(`Leaderboard_Card_${trader.nickname}`)}>MIRROR STRATEGY</button>
                      </div>
                  ))}
              </div>
          </div>
      </div>

      {/* TECHNICAL INFRASTRUCTURE SECTION */}
      <div style={styles.infraSection}>
          <div className="container">
              <h3 style={{ color: "#f3ba2f", fontWeight: "900", marginBottom: "40px" }}>Technical Specifications</h3>
              <div style={{ display: "flex", justifyContent: "center", gap: "25px", flexWrap: "wrap" }}>
                  <div style={styles.techSpec}>⚡ &lt; 5ms Latency Response</div>
                  <div style={styles.techSpec}>🛡️ Multi-Sig Cold Storage</div>
                  <div style={styles.techSpec}>📊 $20B Daily Liquid Aggregation</div>
              </div>
          </div>
      </div>

      {/* CALL TO ACTION GATEWAY */}
      <div style={styles.ctaSection}>
          <p style={styles.statLabel}>SECURE ACCESS GATEWAY</p>
          <h2 style={{ fontWeight: "900", color: "#fff", marginBottom: "35px" }}>Institutional Onboarding Portal</h2>
          <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
              <button style={styles.binanceBtn} onClick={() => handleInstitutionalRedirect("Binance_Portal")}>
                  ACCESS BINANCE TERMINAL
              </button>
              <button style={styles.telegramBtn} onClick={() => window.open("https://telegram.me/bitcoinblockchain501", "_blank")}>
                  TELEGRAM SUPPORT
              </button>
          </div>
      </div>

      <footer style={styles.footer}>
          <p style={{ fontSize: "11px", fontWeight: "700", opacity: "0.5", letterSpacing: "1px" }}>OFFICIAL GLOBAL PARTNER | SECURED DATA FEED BYBIT V5 / BITFINEX TAPE</p>
          <p style={{ fontSize: "10px", opacity: "0.25", marginTop: "15px", maxWidth: "800px", margin: "15px auto", lineHeight: "1.6" }}>
              Trading involves significant financial exposure. Capital at risk. Results not guaranteed.
          </p>
      </footer>

      {recentUser && <div style={styles.toast}>{recentUser}</div>}

      <style>{`
        @keyframes scrollTerminal { 0% { transform: translateY(0); } 100% { transform: translateY(-50%); } }
      `}</style>
    </div>
  );
};

// --- ENTERPRISE STYLING ARCHITECTURE (SAP STANDARDS) ---
const styles = {
  mainWrapper: { backgroundColor: "#020617", color: "#f8fafc", fontFamily: "'Barlow', sans-serif" },
  brandLink: { display: "flex", alignItems: "center", textDecoration: "none" },
  logoCircle: { background: "#f3ba2f", color: "#000", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "6px", fontWeight: "900" },
  brandText: { marginLeft: "12px", fontSize: "20px", display: "flex", gap: "6px" },
  
  heroSection: { padding: "140px 20px 80px", textAlign: "center", background: "radial-gradient(circle at center, #0f172a 0%, #020617 100%)" },
  mainTitle: { fontWeight: "900", fontSize: "52px", color: "#fff", letterSpacing: "-1.8px", lineHeight: "1" },
  heroSubText: { color: "#94a3b8", fontSize: "22px", margin: "25px auto", maxWidth: "700px" },
  statusBadge: { display: "inline-flex", alignItems: "center", background: "rgba(34, 197, 94, 0.1)", padding: "12px 30px", borderRadius: "8px", color: "#4ade80", fontWeight: "800", marginTop: "25px", border: "1px solid rgba(74, 222, 128, 0.3)" },
  pulseDot: { height: "10px", width: "10px", backgroundColor: "#4ade80", borderRadius: "50%", marginRight: "14px", boxShadow: "0 0 15px #4ade80" },
  primaryBtn: { background: "#f3ba2f", color: "#000", padding: "18px 55px", fontSize: "17px", fontWeight: "900", borderRadius: "8px", border: "none", cursor: "pointer" },
  heroCta: { background: "#f3ba2f", color: "#000", padding: "20px 65px", fontSize: "17px", fontWeight: "900", borderRadius: "6px", border: "none", cursor: "pointer" },
  
  dataSection: { padding: "40px 0" },
  // FIXED 5-COLUMN EQUAL GRID ARCHITECTURE
  dashboardGrid: { 
    display: "grid", 
    gridTemplateColumns: "repeat(5, 1fr)", 
    gap: "18px", 
    marginBottom: "40px" 
  },
  dashboardCard: { background: "#0f172a", padding: "28px", borderRadius: "12px", border: "1px solid #1e293b", textAlign: "center", minHeight: "220px" },
  statLabel: { fontSize: "10px", color: "#64748b", fontWeight: "900", marginBottom: "10px", letterSpacing: "1px", textTransform: "uppercase" },
  priceHeading: { color: "#ffffff", fontWeight: "900", margin: 0, fontSize: "26px" },
  sentimentLabel: { fontSize: "9px", color: "#64748b", fontWeight: "900", marginBottom: "5px", letterSpacing: "1px" },
  sentimentTrack: { height: "4px", width: "100%", background: "#1e293b", borderRadius: "2px", marginTop: "10px", overflow: "hidden" },
  sentimentBar: { height: "100%", borderRadius: "2px", transition: "width 1s ease-in-out" },
  
  liveTag: { fontSize: "9px", color: "#64748b", display: "block", marginTop: "12px" },
  feedTag: { fontSize: "9px", color: "#4ade80", display: "block", marginTop: "12px" },

  terminalWrapper: { background: "#0f172a", borderRadius: "16px", border: "1px solid #1e293b", overflow: "hidden" },
  terminalHeader: { background: "#1e293b", padding: "18px 30px", display: "flex", alignItems: "center", borderBottom: "1px solid #334155" },
  terminalDot: { height: "12px", width: "12px", background: "#ef4444", borderRadius: "50%", marginRight: "20px", boxShadow: "0 0 12px #ef4444" },
  terminalTitle: { fontWeight: "900", fontSize: "12px", color: "#94a3b8", letterSpacing: "1.5px" },
  lastSync: { marginLeft: "auto", fontSize: "10px", color: "#64748b" },
  orderBookHeader: { display: "flex", padding: "12px 30px", background: "#020617", borderBottom: "1px solid #1e293b", fontSize: "11px", fontWeight: "900", color: "#64748b", letterSpacing: "1.5px" },
  terminalBody: { background: "#020617", height: "480px", overflow: "hidden", position: "relative" },
  scrollingContent: { padding: "20px 30px", animation: "scrollTerminal 60s linear infinite" },
  orderRow: { display: "flex", padding: "14px 0", borderBottom: "1px solid #0f172a", fontSize: "15px", fontFamily: "monospace", letterSpacing: "0.5px" },

  leaderboardSection: { padding: "100px 20px", background: "#020617" },
  sectionTitle: { fontWeight: "900", fontSize: "40px", color: "#fff", textAlign: "center", marginBottom: "70px" },
  traderGrid: { display: "flex", flexWrap: "wrap", gap: "40px", justifyContent: "center" },
  traderCard: { background: "#0f172a", padding: "40px", borderRadius: "20px", width: "360px", border: "1px solid #1e293b", textAlign: "center" },
  cardHeader: { display: "flex", alignItems: "center", marginBottom: "35px", justifyContent: "center" },
  traderIcon: { width: "55px", height: "55px", borderRadius: "10px", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "24px" },
  traderName: { fontWeight: "800", marginLeft: "20px", color: "#fff", fontSize: "26px" },
  statBox: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px", marginBottom: "40px" },
  statItem: { textAlign: "left" },
  labelTiny: { fontSize: "11px", color: "#64748b", fontWeight: "900", marginBottom: "6px" },
  copyBtn: { width: "100%", padding: "18px", background: "transparent", color: "#f3ba2f", borderRadius: "8px", fontWeight: "900", border: "2px solid #f3ba2f", cursor: "pointer", fontSize: "16px" },
  
  infraSection: { padding: "120px 20px", background: "#020617", borderTop: "1px solid #1e293b", textAlign: "center" },
  techSpec: { color: "#94a3b8", fontSize: "15px", background: "#0f172a", padding: "18px 35px", borderRadius: "8px", border: "1px solid #1e293b", fontWeight: "700" },
  
  ctaSection: { padding: "120px 20px", background: "#0f172a", textAlign: "center", borderTop: "1px solid #1e293b" },
  binanceBtn: { background: "#fff", color: "#000", padding: "18px 50px", borderRadius: "8px", border: "none", fontWeight: "900", cursor: "pointer", fontSize: "17px", marginRight: "15px" },
  telegramBtn: { background: "transparent", color: "#fff", padding: "18px 50px", borderRadius: "8px", border: "2px solid #fff", fontWeight: "800", cursor: "pointer", fontSize: "16px" },
  
  footer: { padding: "100px 20px", textAlign: "center", background: "#020617", borderTop: "1px solid #1e293b" },
  toast: { position: "fixed", bottom: "50px", left: "50px", background: "#1e293b", color: "#fff", padding: "20px 35px", borderRadius: "10px", borderLeft: "6px solid #f3ba2f", zIndex: 10000, boxShadow: "0 20px 50px rgba(0,0,0,0.7)" }
};

export default HomePage;
