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
function default_1(model, args, name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let create = yield model.create(args);
            create.successMessageType = "Created";
            create.successMessage = `${name} created successfully`;
            return create;
        }
        catch (e) {
            return {
                errorMessageType: "Error while creating",
                errorMessage: "Something went wrong while creating"
            };
        }
    });
}
exports.default = default_1;
//# sourceMappingURL=create.js.map