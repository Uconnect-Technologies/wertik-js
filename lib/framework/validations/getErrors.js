"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
  Author: Ilyas

*/
function default_1(errorJoi) {
    let errors = [];
    errorJoi.forEach((element) => {
        let key = element.context.key;
        let message = element.message;
        errors.push(`${key}: ${message}`);
    });
    return errors;
}
exports.default = default_1;
//# sourceMappingURL=getErrors.js.map