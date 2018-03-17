const assert = require('assert');
const getLogsEvent = require('../lib/get-logs-event');

describe('test to create group', () => {
    it('should pass the group name to createLogGroup', () => {
        const timeout = {};
        const { log } = getLogsEvent({
            url:'',
            timeout:'',
            error: new Error('error')
        }, timeout);
        assert(log.timestamp);
        assert(JSON.parse(log.message).status === 'DOWN');
        assert(JSON.parse(log.message).error);
    });

    it('should pass the group name to createLogGroup', () => {
        const timeout = {};
        const { log } = getLogsEvent([ {
            url:'',
            timeout:''
        } ], timeout);
        assert(log.timestamp);
        assert(JSON.parse(log.message).status === 'UP');
    });
});

