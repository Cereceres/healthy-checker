const assert = require('assert');

const getParams = require('../lib/get-params-restart');


describe('test to get params to restart instance', () => {
    it('should return params with status, ip and isPublic property', () => {
        const {
            ip,
            action,
            isPublic
        } = getParams('http://12.12.12.12:4000/testing');
        assert(ip === '12.12.12.12');
        assert(action);
        assert(typeof isPublic === 'boolean');
    });
});
