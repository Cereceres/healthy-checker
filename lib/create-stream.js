const cloudwatchlogs = require('./logs-client');
const promiseout = require('promiseout');

module.exports = (logGroupName, logStreamName) => promiseout(cloudwatchlogs.createLogStream({
    logGroupName,
    logStreamName
}).promise());
