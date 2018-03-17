
module.exports = (requests, timeout) => {
    const { url = '', delay = timeout, error } = requests;
    return {
        log:{
            message: JSON.stringify(error ?
                {
                    url,
                    delay,
                    status: error ? 'DOWN' : 'UP',
                    error: error.message
                } : {
                    url,
                    delay,
                    status: 'UP'
                }),
            timestamp: Date.now()
        },
        status: error ? 'DOWN' : 'UP',
    };
};
