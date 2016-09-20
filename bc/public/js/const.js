/**
 * Created by think on 2016/9/11.
 */
window.global = {};
var SERVER_PATH="";
window.global.SERVER_PATH = SERVER_PATH;
window.global.SERVER_URL = {
    USER_INFO: SERVER_PATH + '/user-info',
    RECORD_CREATE: SERVER_PATH + '/record/create',
    RECORD_RANK: SERVER_PATH + '/records',
    INC_LINK_VIEW: SERVER_PATH + '/link/view',
    GET_LINK_VIEW: SERVER_PATH + '/link/view',
    WECHAT_SHARE_PARAMS: 'http://wildwithin.cn/wechat2/api/jssdk-params'
}

console.info(window.global.SERVER_URL)