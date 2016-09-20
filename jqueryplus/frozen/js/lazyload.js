/*lazyload懒加载*/
!function(){"use strict";function t(t){return Object.prototype.toString.call(t).replace(/\[object (\w+)\]/,"$1").toLowerCase()}function e(e){return-1===t(e).indexOf("element")?t(e):"element"}function n(t,e){var n=e.options.lazyAttr;t.getAttribute(n)&&(t.src=t.getAttribute(n),t.removeAttribute(n))}function o(t,e){for(var n=t.length;n--;)-1!==e.matchStack.indexOf(t[n])?t.splice(n,1):("undefined"==typeof t[n].getAttribute(e.options.lazyAttr)||""===t[n].getAttribute(e.options.lazyAttr))&&t.splice(n,1);return t}function i(t,e){var n={width:window.innerWidth,height:window.innerHeight,top:document.body.scrollTop|document.documentElement.scrollTop,left:document.body.scrollLeft|document.documentElement.scrollLeft},o=e.options.offsetPre,i={top:0,left:0,bottom:0,right:0};return"undefined"!=typeof t.getBoundingClientRect&&(i=t.getBoundingClientRect(),e.options.log&&(i.top===i.bottom&&console.warn(t,"need height"),i.left===i.right&&console.warn(t,"need width"))),e.options.overget?i.top-o<n.height&&i.left-o<n.width:i.bottom+o>=0&&i.top-o<n.height&&i.right+o>=0&&i.left-o<n.width}function r(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);return t}function c(t){try{return new Function("return "+t)()}catch(e){return{}}}var s={options:{auto:!0,offsetPre:10,lazyAttr:"data-src",overget:!1,log:!0},matchStack:[],init:function(t){var e=document.querySelector("body").getAttribute("data-lazy");if(e=c(e),this.options=r(this.options,e),this.options=r(this.options,t),this.runLock=!0,this.options.auto){var n=document.querySelectorAll("img["+this.options.lazyAttr+"]");this.load(n)}},load:function(t){this.add(t),this.addLoadListener()},add:function(n){switch(e(n)){case"element":n="htmlimageelement"===t(n)?[n]:n.querySelectorAll(this.options.lazyAttr);break;case"string":n=document.querySelectorAll(n)}n.length&&n.length>0&&(n=Array.prototype.slice.call(n),n=o(n,this),this.matchStack=this.matchStack.concat(n))},addLoadListener:function(){this.run(),this.runLock&&(this.runLock=!1,window.addEventListener("scroll",this.run,!1),window.addEventListener("resize",this.run,!1),window.addEventListener("orientchange",this.run,!1))},removeLoadListener:function(){window.removeEventListener("scroll",this.run,!1),window.removeEventListener("resize",this.run,!1),window.removeEventListener("orientchange",this.run,!1),this.runLock=!0},run:function(){var t=s.matchStack;if(0===t.length)return s.removeLoadListener(),void 0;for(var e=0;e<t.length;e++){var o=t[e];i(o,s)&&(n(o,s),t.splice(e,1),e--)}}};"complete"===document.readyState?s.init():document.addEventListener("DOMContentLoaded",function(){s.init()},!1),window.lazyload=s}();