process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const co = require('co-tchar');

const getData = require('./lib/get-data');

const createGroup = require('./lib/create-group');
const iterateOverUrls = require('./lib/iterate-over-urls');
const createAllStream = require('./lib/create-all-streams');

const errorMessage = 'GROUP_NAME is required';
const logGroupName = process.env.GROUP_NAME;
const TableName = process.env.TABLE_NAME;
if (!TableName) throw new Error('Table name is required');

if (!logGroupName) throw new Error(errorMessage);

exports.handler = (event, ctx, cb) => co(function *() {
    console.log('getting data from ', TableName);
    const urls = yield getData(TableName);

    if (urls.error) throw urls.error;

    console.log('urls ', urls);
    const streams = Object.assign([], urls).map(({ url }) => url.replace(/\/|:/g, ''));
    if (urls.error) throw urls.error;
    console.log('creatGroup ', logGroupName);
    const resFromCreateGroup = yield createGroup(logGroupName);
    if (resFromCreateGroup.error) console.log('eror in CreateGroup ', resFromCreateGroup.error.message);
    console.log('creating streams : ', streams.length);
    yield* createAllStream(streams, logGroupName);
    yield* iterateOverUrls(urls, streams, TableName, logGroupName);
})
    .then((res) => {
        console.log('res of lambda ', res);
        cb();
    })
    .catch((err) => {
        console.log('error in lambda ', err);
        cb(err);
    });

