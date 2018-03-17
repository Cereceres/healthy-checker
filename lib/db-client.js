const AWS = require('aws-sdk');
const promiseout = require('promiseout');


const dynamodb = new AWS.DynamoDB.DocumentClient({ region: process.env.REGION || 'us-east-1' });
const { keys } = Object;
const ReturnValues = 'UPDATED_NEW';

exports.getAll = (TableName) => promiseout(dynamodb.scan({ TableName }).promise());


exports.update = (Key, update, TableName) => {
    const UpdateExpression = `set ${keys(update).map((key) => `${key} = :${key}`).join(',')}`;
    const ExpressionAttributeValues = keys(update).reduce((init, key) => {
        init[`:${key}`] = update[key];
        return init;
    }, {});
    return promiseout(dynamodb.update({
        TableName,
        Key,
        UpdateExpression,
        ExpressionAttributeValues,
        ReturnValues
    }).promise());
};
