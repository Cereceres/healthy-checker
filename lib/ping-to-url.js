const request = require('request');
const promiseout = require('promiseout');


const defaultTimeOut = 10000;
const defaultStatusToWait = 200;
const timeoutDefault = process.env.TIMEOUT || defaultTimeOut;
const STATUS_TO_WAIT = process.env.STATUS_TO_WAIT || defaultStatusToWait;

module.exports = (uri, timeout = timeoutDefault) => promiseout((resolve) => {
    const init = Date.now();
    request.get({
        uri,
        timeout,
        rejectUnauthorized:false,
        strictSSL: false,
    }, (error, res) => {
        if(error || Number(res.statusCode) !== Number(STATUS_TO_WAIT)) return resolve({
            error: error ||
            new Error(`Status is ${res.statusCode} and expect ${STATUS_TO_WAIT}`)
        });

        resolve({ delay:Date.now() - init, url : uri });
    });
}, timeout);
