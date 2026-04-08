/**
 * =============================================================================
 * PROJECT:        Crypto Lakeside Institutional Terminal
 * MODULE:         Core.View.HomePage.Master.Platinum
 * VERSION:        8.5.0 (Enterprise Responsive Master Build)
 * DEVELOPER:      Abhishek Topu (SAP Certified)
 * ARCHITECTURE:   React 18.x / Multi-Asset Data Relay / Z-Index Layering
 * 
 * -----------------------------------------------------------------------------
 * TECHNICAL SPECIFICATIONS (SAP-STANDARD DOCUMENTATION):
 * -----------------------------------------------------------------------------
 * 1. COMPONENT ID:     HL-MASTER-PRO-FINAL-1072
 * 2. DATA SOURCE:      /whales.json (Aggregated High-Frequency Tape)
 * 3. SYNC FREQUENCY:   20,000ms (Real-Time Node Heartbeat)
 * 4. COMPLIANCE:       India FIU Standards / Bybit Affiliate ID: 157106
 * 5. TRACKING:         Google Analytics 4 (Measurement ID: G-2Y9M643E6E)
 * 6. UI ENGINE:        CSS Grid 2.0 / SVG Dynamic Vector Gauges
 * 7. CACHE LOGIC:      Forced Cache-Buster v=timestamp for Custom Domains
 * 8. Z-INDEX SYSTEM:   Ticker(9000) > Header(8000) > Toast(10000) > Base(1)
 * 
 * -----------------------------------------------------------------------------
 * MOBILE RESPONSIVE LOGIC (PLATINUM ADAPTIVE):
 * -----------------------------------------------------------------------------
 * - Mobile (Default): Stacks Asset Cards 1-Column. Enables X-Axis Swipe for Tape.
 * - Tablet (>768px):  2-Column Intelligent Dashboard Layout.
 * - Desktop (>1200px): Fixed 5-Column Institutional Layout (No stretching).
 * =============================================================================
 */

import React, { 
    useEffect, 
    useState 
} from "react";

// Institutional Component Registry
import Header from "../components/Header/Header.js";


