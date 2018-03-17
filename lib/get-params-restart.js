const url = require('url');

module.exports = (uri) => {
    const { hostname:ip } = url.parse(uri);

    return {
        ip,
        action: 'restart',
        isPublic: false
    };
};
