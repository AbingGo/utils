/**
 * 判断是否是数字
 */
export const isNum = (s) => {
    if (s !== null && s !== '') {
        return !isNaN(s);
    }

    return false;
};

export const isArray = arr => Array.isArray(arr);

export const isBoolean = val => typeof val === 'boolean';

export const isString = obj => Object.prototype.toString.call(obj) === '[object String]';

export const isObject = obj => Object.prototype.toString.call(obj) === '[object Object]';

export const isHtmlElement = node => node && node.nodeType === Node.ELEMENT_NODE;

export const isFunction = (functionToCheck) => {
    const getType = {};

    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
};

export const isUndefined = val => val === undefined;

export const isDefined = val => val !== undefined && val !== null;

export const isTruthy = val => val && val !== undefined && val !== null && val !== '';

export const isNull = value => value === null;

/**
 *
 * @desc   判断`obj`是否为空
 * @param  {Object} obj
 * @return {Boolean}
 */
export const isEmptyObject = (obj) => {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
        return false;
    }

    return !Object.keys(obj).length;
};
