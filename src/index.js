import React from "react";
import ReactDOM from "react-dom";
import './index.css';


// ✅ FACEBOOK PIXEL (CORRECT WAY)
// FACEBOOK PIXEL
(function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];
t=b.createElement(e);t.async=true;
t.src=v;
s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)})(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
// 👉 YOUR PIXEL ID
fbq('init', '1636533930618738');

// 👉 TRACK PAGE VIEW
fbq('track', 'PageView');


import App from './App';

ReactDOM.render(<App />, document.getElementById("root"));
