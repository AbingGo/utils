import { clear, mockUserAgent } from 'jest-useragent-mock';
import device from '../src/device';

describe('test device type', () => {
    afterEach(() => {
        clear();
    });

    test('is iphone', () => {
        const mockAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1';
        mockUserAgent(mockAgent);

        expect(device.isIphone()).toBeTruthy();
        expect(device.isHuawei()).toBeFalsy();
        expect(device.isHonor()).toBeFalsy();
        expect(device.isOppo()).toBeFalsy();
        expect(device.isOppoR15()).toBeFalsy();
        expect(device.isVivo()).toBeFalsy();
        expect(device.isXiaomi()).toBeFalsy();
        expect(device.isXiaomi2s()).toBeFalsy();
        expect(device.isRedmi()).toBeFalsy();
        expect(device.isSamsung()).toBeFalsy();
    });
});
