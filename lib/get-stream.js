const logsClient = require('./logs-client');
const promiseout = require('promiseout');


module.exports = (logGroupName, logStreamName) => promiseout(logsClient.describeLogStreams({
    logGroupName,
    logStreamNamePrefix: logStreamName,
}).promise());
