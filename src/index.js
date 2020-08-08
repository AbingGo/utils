/**
 * 节流函数
 * 默认500ms执行一次
 * @param {*} fn
 * @param {*} time
 */
export const throttle = (fn, time = 500) => {
    let timer = null;

    return function (...args) {
        if (timer === null) {
            fn.apply(this, args);
            timer = setTimeout(() => {
                timer = null;
            }, time);
        }
    };
};

export const once = (fn) => {
    let result;
    let func = fn;

    return function (...args) {
        if (func) {
            result = func.apply(this, args);
            func = null;
        }

        return result;
    };
};

export const sleep = time => new Promise(resolve => setTimeout(resolve, time));

// 深拷贝
export const deepcopy = (obj, cache = []) => {
    const find = (list, f) => list.filter(f)[0];
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    const hit = find(cache, c => c.original === obj);

    if (hit) {
        return hit.copy;
    }

    const copy = Array.isArray(obj) ? [] : {};
    cache.push({
        original: obj,
        copy
    });

    Object.keys(obj).forEach((key) => {
        copy[key] = deepcopy(obj[key], cache);
    });

    return copy;
};

// 加载js
export const loadScript = (url, success) => {
    const [firstScript] = window.document.getElementsByTagName('script');
    const script = window.document.createElement('script');
    script.src = url;
    script.type = 'text/javascript';
    script.async = false;
    firstScript.parentNode.insertBefore(script, firstScript);

    if (typeof success === 'function') {
        script.onload = success;
    }

    return script;
};


// 版本号比较
export const versionCompare = (preVersion = '', lastVersion = '') => {
    const preList = preVersion.split('.');
    const lastList = lastVersion.split('.');
    const maxL = Math.max(preList.length, lastList.length);

    let result = 0;
    for (let i = 0; i < maxL; i++) {
        const preValue = preList.length > i ? preList[i] : 0;
        const preNum = isNaN(Number(preValue)) ? preValue.charCodeAt() : Number(preValue);
        const lastValue = lastList.length > i ? lastList[i] : 0;
        const lastNum = isNaN(Number(lastValue)) ? lastValue.charCodeAt() : Number(lastValue);

        if (preNum < lastNum) {
            result = -1;
            break;
        } else if (preNum > lastNum) {
            result = 1;
            break;
        }
    }

    return result;
};
