let key = {};
console.log(process.env.REACT_APP_MODE,'Mode')
if (process.env.REACT_APP_MODE === "production") {
    console.log("Set Production Config 1231")
    const API_URL = 'https://bitdotapi.wealwin.com';

    key = {
        secretOrKey: "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3",
        CRYPTO_SECRET_KEY: "1234567812345678",
        RECAPTCHA_SITE_KEY: "6Lc1GYodAAAAABtu6oCLzoPGPphuQtUFcfEvt-Se", //local
        API_URL: 'https://bitdotapi.wealwin.com',
        FRONT_URL: 'https://bitdot.wealwin.com',
        ADMIN_URL: 'https://bitdot.wealwin.com/bdadalw',
        SOCKET_URL: '`${API_URL}`',
        getGeoInfo: "https://ipapi.co/json/",
        AUTHENTICATOR_URL: {
            PLAY_STORE: "https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2",
            APP_STORE: "https://apps.apple.com/us/app/google-authenticator/id388497605",
        }
    };

//LIVE

    // const API_URL = 'https://api.bitdot.co.in';

    // key = {
    //     secretOrKey: "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3",
    //     CRYPTO_SECRET_KEY: "1234567812345678",
    //     RECAPTCHA_SITE_KEY: "6Lc1GYodAAAAABtu6oCLzoPGPphuQtUFcfEvt-Se", //local
    //     API_URL: 'https://api.bitdot.co.in',
    //     FRONT_URL: 'https://bitdot.co.in',
    //     ADMIN_URL: 'https://bitdot.co.in/bdadalw',
    //     SOCKET_URL: `${API_URL}`,
    //     getGeoInfo: "https://ipapi.co/json/",
    //     AUTHENTICATOR_URL: {
    //         PLAY_STORE: "https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2",
    //         APP_STORE: "https://apps.apple.com/us/app/google-authenticator/id388497605",
    //     }
    // };

} else {
    console.log("Set Development Config bitdot")
    const API_URL = 'http://localhost'; //http://192.168.29.63:3000/  http://localhost
    key = {
        secretOrKey: "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3",
        CRYPTO_SECRET_KEY: "1234567812345678",
        RECAPTCHA_SITE_KEY: "6Lc1GYodAAAAABtu6oCLzoPGPphuQtUFcfEvt-Se", //local
        API_URL: `${API_URL}:2053`,
        SOCKET_URL: `${API_URL}:2053`,
        getGeoInfo: "https://ipapi.co/json/",
        AUTHENTICATOR_URL: {
            PLAY_STORE: "https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2",
            APP_STORE: "https://apps.apple.com/us/app/google-authenticator/id388497605",
        }
    };
}


export default {
    ...key,
    ...{ SITE_DETAIL: require('./siteConfig') }
};