module.exports = (base64) => new Buffer(base64, 'base64').toString();
