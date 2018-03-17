const createStream = require('./create-stream');
module.exports = function *(streams, logGroupName) {
    for (let j = 0, len = streams.length; j < len; j++) {
        const logStreamName = streams[j];
        console.log('createStream ', logStreamName);
        const resFromCreateStream = yield createStream(logGroupName, logStreamName);
        if (resFromCreateStream.error) console.log('error in CreateStream ', resFromCreateStream.error.message);
    }
};
