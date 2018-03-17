const assert = require('assert');

const parser = require('../../invoke/parse-base64');
describe('the test to parse-base64', () => {
    it('should parse the string', () => {
        const res = parser(new Buffer('test').toString('base64'));

        assert(res === 'test');
    });
});
