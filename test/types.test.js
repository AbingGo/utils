import { isNum, isArray, isBoolean, isDefined, isEmptyObject, isFunction, isHtmlElement, isNull, isObject, isString, isTruthy, isUndefined } from '../src/types';


const testString = '生活给你的扑面而来的惊喜';

const emptyObject = {};

const testNull = null;

const testUndefined = undefined;

const testArray = [
    { name: '来左边跟我一起画个龙' },
    { name: '在你右边画一道彩虹' }
];

const testFunction = () => {
    console.log('不忘初心，好人一生平安');
};

const testObject = {
    test: '反正闲着也是闲着，不如甜一下'
};

document.body.innerHTML = `
            <div id="test-dom"></div>
        `;
const testDom = document.getElementById('test-dom');

test('判断是否是数字或者数字字符串', () => {
    expect(isNum(11111)).toBeTruthy();
    expect(isNum('22222')).toBeTruthy();
    expect(isNum('aaaa')).toBeFalsy();
    expect(isNum(undefined)).toBeFalsy();
    expect(isNum(null)).toBeFalsy();
    expect(isNum('')).toBeFalsy();
});

test('判断是否是 Boolean', () => {
    expect(isBoolean(false)).toBeTruthy();
});

test('判断是否是 String', () => {
    expect(isString(testString)).toBeTruthy();
});

test('判断是否是 Function', () => {
    expect(isFunction(testFunction)).toBeTruthy();
});

test('判断是否是 Object', () => {
    expect(isObject(testObject)).toBeTruthy();
});

test('判断是否是 empty Object', () => {
    expect(isEmptyObject(emptyObject)).toBeTruthy();
    expect(isEmptyObject(testArray)).toBeFalsy();
    expect(isEmptyObject()).toBeFalsy();
});

test('判断是否是 Array', () => {
    expect(isArray(testArray)).toBeTruthy();
});

test('判断是否是 html dom', () => {
    expect(isHtmlElement(testDom)).toBeTruthy();
});

test('判断是否是 null', () => {
    expect(isNull(testNull)).toBeTruthy();
});

test('判断是否是 defined', () => {
    expect(isDefined(testUndefined)).toBeFalsy();
    expect(isDefined(isEmptyObject)).toBeTruthy();
});

test('判断是否有值', () => {
    expect(isTruthy('')).toBeFalsy();
    expect(isTruthy('aaa')).toBeTruthy();
});

test('判断是否是 undefined', () => {
    expect(isUndefined(testUndefined)).toBeTruthy();
});
