import { deepcopy, loadScript, once, sleep, throttle, versionCompare } from '../src';

test('测试 throttle', async () => {
    let count = 0;
    const addCount = throttle(() => {
        count += 1;
    });

    for (let i = 0; i < 10; i++) {
        await sleep(80);
        addCount();
    }
    expect(count).toEqual(2);
});

test('测试 once', () => {
    let count = 0;
    const addCount = once(() => {
        count += 1;
    });

    for (let i = 0; i < 10; i++) {
        addCount();
    }
    expect(count).toEqual(1);
});

test('测试 deepcopy', () => {
    const test = {
        test: 'test'
    };

    const arr = [1, 2, 3];
    const list = {
        a: test,
        b: test,
        c: arr,
        d: arr
    };

    const copyA = deepcopy(list);

    expect(list).toEqual(copyA);
});

test('测试 loadScript', () => {
    const src = 'https://xxxxx.com/a.js';
    document.body.innerHTML = `
            <script></script>`;
    const script = loadScript(src, () => {});
    const unCallback = loadScript(src);

    expect(script.src).toEqual(src);
    expect(unCallback.src).toEqual(src);
});

test('测试versionCompare 版本比较', () => {
    const params = versionCompare();
    const paramsNaN = versionCompare('1.x.x', '1.x.x');
    const paramsLen = versionCompare('1.1.1.1', '1.1');
    const less = versionCompare('1.1', '1.1.14');
    const equal = versionCompare('1.1', '1.1.0');
    const than = versionCompare('1.2', '1.1.99');

    expect(params).toEqual(0);
    expect(paramsNaN).toEqual(0);
    expect(less).toEqual(-1);
    expect(equal).toEqual(0);
    expect(than).toEqual(1);
    expect(paramsLen).toEqual(1);
});
