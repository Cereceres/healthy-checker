const assert = require('assert');

const AwsTest = require('aws-lambda-testing');
const { mock, handler } = require('./features');


describe('test to heandler', () => {
    it('should exec the handler and manage the data', async() => {
        mock();
        await new AwsTest().setHandler(handler()).setTimeout(4000).exec();
    });
});
