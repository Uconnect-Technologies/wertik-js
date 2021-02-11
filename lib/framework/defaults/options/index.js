"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
exports.databaseDefaultOptions = {
    postgres: {
        dbInitializeOptions: {
            logging: false,
            operatorsAliases: "0",
            native: true
        },
    },
    sql: {
        dbInitializeOptions: {
            logging: false,
            operatorsAliases: "0",
            underscored: false,
            freetableName: true,
        },
        defaultTableOptions: {
            timestamps: false,
            paranoid: false,
            underscored: false,
            freezeTableName: true,
        },
        timestamps: {
            created_at: {
                type: "TIMESTAMP",
                defaultValue: sequelize_1.default.literal("CURRENT_TIMESTAMP"),
                allowNull: false,
            },
            updated_at: {
                type: "TIMESTAMP",
                defaultValue: sequelize_1.default.literal("CURRENT_TIMESTAMP"),
                allowNull: false,
            },
        },
    },
};
exports.defaultSocketOptions = {
    perMessageDeflate: {
        zlibDeflateOptions: {
            // See zlib defaults.
            chunkSize: 1024,
            memLevel: 7,
            level: 3,
        },
        zlibInflateOptions: {
            chunkSize: 10 * 1024,
        },
        // Other options settable:
        clientNoContextTakeover: true,
        serverNoContextTakeover: true,
        serverMaxWindowBits: 10,
        // Below options specified as default values.
        concurrencyLimit: 10,
        threshold: 1024,
    },
};
exports.defaultApolloGraphqlOptions = {
    cacheControl: {
        defaultMaxAge: 0,
    },
    tracing: true,
    subscriptions: {
        path: "/subscriptions",
    },
};
exports.defaultPort = 7000;
//# sourceMappingURL=index.js.map