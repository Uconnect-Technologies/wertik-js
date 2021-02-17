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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const moment_1 = __importDefault(require("moment"));
const mysqldump_1 = __importDefault(require("mysqldump"));
const aws = __importStar(require("aws-sdk"));
const lodash_1 = require("lodash");
const fs_1 = __importDefault(require("fs"));
const dropbox_1 = require("dropbox"); // eslint-disable-line no-unused-vars
exports.dumpDatabase = ({ database, models }) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const filename = `backups/${moment_1.default().format("MMMM-DD-YYYY-h-mm-ss-a")}-database-${database.dbName}.sql`;
            const backupInstance = yield models.Backup.create({
                uploaded_filename: filename,
                uploaded_to: "local",
            });
            setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
                yield mysqldump_1.default({
                    connection: {
                        host: database.dbHost,
                        user: database.dbUsername,
                        password: database.dbPassword,
                        database: database.dbName,
                    },
                    dumpToFile: filename,
                });
                resolve({
                    filename,
                    backupInstance,
                });
            }), 1500);
        }
        catch (e) {
            reject(e);
        }
    }));
});
exports.dumpDatabaseToDigitalOcean = ({ localDump, configuration }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filename = localDump.filename;
        const digitalOceanSpacesDetails = lodash_1.get(configuration, "backup.digitalOceanSpaces", null);
        if (digitalOceanSpacesDetails &&
            digitalOceanSpacesDetails.accessKeyId &&
            digitalOceanSpacesDetails.secretAccessKey &&
            digitalOceanSpacesDetails.spacesEndpoint &&
            digitalOceanSpacesDetails.uploadParams) {
            aws.config.update({
                accessKeyId: digitalOceanSpacesDetails.accessKeyId,
                secretAccessKey: digitalOceanSpacesDetails.secretAccessKey,
            });
            const spacesEndpoint = new aws.Endpoint(digitalOceanSpacesDetails.spacesEndpoint);
            const s3 = new aws.S3({
                endpoint: spacesEndpoint,
            });
            const data = yield fs_1.default.readFileSync(filename);
            const params = {
                Bucket: digitalOceanSpacesDetails.uploadParams.Bucket,
                Key: `${filename}`,
                Body: data,
                ACL: digitalOceanSpacesDetails.uploadParams.ACL,
            };
            yield s3.upload(params).promise();
            localDump.backupInstance = yield localDump.backupInstance.update({
                uploaded_to: localDump.backupInstance.uploaded_to + ", digital_ocean",
            });
        }
        else {
            throw new Error("Please provide your digital ocean details to backup database.");
        }
    }
    catch (e) {
        throw new Error(e);
    }
    return localDump;
});
exports.dumpDatabaseToDropbox = ({ localDump, configuration }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filename = localDump.filename;
        const dropdboxDetails = lodash_1.get(configuration, "backup.dropbox", null);
        if (dropdboxDetails && dropdboxDetails.accessToken) {
            const dbx = new dropbox_1.Dropbox({ accessToken: dropdboxDetails.accessToken });
            const data = yield fs_1.default.readFileSync(filename);
            yield dbx.filesUpload({ strict_conflict: false, path: `/${filename}`, contents: data });
            localDump.backupInstance = yield localDump.backupInstance.update({
                uploaded_to: localDump.backupInstance.uploaded_to + ", dropbox",
            });
            return localDump;
        }
        else {
            throw new Error("Please provide your dropbox details to backup database.");
        }
    }
    catch (e) {
        console.log(e);
        throw new Error(e.message);
    }
});
exports.loadAllLocalBackups = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const backupsPath = path_1.default.join(__dirname, "../../../../backups");
        let list = yield fs_1.default.readdirSync(backupsPath);
        return list;
    }
    catch (e) {
        throw new Error(e);
    }
});
exports.removeLocalBackups = () => __awaiter(void 0, void 0, void 0, function* () {
    const backupsPath = path_1.default.join(__dirname, "../../../../backups");
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const files = fs_1.default.readdirSync(backupsPath);
            for (const file of files) {
                yield fs_1.default.unlinkSync(path_1.default.join(backupsPath, file));
            }
            resolve("Deleted");
        }
        catch (e) {
            reject(e);
        }
    }));
});
//# sourceMappingURL=helpers.js.map