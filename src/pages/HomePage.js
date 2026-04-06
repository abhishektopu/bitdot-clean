/**
 * =============================================================================
 * PROJECT:        Crypto Lakeside Institutional Terminal
 * MODULE:         Core.View.HomePage.Enterprise
 * VERSION:        7.0.0 (Platinum Gold Build)
 * DEVELOPER:      Abhishek Topu (SAP Certified)
 * ARCHITECTURE:   React 18.x / Multi-Asset Data Relay / Responsive UI
 * 
 * -----------------------------------------------------------------------------
 * SYSTEM ARCHITECTURE OVERVIEW:
 * -----------------------------------------------------------------------------
 * This module serves as the primary entry point for the Institutional Terminal.
 * It implements a multi-layered rendering engine with the following priority:
 * 
 * LAYER 1 (Z-INDEX 9000): Global High-Frequency Price Ticker
 * LAYER 2 (Z-INDEX 8000): Institutional Navigation Header (Offset 40px)
 * LAYER 3 (Z-INDEX 7000): System Toast & Authorization Notifications
 * LAYER 4 (Z-INDEX 1000): Data Dashboard & Execution Tape
 * 
 * -----------------------------------------------------------------------------
 * DATA SPECIFICATIONS:
 * -----------------------------------------------------------------------------
 * - KERNEL:         Bitfinex Core Tape / Bybit V5 Liquid Aggregate
 * - REFRESH:        20,000ms Heartbeat Cycle
 * - CACHE:          Enforced v=timestamp Query Protocol
 * - ANALYTICS:      GA4 G-2Y9M643E6E Integration
 * =============================================================================
 */

import React, { 
    useEffect, 
    useState 
} from "react";

// Institutional Component Registry
import Header from "../components/Header/Header.js";
import HeaderLinks from "../components/Header/HeaderLinks.js";

/**
 * -----------------------------------------------------------------------------
 * SUB-COMPONENT: PriceTicker
 * -----------------------------------------------------------------------------
 * Objective: Instant institutional data presence.
 * Function: Continuous horizontal marquee of USDT paired assets.
 */
