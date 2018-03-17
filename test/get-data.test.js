const assert = require('assert');

const promout = require('promout');
const proxyquire = require('proxyquire');

const tableName = {};
const getData = proxyquire('../lib/get-data.js', {
    './db-client': {
        getAll:(_tableName) => {
            assert.deepStrictEqual(tableName, _tableName);
            return promout({ Items:[] }, 0);
        }
    }
});

describe('test to create group', () => {
    it('should pass the group name to createLogGroup', (done) => {
        getData(tableName).then(() => done()).catch(done);
    });

    it('should return a promise rejected if timeout is broken', (done) => {
        const getData = proxyquire('../lib/get-data.js', {
            './db-client': {
                getAll:(_tableName) => {
                    assert.deepStrictEqual(tableName, _tableName);
                    return promout({ Items:[] }, 4000);
                }
            }
        });
        getData(tableName).catch((err) => {
            assert(err.message === 'timeout broken');
            done();
        });
    });
});

