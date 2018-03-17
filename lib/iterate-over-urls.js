const pingToUrl = require('./ping-to-url');
const getLogsEvent = require('./get-logs-event');
const restartInstance = require('./restart-instance');
const putLogs = require('./put-logs');
const updateItem = require('./update-item');
const getStream = require('./get-stream');
const checkIfIsNecessaryReboot = require('./check-if-necessary-restart');

const defaultTimeOut = 10000;
const {
    TIMEOUT: timeoutDefault = defaultTimeOut,
} = process.env;

module.exports = function *(urls, streams, TableName, logGroupName) {
    const sequencesTokens = new Map();

    for (let i = 0, len = urls.length; i < len; i++) {
        const {
            url,
            rebootAt = 0,
            timeout = timeoutDefault,
            rebootIfDown
        } = urls[i];
        const logStreamName = streams[i];
        console.log('url ', url);
        console.log('logStreamName ', logStreamName);
        const stream = yield getStream(logGroupName, logStreamName);
        console.log('stream ', stream);
        const { logStreams:[ { uploadSequenceToken } ] } = stream;
        console.log('uploadSequenceToken ', uploadSequenceToken);
        sequencesTokens.set(logStreamName, uploadSequenceToken);
        const request = yield pingToUrl(url, timeout);
        console.log('request ', request);
        const sequenceToken = sequencesTokens.get(logStreamName);
        console.log('sequenceToken  ', sequenceToken);
        const { log:logEvents, status: status } = getLogsEvent(request, timeout);
        const { nextSequenceToken, error } = yield putLogs([ logEvents ], logGroupName, logStreamName, sequenceToken);
        sequencesTokens.set(logStreamName, nextSequenceToken);
        console.log('error in putlogs ', error);
        if (error) continue;
        // This functionality is removed
        const {
            reboot:isNecessaryRestartInstance,
            newStatus
        } = checkIfIsNecessaryReboot(status, rebootIfDown, rebootAt);
        console.log(`isNecessaryRestartInstance ${url } ${isNecessaryRestartInstance && rebootIfDown}`);

        if (isNecessaryRestartInstance && rebootIfDown) yield restartInstance(url);

        const urlUpdateFields = {
            rebootAt:isNecessaryRestartInstance ? Date.now() : rebootAt,
            reviewedAt: Date.now(),
            instanceStatus: newStatus
        };
        console.log('urlUpdateFields ', urlUpdateFields);
        const updated = yield updateItem({ url }, urlUpdateFields, TableName);
        console.log('updated item ', updated);
    }
};
