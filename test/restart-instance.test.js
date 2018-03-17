const assert = require('assert');

const proxyquire = require('proxyquire');

const stub = () => ({
    lambdifying: {
        invoke: (name, data) => {
            assert(name, 'FunctionName:Event');
            assert.deepEqual(data, {
                ip: '12.12.12.12',
                action: 'restart',
                isPublic: false
            }
            );
            return Promise.resolve({ test:'test' });
        }
    }
});


describe('test to parse string from base 64 to utf8', () => {
    it('should parse correctly the string given', async() => {
        process.env.LAMBDA_NAME_RESTART_INSTANCE = 'FunctionName';
        const restart = proxyquire(
            '../lib/restart-instance.js',
            stub('', JSON.stringify({ test:'test' }), '')
        );

        const res = await restart('http://12.12.12.12:4000/testing');

        assert.deepEqual(res, { test: 'test' });
    });
});

