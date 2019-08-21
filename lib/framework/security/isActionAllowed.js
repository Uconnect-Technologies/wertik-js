"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(permissions, name) {
    return __awaiter(this, void 0, void 0, function* () {
        let filter = permissions.filter(c => {
            console.log(c.permission_can);
            return c.permission_can.indexOf(name) > -1;
        });
        return filter.length > 0;
    });
}
exports.default = default_1;
//# sourceMappingURL=isActionAllowed.js.map