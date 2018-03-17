const nock = require('nock');
const assert = require('assert');
const proxyquire = require('proxyquire');

exports.mock = () => {
    nock.recorder.rec();
};

exports.handler = () => {
    process.env.TAIL_TIME_TO_FINISH = 10000;
    const url = 'http://localhost:3000';
    const timeout = {};
    const stub = {
        './lib/get-data':(tableName) => {
            assert(typeof tableName === 'string');
            return Promise.resolve([ { url, timeout } ]);
        },
        './lib/create-group':(name) => {
            assert(name);
            assert(typeof name === 'string');
            return Promise.resolve({});
        },
        './lib/iterate-over-urls':(urls, streams, TableName, logGroupName) => {
            assert(urls);
            assert(streams);
            assert(TableName);
            assert(logGroupName);
            return (function *() {}());
        },
        './lib/create-all-streams':(streams, logGroupName) => {
            assert(Array.isArray(streams));
            assert(logGroupName);
            return (function *() {}());
        }
    };
    const { handler } = proxyquire('../index', stub);
    return handler;
};
