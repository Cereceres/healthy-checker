#!/usr/bin/env node
const invokeHandler = require('./invoke-handler');
const {
    invoke:invokeName,
    payload,
    logtype,
    pf: payloadFrom
} = require('yargs')
    .alias('i', 'invoke')
    .alias('p', 'payload')
    .alias('lt', 'logtype')
    .alias('pf', 'payload-from')
    .describe('payload', 'Payload to send')
    .describe('payload-from', 'File from where get payload')
    .describe('invoke', `function to invoke in format:
            FunctionName:Qualifier:InvocationType
            FunctionName:Qualifier
            FunctionName:InvocationType
            FunctionName
    `)
    .default('logtype', 'Tail')
    .string([ 'invoke', 'payload', 'logtype', 'payload-from' ])
    .help('help')
    .argv;

if (invokeName) invokeHandler(invokeName, payload, payloadFrom, logtype);

