const cloudwatchlogs = require('./logs-client');

module.exports = function *(logEvents = [], logGroupName, logStreamName, sequenceToken) {
    console.log('requests ', logEvents);
    const params = { logGroupName, logStreamName, sequenceToken };

    params.logEvents = logEvents;
    const res = yield cloudwatchlogs.putLogEvents(params).promise();
    console.log('res   =  ', res);
    if (res.error) throw res.error;
    return yield Promise.resolve(res);
};
