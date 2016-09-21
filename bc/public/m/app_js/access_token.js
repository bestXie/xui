/**
 * Created by think on 2016/9/11.
 */
'use strict';
var _store = localStorage;
var cache = {
    get: function(key) {
        var data = _store.getItem(key);
        return data;
    },
    set: function(key, data) {
        if (typeof data != 'string') {
            data = JSON.stringify(data);
        }
        _store.setItem(key, data);
    },
    remove: function(key) {
        _store.removeItem(key);
    }
}

/* * * * * 读取地址栏是否有access_token，如果有写入cache中 * * * * */
var reg = /access_token=(\w+)/i;
var cache_access_token_key = 'vr2016_access_token';
var url = window.location.href;
var groups = reg.exec(url);
if (groups && groups.length) {
    cache.set(cache_access_token_key, groups[1]);
}

/* * * 获取access_token* * */
function getAccessToken() {
    var data = cache.get(cache_access_token_key)
    //检测access_token是否有效
    if (!data || data== null || data == undefined) {
        var currentUrl = window.location.href;
        var type = 'weibo';
        if (/micromessenger/i.test(window.navigator.userAgent)) {
            type = 'wechat';
        }
        location.href = 'http://wildwithin.cn/wechat2/api/oauth-url?backUrl='+currentUrl+'&type='+type;
        return;
    }
    return data;
}

getAccessToken();