const crypto = require('crypto');

let generateId = () => {
    return crypto.randomBytes(8).toString('hex');
}

module.exports = generateId;