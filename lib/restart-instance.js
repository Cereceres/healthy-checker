const { invoke } = require('lambdifying');
const getParamsToRestartFromUrl = require('./get-params-restart');

const FunctionName = process.env.LAMBDA_NAME_RESTART_INSTANCE;
if (!FunctionName) throw new Error('LAMBDA_NAME_RESTART_INSTANCE is required');
const InvocationType = 'Event';

const paramsToInvoke = `${FunctionName}:${InvocationType}`;


module.exports = (url) => invoke(paramsToInvoke, getParamsToRestartFromUrl(url));

