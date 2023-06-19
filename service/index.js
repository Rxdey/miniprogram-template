import APIS from './api';
import request from './request';

// 从api导出接口方法简易版
const server = Object.keys(APIS).reduce((prve, next) => {
    prve[next] = Object.keys(APIS[next]).reduce((p, n) => {
        p[n] = (...arg) => request.call(null, APIS[next][n], ...arg);
        return p;
    }, {});
    return prve;
}, {});

export default server;