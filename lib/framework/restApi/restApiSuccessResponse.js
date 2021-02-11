"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(obj) {
    let { res, err, message, data } = obj;
    res.status(200);
    res.send({
        result: {
            status: 200,
            success: true,
            message: message || "Ok",
            data: data
        }
    });
}
exports.default = default_1;
//# sourceMappingURL=restApiSuccessResponse.js.map