"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
function default_1(info) {
    let fields = lodash_1.get(info, 'operation.selectionSet.selections[0].selectionSet.selections', []);
    return fields.map((c) => {
        return lodash_1.get(c, 'name.value', '');
    });
}
exports.default = default_1;
//# sourceMappingURL=getRequestedFieldsFromResolverInfo.js.map