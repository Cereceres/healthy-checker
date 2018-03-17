const assert = require('assert');

const promout = require('../index');

describe('test to promout', () => {
    it('should resolve the promise after timeout', async() => {
        const res = {};
        const init = Date.now();
        const _res = await promout(res, 50);
        const finish = Date.now();

        assert(finish - init >= 50);
        assert(_res === res);
    });

    it('should resolve the promise after timeout', async() => {
        const init = Date.now();
        const _res = await promout(50);
        const finish = Date.now();

        assert(finish - init >= 50);
        assert(_res === 50);
    });

    it('should reject the promise after timeout', async() => {
        const res = {};
        const init = Date.now();
        const _res = await promout.reject(res, 50).catch((res) => res);
        const finish = Date.now();

        assert(finish - init >= 50);
        assert(_res === res);
    });

    it('should reject the promise after timeout', async() => {
        const init = Date.now();
        const _res = await promout.reject(50).catch((res) => res);
        const finish = Date.now();
        assert(finish - init >= 50);
        assert(_res === 50);
    });
});
