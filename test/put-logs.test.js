const assert = require('assert');

const proxyquire = require('proxyquire');
const co = require('co-tchar');
const promout = require('promout');


const groupName = {};
const streamName = {};
const logs = [];
const response = {};
const putLogs = proxyquire('../lib/put-logs', {
    './logs-client': {
        putLogEvents:({ logGroupName, logStreamName, logEvents }) => {
            assert.deepStrictEqual(logGroupName, groupName);
            assert.deepStrictEqual(logEvents, logs);
            assert.deepStrictEqual(logStreamName, streamName);
            return { promise:() => promout(response, 0) };
        }
    }
});

describe('test to create group', () => {
    it('should pass the group name to createLogGroup', (done) => {
        co(putLogs(logs, groupName, streamName)).then(() => done()).catch(done);
    });
});