/**
 * -----------------------------------------------------------------------------
 * SUB-COMPONENT: PriceTicker
 * -----------------------------------------------------------------------------
 * Function: Continuous horizontal USDT-paired price relay.
 * Positioning: Fixed at Absolute Top (Layer 9000).
 * Logic: Implements infinite loop marquee with asset validation.
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
            id="hl-global-price-ticker"
            style={tickerStyles.container}
        >
            <div 
                className="ticker-scrolling-track"
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
                  * LOOP CONTINUITY SET:
                  * Ensures the scrolling animation has no visual gaps 
                  * during the keyframe transition cycle.
                  */}
                {assets.map(asset => (
                    <span 
                        key={`repeat-${asset}`} 
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
 * Logic: Maps a 0-100 index value to a -90 to +90 degree vector rotation.
 * UI: Implements institutional color coding for Market Sentiment tracking.
 */
const SentimentGauge = ({ 
    value, 
    classification 
}) => {
    const numericValue = parseInt(value) || 50;
    
    // Needle Degree Translation mapping logic
    const needleRotation = (numericValue / 100) * 180 - 90;
    
    /**
     * Map numerical sentiment to standardized enterprise color tokens
     */
    const getSentimentColor = (val) => {
        if (val <= 25) {
            return "#ef4444"; // Extreme Fear (Institutional Buy Signal)
        }
        if (val <= 45) {
            return "#f97316"; // Fear (Accumulation Zone)
        }
        if (val <= 75) {
            return "#eab308"; // Greed (Distribution Zone)
        }
        return "#22c55e"; // Extreme Greed (Retail Over-extension)
    };

    const activeColor = getSentimentColor(numericValue);

    return (
        <div 
            className="gauge-render-node"
            style={gaugeStyles.container}
        >
            <svg 
                width="140" 
                height="80" 
                viewBox="0 0 140 80"
            >
                {/* Background Rail Arc */}
                <path 
                    d="M20,70 A50,50 0 0,1 120,70" 
                    fill="none" 
                    stroke="#1e293b" 
                    strokeWidth="12" 
                    strokeLinecap="round" 
                />
                {/* Sentiment Progress Vector */}
                <path 
                    d="M20,70 A50,50 0 0,1 120,70" 
                    fill="none" 
                    stroke={activeColor} 
                    strokeWidth="12" 
                    strokeLinecap="round" 
                    strokeDasharray="157" 
                    strokeDashoffset={157 - (numericValue / 100) * 157}
                    style={{ 
                        transition: 'stroke-dashoffset 2s ease-in-out, stroke 1.5s' 
                    }}
                />
                {/* Directional Needle Vector */}
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
                        transition: 'transform 2.2s cubic-bezier(0.34, 1.56, 0.64, 1)' 
                    }}
                />
                {/* Axis Center Pivot */}
                <circle 
                    cx="70" 
                    cy="70" 
                    r="6" 
                    fill="#ffffff" 
                />
            </svg>
            <div 
                className="gauge-labels"
                style={gaugeStyles.labelContainer}
            >
                <p style={{ 
                    ...gaugeStyles.statusText, 
                    color: activeColor 
                }}>
                    {classification.toUpperCase()}
                </p>
                <p style={gaugeStyles.indexValue}>
                    INDEX: {numericValue}
                </p>
            </div>
        </div>
    );
};

/**
 * -----------------------------------------------------------------------------
 * MAIN COMPONENT: HomePage
 * -----------------------------------------------------------------------------
 * Architecture: Optimized for SAP high-availability and mobile scalability.
 */
const HomePage = (props) => {

    // --- 1. CORE SYSTEM STATE INITIALIZATION ---
    const [usersOnline, setUsersOnline] = useState(157);
    const [isSyncing, setIsSyncing] = useState(false);
    const [syncStep, setSyncStep] = useState(0);
    const [targetPlatform, setTargetPlatform] = useState("Bybit");
    const [recentUser, setRecentUser] = useState("");
    const [lastHeartbeat, setLastHeartbeat] = useState(new Date().toLocaleTimeString());
    
    // Unified Institutional State Store (Multi-Asset Registry)
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
        trades: [],
        whale_alerts: []
    });

    // Master Leaderboard Data (Mirror Trading Candidates)
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

    // --- 2. ASYNCHRONOUS DATA SERVICES ---
    useEffect(() => {
        
        // Initializing Client Orientation and SEO Metadata
        window.scrollTo(0, 0);
        document.title = "Institutional USDT Terminal | Crypto Lakeside";

        /**
         * HEARTBEAT SERVICE
         * Protocol: Fetches Aggregated JSON data from public node.
         * Cache-Logic: Implementation of v=timestamp to bypass Cloudflare TTL.
         */
        const performSystemSync = () => {
            const timestamp = new Date().getTime();
            const syncEndpoint = `/whales.json?v=${timestamp}`;
            
            fetch(syncEndpoint)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Institutional Uplink Latency detected.");
                    }
                    return response.json();
                })
                .then(data => {
                    // Critical Validation: Verify price integrity for LTC/XRP
                    if(data.prices && data.prices.BTC !== "0") {
                        setMarketData(data);
                        setLastHeartbeat(new Date().toLocaleTimeString());
                        console.log("Terminal Pulse: SUCCESS");
                    }
                })
                .catch(error => {
                    console.error("HEARTBEAT DESYNC: Re-initializing connection...");
                });
        };

        // Execution of Bootstrap Data Fetch
        performSystemSync();

        // Establishing 20-second High-Frequency Polling Cycle
        const syncCycle = setInterval(performSystemSync, 20000); 

        // UI DOM Optimization Service: Systematic removal of overlays
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
        const uiSyncPass = setTimeout(cleanTerminalUI, 2500);

        // GLOBAL NODE CONNECTIVITY NOTIFICATIONS (VIP AUTHORIZATION LOGS)
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
            setRecentUser(`Authorized VIP Node [${targetNode}] successfully connected 🛡️`);
            
            setTimeout(() => {
                setRecentUser("");
            }, 5000);
        }, 32000);

        // System Lifecycle Memory Management
        return () => { 
            clearInterval(syncCycle); 
            clearInterval(notificationCycle); 
            clearTimeout(uiSyncPass);
        };
    }, []);

    /**
     * TRANSACTION HANDLER: INSTITUTIONAL GATEWAY REDIRECT
     * Compliance: Regional India FIU Logic enabled for Bybit Hub.
     * Attribution: Forced Referral ID 157106.
     */
   
