/**
 * @desc   将对象用 “&” 拼接成url 格式
 * @param  {Object} obj
 * @return {String}
 */

import { isObject, isArray } from './types';

/**
 * 将json转为url参数
 * 不能包含特殊字符
 * json可控的情况下可调用此方法
 * @param {*} obj
 */
export const jsonToUrl = (obj = {}) => {
    const keys = Object.keys(obj);

    return keys.map(key => `${(key)}=${(obj[key])}`).join('&');
};

/**
 * 将json转为url参数
 * 特殊字符会encodeURI
 * json不可知，可能会有特殊字符，建议调用此方法
 * @param {*} obj
 */
export const encodeURIJson = (obj = {}, split = '&') => {
    const pairs = [];
    const keys = Object.keys(obj);

    keys.forEach((key) => {
        const value = obj[key];

        if (['', undefined, null].includes(value)) {
            return;
        }

        if (isArray(value)) {
            for (let i = 0; i < value.length; ++i) {
                pairs.push(`${encodeURIComponent(`${key}[${i}]`)}=${encodeURIComponent(value[i])}`);
            }

            return;
        }
        pairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`);
    });

    return pairs.join(split);
};


/**
 * 设置url中参数的值
 * 对象属性设置为空，认为是删除该参数
 * @param {*} url
 * @param {*} params
 */
export const setUrlParams = (originUrl = window.location.href, opts = {}) => {
    let url = originUrl;
    let params = opts;

    /**
     * 如果只传了一个参数，默认url 为  window.location.href
     */
    if (isObject(url)) {
        params = {
            ...url
        };

        url = window.location.href;
    }

    const paramsKeys = Object.keys(params);
    const urlJson = urlToJson(url);

    paramsKeys.forEach((key) => {
        // 设置参数为空，即删除此参数
        if (params[key] === '') {
            delete urlJson[key];
        } else {
            urlJson[key] = params[key];
        }
    });

    let [rel] = url.split('?');

    if (Object.keys(urlJson).length !== 0) {
        rel = `${rel}?${jsonToUrl(urlJson)}`;
    }

    return rel;
};

/**
 * 将字符串转为对象
 * strToJson('a=1;b=2;', ';')
 */
export const strToJson = (str, key = '&') => {
    if (!str) {
        return {};
    }

    const dataObj = {};
    const strArr = str.split(key);

    for (let i = 0, len = strArr.length; i < len; i++) {
        const paramArr = strArr[i].split('=');
        const [key, val] = paramArr;

        dataObj[key] = val;
    }

    return dataObj;
};

/**
 * 将url后的参数转为对象
 * @param {*} url
 */
export const urlToJson = (url = window.location.href) => {
    const urlObject = {};
    const index = url.indexOf('?');

    if (index === -1) {
        return urlObject;
    }

    const urlString = url.substring(index + 1);
    const urlArray = urlString.split('&');

    for (let i = 0, len = urlArray.length; i < len; i++) {
        const urlItem = urlArray[i];
        const item = urlItem.split('=');
        const [key, value] = item;

        urlObject[key] = value;
    }

    return urlObject;
};

/**
 * 将 url中的 http | https转为 protocol
 * @param {*} url
 * @param {*} protocol
 * @returns { String }
 */
export const convertProtocol = (url = '', proto = window.location.protocol) => {
    const protocol = proto.replace(':', '');

    return url.replace(/^(http:|https:)/i, `${protocol}:`);
};
