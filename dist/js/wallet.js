!function(t){var n={};function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:r})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var o in t)e.d(r,o,function(n){return t[n]}.bind(null,o));return r},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=338)}({338:function(t,n,e){t.exports=e(339)},339:function(t,n){$((function(){var t,n,e,r,o;function u(t){return t<10?"0"+t:t}$(".back-to-last").click((function(t){history.go(-1)})),t=3678,n=$(".countdown-container .hours"),e=$(".countdown-container .minutes"),r=$(".countdown-container .seconds"),o=setInterval((function(){--t<=0&&(t=0,clearInterval(o));var c=t;n.html(u(Math.floor(t/3600))),c=t%3600,e.html(u(Math.floor(c/60))),c=t%60,r.html(u(c))}),1e3)}))}});
//# sourceMappingURL=wallet.js.map