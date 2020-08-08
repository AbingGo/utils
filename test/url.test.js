import { convertProtocol, encodeURIJson, setUrlParams, strToJson, urlToJson, jsonToUrl } from '../src/url';


test('将对象转的key,value用&连接', () => {
    expect(jsonToUrl()).toBe('');
});
describe('test encodeURIJson', () => {
    test('将对象转的key,value用&连接', () => {
        const test = {
            a: '&aaaa',
            b: 'bbbb',
            c: [0, 1],
            d: ''
        };

        expect(encodeURIJson(test)).toBe(`a=${encodeURIComponent('&aaaa')}&b=bbbb&${encodeURIComponent('c[0]')}=0&${encodeURIComponent('c[1]')}=1`);
    });

    test('测试空对象用&连接', () => {
        const test = {};

        expect(encodeURIJson(test)).toBe('');
    });

    test('测试调用错误', () => {
        expect(encodeURIJson()).toBe('');
    });
});

describe('test setUrlParams', () => {
    const url = 'https://xxxxx/com/qeOMCQu0.html';
    const noBranchUrl = 'https://xxxxx/com/qeOMCQu0.html?test=111';

    test('测试删除url中的某个字段', () => {
        const delUrl = setUrlParams(url, {
            id: 'qeOMCQu0',
            test: ''
        });

        const json = urlToJson(delUrl);
        const noBranchJson = urlToJson(url);
        const noUrlJson = urlToJson();

        expect(json.id).toBe('qeOMCQu0');
        expect(json.actadid).toBeUndefined();
        expect(noBranchJson.actadid).toBeUndefined();
        expect(noUrlJson.actadid).toBeUndefined();
    });

    test('测试删除默认url为location.href', () => {
        const url1 = setUrlParams();
        const url2 = setUrlParams({
            a: '',
            b: ''
        });
        const testurl = setUrlParams(noBranchUrl, {
            test: '222'
        });
        expect(url1).toBe('http://localhost/');
        expect(url2).toBe('http://localhost/');
        expect(testurl).toBe('https://xxxxx/com/qeOMCQu0.html?test=222');
    });
});


describe('test strToJson', () => {
    const cookies = 'a=1;b=2;c=3';
    const url = 'a=1&b=2&c=3';
    test('测试将cookie转为对象', () => {
        const coonieJson = strToJson(cookies, ';');
        const urlJson = strToJson(url);
        const emptyJson = strToJson();

        expect(coonieJson.a).toBe('1');
        expect(urlJson.a).toBe('1');
        expect(emptyJson.a).toBeUndefined();
    });
});

test('测试 convertProtocol', () => {
    const url = 'https://a.com/a.jpg';
    const rel = convertProtocol(url);
    const test = convertProtocol();

    expect(rel).toEqual('http://a.com/a.jpg');
    expect(test).toEqual('');
});
