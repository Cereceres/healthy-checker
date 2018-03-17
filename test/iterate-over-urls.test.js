const assert = require('assert');

const co = require('co-tchar');
const proxyquire = require('proxyquire');
const urls = (rebootIfDown) => [ {
    url:'test',
    timeout:'timeout',
    status: 'status',
    rebootAt: 'rebootAt',
    rebootIfDown
} ];
const streams = [ 'test' ];
const request = {};
const log = {};
let i = 0;
const getStub = (reboot) => ({
    './ping-to-url':(url, timeout) => {
        i++;
        assert(url === 'test');
        assert(timeout === 'timeout');
        return Promise.resolve(request);
    },
    './check-if-necessary-restart':() => {
        i++;
        return { reboot, newStatus:'newStatus' };
    },
    './get-logs-event': (req, timeout) => {
        assert(req === request);
        assert(timeout === 'timeout');
        i++;
        return { log, status:'DOWN' };
    },
    './restart-instance':(url) => {
        assert(url === 'test');
        i++;
        return Promise.resolve({});
    },
    './put-logs':([ _log ], logGroupName, logStreamName, sequenceToken) => {
        assert(log === _log);
        assert(logGroupName === 'test');
        assert(logStreamName === 'test');
        assert(sequenceToken === 'uploadSequenceToken');
        i++;
        return Promise.resolve({});
    },
    './update-item':({ url }, { reviewedAt, instanceStatus, rebootAt }, TableName) => {
        assert(instanceStatus === 'newStatus');
        if (reboot) assert(rebootAt > 0);
        else assert(rebootAt === 'rebootAt');
        assert(url === 'test');
        assert(reviewedAt > 0);
        assert(TableName === 'test');
        i++;
        return Promise.resolve();
    },
    './get-stream':(logGroupName, logStreamName) => {
        assert(logGroupName);
        assert(logStreamName);
        i++;
        return Promise.resolve({
            logStreams:[
                {
                    uploadSequenceToken:'uploadSequenceToken'
                }
            ]
        });
    }
});

describe('test to create group', () => {
    it('should pass the group name to createLogGroup', (done) => {
        const iterateOverUrls = proxyquire('../lib/iterate-over-urls.js', getStub(true));
        const iterator = iterateOverUrls(urls(), streams, 'test', 'test');
        co(iterator)
            .then(() => {
                if (i === 6) done();
            })
            .catch(done);
    });

    it('should pass the group name to createLogGroup', (done) => {
        const iterateOverUrls = proxyquire('../lib/iterate-over-urls.js', getStub());
        co(iterateOverUrls(urls(), streams, 'test', 'test'))
            .then(() => {
                if (i === 12) done();
            })
            .catch(done);
    });

    it('should pass the group name to createLogGroup', (done) => {
        const iterateOverUrls = proxyquire('../lib/iterate-over-urls.js', getStub(true));
        co(iterateOverUrls(urls(true), streams, 'test', 'test'))
            .then(() => {
                if (i === 19) done();
            })
            .catch(done);
    });

    it('should pass the group name to createLogGroup', (done) => {
        const iterateOverUrls = proxyquire('../lib/iterate-over-urls.js', getStub(true));
        co(iterateOverUrls(urls(false), streams, 'test', 'test'))
            .then(() => {
                if (i === 25) done();
            })
            .catch(done);
    });
});
