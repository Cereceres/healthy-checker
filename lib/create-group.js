const cloudwatchlogs = require('./logs-client');
const promiseout = require('promiseout');


module.exports = (logGroupName) => promiseout(cloudwatchlogs.createLogGroup({
    logGroupName
}).promise());
