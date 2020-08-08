import jsdom from 'jsdom';
import cookie from '../src/cookie';

const dom = new jsdom.JSDOM();
const cookieName = 'name';
const cookieValue = 'namevalue';

let domCookie = dom.window.document.cookie;

test('cookie get', () => {
    expect(cookie.get('name')).toBe('');
});


test('cookie set', () => {
    Object.defineProperty(document, 'cookie', {
        set: jest.fn().mockImplementation(() => {
            domCookie = `${cookieName}=${cookieValue}`;
        }),
        get: jest.fn().mockImplementation(() => domCookie)
    });

    cookie.set(cookieName, cookieValue, {
        domain: 'qq.com',
        path: '/',
        secure: true,
        expires: new Date()
    });

    cookie.set('data', null);

    expect(cookie.get(cookieName)).toBe(cookieValue);
    expect(cookie.get('uin')).toBe('');
    expect(cookie.get('data')).toBe('');
});

test('cookie get', () => {
    const { name } = cookie.get();
    expect(name).toBe(cookieValue);
});

test('cookie delete', () => {
    cookie.set('delname', cookieValue);
    cookie.del('delname');
    cookie.del(['delname']);
    expect(cookie.get('delname')).toBe('');
});

