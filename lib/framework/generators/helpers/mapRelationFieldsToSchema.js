"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(data) {
    let string = "";
    let split = data.split(" ");
    split.forEach((data) => {
        let splitColon = data.split(":");
        let [moduleName, type] = splitColon;
        let relationType = (type == "many") ? `[${moduleName}]` : moduleName;
        string = string + `${moduleName}: ${relationType}
		`;
    });
    return string;
}
exports.default = default_1;
//# sourceMappingURL=mapRelationFieldsToSchema.js.map