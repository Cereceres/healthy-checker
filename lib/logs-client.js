const AWS = require('aws-sdk');

module.exports = new AWS.CloudWatchLogs({
    region: process.env.REGION || 'us-east-1'
});
