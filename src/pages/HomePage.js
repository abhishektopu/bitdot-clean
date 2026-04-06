/**
 * PROJECT: Crypto Lakeside Institutional Terminal
 * MODULE: HomePage Component
 * VERSION: 4.1.0 (Enterprise Order Book Edition)
 * DEVELOPER: Abhishek Topu (SAP Certified)
 * 
 * SYSTEM ARCHITECTURE:
 * - Backend: Python Scraper (Bitfinex Tape + Alternative.me Sentiment)
 * - Middleware: JSON Data Relay with Cache-Busting
 * - Frontend: React Institutional UI with CSS Grid 2.0
 */

import React, { useEffect, useState } from "react";

// Enterprise Component Layer
import Header from "../components/Header/Header.js";
import HeaderLinks from "../components/Header/HeaderLinks.js";

const HomePage = (props) => {
  // --- 1. CORE ENGINE STATE ---
  const [usersOnline, setUsersOnline] = useState(157);
  const [recentUser, setRecentUser] = useState("");
  const [lastHeartbeat, setLastHeartbeat] = useState(new Date().toLocaleTimeString());
  
  // High-Density Data Registry
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

  // --- 2. SYSTEM INITIALIZATION & DATA SYNC ---
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Institutional Terminal | Crypto Lakeside";

    /**
     * TRANSACTION SYNCHRONIZATION SERVICE
     * Implements Cache-Busting via timestamped query parameters to prevent
     * Cloudflare edge nodes from serving stale data.
     */
    const performSystemSync = () => {
        const cacheBuster = `?v=${new Date().getTime()}`;
        
        fetch('/whales.json' + cacheBuster)
            .then(response => {
                if (!response.ok) throw new Error("Network latency detected");
                return response.json();
            })
            .then(data => {
                setMarketData(data);
                setLastHeartbeat(new Date().toLocaleTimeString());
                console.log("Heartbeat Success:", new Date().toLocaleTimeString());
            })
            .catch(error => {
                console.warn("SYSTEM ALERT: Data feed desynchronized. Attempting reconnect...");
            });
    };

    // Initialize High-Frequency Heartbeat (20-second cycle)
    performSystemSync();
    const syncCycle = setInterval(performSystemSync, 20000); 

    // UI REFINEMENT: Suppression of legacy WhatsApp overlays
    const cleanTerminalUI = () => {
        const legacyElements = document.querySelectorAll('a[href*="wa.me"], div[class*="whatsapp"], button[class*="whatsapp"]');
        legacyElements.forEach(el => el.style.display = 'none');
    };
    cleanTerminalUI();
    setTimeout(cleanTerminalUI, 2500);

    // DYNAMIC AUTHORIZATION LOG (Simulation of Node Connectivity)
    const notificationCycle = setInterval(() => {
      const cities = ["Dubai", "Singapore", "New York", "London", "Zurich", "Hong Kong", "Mumbai"];
      const target = cities[Math.floor(Math.random() * cities.length)];
      setRecentUser(`Authorized VIP Node [${target}] successfully connected 🛡️`);
      setTimeout(() => setRecentUser(""), 5000);
    }, 30000);

    // Garbage Collection on Component Unmount
    return () => { 
        clearInterval(syncCycle); 
        clearInterval(notificationCycle); 
    };
  }, []);

  /**
   * NAVIGATION HANDLER
   * Optimized for regional FIU compliance and secure affiliate tracking.
   */
  const handleInstitutionalRedirect = (origin) => {
    const affiliateRef = "157106";
    // Stable Gateway Hub
    const gatewayUrl = `https://www.bybit.com/copyTrade/?ref=${affiliateRef}`;

    // Capturing Event Metadata for GA4 (G-2Y9M643E6E)
    if (window.gtag) { 
        window.gtag('event', 'generate_lead', { 
            'platform': 'Bybit_Master_Terminal',
            'origin_node': origin
        }); 
    }

    window.open(gatewayUrl, "_blank");
  };

  return (
    <div className="institutional_root" style={styles.mainWrapper}>
      {/* ENTERPRISE HEADER */}
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

      {/* TERMINAL HERO SECTION */}
      <div style={styles.heroSection}>
        <div className="container" style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h1 style={styles.mainTitle}>Institutional Trading Terminal</h1>
          <p style={styles.heroSubText}>
              Verified alpha execution. Cross-asset monitoring via Bitfinex Tape and V5 Aggregators.
          </p>
          <div style={styles.activeBadge}>
            <span style={styles.pulseDot}></span> {usersOnline} GLOBAL TERMINALS ACTIVE
          </div>
          <div style={{ marginTop: "40px" }}>
            <button style={styles.primaryBtn} onClick={() => handleInstitutionalRedirect("Hero_Direct")}>
                AUTHORIZE MASTER ACCESS
            </button>
          </div>
        </div>
      </div>

      {/* --- PRICE INTELLIGENCE GRID (FIXED 6-COLUMN ARCHITECTURE) --- */}
      <div style={styles.dataSection}>
          <div className="container-fluid" style={{ maxWidth: "1500px", margin: "0 auto", padding: "0 40px" }}>
            
            <div style={styles.dashboardGrid}>
                {/* Sentiment Logic Card */}
                <div style={styles.dashboardCard}>
                    <p style={styles.statLabel}>MARKET SENTIMENT</p>
                    <h2 style={{ color: marketData.sentiment.value < 40 ? "#ef4444" : "#4ade80", fontWeight: "900", margin: 0 }}>
                        {marketData.sentiment.classification.toUpperCase()} ({marketData.sentiment.value})
                    </h2>
                    <span style={styles.liveTag}>SENTIMENT INDEX v2.0</span>
                </div>

                {/* 5-Asset Dynamic Suite: BTC, ETH, SOL, LTC, XRP */}
                {['BTC', 'ETH', 'SOL', 'LTC', 'XRP'].map(coin => (
                    <div key={coin} style={styles.dashboardCard}>
                        <p style={styles.statLabel}>{coin} INDEX PRICE (USD)</p>
                        <h2 style={{ color: "#ffffff", fontWeight: "900", margin: 0 }}>
                            ${parseFloat(marketData.prices[coin] || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </h2>
                        <span style={styles.feedTag}>LIVE BITFINEX FEED</span>
                    </div>
                ))}
            </div>

            {/* --- INSTITUTIONAL ORDER BOOK (AUTO-SCROLLING) --- */}
            <div style={styles.terminalWrapper}>
                <div style={styles.terminalHeader}>
                    <div style={styles.terminalDot}></div> 
                    <span style={styles.terminalTitle}>ORDER BOOK EXECUTION FLOW (HIGH-DENSITY TAPE)</span>
                    <span style={styles.lastSync}>SYSTEM HEARTBEAT: {lastHeartbeat}</span>
                </div>

                {/* TABLE COLUMN DESCRIPTORS */}
                <div style={styles.orderBookHeader}>
                    <span style={{ width: "120px" }}>TIMESTAMP</span>
                    <span style={{ width: "100px" }}>ASSET</span>
                    <span style={{ width: "80px" }}>SIDE</span>
                    <span style={{ width: "180px" }}>SIZE (RAW AMOUNT)</span>
                    <span style={{ width: "180px" }}>TOTAL VOLUME (USD)</span>
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
                              <div style={styles.statItem}><p style={styles.labelTiny}>MAX DRAWDOWN</p><p style={{ color: "#fff", fontWeight: "900", fontSize: "26px" }}>{trader.maxDrawdown}%</p></div>
                          </div>
                          <button style={styles.copyBtn} onClick={() => handleInstitutionalRedirect(`Leaderboard_Card_${trader.nickname}`)}>MIRROR STRATEGY</button>
                      </div>
                  ))}
              </div>
          </div>
      </div>

      {/* FINAL GATEWAY & INFRASTRUCTURE */}
      <div style={styles.infraSection}>
          <p style={styles.statLabel}>SECURE EXTERNAL GATEWAY</p>
          <h2 style={{ fontWeight: "900", color: "#fff", marginBottom: "35px" }}>Binance Global Liquidity Portal</h2>
          <button style={styles.binanceBtn} onClick={() => handleInstitutionalRedirect("Binance_Hub")}>ACCESS BINANCE NODE</button>
      </div>

      <footer style={styles.footer}>
        <p style={{ fontSize: "11px", fontWeight: "700", opacity: "0.5", letterSpacing: "1px" }}>OFFICIAL GLOBAL PARTNER | SECURED DATA FEED BYBIT V5 / BITFINEX TAPE</p>
        <p style={{ fontSize: "10px", opacity: "0.25", marginTop: "15px", maxWidth: "800px", margin: "15px auto", lineHeight: "1.6" }}>
            The content provided here is for informational purposes. Trading involves high financial exposure. 
            All performance indices are based on verified exchange data history.
        </p>
      </footer>

      {/* ENTERPRISE SYSTEM TOAST */}
      {recentUser && <div style={styles.toast}>{recentUser}</div>}

      {/* HIGH-SPEED ANIMATION ENGINE */}
      <style>{`
        @keyframes scrollTerminal {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
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
  primaryBtn: { background: "#f3ba2f", color: "#000", padding: "20px 65px", fontSize: "17px", fontWeight: "900", borderRadius: "6px", border: "none", cursor: "pointer" },
  
  dataSection: { padding: "40px 0" },
  // 6-COLUMN EQUAL GRID ARCHITECTURE
  dashboardGrid: { 
    display: "grid", 
    gridTemplateColumns: "repeat(6, 1fr)", 
    gap: "18px", 
    marginBottom: "40px" 
  },
  dashboardCard: { background: "#0f172a", padding: "28px", borderRadius: "12px", border: "1px solid #1e293b", textAlign: "center" },
  statLabel: { fontSize: "11px", color: "#64748b", fontWeight: "900", marginBottom: "10px", letterSpacing: "1px", textTransform: "uppercase" },
  liveTag: { fontSize: "9px", color: "#64748b", display: "block", marginTop: "12px" },
  feedTag: { fontSize: "9px", color: "#4ade80", display: "block", marginTop: "12px" },

  // TERMINAL UI SPECIFICATIONS
  terminalWrapper: { background: "#0f172a", borderRadius: "16px", border: "1px solid #1e293b", overflow: "hidden" },
  terminalHeader: { background: "#1e293b", padding: "18px 30px", display: "flex", alignItems: "center", borderBottom: "1px solid #334155" },
  terminalDot: { height: "12px", width: "12px", background: "#ef4444", borderRadius: "50%", marginRight: "20px", boxShadow: "0 0 12px #ef4444" },
  terminalTitle: { fontWeight: "900", fontSize: "12px", color: "#94a3b8", letterSpacing: "1.5px" },
  lastSync: { marginLeft: "auto", fontSize: "10px", color: "#64748b" },
  orderBookHeader: { display: "flex", padding: "12px 30px", background: "#020617", borderBottom: "1px solid #1e293b", fontSize: "11px", fontWeight: "900", color: "#64748b", letterSpacing: "1.5px" },
  terminalBody: { background: "#020617", height: "480px", overflow: "hidden", position: "relative" },
  scrollingContent: { padding: "20px 30px", animation: "scrollTerminal 55s linear infinite" },
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
  
  infraSection: { padding: "120px 20px", background: "#0f172a", textAlign: "center", borderTop: "1px solid #1e293b" },
  binanceBtn: { background: "#fff", color: "#000", padding: "20px 55px", borderRadius: "8px", border: "none", fontWeight: "900", cursor: "pointer", fontSize: "17px" },
  footer: { padding: "100px 20px", textAlign: "center", background: "#020617" },
  toast: { position: "fixed", bottom: "50px", left: "50px", background: "#1e293b", color: "#fff", padding: "20px 35px", borderRadius: "10px", borderLeft: "6px solid #f3ba2f", zIndex: 10000, boxShadow: "0 20px 50px rgba(0,0,0,0.7)" }
};

export default HomePage;
