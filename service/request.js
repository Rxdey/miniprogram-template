import { mergeObjects } from '../utils';
import { BASE_URL } from '../utils/env';

const DEFAULT_OPTIONS = {
    header: {

    },
    timeout: 60 * 1000
};

/**
 * @param {*} options 
 * @param {*} data 
 * @param {*} {loading}: 加载提示  
 * @returns Promise<[isError, data]>
 */
export const request = (options, data, { loading = false }) => {
    const optionResult = mergeObjects(options, DEFAULT_OPTIONS);
    optionResult.url = `${BASE_URL}${optionResult.url}`;
    optionResult.method = optionResult.method ? optionResult.method.toUpperCase() : optionResult.method;
    optionResult.data = data;
    // optionResult.header = {

    // }
    return new Promise((resolve) => {
        optionResult.success = (res) => {
            // 500等错误也会进success
            const { statusCode } = res;
            const actions = {
                401: '授权失败',
                403: '系统异常',
                500: '系统异常',
                404: '请求地址不存在',
            };

            if (statusCode !== 200) {
                uni.showToast({
                    icon: 'none',
                    duration: 3000,
                    title: actions[statusCode]
                });
                resolve([res || true, null]);
                return;
            }
            resolve([null, res.data]);
        };
        optionResult.fail = (err) => {
            uni.showToast({
                icon: 'none',
                duration: 3000,
                title: '服务器错误,请稍后再试'
            });
            resolve([err || true, null]);
        };
        optionResult.complete = () => {

        };
        uni.request(optionResult);
    });
};