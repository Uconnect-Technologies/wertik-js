"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
exports.applyRelationshipSql = (module, tables) => {
    let relationships = lodash_1.get(module, "database.relationships", null);
    if (relationships) {
        const oneToOne = lodash_1.get(relationships, "oneToOne", {});
        const oneToMany = lodash_1.get(relationships, "oneToMany", {});
        const currentModel = tables[module.name];
        Object.keys(oneToMany).forEach((key) => {
            const foreignModel = tables[key];
            const relationshipInfo = oneToMany[key];
            if (relationshipInfo.constructor === Array) {
                relationshipInfo.forEach(relationshipInfoItem => {
                    currentModel.hasMany(foreignModel, Object.assign({ as: relationshipInfoItem.graphqlName, foreignKey: relationshipInfoItem.foreignKey, sourceKey: relationshipInfoItem.relationColumn }, lodash_1.get(relationshipInfoItem, 'options', {})));
                });
            }
            else {
                currentModel.hasMany(foreignModel, Object.assign({ as: relationshipInfo.graphqlName, foreignKey: relationshipInfo.foreignKey, sourceKey: relationshipInfo.relationColumn }, lodash_1.get(relationshipInfo, 'options', {})));
            }
        });
        Object.keys(oneToOne).forEach((key) => {
            const foreignModel = tables[key];
            const relationshipInfo = oneToOne[key];
            if (relationshipInfo.constructor === Array) {
                relationshipInfo.forEach(relationshipInfoItem => {
                    currentModel.belongsTo(foreignModel, Object.assign({ as: relationshipInfoItem.graphqlName, foreignKey: relationshipInfoItem.foreignKey, sourceKey: relationshipInfoItem.relationColumn }, lodash_1.get(relationshipInfoItem, 'options', {})));
                });
            }
            else {
                currentModel.belongsTo(foreignModel, Object.assign({ as: relationshipInfo.graphqlName, foreignKey: relationshipInfo.foreignKey, sourceKey: relationshipInfo.relationColumn }, lodash_1.get(relationshipInfo, 'options', {})));
            }
        });
    }
};
//# sourceMappingURL=database.js.map