const PriceTicker = ({ 
    prices 
}) => {
    const assets = [
        'BTC', 
        'ETH', 
        'SOL', 
        'LTC', 
        'XRP'
    ];
    
    return (
        <div 
            id="global-ticker-container"
            style={tickerStyles.container}
        >
            <div 
                id="global-ticker-scroll-wrapper"
                style={tickerStyles.scrollWrapper}
            >
                {assets.map(asset => (
                    <span 
                        key={asset} 
                        style={tickerStyles.item}
                    >
                        <span style={tickerStyles.symbol}>
                            {asset}/USDT
                        </span>
                        <span style={tickerStyles.price}>
                            ${parseFloat(prices[asset] || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </span>
                        <span style={tickerStyles.pulse}>
                            ⚡
                        </span>
                    </span>
                ))}
                {/* 
                  * Continuity Set:
                  * Duplicating the asset map ensures that the marquee 
                  * has no "gap" during the transition cycle.
                  */}
                {assets.map(asset => (
                    <span 
                        key={`loop-${asset}`} 
                        style={tickerStyles.item}
                    >
                        <span style={tickerStyles.symbol}>
                            {asset}/USDT
                        </span>
                        <span style={tickerStyles.price}>
                            ${parseFloat(prices[asset] || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </span>
                        <span style={tickerStyles.pulse}>
                            ⚡
                        </span>
                    </span>
                ))}
            </div>
        </div>
    );
};

/**
 * -----------------------------------------------------------------------------
 * SUB-COMPONENT: SentimentGauge
 * -----------------------------------------------------------------------------
 * Logic: maps a 0-100 index value to a -90 to +90 degree vector rotation.
 * UI: Implements institutional color coding for Extreme Fear/Greed.
 */
const SentimentGauge = ({ 
    value, 
    classification 
}) => {
    const numericValue = parseInt(value) || 50;
    
    // Mapping: 0% = -90deg, 100% = +90deg
    const needleRotation = (numericValue / 100) * 180 - 90;
    
    /**
     * Color Logic for Institutional Classification
     */
    const getSentimentColor = (val) => {
        if (val <= 25) {
            return "#ef4444"; // Extreme Fear (Red)
        }
        if (val <= 45) {
            return "#f97316"; // Fear (Orange)
        }
        if (val <= 75) {
            return "#eab308"; // Greed (Yellow)
        }
        return "#22c55e"; // Extreme Greed (Green)
    };

    const activeColor = getSentimentColor(numericValue);

    return (
        <div 
            id="gauge-root-container"
            style={gaugeStyles.container}
        >
            <svg 
                width="140" 
                height="80" 
                viewBox="0 0 140 80"
            >
                {/* Institutional Track Background */}
                <path 
                    d="M20,70 A50,50 0 0,1 120,70" 
                    fill="none" 
                    stroke="#1e293b" 
                    strokeWidth="12" 
                    strokeLinecap="round" 
                />
                {/* Asset Specific Progress Track */}
                <path 
                    d="M20,70 A50,50 0 0,1 120,70" 
                    fill="none" 
                    stroke={activeColor} 
                    strokeWidth="12" 
                    strokeLinecap="round" 
                    strokeDasharray="157" 
                    strokeDashoffset={157 - (numericValue / 100) * 157}
                    style={{ 
                        transition: 'stroke-dashoffset 1.8s ease-in-out, stroke 1.5s' 
                    }}
                />
                {/* The Gauge Needle Vector */}
                <line 
                    x1="70" 
                    y1="70" 
                    x2="70" 
                    y2="25" 
                    stroke="#ffffff" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    transform={`rotate(${needleRotation} 70 70)`}
                    style={{ 
                        transition: 'transform 2s cubic-bezier(0.34, 1.56, 0.64, 1)' 
                    }}
                />
                {/* Center Pivot Point */}
                <circle 
                    cx="70" 
                    cy="70" 
                    r="6" 
                    fill="#ffffff" 
                />
            </svg>
            <div 
                id="gauge-label-container"
                style={gaugeStyles.labelContainer}
            >
                <p style={{ 
                    ...gaugeStyles.statusText, 
                    color: activeColor 
                }}>
                    {classification.toUpperCase()}
                </p>
                <p style={gaugeStyles.indexValue}>
                    USDT INDEX: {numericValue}
                </p>
            </div>
        </div>
    );
};

/**
 * -----------------------------------------------------------------------------
 * MAIN COMPONENT: HomePage
 * -----------------------------------------------------------------------------
 */
const HomePage = (props) => {

    // --- 1. CORE SYSTEM STATE INITIALIZATION ---
    const [usersOnline, setUsersOnline] = useState(157);
    const [recentUser, setRecentUser] = useState("");
    const [lastHeartbeat, setLastHeartbeat] = useState(new Date().toLocaleTimeString());
    
    // Unified Institutional Data Registry
    const [marketData, setMarketData] = useState({
        prices: { 
            BTC: "0", 
            ETH: "0", 
            SOL: "0", 
            LTC: "0", 
            XRP: "0" 
        },
        sentiment: { 
            BTC: { value: "50", classification: "Neutral" },
            ETH: { value: "50", classification: "Neutral" },
            SOL: { value: "50", classification: "Neutral" },
            LTC: { value: "50", classification: "Neutral" },
            XRP: { value: "50", classification: "Neutral" }
        },
        trades: []
    });

    // Master Leaderboard Registry
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
        
        // Initializing viewport orientation and browser metadata
        window.scrollTo(0, 0);
        document.title = "Institutional USDT Terminal | Crypto Lakeside";

        /**
         * HEARTBEAT SERVICE
         * Logic: Implements cache-busting v=timestamp protocol.
         * Purpose: Ensures Custom Domain edge nodes bypass historical cache.
         */
        const performSystemSync = () => {
            const timestamp = new Date().getTime();
            const syncEndpoint = `/whales.json?v=${timestamp}`;
            
            fetch(syncEndpoint)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Institutional Uplink Latency");
                    }
                    return response.json();
                })
                .then(data => {
                    // Logic Validation: Price Data Integrity Check
                    if(data.prices && data.prices.BTC !== "0") {
                        setMarketData(data);
                        setLastHeartbeat(new Date().toLocaleTimeString());
                        console.log("Terminal Heartbeat: SUCCESSFUL");
                    }
                })
                .catch(error => {
                    console.error("CRITICAL SYSTEM ALERT: Market Data Desynchronization.");
                });
        };

        // Execution of Initial Bootstrap Sync
        performSystemSync();

        // Establishing 20-second High-Frequency Heartbeat Cycle
        const syncCycle = setInterval(performSystemSync, 20000); 

        // UI DOM Optimization Service
        const cleanTerminalUI = () => {
            const legacySelectors = [
                'a[href*="wa.me"]',
                'div[class*="whatsapp"]',
                'button[class*="whatsapp"]'
            ];
            const elements = document.querySelectorAll(legacySelectors.join(','));
            elements.forEach(el => {
                el.style.display = 'none';
            });
        };

        cleanTerminalUI();
        const uiSyncPass = setTimeout(cleanTerminalUI, 3000);

        // GLOBAL NODE CONNECTIVITY SIMULATION (Marketing Logic)
        const notificationCycle = setInterval(() => {
            const nodes = [
                "Dubai", 
                "Singapore", 
                "Zurich", 
                "London", 
                "Mumbai", 
                "Hong Kong", 
                "Tokyo"
            ];
            const targetNode = nodes[Math.floor(Math.random() * nodes.length)];
            setRecentUser(`Institutional Node [${targetNode}] successfully authorized 🛡️`);
            
            setTimeout(() => {
                setRecentUser("");
            }, 5000);
        }, 32000);

        // System Garbage Collection on Component Unmount
        return () => { 
            clearInterval(syncCycle); 
            clearInterval(notificationCycle); 
            clearTimeout(uiSyncPass);
        };
    }, []);

    /**
     * --- REDIRECT LOGIC: INSTITUTIONAL GATEWAY ---
     * Compliance: Regional India FIU Logic enabled.
     * Attribution: Referral ID 157106.
     */
    const handleInstitutionalRedirect = (originNode) => {
        const affiliateId = "157106";
        const gatewayUrl = `https://www.bybit.com/copyTrade/?ref=${affiliateId}`;

        // GA4 Telemetry Injection
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
        <div 
            id="institutional-app-root"
            className="enterprise_terminal_root" 
            style={styles.mainWrapper}
        >
            
            {/* 1. LAYER 9000: GLOBAL PRICE TICKER SYSTEM */}
            <PriceTicker prices={marketData.prices} />

            {/* 
              * 2. LAYER 8000: GLOBAL NAVIGATION HEADER
              * OFFSET: 40PX to account for Ticker height and logo visibility.
              */}
            <div 
                id="global-header-offset-container"
                style={styles.headerContainer}
            >
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
            </div>

            {/* 3. HERO COMPONENT: CORPORATE POSITIONING */}
            <div 
                id="terminal-hero-section"
                style={styles.heroSection}
            >
                <div className="container" style={{ maxWidth: "1100px", margin: "0 auto" }}>
                    <h1 style={styles.mainTitle}>Institutional Trading Terminal</h1>
                    <p style={styles.heroSubText}>
                        High-Frequency USDT Market Intelligence. Verified alpha execution feeds 
                        synchronized across global liquidity nodes via Bitfinex Tape.
                    </p>
                    <div style={styles.statusBadge}>
                        <span style={styles.pulseDot}></span> {usersOnline} GLOBAL NODES ACTIVE
                    </div>
                    <div style={{ marginTop: "40px" }}>
                        <button 
                            style={styles.heroCta} 
                            onClick={() => handleInstitutionalRedirect("Hero_Main")}
                        >
                            AUTHORIZE MASTER ACCESS
                        </button>
                    </div>
                </div>
            </div>

            {/* 4. ASSET INTELLIGENCE GRID: DYNAMIC 5-COLUMN LAYOUT */}
            <div 
                id="data-intelligence-grid"
                style={styles.dataSection}
            >
                <div 
                    className="container-fluid" 
                    style={styles.dataContainer}
                >
                    <div 
                        id="dashboardGrid" 
                        className="dashboardGrid" 
                        style={styles.dashboardGrid}
                    >
                        {['BTC', 'ETH', 'SOL', 'LTC', 'XRP'].map(coin => {
                            const sentiment = marketData.sentiment[coin] || { value: "50", classification: "Neutral" };
                            return (
                                <div key={coin} style={styles.dashboardCard}>
                                    <p style={styles.statLabel}>
                                        {coin} / USDT INDEX
                                    </p>
                                    
                                    <h2 style={styles.priceHeading}>
                                        ${parseFloat(marketData.prices[coin] || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    </h2>

                                    {/* ASSET SPECIFIC GAUGE SUB-COMPONENT */}
                                    <div style={styles.sentimentBox}>
                                        <SentimentGauge 
                                            value={sentiment.value} 
                                            classification={sentiment.classification} 
                                        />
                                    </div>
                                    
                                    <span style={styles.feedTag}>
                                        USDT FEED AUTHORIZED
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    {/* 5. INSTITUTIONAL ORDER BOOK: CROSS-ASSET EXECUTION TAPE */}
                    <div 
                        id="order-book-tape-container"
                        style={styles.terminalWrapper}
                    >
                        <div style={styles.terminalHeader}>
                            <div style={styles.terminalDot}></div> 
                            <span style={styles.terminalTitle}>
                                ORDER BOOK EXECUTION FLOW (CROSS-ASSET USDT TAPE)
                            </span>
                            <span style={styles.syncTag}>
                                HEARTBEAT: {lastHeartbeat}
                            </span>
                        </div>

                        {/* TABLE CONTAINER: SCROLLABLE ON MOBILE ORIENTATION */}
                        <div style={styles.tableScrollArea}>
                            <div style={styles.orderBookHeader}>
                                <span style={{ minWidth: "120px" }}>TIMESTAMP</span>
                                <span style={{ minWidth: "100px" }}>ASSET</span>
                                <span style={{ minWidth: "80px" }}>SIDE</span>
                                <span style={{ minWidth: "180px" }}>SIZE</span>
                                <span style={{ minWidth: "200px" }}>TOTAL VOLUME (USDT)</span>
                                <span style={{ minWidth: "150px" }}>EXECUTION PRICE</span>
                            </div>

                            <div style={styles.terminalBody}>
                                <div style={styles.scrollingContent}>
                                    {marketData.trades.length > 0 ? marketData.trades.map((trade, i) => (
                                        <div key={i} style={styles.orderRow}>
                                            <span style={{ color: "#64748b", minWidth: "120px" }}>[{new Date(parseInt(trade.time)).toLocaleTimeString()}]</span>
                                            <span style={{ color: "#f3ba2f", fontWeight: "900", minWidth: "100px" }}>{trade.symbol}</span>
                                            <span style={{ color: trade.side === "BUY" ? "#4ade80" : "#ef4444", fontWeight: "bold", minWidth: "80px" }}>{trade.side}</span>
                                            <span style={{ color: "#ffffff", minWidth: "180px" }}>{trade.amount}</span>
                                            <span style={{ color: "#ffffff", minWidth: "200px", fontWeight: "800" }}>{trade.value}</span>
                                            <span style={{ color: "#94a3b8", minWidth: "150px" }}>@ {trade.price} USDT</span>
                                        </div>
                                    )) : <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>Syncing institutional liquidity...</div>}
                                    
                                    {/* Loop Continuity Set for Seamless Scroll Effect */}
                                    {marketData.trades.map((trade, i) => (
                                        <div key={`dup-${i}`} style={styles.orderRow}>
                                            <span style={{ color: "#64748b", minWidth: "120px" }}>[{new Date(parseInt(trade.time)).toLocaleTimeString()}]</span>
                                            <span style={{ color: "#f3ba2f", fontWeight: "900", minWidth: "100px" }}>{trade.symbol}</span>
                                            <span style={{ color: trade.side === "BUY" ? "#4ade80" : "#ef4444", fontWeight: "bold", minWidth: "80px" }}>{trade.side}</span>
                                            <span style={{ color: "#ffffff", minWidth: "180px" }}>{trade.amount}</span>
                                            <span style={{ color: "#ffffff", minWidth: "200px", fontWeight: "800" }}>{trade.value}</span>
                                            <span style={{ color: "#94a3b8", minWidth: "150px" }}>@ {trade.price} USDT</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 6. PERFORMANCE LEADERBOARD SECTION */}
            <div 
                id="leaderboard-section"
                style={styles.leaderboardSection}
            >
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
                                <button 
                                    style={styles.copyBtn} 
                                    onClick={() => handleInstitutionalRedirect(`Leaderboard_Card_${trader.nickname}`)}
                                >
                                    MIRROR STRATEGY
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 7. TECHNICAL SPECIFICATIONS MODULE */}
            <div 
                id="infrastructure-specs"
                style={styles.infraSection}
            >
                <div className="container">
                    <h3 style={{ color: "#f3ba2f", fontWeight: "900", marginBottom: "40px" }}>Technical Infrastructure</h3>
                    <div style={{ display: "flex", justifyContent: "center", gap: "25px", flexWrap: "wrap" }}>
                        <div style={styles.techSpec}>⚡ &lt; 5ms Latency Response</div>
                        <div style={styles.techSpec}>🛡️ Multi-Sig Cold Storage</div>
                        <div style={styles.techSpec}>📊 $20B Daily Liquid Aggregation</div>
                    </div>
                </div>
            </div>

            {/* 8. CALL TO ACTION GATEWAY PORTALS */}
            <div 
                id="institutional-onboarding"
                style={styles.ctaSection}
            >
                <p style={styles.statLabel}>SECURE ACCESS GATEWAY</p>
                <h2 style={{ fontWeight: "900", color: "#fff", marginBottom: "35px" }}>Institutional Onboarding Portal</h2>
                <div style={styles.ctaButtonGroup}>
                    <button 
                        style={styles.binanceBtn} 
                        onClick={() => handleInstitutionalRedirect("Binance_Portal")}
                    >
                        ACCESS BINANCE TERMINAL
                    </button>
                    <button 
                        style={styles.telegramBtn} 
                        onClick={() => window.open("https://telegram.me/bitcoinblockchain501", "_blank")}
                    >
                        TELEGRAM SUPPORT
                    </button>
                </div>
            </div>

            {/* 9. FOOTER & COMPLIANCE ARCHITECTURE */}
            <footer style={styles.footer}>
                <p style={{ fontSize: "11px", fontWeight: "700", opacity: "0.5", letterSpacing: "1px" }}>
                    OFFICIAL GLOBAL PARTNER | SECURED DATA FEED BYBIT V5 / BITFINEX TAPE
                </p>
                <p style={{ fontSize: "10px", opacity: "0.25", marginTop: "15px", maxWidth: "800px", margin: "15px auto", lineHeight: "1.6" }}>
                    Trading involves significant financial exposure. Capital at risk. 
                    The indices provided are for informational purposes only. Past performance does not guarantee future results. 
                </p>
            </footer>

            {/* 10. SYSTEM TOAST NOTIFICATION OVERLAY */}
            {recentUser && <div style={styles.toast}>{recentUser}</div>}

            {/* 11. DYNAMIC KEYFRAME ENGINE & RESPONSIVE OVERRIDES */}
            <style>{`
                @keyframes scrollTerminal {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(-50%); }
                }
                @keyframes tickerMove {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                @media (max-width: 1200px) {
                    .dashboardGrid { grid-template-columns: repeat(3, 1fr) !important; }
                }
                @media (max-width: 992px) {
                    .dashboardGrid { grid-template-columns: repeat(2, 1fr) !important; }
                }
                @media (max-width: 768px) {
                    .dashboardGrid { grid-template-columns: 1fr !important; }
                    .mainTitle { font-size: 32px !important; }
                    .heroSubText { font-size: 16px !important; }
                    .primaryBtn { padding: 15px 40px !important; }
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
    headerContainer: {
        position: "fixed",
        top: "40px",
        left: "0",
        width: "100%",
        zIndex: "8000"
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
        paddingTop: "240px",
        paddingBottom: "80px",
        paddingLeft: "20px",
        paddingRight: "20px", 
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
        marginTop: "25px",
        marginBottom: "25px",
        marginLeft: "auto",
        marginRight: "auto", 
        maxWidth: "750px",
        lineHeight: "1.5"
    },
    statusBadge: { 
        display: "inline-flex", 
        alignItems: "center", 
        background: "rgba(34, 197, 94, 0.1)", 
        paddingTop: "12px",
        paddingBottom: "12px",
        paddingLeft: "30px",
        paddingRight: "30px", 
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
        paddingTop: "20px",
        paddingBottom: "20px",
        paddingLeft: "65px",
        paddingRight: "65px", 
        fontSize: "17px", 
        fontWeight: "900", 
        borderRadius: "6px", 
        border: "none", 
        cursor: "pointer",
        transition: "transform 0.2s"
    },
    primaryBtn: { 
        background: "#f3ba2f", 
        color: "#000", 
        paddingTop: "18px",
        paddingBottom: "18px",
        paddingLeft: "55px",
        paddingRight: "55px", 
        fontSize: "17px", 
        fontWeight: "900", 
        borderRadius: "6px", 
        border: "none", 
        cursor: "pointer" 
    },
    dataSection: { 
        paddingTop: "40px",
        paddingBottom: "40px" 
    },
    dataContainer: { 
        maxWidth: "1650px", 
        marginLeft: "auto",
        marginRight: "auto", 
        paddingLeft: "20px",
        paddingRight: "20px" 
    },
    dashboardGrid: { 
        display: "grid", 
        gridTemplateColumns: "repeat(5, 1fr)", 
        gap: "18px", 
        marginBottom: "40px" 
    },
    dashboardCard: { 
        background: "#0f172a", 
        paddingTop: "28px",
        paddingBottom: "28px",
        paddingLeft: "25px",
        paddingRight: "25px", 
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
        marginTop: "0",
        marginBottom: "0", 
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
        paddingTop: "18px",
        paddingBottom: "18px",
        paddingLeft: "30px",
        paddingRight: "30px", 
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
    tableScrollArea: { 
        overflowX: "auto", 
        width: "100%",
        WebkitOverflowScrolling: "touch"
    },
    orderBookHeader: { 
        display: "flex", 
        paddingTop: "15px",
        paddingBottom: "15px",
        paddingLeft: "30px",
        paddingRight: "30px", 
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
        paddingTop: "20px",
        paddingBottom: "20px",
        paddingLeft: "30px",
        paddingRight: "30px", 
        animation: "scrollTerminal 60s linear infinite" 
    },
    orderRow: { 
        display: "flex", 
        paddingTop: "15px",
        paddingBottom: "15px", 
        borderBottom: "1px solid #0f172a", 
        fontSize: "15px", 
        fontFamily: "monospace",
        letterSpacing: "0.5px"
    },
    leaderboardSection: { 
        paddingTop: "100px",
        paddingBottom: "100px", 
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
        paddingTop: "45px",
        paddingBottom: "45px",
        paddingLeft: "45px",
        paddingRight: "45px", 
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
        paddingTop: "18px",
        paddingBottom: "18px", 
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
        paddingTop: "120px",
        paddingBottom: "120px", 
        background: "#020617", 
        borderTop: "1px solid #1e293b", 
        textAlign: "center" 
    },
    techSpec: { 
        color: "#94a3b8", 
        fontSize: "16px", 
        background: "#0f172a", 
        paddingTop: "20px",
        paddingBottom: "20px",
        paddingLeft: "40px",
        paddingRight: "40px", 
        borderRadius: "10px", 
        border: "1px solid #1e293b", 
        fontWeight: "700" 
    },
    ctaSection: { 
        paddingTop: "120px",
        paddingBottom: "120px", 
        background: "#0f172a", 
        textAlign: "center", 
        borderTop: "1px solid #1e293b" 
    },
    ctaButtonGroup: {
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        flexWrap: "wrap"
    },
    binanceBtn: { 
        background: "#fff", 
        color: "#000", 
        paddingTop: "20px",
        paddingBottom: "20px",
        paddingLeft: "60px",
        paddingRight: "60px", 
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
        paddingTop: "20px",
        paddingBottom: "20px",
        paddingLeft: "60px",
        paddingRight: "60px", 
        borderRadius: "8px", 
        border: "2px solid #fff", 
        fontWeight: "800", 
        cursor: "pointer", 
        fontSize: "17px" 
    },
    footer: { 
        paddingTop: "120px",
        paddingBottom: "120px", 
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
        paddingTop: "22px",
        paddingBottom: "22px",
        paddingLeft: "40px",
        paddingRight: "40px", 
        borderRadius: "12px", 
        fontSize: "15px", 
        borderLeft: "6px solid #f3ba2f", 
        zIndex: 10000, 
        boxShadow: "0 25px 60px rgba(0,0,0,0.8)",
        fontWeight: "600"
    }
};

// --- TICKER & GAUGE GRANULAR STYLING ---
const tickerStyles = {
    container: {
        background: "#f3ba2f",
        color: "#000",
        height: "40px",
        paddingTop: "0",
        paddingBottom: "0",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        whiteSpace: "nowrap",
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        zIndex: "9000",
        fontSize: "12px",
        fontWeight: "900",
        borderBottom: "1px solid #000",
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
    },
    scrollWrapper: {
        display: "inline-block",
        whiteSpace: "nowrap",
        animation: "tickerMove 40s linear infinite",
        paddingLeft: "10%"
    },
    item: {
        marginRight: "60px",
        display: "inline-flex",
        alignItems: "center",
        letterSpacing: "0.5px"
    },
    symbol: {
        marginRight: "10px",
        opacity: "0.7"
    },
    price: {
        color: "#000",
        fontWeight: "900"
    },
    pulse: {
        marginLeft: "10px",
        fontSize: "10px"
    }
};

const gaugeStyles = {
    container: { 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center",
        justifyContent: "center",
        marginTop: "10px"
    },
    labelContainer: { 
        marginTop: "-15px",
        textAlign: "center"
    },
    statusText: { 
        fontSize: "15px", 
        fontWeight: "900", 
        marginTop: "0",
        marginBottom: "2px",
        letterSpacing: "0.5px"
    },
    indexValue: { 
        fontSize: "10px", 
        color: "#64748b", 
        fontWeight: "800",
        marginTop: "0",
        letterSpacing: "0.8px"
    }
};

export default HomePage;
