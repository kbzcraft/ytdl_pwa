if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,c)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let r={};const d=e=>n(e,o),f={module:{uri:o},exports:r,require:d};i[o]=Promise.all(s.map((e=>f[e]||d(e)))).then((e=>(c(...e),r)))}}define(["./workbox-7cfec069"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index-2rN2sf6y.css",revision:null},{url:"assets/index-bUiAguEz.js",revision:null},{url:"index.html",revision:"906e85a401e4c9b854b72d39c027ffbf"},{url:"registerSW.js",revision:"65d527ef8ce0e0d50f2084ddd2339263"},{url:"images/icons/icon-72x72.png",revision:"1bc786b4470f3c8df88d4c6032c9f2f5"},{url:"images/icons/icon-96x96.png",revision:"70b57a0a13c927bc8dbe3df0b9161517"},{url:"images/icons/icon-128x128.png",revision:"f38542cba02974c0340ce1ebda3964ff"},{url:"images/icons/icon-144x144.png",revision:"26da9a5d2a61b63d2c605d7af75fd34d"},{url:"images/icons/icon-152x152.png",revision:"6b9a0f4c67ba28ab87d640393bc3e744"},{url:"images/icons/icon-192x192.png",revision:"88321eb579d6e398cee89a6a24c9d511"},{url:"images/icons/icon-384x384.png",revision:"a8ec103ea5f59f6f603bb4a91e810b76"},{url:"images/icons/icon-512x512.png",revision:"dec6b94c810fdd11818ed8ea892b763e"},{url:"manifest.webmanifest",revision:"54f53ba5e07900c86c7873d0feb96855"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
