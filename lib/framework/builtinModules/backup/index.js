"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
exports.default = {
    name: "Backup",
    graphql: {
        schema: `
      type Backup {
        id: Int
        name: String
        uploaded_to: String
        uploaded_filename: String
        created_at: String
        updated_at: String
      }
      input BackupInput {
        id: Int
        name: String
        uploaded_to: String
        uploaded_filename: String
      }
      type BackupSuccessResponse {
        message: String
        filename: String
        backup: Backup
      }
    `,
        mutation: {
            schema: `
        backupLocal: BackupSuccessResponse
        backupDigitalOceanSpaces: BackupSuccessResponse
        backupDropbox: BackupSuccessResponse
        removeLocalBackups: String
      `,
            resolvers: {
                removeLocalBackups: () => __awaiter(void 0, void 0, void 0, function* () {
                    yield helpers_1.removeLocalBackups();
                    return "remove local backups";
                }),
                backupLocal: (_, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
                    let op = yield helpers_1.dumpDatabase({
                        database: context.wertik.configuration.database,
                        models: context.wertik.models,
                    });
                    return {
                        message: "Backup to Local Drive has been completed.",
                        filename: op.filename,
                        backup: op.backupInstance,
                    };
                }),
                backupDigitalOceanSpaces: (_, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
                    let op = yield helpers_1.dumpDatabase({
                        database: context.wertik.configuration.database,
                        models: context.wertik.models,
                    });
                    let opDigitalOcean = yield helpers_1.dumpDatabaseToDigitalOcean({
                        localDump: op,
                        configuration: context.wertik.configuration,
                    });
                    return {
                        message: "Backup to DigitalOcean and Local Drive has been completed.",
                        filename: opDigitalOcean.filename,
                        backup: opDigitalOcean.backupInstance,
                    };
                }),
                backupDropbox: (_, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
                    let op = yield helpers_1.dumpDatabase({
                        database: context.wertik.configuration.database,
                        models: context.wertik.models,
                    });
                    let opDropbox = yield helpers_1.dumpDatabaseToDropbox({
                        localDump: op,
                        configuration: context.wertik.configuration,
                    });
                    return {
                        message: "Backup to Dropbox has been completed.",
                        filename: opDropbox.filename,
                        backup: opDropbox.backupInstance,
                    };
                }),
            },
        },
        query: {
            schema: `
        localBackupsList: [String]
      `,
            resolvers: {
                localBackupsList: () => __awaiter(void 0, void 0, void 0, function* () {
                    const list = yield helpers_1.loadAllLocalBackups();
                    return list;
                }),
            },
        },
    },
    restApi: {},
    database: {
        selectIgnoreFields: [],
        relationships: {},
        sql: {
            tableName: "Backup",
            fields: {
                name: {
                    type: "STRING",
                    unique: true,
                },
                uploaded_to: {
                    type: "STRING",
                },
                uploaded_filename: {
                    type: "STRING",
                },
            },
        },
    },
};
//# sourceMappingURL=index.js.map