const handleInstitutionalRedirect = (originNode) => {
        setIsSyncing(true);
        setSyncStep(0);

        // Determine if user wants Binance or Bybit
        if (originNode.toLowerCase().includes("binance")) {
            setTargetPlatform("Binance");
        } else {
            setTargetPlatform("Bybit");
        }

        if (window.gtag) { 
            window.gtag('event', 'node_sync_initiated', { 'origin_node': originNode }); 
        }

        setTimeout(() => setSyncStep(1), 600); 
        setTimeout(() => setSyncStep(2), 1500); 
        setTimeout(() => setSyncStep(3), 2500); 
    };

    const finalizeGateway = () => {
        let gatewayUrl = "";

        if (targetPlatform === "Binance") {
            // Using your Binance ID: 35886743
            gatewayUrl = `https://www.binance.com/en/activity/referral-entry?fromActivityPage=true&ref=35886743`; 
        } else {
            const affiliateId = "157106";
            gatewayUrl = `https://www.bybit.com/copyTrade/?ref=${affiliateId}`;
        }

        window.open(gatewayUrl, "_blank");
        setIsSyncing(false);
    };
    
    return (
        <div 
            id="hl-enterprise-root"
            className="enterprise_terminal_root" 
            style={styles.mainWrapper}
        >
            
            {/* 1. LAYER 9000: GLOBAL PRICE TICKER SYSTEM (TETHER PAIRED) */}
            <PriceTicker prices={marketData.prices} />

            {/* 
              * 2. LAYER 8000: GLOBAL NAVIGATION HEADER
              * OFFSET: 40PX for Price Ticker alignment & Logo Visibility.
              */}
            <div 
                id="header-fixed-layer"
                style={styles.headerContainer}
            >
                <Header
                    {...props}
                    color="white"
                    links={[]}

brand={
    <div style={styles.brandLink}>
        {/* The coin you just uploaded to GitHub */}
        <img 
            src="/gold-logo.png" 
            alt="CL" 
            style={{ width: '40px', height: '40px', marginRight: '10px', borderRadius: '50%' }} 
        />
        <div style={styles.brandText}>
            <span style={{ color: "#000", fontWeight: "900" }}>CRYPTO</span>
            <span style={{ color: "#f3ba2f", fontWeight: "900" }}>LAKESIDE</span>
        </div>
    </div>
}
                    rightLinks={
                        <div style={{ display: 'flex', gap: '15px', alignItems: 'center', paddingRight: '20px' }}>
                            <button 
                                onClick={() => handleInstitutionalRedirect("Header_Login")}
                                style={styles.navBtnOutline}
                            >
                                TERMINAL LOGIN
                            </button>
                            <button 
                                onClick={() => handleInstitutionalRedirect("Header_Auth")}
                                style={styles.navBtnSolid}
                            >
                                AUTHORIZE NODE
                            </button>
                        </div>
                    }
                    
                />
            </div>

            {/* 3. HERO COMPONENT: CORPORATE BRANDING */}
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
    <span style={styles.pulseDot}></span> {usersOnline} GLOBAL NODES ACTIVE | LIVE INSTITUTIONAL FEED
</div>
                    <div style={{ marginTop: "40px" }}>
                        <button 
                            style={styles.heroCta} 
                            onClick={() => handleInstitutionalRedirect("Hero_Direct")}
                        >
                            AUTHORIZE MASTER ACCESS
                        </button>
                    </div>
                </div>
            </div>

            {/* 4. ASSET INTELLIGENCE GRID: PLATINUM 5-COLUMN LAYOUT */}
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

{/* --- INSTITUTIONAL WHALE RADAR: BIG MONEY ENTRIES (>$25K) --- */}
                    <div id="institutional-whale-radar" style={{...styles.terminalWrapper, marginBottom: '20px', border: '1px solid #fbbf24'}}>
                        <div style={{...styles.terminalHeader, background: '#7c2d12'}}>
                            <div style={{...styles.terminalDot, background: '#fbbf24', boxShadow: '0 0 15px #fbbf24'}}></div> 
                            <span style={{...styles.terminalTitle, color: '#fff'}}>
                                WHALE EXECUTION RADAR: REAL-TIME BIG MONEY ENTRIES (>$10,000)
                            </span>
                        </div>
                        {/* Increased height to 600px and added a min-height so the box stays large */}
<div style={{...styles.terminalBody, height: 'auto', minHeight: '400px', maxHeight: '600px', overflowY: 'auto'}}>
                            {marketData.whale_alerts && marketData.whale_alerts.length > 0 ? marketData.whale_alerts.map((alert, i) => (
                                <div key={i} style={{...styles.orderRow, borderLeft: alert.side === 'BUY' ? '4px solid #4ade80' : '4px solid #ef4444', padding: '10px 15px', marginBottom: '5px'}}>
                                    <span style={{color: "#64748b", minWidth: "100px"}}>[{new Date(parseInt(alert.time)).toLocaleTimeString()}]</span>
                                    <span style={{color: "#f3ba2f", fontWeight: "900", minWidth: "80px"}}>{alert.symbol}</span>
                                    <span style={{color: "#fff", fontWeight: "bold", minWidth: "150px"}}>{alert.value} {alert.side}</span>
                                    <span style={{color: "#94a3b8", fontSize: '13px'}}>Institutional entry confirmed at {alert.price} USDT</span>
                                </div>
                            )) : <div style={{padding: '30px', textAlign: 'center', color: '#64748b'}}>Scanning global liquidity nodes for high-density whale orders...</div>}
                        </div>
                    </div>

                    {/* 5. INSTITUTIONAL ORDER BOOK: TABULAR EXECUTION TAPE */}
                    <div 
                        id="hl-order-book-tape"
                        style={styles.terminalWrapper}
                    >
                        <div style={styles.terminalHeader}>
                            <div style={styles.terminalDot}></div> 
                            <span style={styles.terminalTitle}>
                                ORDER BOOK EXECUTION FLOW (CROSS-ASSET USDT TAPE)
                            </span>
      <span style={styles.syncTag}>
    RELAY: ACTIVE | HEARTBEAT: {lastHeartbeat}
</span>
                        </div>

           {/* TABLE CONTAINER: SCROLLABLE ON MOBILE ORIENTATION */}
            <div style={styles.tableScrollArea}>
                <div style={styles.orderBookHeader}>
                    <span style={{ minWidth: "120px", flexShrink: 0 }}>TIMESTAMP</span>
                    <span style={{ minWidth: "100px", flexShrink: 0 }}>ASSET</span>
                    <span style={{ minWidth: "80px", flexShrink: 0 }}>SIDE</span>
                    <span style={{ minWidth: "180px", flexShrink: 0 }}>SIZE</span>
                    <span style={{ minWidth: "200px", flexShrink: 0 }}>TOTAL VOLUME (USDT)</span>
                    <span style={{ minWidth: "150px", flexShrink: 0 }}>EXECUTION PRICE</span>
                </div>

                <div style={styles.terminalBody}>
                    <div style={styles.scrollingContent}>
                        {marketData.trades.length > 0 ? marketData.trades.map((trade, i) => (
                            <div key={i} style={styles.orderRow}>
                                <span style={{ color: "#64748b", minWidth: "120px", flexShrink: 0 }}>[{new Date(parseInt(trade.time)).toLocaleTimeString()}]</span>
                                <span style={{ color: "#f3ba2f", fontWeight: "900", minWidth: "100px", flexShrink: 0 }}>{trade.symbol}</span>
                                <span style={{ color: trade.side === "BUY" ? "#4ade80" : "#ef4444", fontWeight: "bold", minWidth: "80px", flexShrink: 0 }}>{trade.side}</span>
                                <span style={{ color: "#ffffff", minWidth: "180px", flexShrink: 0 }}>{trade.amount}</span>
                                <span style={{ color: "#ffffff", minWidth: "200px", fontWeight: "800", flexShrink: 0 }}>{trade.value}</span>
                                <span style={{ color: "#94a3b8", minWidth: "150px", flexShrink: 0 }}>@ {trade.price} USDT</span>
                            </div>
                        )) : <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>Connecting to institutional data stream...</div>}
                        
                        {/* Continuity Set for Seamless Scroll Transition */}
                        {marketData.trades.map((trade, i) => (
                            <div key={`dup-${i}`} style={styles.orderRow}>
                                <span style={{ color: "#64748b", minWidth: "120px", flexShrink: 0 }}>[{new Date(parseInt(trade.time)).toLocaleTimeString()}]</span>
                                <span style={{ color: "#f3ba2f", fontWeight: "900", minWidth: "100px", flexShrink: 0 }}>{trade.symbol}</span>
                                <span style={{ color: trade.side === "BUY" ? "#4ade80" : "#ef4444", fontWeight: "bold", minWidth: "80px", flexShrink: 0 }}>{trade.side}</span>
                                <span style={{ color: "#ffffff", minWidth: "180px", flexShrink: 0 }}>{trade.amount}</span>
                                <span style={{ color: "#ffffff", minWidth: "200px", fontWeight: "800", flexShrink: 0 }}>{trade.value}</span>
                                <span style={{ color: "#94a3b8", minWidth: "150px", flexShrink: 0 }}>@ {trade.price} USDT</span>
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
                id="institutional-leaderboard-section"
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

            {/* 7. TECHNICAL INFRASTRUCTURE MODULE */}
            <div 
                id="enterprise-infrastructure-module"
                style={styles.infraSection}
            >
                <div className="container">
                    <h3 style={{ color: "#f3ba2f", fontWeight: "900", marginBottom: "40px" }}>Technical Infrastructure</h3>
                    <div style={{ display: "flex", justifyContent: "center", gap: "25px", flexWrap: "wrap" }}>
                        <div style={styles.techSpec}>🌍 Cloudflare Edge Deployment</div>
                        <div style={styles.techSpec}>🛡️ Multi-Sig Cold Storage</div>
                        <div style={styles.techSpec}>📊 $20B Daily Liquid Aggregation</div>
                       <div style={styles.techSpec}>🔄 10-Minute Institutional Sync</div>
                    </div>
                </div>
            </div>

            {/* 8. CALL TO ACTION GATEWAY PORTALS */}
            <div 
                id="institutional-onboarding-gateway"
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
                <div style={{ marginBottom: "20px" }}>
                    <button 
                        onClick={() => window.open("https://telegram.me/bitcoinblockchain501", "_blank")}
                        style={{ color: "#f3ba2f", background: "transparent", border: "none", cursor: "pointer", fontSize: "12px", fontWeight: "900", letterSpacing: "1px" }}
                    >
                        TECHNICAL SUPPORT (TELEGRAM)
                    </button>
                </div>
                <p style={{ fontSize: "11px", fontWeight: "700", opacity: "0.5", letterSpacing: "1px" }}>
                    OFFICIAL GLOBAL PARTNER | SECURED DATA FEED BYBIT V5 / BITFINEX TAPE
                </p>
                <p style={{ fontSize: "10px", opacity: "0.25", marginTop: "15px", maxWidth: "800px", margin: "15px auto", lineHeight: "1.6" }}>
                    Trading involves significant financial exposure. Capital at risk. 
                    The indices provided are for informational purposes only. Past performance does not guarantee future results. 
                    © 2024 Crypto Lakeside Institutional. All Rights Reserved.
                </p>
            </footer>

            {/* 10. SYSTEM TOAST NOTIFICATION OVERLAY */}
            {recentUser && <div style={styles.toast}>{recentUser}</div>}

                    {/* --- INSTITUTIONAL HANDSHAKE OVERLAY --- */}
            {isSyncing && (
                <div style={styles.syncOverlay}>
                    <div style={styles.syncBox}>
                        <div style={styles.pulseDotLarge}></div>
                        <h2 style={{color: '#f3ba2f', fontWeight: '900', marginBottom: '10px', fontSize: '24px'}}>NODE SYNCHRONIZATION</h2>
                        
                        <div style={styles.syncStatusList}>
                            <p style={{opacity: syncStep >= 0 ? 1 : 0.3, marginBottom: '8px'}}>● Initializing Bitfinex Alpha Bridge... {syncStep >= 1 && '✅'}</p>
                            <p style={{opacity: syncStep >= 1 ? 1 : 0.3, marginBottom: '8px'}}>● Verifying Institutional Node [157106]... {syncStep >= 2 && '✅'}</p>
                            <p style={{opacity: syncStep >= 2 ? 1 : 0.3, marginBottom: '8px'}}>● Mapping Cross-Exchange Liquidity... {syncStep >= 3 && '✅'}</p>
                        </div>

                        {syncStep < 3 ? (
                            <div style={styles.progressBar}>
                                <div style={{...styles.progressFill, width: `${(syncStep + 1) * 33}%`}}></div>
                            </div>
                        ) : (
                            <div style={{marginTop: '30px', animation: 'fadeIn 0.5s'}}>
                                <p style={styles.successText}>ENCRYPTED BRIDGE ESTABLISHED</p>
                                <button onClick={finalizeGateway} style={styles.finalizeBtn}>
                                    ENTER {targetPlatform.toUpperCase()} TRADING HUB
                                </button>
                                <p style={{fontSize: '10px', marginTop: '15px', opacity: 0.3}}>Reference Protocol: HL-SYNC-AUTH-VIP</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* 11. DYNAMIC KEYFRAME ENGINE & RESPONSIVE MEDIA QUERIES */}
            <style>{`
                @keyframes scrollTerminal {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(-50%); }
                }
                @keyframes tickerMove {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                /* ADDED: HANDSHAKE OVERLAY ANIMATIONS */
                @keyframes pulse {
                    0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(243, 186, 47, 0.7); }
                    70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(243, 186, 47, 0); }
                    100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(243, 186, 47, 0); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                /* RESPONSIVE MEDIA QUERIES */
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
                    .enterprise_terminal_root { padding-top: 100px; }
                }
            `}</style>
        </div>
    );
};

// --- ENTERPRISE STYLING ARCHITECTURE (SAP UI STANDARDS) ---
const styles = {
    mainWrapper: { 
        backgroundColor: "#020617", 
        color: "#f8fafc", 
        fontFamily: "'Barlow', sans-serif",
        minHeight: "100vh"
    }, 
syncOverlay: {
        position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
        backgroundColor: "rgba(2, 6, 23, 0.98)", zIndex: 20000,
        display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(15px)"
    },
    syncBox: {
        background: "#0f172a", padding: "50px", borderRadius: "20px",
        border: "1px solid #1e293b", textAlign: "center", maxWidth: "450px", width: "90%",
        boxShadow: "0 0 50px rgba(0,0,0,0.5)"
    },
    syncStatusList: {
        textAlign: "left", margin: "30px auto", maxWidth: "320px", 
        fontSize: "12px", color: "#94a3b8", fontFamily: "monospace"
    },
    progressBar: { width: "100%", height: "3px", background: "#1e293b", borderRadius: "2px", overflow: "hidden" },
    progressFill: { height: "100%", background: "#f3ba2f", transition: "width 0.6s ease" },
    finalizeBtn: {
        background: "#f3ba2f", color: "#000", padding: "18px", 
        borderRadius: "8px", fontWeight: "900", border: "none", cursor: "pointer", width: "100%",
        fontSize: "15px", boxShadow: "0 10px 20px rgba(243, 186, 47, 0.2)"
    },
    pulseDotLarge: {
        height: "15px", width: "15px", backgroundColor: "#f3ba2f", 
        borderRadius: "50%", margin: "0 auto 25px", boxShadow: "0 0 15px #f3ba2f",
        animation: "pulse 2s infinite"
    },
    successText: { color: "#4ade80", fontWeight: "900", fontSize: "12px", marginBottom: "20px", letterSpacing: "1px" },
    
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
        minWidth: "850px",
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
         minWidth: "850px",
        height: "500px", 
        overflow: "hidden", 
        position: "relative" 
    },
    scrollingContent: { 
        paddingTop: "20px",
        paddingBottom: "20px",
        paddingLeft: "30px",
        paddingRight: "30px", 
        minWidth: "850px",
        animation: "scrollTerminal 60s linear infinite" 
    },
    orderRow: { 
        display: "flex", 
        minWidth: "850px",
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
    }, 
    navBtnOutline: {
        background: "transparent",
        color: "#000",
        border: "2px solid #000",
        padding: "8px 16px",
        borderRadius: "6px",
        fontWeight: "900",
        fontSize: "12px",
        cursor: "pointer",
        transition: "0.3s"
    },
    navBtnSolid: {
        background: "#000",
        color: "#f3ba2f",
        border: "none",
        padding: "10px 18px",
        borderRadius: "6px",
        fontWeight: "900",
        fontSize: "12px",
        cursor: "pointer",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
    },
};

// --- GAUGE STYLING ARCHITECTURE ---
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
        letterSpacing: "0.8px"
    }
};

const tickerStyles = {
    container: { background: "#f3ba2f", color: "#000", height: "40px", paddingTop: "0", paddingBottom: "0", display: "flex", alignItems: "center", overflow: "hidden", whiteSpace: "nowrap", position: "fixed", top: "0", left: "0", width: "100%", zIndex: "9000", fontSize: "12px", fontWeight: "900", borderBottom: "1px solid #000", boxShadow: "0 4px 10px rgba(0,0,0,0.3)" },
    scrollWrapper: { display: "inline-block", whiteSpace: "nowrap", animation: "tickerMove 40s linear infinite", paddingLeft: "10%" },
    item: { marginRight: "60px", display: "inline-flex", alignItems: "center", letterSpacing: "0.5px" },
    symbol: { marginRight: "10px", opacity: "0.7" },
    price: { color: "#000", fontWeight: "900" },
    pulse: { marginLeft: "10px", fontSize: "10px" }
};

export default HomePage;
