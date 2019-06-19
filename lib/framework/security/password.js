"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let crypto = require('crypto'), algorithm = 'aes-256-ctr', password = 'd6F3Efeq';
function encrypt(text) {
    var cipher = crypto.createCipher(algorithm, password);
    var crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}
exports.encrypt = encrypt;
function decrypt(text) {
    var decipher = crypto.createDecipher(algorithm, password);
    var dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}
exports.decrypt = decrypt;
//# sourceMappingURL=password.js.map