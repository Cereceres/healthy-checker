const assert = require('assert');

const promout = require('promout');
const proxyquire = require('proxyquire');


const groupName = {};
const createGroup = proxyquire('../lib/create-group.js', {
    './logs-client': {
        createLogGroup:({ logGroupName:_group }) => {
            assert.deepEqual(_group, groupName);
            return { promise: () => promout(null, 0) };
        }
    }
});

describe('test to create group', () => {
    it('should pass the group name to createLogGroup', (done) => {
        createGroup(groupName).then(() => done()).catch(done);
    });
    it('should return a promise rejected if timeout is broken', (done) => {
        const createGroup = proxyquire('../lib/create-group.js', {
            './logs-client': {
                createLogGroup:({ logGroupName:_group }) => {
                    assert.deepEqual(_group, groupName);
                    return { promise: () => promout(null, 4000) };
                }
            }
        });
        createGroup(groupName).catch((err) => {
            assert(err.message === 'timeout broken');
            done();
        });
    });
});
