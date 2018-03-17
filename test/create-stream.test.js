const assert = require('assert');

const proxyquire = require('proxyquire');
const promout = require('promout');

const logGroupName = {};
const logStreamName = {};
const createStream = proxyquire('../lib/create-stream', {
    './logs-client': {
        createLogStream:({ logGroupName:_group, logStreamName:_stream }) => {
            assert.deepStrictEqual(_group, logGroupName);
            assert.deepStrictEqual(_stream, logStreamName);
            return { promise: () => promout(null, 0) };
        }
    }
});

describe('test to create group', () => {
    it('should pass the group name to createLogGroup', (done) => {
        createStream(logGroupName, logStreamName).then(() => done()).catch(done);
    });

    it('should return a promise rejected if timeout is broken', (done) => {
        const createStream = proxyquire('../lib/create-stream', {
            './logs-client': {
                createLogStream:({ logGroupName:_group, logStreamName:_stream }) => {
                    assert.deepStrictEqual(_group, logGroupName);
                    assert.deepStrictEqual(_stream, logStreamName);
                    return { promise: () => promout(null, 4000) };
                }
            }
        });
        createStream(logGroupName, logStreamName).catch((err) => {
            assert(err.message === 'timeout broken');
            done();
        });
    });
});
