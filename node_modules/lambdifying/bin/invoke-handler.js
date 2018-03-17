const parseData = require('./parse-body');
const handlers = require('../index');
const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);

module.exports = (invokeName, payload, payloadFrom, logtype) => Promise.resolve()
    .then(() => {
        if (!payload && payloadFrom) return readFile(payloadFrom);
        return payload || '';
    })
    .then((data) => data.toString())
    .then((data) => handlers.invoke(invokeName, parseData(data), logtype))
    .then((res) => console.info(`response: ${JSON.stringify(res)}`))
    .catch((error) => console.error(`${error.message}`));
