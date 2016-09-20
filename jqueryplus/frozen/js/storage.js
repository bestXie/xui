var storage={},ls,isStorable=true,methods,expiredListTableKey="storage.expiredList";methods={get:function(a){var b=ls.getItem(a);return b===undefined||b===null?undefined:getValueByExpire(a,b)},set:function(b,c,a){this.remove(b);a&&addExpire(b,a);return setValue(b,c)},remove:function(a){deleteExpiredDate(a);ls.removeItem(a)},clear:function(){ls.clear()},getExpiredDate:function(a){if(!ls.getItem(a)){return undefined}else{return getExpiredDate(a)}}};function init(){if("localStorage" in window){try{ls=window.localStorage;if(ls!==null){ls.setItem("storage.test.key","");isStorable=true;ls.removeItem("storage.test.key")}else{isStorable=false}}catch(a){console.info(a);if(a.code==22&&ls.length===0){isStorable=false}}}else{isStorable=false}}function addMethod(b){var c=function(){console.warn("抱歉，您的浏览器暂不支持localstoarage的使用! 无法使用该接口!");return undefined};for(var a in b){storage[a]=isStorable?b[a]:c}}function getValueByExpire(a,b){if(isExpired(a)){ls.removeItem(a);return undefined}else{return b}}function setValue(a,c){try{Object.prototype.toString.apply(c)==="[object Object]"&&(c=JSON.stringify(c));ls.setItem(a,c);return undefined}catch(b){if(b.code==22){console.log("storage已满，无法在储存新的数据")}else{console.error(b)}return b}}function addExpire(b,a){if(a!==undefined){try{var d=ls.getItem(expiredListTableKey);d=d?JSON.parse(d):{};a=Object.prototype.toString.apply(a)==="[object Date]"?a.getTime():((+new Date())+a*1000);d[b]=a;ls.setItem(expiredListTableKey,JSON.stringify(d))}catch(c){console.warn(c)}}}function isExpired(b){var d=ls.getItem(expiredListTableKey);if(!d){return false}d=JSON.parse(d);for(var a in d){if(a==b){var c=Number(d[a])-(+new Date())<0;c&&deleteExpiredDate(b);return c}}return false}function getExpiredDate(b){var c=ls.getItem(expiredListTableKey);if(!c){return undefined}c=JSON.parse(c);for(var a in c){if(a==b){if(!ls.getItem(b)){deleteExpiredDate(b);return undefined}else{return new Date(c[b])}}}return undefined}function deleteExpiredDate(a){var b=ls.getItem(expiredListTableKey);if(!b){return}b=JSON.parse(b);delete b[a];ls.setItem(expiredListTableKey,JSON.stringify(b))}init();addMethod(methods);
function parseQueryString(e){for(var t,r={},i=e.replace(/^\?/,"").split("&"),n=i.length,a=0;n>a;a++)i[a]&&(t=i[a].split("="),r[t[0]]=t.length>0?decodeURIComponent(t[1]):"");return r}function setQueryString(e,t,r){null===r?delete e.params[t]:e.params[t]=r;var i=[];for(var n in e.params)i.push(n+"="+encodeURIComponent(decodeURIComponent(e.params[n])));return e.query="?"+i.join("&"),e}function type(e){return Object.prototype.toString.call(e)}function isString(e){return"[object String]"==type(e)}function isObj(e){return"[object Object]"==type(e)}function isUriObj(e){return isObj(e)&&"uri"===e.__type__}var uri={parse:function(e){if(isUriObj(e))return e;var t=document.createElement("a");t.href=e;var r={source:e,protocol:t.protocol.replace(":",""),host:t.hostname,port:t.port,query:t.search,params:parseQueryString(t.search),file:(t.pathname.match(/\/([^\/?#]+)$/i)||[,""])[1],hash:t.hash.replace("#",""),path:t.pathname.replace(/^([^\/])/,"/$1"),relative:(t.href.match(/tps?:\/\/[^\/]+(.+)/)||[,""])[1],segments:t.pathname.replace(/^\//,"").split("/"),__type__:"uri"};return r.toString=function(){return uri.stringify(r)},r},stringify:function(e){var t="";return t+=e.protocol+"://",t+=e.host+(e.port?":"+e.port:""),t+=e.path,t+=e.query,e.hash&&(t+="#"+e.hash),t},setParam:function(e,t,r){var i=this.parse(e);if(isObj(t))for(var n in t)setQueryString(i,n,t[n]);else setQueryString(i,t,r);return isString(e)?i.toString():i},getParam:function(e,t){var r=this.parse(e);return r.params[t]},removeParam:function(e,t){var r=isUriObj(e)?e:this.parse(e);return r=setQueryString(r,t,null),isUriObj(e)?r:r.toString()}};