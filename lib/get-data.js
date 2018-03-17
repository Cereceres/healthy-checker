const { getAll } = require('./db-client');
const promiseout = require('promiseout');

module.exports = (TableName) => promiseout(getAll(TableName)
    .then(({ Items }) => Items
        .sort(({ reviewedAt : a }, { reviewedAt: b }) => a > b ? 1 : -1)
    ));

