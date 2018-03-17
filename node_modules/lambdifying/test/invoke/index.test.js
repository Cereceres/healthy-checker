const assert = require('assert');

const proxyquire = require('proxyquire');
const stub = (dataToAssert, ToReturn, errors = {}) => ({
    'aws-sdk': {
        Lambda: class {
            invoke(data) {
                const { error, FunctionError, LogResult } = errors;
                assert.deepEqual(dataToAssert, data);
                return {
                    promise:() => error ?
                        Promise.reject(error) :
                        Promise.resolve({
                            Payload:JSON.stringify(ToReturn),
                            FunctionError,
                            LogResult
                        })
                };
            }
        }
    }
});

describe('test to invoke function', () => {
    it('should exec the invoke correctly', async() => {
        const dataToExpect = {
            FunctionName:'test',
            Qualifier:'test',
            InvocationType:'RequestResponse',
            Payload: JSON.stringify({ test:'test' }),
            LogType: 'Tail'
        };
        const invoke = proxyquire('../../invoke', stub(dataToExpect, { return:'return' }));
        const res = await invoke('test:test', { test:'test' });
        assert.deepEqual(res, { return:'return' });
    });

    it('should exec the invoke with Qualifier $LATEST and InvocationType RequestResponse', async() => {
        const dataToExpect = {
            FunctionName:'test',
            Qualifier:'$LATEST',
            InvocationType:'RequestResponse',
            Payload: JSON.stringify({ test:'test' }),
            LogType: 'Tail'
        };
        const invoke = proxyquire('../../invoke', stub(dataToExpect, { return:'return' }));
        const res = await invoke('test', { test:'test' });
        assert.deepEqual(res, { return:'return' });
    });

    it('should exec the invoke with InvocationType and Qualifier $LATEST', async() => {
        const dataToExpect = {
            FunctionName:'test',
            Qualifier:'$LATEST',
            InvocationType:'Event',
            Payload: JSON.stringify({ test:'test' }),
            LogType: 'Tail'
        };
        const invoke = proxyquire('../../invoke', stub(dataToExpect, { return:'return' }));
        const res = await invoke('test:Event', { test:'test' });
        assert.deepEqual(res, { return:'return' });
    });

    it('should exec the invoke with Qualifier $LATEST and InvocationType RequestResponse', async() => {
        const dataToExpect = {
            FunctionName:'test',
            Qualifier:'$LATEST',
            InvocationType:'RequestResponse',
            Payload: JSON.stringify({ test:'test' }),
            LogType: 'Tail'
        };
        const invoke = proxyquire('../../invoke', stub(dataToExpect, { return:'return' }));
        const res = await invoke('test', { test:'test' });
        assert.deepEqual(res, { return:'return' });
    });

    it('should exec the invoke with LogType given', async() => {
        const dataToExpect = {
            FunctionName:'test',
            Qualifier:'$LATEST',
            InvocationType:'RequestResponse',
            Payload: JSON.stringify({ test:'test' }),
            LogType: 'None'
        };
        const invoke = proxyquire('../../invoke', stub(dataToExpect, { return:'return' }));
        const res = await invoke('test', { test:'test' }, 'None');
        assert.deepEqual(res, { return:'return' });
    });

    it('should exec the invoke with LogType Tail if given does not exists', async() => {
        const dataToExpect = {
            FunctionName:'test',
            Qualifier:'$LATEST',
            InvocationType:'RequestResponse',
            Payload: JSON.stringify({ test:'test' }),
            LogType: 'Tail'
        };
        const invoke = proxyquire('../../invoke', stub(dataToExpect, { return:'return' }));
        const res = await invoke('test', { test:'test' }, 'Other');
        assert.deepEqual(res, { return:'return' });
    });
    it('should exec the invoke with InvocationType RequestResponse if given does not exists', async() => {
        const dataToExpect = {
            FunctionName:'test',
            Qualifier:'test',
            InvocationType:'RequestResponse',
            Payload: JSON.stringify({ test:'test' }),
            LogType: 'Tail'
        };
        const invoke = proxyquire('../../invoke', stub(dataToExpect, {}, { error:'error' }));
        const error = await invoke('test:test:other', { test:'test' }, 'Other')
            .catch((res) => res);
        assert(error === 'error');
    });

    it('should exec the invoke with InvocationType RequestResponse if given does not exists', async() => {
        const dataToExpect = {
            FunctionName:'test',
            Qualifier:'test',
            InvocationType:'RequestResponse',
            Payload: JSON.stringify({ test:'test' }),
            LogType: 'Tail'
        };
        const invoke = proxyquire('../../invoke', stub(
            dataToExpect,
            {},
            {
                FunctionError:'FunctionError',
                LogResult:new Buffer('error').toString('base64')
            }
        ));
        const error = await invoke('test:test:other', { test:'test' }, 'Other')
            .catch((res) => res);
        assert(error === 'error');
    });
});
