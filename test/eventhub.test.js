import EventHub from '../src/event-hub';

test('event-hub fire on', () => {
    const eventHub = EventHub.createEvents(window);
    const mockFn = jest.fn();
    const data = {
        data: 'test'
    };
    eventHub.on('custom-event', mockFn);
    eventHub.fire('custom-event', data);
    data.preventDefault();

    expect(mockFn).toBeCalled();
});

test('event-hub fire args', () => {
    const eventHub = EventHub.createEvents(window);

    eventHub.fire('custom-args', 'data');
    eventHub.fire('custom-args');
});

test('EventHub mix', () => {
    const testObj = {
        test: undefined
    };

    EventHub.mix(testObj, {
        b: undefined
    }, true);
});

test('EventHub mix map', () => {
    const testA = {};
    const testB = {
        test: 'test'
    };

    Object.defineProperty(testA, 'test', {
        value: 'test_update',
        enumerable: false,
        writable: true
    });

    EventHub.mix(testA, testB);
});
