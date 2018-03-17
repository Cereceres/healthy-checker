const assert = require('assert');

const co = require('co-tchar');
const proxyquire = require('proxyquire');
const groupName = {};
let i = 0;
const createAllStream = proxyquire('../lib/create-all-streams.js', {
    './create-stream': (logGroupName, logStreamName) => {
        assert(logGroupName === groupName);
        assert(logStreamName === 'test');
        i++;
        return Promise.resolve({});
    }
});

describe('test to create group', () => {
    it('should pass the group name to createLogGroup', (done) => {
        co(createAllStream([ 'test' ], groupName))
            .then(() => {
                if (i === 1) done();
            })
            .catch(done);
    });
});
