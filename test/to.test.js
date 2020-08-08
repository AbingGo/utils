import to from '../src/to';

const promiseHello = name => new Promise((resolve) => {
    setTimeout(() => resolve(`Hello ${name}`), 1000);
});

const promiseCatch = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('error');
    }, 1000);
});

test('should get Hello World', async () => {
    const [err, data] = await to(promiseHello('World'));
    expect(err).toBeNull();
    expect(data).toBe('Hello World');
});

test('should get error', async () => {
    const [err] = await to(promiseCatch());
    expect(err).toBe('error');
});
