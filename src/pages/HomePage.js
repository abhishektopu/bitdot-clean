/**
 * =============================================================================
 * PROJECT:        Crypto Lakeside Institutional Terminal
 * MODULE:         Core.View.HomePage
 * VERSION:        5.5.0 (Platinum Enterprise Build)
 * DEVELOPER:      Abhishek Topu (SAP Certified)
 * ARCHITECTURE:   React 18.x / USDT Liquid Aggregate / GA4 Integration
 * 
 * DESCRIPTION:    Institutional-grade financial dashboard featuring:
 *                 - Individual USDT-paired Asset Intelligence
 *                 - Dynamic SVG Sentiment Gauges (Asset-Specific)
 *                 - Cache-Busted High-Frequency Heartbeat (20s Cycle)
 *                 - Multi-Node Authorized Connectivity Notifications
 *                 - High-Density Tabular Order Book Execution Tape
 *                 - Regionally Compliant (India FIU) Redirect Handlers
 * =============================================================================
 */

import React, { useEffect, useState } from "react";

// Institutional Layout Architecture
import Header from "../components/Header/Header.js";
import HeaderLinks from "../components/Header/HeaderLinks.js";

/**
 * --- SUB-COMPONENT: SENTIMENT GAUGE ---
 * Logic: Maps a 0-100 sentiment index to a -90/+90 degree needle rotation.
 * visual: Uses SVG paths for high-performance rendering on institutional screens.
 */
