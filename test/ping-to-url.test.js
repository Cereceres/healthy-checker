const assert = require('assert');

const proxyquire = require('proxyquire');
const promout = require('promout');
const uri = {};
const ping = proxyquire('../lib/ping-to-url.js', {
    request:{
        get: (params, cb) => {
            assert.deepStrictEqual(params.uri, uri);
            assert(params.timeout);
            promout(null, 0).then(() => cb(null, { statusCode:200 }));
        }
    }
});

describe('test to create group', () => {
    it('should pass the group name to createLogGroup', (done) => {
        ping(uri).then(() => done()).catch(done);
    });
});
