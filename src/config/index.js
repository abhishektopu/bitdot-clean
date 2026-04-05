let key = {
    // Basic template keys
    secretOrKey: "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3",
    CRYPTO_SECRET_KEY: "1234567812345678",
    RECAPTCHA_SITE_KEY: "6Lc1GYodAAAAABtu6oCLzoPGPphuQtUFcfEvt-Se",
    
    // PRODUCTION URLS - Points to live servers
    API_URL: 'https://bitdotapi.wealwin.com',
    FRONT_URL: 'https://cryptolakeside.co.in',
    ADMIN_URL: 'https://bitdotapi.wealwin.com/bdadalw',
    SOCKET_URL: 'https://bitdotapi.wealwin.com',
    
    getGeoInfo: "https://ipapi.co/json/",
    AUTHENTICATOR_URL: {
        PLAY_STORE: "https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2",
        APP_STORE: "https://apps.apple.com/us/app/google-authenticator/id388497605",
    }
};

// Log for debugging
console.log("Config loaded: Production Mode");

export default {
    ...key,
    ...{ SITE_DETAIL: require('./siteConfig') }
};