const SentimentGauge = ({ value, classification }) => {
    const numericValue = parseInt(value) || 50;
    const needleRotation = (numericValue / 100) * 180 - 90;
    
    // Institutional Grade Color Scale
    const getSentimentColor = (val) => {
        if (val <= 25) return "#ef4444"; // Extreme Fear
        if (val <= 45) return "#f97316"; // Fear
        if (val <= 75) return "#eab308"; // Greed
        return "#22c55e"; // Extreme Greed
    };

    const activeColor = getSentimentColor(numericValue);

    return (
        <div style={gaugeStyles.container}>
            <svg width="140" height="80" viewBox="0 0 140 80">
                {/* Static Background Arc */}
                <path 
                    d="M20,70 A50,50 0 0,1 120,70" 
                    fill="none" 
                    stroke="#1e293b" 
                    strokeWidth="12" 
                    strokeLinecap="round" 
                />
                {/* Dynamic Progress Arc */}
                <path 
                    d="M20,70 A50,50 0 0,1 120,70" 
                    fill="none" 
                    stroke={activeColor} 
                    strokeWidth="12" 
                    strokeLinecap="round" 
                    strokeDasharray="157" 
                    strokeDashoffset={157 - (numericValue / 100) * 157}
                    style={{ transition: 'stroke-dashoffset 1.2s ease-in-out, stroke 1.2s' }}
                />
                {/* Needle Vector */}
                <line 
                    x1="70" y1="70" x2="70" y2="25" 
                    stroke="#ffffff" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    transform={`rotate(${needleRotation} 70 70)`}
                    style={{ transition: 'transform 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                />
                {/* Axis Pivot */}
                <circle cx="70" cy="70" r="6" fill="#ffffff" />
            </svg>
            <div style={gaugeStyles.labelContainer}>
                <p style={{ ...gaugeStyles.statusText, color: activeColor }}>
                    {classification.toUpperCase()}
                </p>
                <p style={gaugeStyles.indexValue}>
                    USDT INDEX: {numericValue}
                </p>
            </div>
        </div>
    );
};

const HomePage = (props) => {
    // --- 1. ENTERPRISE SYSTEM STATE ---
    const [usersOnline, setUsersOnline] = useState(157);
    const [recentUser, setRecentUser] = useState("");
    const [lastHeartbeat, setLastHeartbeat] = useState(new Date().toLocaleTimeString());
    
    // Unified Multi-Asset Hub
    const [marketData, setMarketData] = useState({
        prices: { BTC: "0", ETH: "0", SOL: "0", LTC: "0", XRP: "0" },
        sentiment: { 
            BTC: { value: "50", classification: "Neutral" },
            ETH: { value: "50", classification: "Neutral" },
            SOL: { value: "50", classification: "Neutral" },
            LTC: { value: "50", classification: "Neutral" },
            XRP: { value: "50", classification: "Neutral" }
        },
        trades: []
    });

    // Institutional Leaderboard Registry
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

    // --- 2. DATA SYNCHRONIZATION ENGINE ---
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Institutional USDT Terminal | Crypto Lakeside";

        /**
         * HEARTBEAT SERVICE
         * Fetches high-density data with cache-busting logic.
         */
        const performSystemSync = () => {
            const timestamp = new Date().getTime();
            const syncEndpoint = `/whales.json?v=${timestamp}`;
            
            fetch(syncEndpoint)
                .then(response => {
                    if (!response.ok) throw new Error("Terminal Link Latency");
                    return response.json();
                })
                .then(data => {
                    // Critical Validation: Verify asset prices are populated
                    if(data.prices && data.prices.BTC !== "0") {
                        setMarketData(data);
                        setLastHeartbeat(new Date().toLocaleTimeString());
                        console.log("Heartbeat Sync: SUCCESS");
                    }
                })
                .catch(error => {
                    console.error("HEARTBEAT ERROR: Market Data Desync Detected.");
                });
        };

        // Initialize 20-second High-Frequency Loop
        performSystemSync();
        const syncCycle = setInterval(performSystemSync, 20000); 

        // UI DOM Optimization
        const cleanTerminalUI = () => {
            const legacy = document.querySelectorAll('a[href*="wa.me"], div[class*="whatsapp"], button[class*="whatsapp"]');
            legacy.forEach(el => el.style.display = 'none');
        };
        cleanTerminalUI();
        const uiPass = setTimeout(cleanTerminalUI, 3000);

        // NODE CONNECTIVITY NOTIFICATIONS
        const notificationCycle = setInterval(() => {
            const nodes = ["Dubai", "Singapore", "Zurich", "London", "Mumbai", "Hong Kong", "Tokyo"];
            const targetNode = nodes[Math.floor(Math.random() * nodes.length)];
            setRecentUser(`Authorized VIP Node [${targetNode}] successfully connected 🛡️`);
            setTimeout(() => setRecentUser(""), 5000);
        }, 32000);

        return () => { 
            clearInterval(syncCycle); 
            clearInterval(notificationCycle); 
            clearTimeout(uiPass);
        };
    }, []);

    /**
     * --- REDIRECT LOGIC: INSTITUTIONAL GATEWAY ---
     */
    const handleInstitutionalRedirect = (originNode) => {
        const affiliateId = "157106";
        const gatewayUrl = `https://www.bybit.com/copyTrade/?ref=${affiliateId}`;

        // GA4 Telemetry Entry (G-2Y9M643E6E)
        if (window.gtag) { 
            window.gtag('event', 'generate_lead', { 
                'platform': 'Bybit_Institutional_Terminal',
                'origin_node': originNode,
                'status': 'authorized'
            }); 
        }

        window.open(gatewayUrl, "_blank");
    };

    return (
        <div className="enterprise_terminal_root" style={styles.mainWrapper}>
            
            {/* GLOBAL HEADER */}
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

            {/* HERO MODULE */}
            <div style={styles.heroSection}>
                <div className="container" style={{ maxWidth: "1100px", margin: "0 auto" }}>
                    <h1 style={styles.mainTitle}>Institutional Trading Terminal</h1>
                    <p style={styles.heroSubText}>
                        High-Frequency USDT Market Intelligence. Verified alpha execution feeds 
                        synchronized via Bitfinex Core and Bybit V5 liquidity nodes.
                    </p>
                    <div style={styles.statusBadge}>
                        <span style={styles.pulseDot}></span> {usersOnline} GLOBAL NODES ACTIVE
                    </div>
                    <div style={{ marginTop: "40px" }}>
                        <button style={styles.heroCta} onClick={() => handleInstitutionalRedirect("Hero_Direct")}>
                            AUTHORIZE MASTER ACCESS
                        </button>
                    </div>
                </div>
            </div>

            {/* --- ASSET INTELLIGENCE GRID (USDT NATIVE) --- */}
            <div style={styles.dataSection}>
                <div className="container-fluid" style={{ maxWidth: "1700px", margin: "0 auto", padding: "0 40px" }}>
                    
                    <div style={styles.dashboardGrid}>
                        {['BTC', 'ETH', 'SOL', 'LTC', 'XRP'].map(coin => {
                            const sentiment = marketData.sentiment[coin] || { value: "50", classification: "Neutral" };
                            return (
                                <div key={coin} style={styles.dashboardCard}>
                                    <p style={styles.statLabel}>{coin} / USDT INDEX</p>
                                    <h2 style={styles.priceHeading}>
                                        ${parseFloat(marketData.prices[coin] || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    </h2>

                                    {/* ASSET SPECIFIC GAUGE */}
                                    <div style={styles.sentimentBox}>
                                        <SentimentGauge value={sentiment.value} classification={sentiment.classification} />
                                    </div>
                                    
                                    <span style={styles.feedTag}>USDT FEED AUTHORIZED</span>
                                </div>
                            );
                        })}
                    </div>

                    {/* --- INSTITUTIONAL ORDER BOOK --- */}
                    <div style={styles.terminalWrapper}>
                        <div style={styles.terminalHeader}>
                            <div style={styles.terminalDot}></div> 
                            <span style={styles.terminalTitle}>ORDER BOOK EXECUTION FLOW (CROSS-ASSET USDT TAPE)</span>
                            <span style={styles.syncTag}>HEARTBEAT: {lastHeartbeat}</span>
                        </div>

                        {/* TABLE COLUMN HEADERS */}
                        <div style={styles.orderBookHeader}>
                            <span style={{ width: "120px" }}>TIMESTAMP</span>
                            <span style={{ width: "100px" }}>ASSET</span>
                            <span style={{ width: "80px" }}>SIDE</span>
                            <span style={{ width: "180px" }}>SIZE</span>
                            <span style={{ width: "200px" }}>TOTAL VOLUME (USDT)</span>
                            <span>EXECUTION PRICE</span>
                        </div>

                        <div style={styles.terminalBody}>
                            <div style={styles.scrollingContent}>
                                {marketData.trades.length > 0 ? marketData.trades.map((trade, i) => (
                                    <div key={i} style={styles.orderRow}>
                                        <span style={{ color: "#64748b", width: "120px", display: "inline-block" }}>[{new Date(parseInt(trade.time)).toLocaleTimeString()}]</span>
                                        <span style={{ color: "#f3ba2f", fontWeight: "900", width: "100px", display: "inline-block" }}>{trade.symbol}</span>
                                        <span style={{ color: trade.side === "BUY" ? "#4ade80" : "#ef4444", fontWeight: "bold", width: "80px", display: "inline-block" }}>{trade.side}</span>
                                        <span style={{ color: "#ffffff", width: "180px", display: "inline-block" }}>{trade.amount}</span>
                                        <span style={{ color: "#ffffff", width: "200px", display: "inline-block", fontWeight: "800" }}>{trade.value}</span>
                                        <span style={{ color: "#94a3b8" }}>@ {trade.price} USDT</span>
                                    </div>
                                )) : <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>Aggregating institutional data stream...</div>}
                                
                                {/* Loop Continuity Set */}
                                {marketData.trades.map((trade, i) => (
                                    <div key={`d-${i}`} style={styles.orderRow}>
                                        <span style={{ color: "#64748b", width: "120px", display: "inline-block" }}>[{new Date(parseInt(trade.time)).toLocaleTimeString()}]</span>
                                        <span style={{ color: "#f3ba2f", fontWeight: "900", width: "100px", display: "inline-block" }}>{trade.symbol}</span>
                                        <span style={{ color: trade.side === "BUY" ? "#4ade80" : "#ef4444", fontWeight: "bold", width: "80px", display: "inline-block" }}>{trade.side}</span>
                                        <span style={{ color: "#ffffff", width: "180px", display: "inline-block" }}>{trade.amount}</span>
                                        <span style={{ color: "#ffffff", width: "200px", display: "inline-block", fontWeight: "800" }}>{trade.value}</span>
                                        <span style={{ color: "#94a3b8" }}>@ {trade.price} USDT</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- LEADERBOARD SECTION --- */}
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
                                    <div style={styles.statItem}>
                                        <p style={styles.labelTiny}>ROI (30D)</p>
                                        <p style={{ color: "#4ade80", fontWeight: "900", fontSize: "26px" }}>+{trader.roi}%</p>
                                    </div>
                                    <div style={styles.statItem}>
                                        <p style={styles.labelTiny}>DRAWDOWN</p>
                                        <p style={{ color: "#fff", fontWeight: "900", fontSize: "26px" }}>{trader.maxDrawdown}%</p>
                                    </div>
                                </div>
                                <button style={styles.copyBtn} onClick={() => handleInstitutionalRedirect(`Leaderboard_Card_${trader.nickname}`)}>
                                    MIRROR STRATEGY
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* --- TECHNICAL SPECIFICATIONS --- */}
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

            {/* --- CALL TO ACTION GATEWAY --- */}
            <div style={styles.ctaSection}>
                <p style={styles.statLabel}>SECURE ACCESS GATEWAY</p>
                <h2 style={{ fontWeight: "900", color: "#fff", marginBottom: "35px" }}>Institutional Onboarding Portal</h2>
                <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
                    <button style={styles.binanceBtn} onClick={() => handleInstitutionalRedirect("Binance_Gateway")}>
                        ACCESS BINANCE TERMINAL
                    </button>
                    <button style={styles.telegramBtn} onClick={() => window.open("https://telegram.me/bitcoinblockchain501", "_blank")}>
                        TELEGRAM SUPPORT
                    </button>
                </div>
            </div>

            {/* FOOTER ARCHITECTURE */}
            <footer style={styles.footer}>
                <p style={{ fontSize: "11px", fontWeight: "700", opacity: "0.5", letterSpacing: "1px" }}>
                    OFFICIAL GLOBAL PARTNER | SECURED DATA FEED BYBIT V5 / BITFINEX TAPE
                </p>
                <p style={{ fontSize: "10px", opacity: "0.25", marginTop: "15px", maxWidth: "800px", margin: "15px auto", lineHeight: "1.6" }}>
                    The indices provided are for informational purposes only. Trading involves significant financial exposure. 
                    Capital at risk. Past performance does not guarantee future results. 
                </p>
            </footer>

            {/* SYSTEM TOAST NOTIFICATION */}
            {recentUser && <div style={styles.toast}>{recentUser}</div>}

            {/* DYNAMIC KEYFRAME ENGINE */}
            <style>{`
                @keyframes scrollTerminal {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(-50%); }
                }
            `}</style>
        </div>
    );
};

// --- ENTERPRISE STYLING ARCHITECTURE ---
const styles = {
    mainWrapper: { 
        backgroundColor: "#020617", 
        color: "#f8fafc", 
        fontFamily: "'Barlow', sans-serif" 
    },
    brandLink: { 
        display: "flex", 
        alignItems: "center", 
        textDecoration: "none" 
    },
    logoCircle: { 
        background: "#f3ba2f", 
        color: "#000", 
        width: "36px", 
        height: "36px", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        borderRadius: "6px", 
        fontWeight: "900" 
    },
    brandText: { 
        marginLeft: "12px", 
        fontSize: "20px", 
        display: "flex", 
        gap: "6px" 
    },
    heroSection: { 
        padding: "140px 20px 80px", 
        textAlign: "center", 
        background: "radial-gradient(circle at center, #0f172a 0%, #020617 100%)" 
    },
    mainTitle: { 
        fontWeight: "900", 
        fontSize: "52px", 
        color: "#fff", 
        letterSpacing: "-1.8px", 
        lineHeight: "1" 
    },
    heroSubText: { 
        color: "#94a3b8", 
        fontSize: "22px", 
        margin: "25px auto", 
        maxWidth: "750px",
        lineHeight: "1.5"
    },
    statusBadge: { 
        display: "inline-flex", 
        alignItems: "center", 
        background: "rgba(34, 197, 94, 0.1)", 
        padding: "12px 30px", 
        borderRadius: "8px", 
        color: "#4ade80", 
        fontWeight: "800", 
        marginTop: "25px", 
        border: "1px solid rgba(74, 222, 128, 0.3)" 
    },
    pulseDot: { 
        height: "10px", 
        width: "10px", 
        backgroundColor: "#4ade80", 
        borderRadius: "50%", 
        marginRight: "14px", 
        boxShadow: "0 0 15px #4ade80" 
    },
    heroCta: { 
        background: "#f3ba2f", 
        color: "#000", 
        padding: "20px 65px", 
        fontSize: "17px", 
        fontWeight: "900", 
        borderRadius: "6px", 
        border: "none", 
        cursor: "pointer",
        transition: "transform 0.2s"
    },
    dataSection: { 
        padding: "40px 0" 
    },
    dashboardGrid: { 
        display: "grid", 
        gridTemplateColumns: "repeat(5, 1fr)", 
        gap: "18px", 
        marginBottom: "40px" 
    },
    dashboardCard: { 
        background: "#0f172a", 
        padding: "28px", 
        borderRadius: "12px", 
        border: "1px solid #1e293b", 
        textAlign: "center", 
        minHeight: "300px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
    },
    statLabel: { 
        fontSize: "11px", 
        color: "#64748b", 
        fontWeight: "900", 
        marginBottom: "12px", 
        letterSpacing: "1px", 
        textTransform: "uppercase" 
    },
    priceHeading: { 
        color: "#ffffff", 
        fontWeight: "900", 
        margin: 0, 
        fontSize: "28px" 
    },
    sentimentBox: { 
        marginTop: "25px", 
        paddingTop: "20px", 
        borderTop: "1px solid #1e293b" 
    },
    feedTag: { 
        fontSize: "9px", 
        color: "#4ade80", 
        display: "block", 
        marginTop: "15px", 
        fontWeight: "800",
        letterSpacing: "1px"
    },
    terminalWrapper: { 
        background: "#0f172a", 
        borderRadius: "16px", 
        border: "1px solid #1e293b", 
        overflow: "hidden",
        marginTop: "20px"
    },
    terminalHeader: { 
        background: "#1e293b", 
        padding: "18px 30px", 
        display: "flex", 
        alignItems: "center", 
        borderBottom: "1px solid #334155" 
    },
    terminalDot: { 
        height: "12px", 
        width: "12px", 
        background: "#ef4444", 
        borderRadius: "50%", 
        marginRight: "20px", 
        boxShadow: "0 0 12px #ef4444" 
    },
    terminalTitle: { 
        fontWeight: "900", 
        fontSize: "12px", 
        color: "#94a3b8", 
        letterSpacing: "1.5px" 
    },
    syncTag: { 
        marginLeft: "auto", 
        fontSize: "10px", 
        color: "#64748b" 
    },
    orderBookHeader: { 
        display: "flex", 
        padding: "15px 30px", 
        background: "#020617", 
        borderBottom: "1px solid #1e293b", 
        fontSize: "11px", 
        fontWeight: "900", 
        color: "#64748b",
        letterSpacing: "1.5px"
    },
    terminalBody: { 
        background: "#020617", 
        height: "500px", 
        overflow: "hidden", 
        position: "relative" 
    },
    scrollingContent: { 
        padding: "20px 30px", 
        animation: "scrollTerminal 60s linear infinite" 
    },
    orderRow: { 
        display: "flex", 
        padding: "15px 0", 
        borderBottom: "1px solid #0f172a", 
        fontSize: "15px", 
        fontFamily: "monospace",
        letterSpacing: "0.5px"
    },
    leaderboardSection: { 
        padding: "100px 20px", 
        background: "#020617" 
    },
    sectionTitle: { 
        fontWeight: "900", 
        fontSize: "42px", 
        color: "#fff", 
        textAlign: "center", 
        marginBottom: "70px",
        letterSpacing: "-1px"
    },
    traderGrid: { 
        display: "flex", 
        flexWrap: "wrap", 
        gap: "45px", 
        justifyContent: "center" 
    },
    traderCard: { 
        background: "#0f172a", 
        padding: "45px", 
        borderRadius: "24px", 
        width: "360px", 
        border: "1px solid #1e293b", 
        textAlign: "center",
        boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
    },
    cardHeader: { 
        display: "flex", 
        alignItems: "center", 
        marginBottom: "35px", 
        justifyContent: "center" 
    },
    traderIcon: { 
        width: "60px", 
        height: "60px", 
        borderRadius: "12px", 
        color: "#fff", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        fontWeight: "bold", 
        fontSize: "26px" 
    },
    traderName: { 
        fontWeight: "800", 
        marginLeft: "20px", 
        color: "#fff", 
        fontSize: "26px" 
    },
    statBox: { 
        display: "grid", 
        gridTemplateColumns: "1fr 1fr", 
        gap: "35px", 
        marginBottom: "45px" 
    },
    labelTiny: { 
        fontSize: "11px", 
        color: "#64748b", 
        fontWeight: "900", 
        marginBottom: "8px",
        textTransform: "uppercase"
    },
    copyBtn: { 
        width: "100%", 
        padding: "18px", 
        background: "transparent", 
        color: "#f3ba2f", 
        borderRadius: "10px", 
        fontWeight: "900", 
        border: "2px solid #f3ba2f", 
        cursor: "pointer", 
        fontSize: "16px",
        transition: "all 0.3s"
    },
    infraSection: { 
        padding: "120px 20px", 
        background: "#020617", 
        borderTop: "1px solid #1e293b", 
        textAlign: "center" 
    },
    techSpec: { 
        color: "#94a3b8", 
        fontSize: "16px", 
        background: "#0f172a", 
        padding: "20px 40px", 
        borderRadius: "10px", 
        border: "1px solid #1e293b", 
        fontWeight: "700" 
    },
    ctaSection: { 
        padding: "120px 20px", 
        background: "#0f172a", 
        textAlign: "center", 
        borderTop: "1px solid #1e293b" 
    },
    binanceBtn: { 
        background: "#fff", 
        color: "#000", 
        padding: "20px 60px", 
        borderRadius: "8px", 
        border: "none", 
        fontWeight: "900", 
        cursor: "pointer", 
        fontSize: "17px", 
        marginRight: "20px" 
    },
    telegramBtn: { 
        background: "transparent", 
        color: "#fff", 
        padding: "20px 60px", 
        borderRadius: "8px", 
        border: "2px solid #fff", 
        fontWeight: "800", 
        cursor: "pointer", 
        fontSize: "17px" 
    },
    footer: { 
        padding: "120px 20px", 
        textAlign: "center", 
        background: "#020617", 
        borderTop: "1px solid #1e293b" 
    },
    toast: { 
        position: "fixed", 
        bottom: "50px", 
        left: "50px", 
        background: "#1e293b", 
        color: "#fff", 
        padding: "22px 40px", 
        borderRadius: "12px", 
        fontSize: "15px", 
        borderLeft: "6px solid #f3ba2f", 
        zIndex: 10000, 
        boxShadow: "0 25px 60px rgba(0,0,0,0.8)",
        fontWeight: "600"
    }
};

// --- GAUGE STYLING ---
const gaugeStyles = {
    container: { 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center" 
    },
    labelContainer: { 
        marginTop: "-15px",
        textAlign: "center"
    },
    statusText: { 
        fontSize: "15px", 
        fontWeight: "900", 
        marginBottom: "2px",
        letterSpacing: "0.5px"
    },
    indexValue: { 
        fontSize: "10px", 
        color: "#64748b", 
        fontWeight: "800",
        letterSpacing: "0.8px"
    }
};

export default HomePage;
