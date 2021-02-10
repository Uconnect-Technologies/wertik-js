import path from "path";
import moment from "moment";
import mysqldump from "mysqldump";
import * as aws from "aws-sdk";
import { get } from "lodash";
import fs from "fs";
import { Dropbox, Error, files } from "dropbox"; // eslint-disable-line no-unused-vars

export const dumpDatabase = async ({ database, models }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const filename = `backups/${moment().format("MMMM-DD-YYYY-h-mm-ss-a")}-database-${database.dbName}.sql`;

      const backupInstance = await models.Backup.create({
        uploaded_filename: filename,
        uploaded_to: "local",
      });

      setTimeout(async () => {
        await mysqldump({
          connection: {
            host: database.dbHost,
            user: database.dbUsername,
            password: database.dbPassword,
            database: database.dbName,
          },
          dumpToFile: filename,
          // compressFile: true,
        });

        resolve({
          filename,
          backupInstance,
        });
      }, 1500);
    } catch (e) {
      reject(e);
    }
  });
};

export const dumpDatabaseToDigitalOcean = async ({ localDump, configuration }) => {
  try {
    const filename = localDump.filename;
    const digitalOceanSpacesDetails = get(configuration, "backup.digitalOceanSpaces", null);

    if (
      digitalOceanSpacesDetails &&
      digitalOceanSpacesDetails.accessKeyId &&
      digitalOceanSpacesDetails.secretAccessKey &&
      digitalOceanSpacesDetails.spacesEndpoint &&
      digitalOceanSpacesDetails.uploadParams
    ) {
      aws.config.update({
        accessKeyId: digitalOceanSpacesDetails.accessKeyId,
        secretAccessKey: digitalOceanSpacesDetails.secretAccessKey,
      });

      const spacesEndpoint: any = new aws.Endpoint(digitalOceanSpacesDetails.spacesEndpoint);

      const s3 = new aws.S3({
        endpoint: spacesEndpoint,
      });

      const data = await fs.readFileSync(filename);

      const params = {
        Bucket: digitalOceanSpacesDetails.uploadParams.Bucket,
        Key: `${filename}`,
        Body: data,
        ACL: digitalOceanSpacesDetails.uploadParams.ACL,
      };

      await s3.upload(params).promise();

      localDump.backupInstance = await localDump.backupInstance.update({
        uploaded_to: localDump.backupInstance.uploaded_to + ", digital_ocean",
      });
    } else {
      throw new Error("Please provide your digital ocean details to backup database.");
    }
  } catch (e) {
    throw new Error(e);
  }

  return localDump;
};

export const dumpDatabaseToDropbox = async ({ localDump, configuration }) => {
  try {
    const filename = localDump.filename;
    const dropdboxDetails = get(configuration, "backup.dropbox", null);

    if (dropdboxDetails && dropdboxDetails.accessToken) {
      const dbx = new Dropbox({ accessToken: dropdboxDetails.accessToken });

      const data: Buffer = await fs.readFileSync(filename);

      await dbx.filesUpload({ strict_conflict: false, path: `/${filename}`, contents: data });

      localDump.backupInstance = await localDump.backupInstance.update({
        uploaded_to: localDump.backupInstance.uploaded_to + ", dropbox",
      });

      return localDump;
    } else {
      throw new Error("Please provide your dropbox details to backup database.");
    }
  } catch (e) {
    console.log(e);
    throw new Error(e.message);
  }
};

export const loadAllLocalBackups = async () => {
  try {
    const backupsPath = path.join(__dirname, "../../../../backups");
    let list = await fs.readdirSync(backupsPath);
    return list;
  } catch (e) {
    throw new Error(e);
  }
};

export const removeLocalBackups = async () => {
  const backupsPath = path.join(__dirname, "../../../../backups");
  return new Promise(async (resolve, reject) => {
    try {
      const files = fs.readdirSync(backupsPath);
      for (const file of files) {
        await fs.unlinkSync(path.join(backupsPath, file));
      }
      resolve("Deleted");
    } catch (e) {
      reject(e);
    }
  });
};
