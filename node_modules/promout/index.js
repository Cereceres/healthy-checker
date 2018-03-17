const defaultTimeout = 0;

const prom = module.exports = (res, _timeout) => new Promise(
    (resolve) => {
        const timeout = _timeout || res || defaultTimeout;
        const timer = setTimeout(() => resolve(timer), timeout);
    }
)
    .then((timer) => {
        clearTimeout(timer);
        return res;
    });

prom.reject = (res, _timeout) => new Promise(
    (resolve) => {
        const timeout = _timeout || res || defaultTimeout;
        const timer = setTimeout(() => resolve(timer), timeout);
    }
)
    .then((timer) => {
        clearTimeout(timer);
        return Promise.reject(res);
    });
