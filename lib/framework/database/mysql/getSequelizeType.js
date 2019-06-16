"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let Sequelize = require("sequelize");
function getSequalizeType(type) {
    type = type.toLowerCase();
    switch (type) {
        case 'string':
            return Sequelize.STRING;
        case 'text':
            return Sequelize.TEXT;
        case 'int':
            return Sequelize.INTEGER;
        case 'integer':
            return Sequelize.INTEGER;
        case 'bigint':
            return Sequelize.BIGINT;
        case 'float':
            return Sequelize.FLOAT;
        case 'real':
            return Sequelize.REAL;
        case 'double':
            return Sequelize.DOUBLE;
        case 'decimal':
            return Sequelize.DECIMAL;
        case 'date':
            return Sequelize.DATE;
        case 'boolean':
            return Sequelize.BOOLEAN;
        case 'blob':
            return Sequelize.BLOB;
        case 'json':
            return Sequelize.tsON;
        case 'uuid':
            return Sequelize.UUID;
        case 'geometry':
            return Sequelize.GEOMETRY;
        default:
            return Sequelize.STRING;
    }
}
exports.default = getSequalizeType;
//# sourceMappingURL=getSequelizeType.js.map