const { update } = require('./db-client');


module.exports = (item, updated, TableName) => update(item, updated, TableName)
    .then((res) => {
        console.log('res in then ', res);
        return res;
    });
