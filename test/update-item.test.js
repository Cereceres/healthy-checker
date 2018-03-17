const assert = require('assert');
const proxyquire = require('proxyquire');

const item = {};
const updated = {};
const TableName = {};
const result = { test:'test' };
const updateItem = proxyquire('../lib/update-item.js', {
    './db-client': {
        update:(_item, _updated, _TableName) => {
            assert.deepStrictEqual(_item, item);
            assert.deepStrictEqual(_updated, updated);
            assert.deepStrictEqual(_TableName, TableName);
            return Promise.resolve(result);
        }
    }
});

describe('test to create group', () => {
    it('should pass the group name to createLogGroup', async() => {
        const res = await updateItem(item, updated, TableName);
        assert.deepEqual(res, result);
    });
});
