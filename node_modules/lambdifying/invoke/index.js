const { Lambda } = require('aws-sdk');
const lambda = new Lambda();

const parseBody = require('./parse-body');
const parseBase64 = require('./parse-base64');

const invocationTypeValids = new Set([ 'Event', 'RequestResponse', 'DryRun' ]);
const LogTypeValids = new Set([ 'Tail', 'None' ]);
const promiseRejectedBecauseNotName = () => Promise.reject(new Error('FunctionName is required'));
const defaultInvocationType = 'RequestResponse';
const defaultQualifier = '$LATEST';
const defaultLogType = 'Tail';

const invoke = module.exports = (name, Payload = {}, LogType = defaultLogType) => {
    const client = invoke.client instanceof Lambda ? invoke.client : lambda;
    let Qualifier = null;
    let FunctionName = null;
    let InvocationType = null;
    [
        FunctionName,
        Qualifier = defaultQualifier,
        InvocationType = defaultInvocationType
    ] = name.split(':');

    if (invocationTypeValids.has(Qualifier)) {
        InvocationType = Qualifier;
        Qualifier = defaultQualifier;
    }
    if (!FunctionName) return promiseRejectedBecauseNotName();

    if (!invocationTypeValids.has(InvocationType)) InvocationType = defaultInvocationType;
    return client.invoke({
        FunctionName,
        Qualifier,
        InvocationType,
        Payload: JSON.stringify(Payload),
        LogType: LogTypeValids.has(LogType) ? LogType : defaultLogType
    })
        .promise()
        .then(({ Payload:body, LogResult, FunctionError }) => {
            if (FunctionError) return Promise.reject(parseBase64(LogResult));

            return parseBody(body);
        });
};


