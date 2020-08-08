import LS from '../src/storage';

test('localStorage set', () => {
    const KEY = 'set_key';
    const VALUE = 'set_value';

    LS.setAge(0).set(KEY, VALUE);
});

test('localStorage set object', () => {
    const KEY = 'object_set';
    const VALUE = {
        a: 111
    };

    LS.set(KEY, VALUE).setAge(100);

    expect(LS.get(KEY)).toEqual(VALUE);
});

test('localStorage expire', () => {
    const KEY = 'expire_key';
    const VALUE = 'expire_val';

    LS.set(KEY, VALUE).setAge(-1);
    expect(LS.get(KEY)).toBeNull();
});

test('localStorage get', () => {
    const KEY = 'xxxxxxx';

    LS.get(KEY);
    expect(LS.get(KEY)).toBeNull();
});
