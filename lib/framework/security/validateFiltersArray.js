"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(array) {
    let ok = true;
    for (let item = 0; item < array.length; item++) {
        const element = array[item];
        const { value, operator, column } = element;
        if (value && value.length > 0 && operator && operator.length > 0 && column && column.length > 0) {
            ok = true;
        }
        else {
            ok = false;
            break;
        }
    }
    return ok;
}
exports.default = default_1;
//# sourceMappingURL=validateFiltersArray.js.map