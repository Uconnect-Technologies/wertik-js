System.register([], function (exports_1, context_1) {
    "use strict";
    var crypto, algorithm, password;
    var __moduleName = context_1 && context_1.id;
    function encrypt(text) {
        var cipher = crypto.createCipher(algorithm, password);
        var crypted = cipher.update(text, 'utf8', 'hex');
        crypted += cipher.final('hex');
        return crypted;
    }
    exports_1("encrypt", encrypt);
    function decrypt(text) {
        var decipher = crypto.createDecipher(algorithm, password);
        var dec = decipher.update(text, 'hex', 'utf8');
        dec += decipher.final('utf8');
        return dec;
    }
    exports_1("decrypt", decrypt);
    return {
        setters: [],
        execute: function () {
            crypto = require('crypto'), algorithm = 'aes-256-ctr', password = 'd6F3Efeq';
        }
    };
});
//# sourceMappingURL=password.js.map