const assert = require('assert');

const parser = require('../../invoke/parse-body');
describe('the test to parse-body', () => {
    it('should parse the string', () => {
        const res = parser(JSON.stringify({ test:'test' }));

        assert.deepEqual(res, { test:'test' });
    });

    it('should parse the string', () => {
        const res = parser(JSON.stringify('test'));

        assert.deepEqual(res, 'test');
    });
});
