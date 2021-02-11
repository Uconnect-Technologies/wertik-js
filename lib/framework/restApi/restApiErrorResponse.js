"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(obj) {
    let { res, err, data, code } = obj;
    if (!code) {
        code = 500;
    }
    res.status(code);
    res.send({
        result: {
            status: code,
            success: false,
            message: err.message,
            data: data
        }
    });
}
exports.default = default_1;
//# sourceMappingURL=restApiErrorResponse.js.map