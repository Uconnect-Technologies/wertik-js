var shell = require("shelljs");
import moment from "moment";
import {get} from "lodash"
import mysqldump from "mysqldump";
import * as aws from "aws-sdk";
import fs from "fs"
import { Dropbox, Error, files } from 'dropbox'; // eslint-disable-line no-unused-vars


export const dumpDatabase = async ({ database, models }) => {
  const filename = `backups/${moment().format("MMMM-DD-YYYY-h-mm-ss-a")}-database-${database.dbName}.sql`;
  const backupInstance = await models.Backup.create({
    uploaded_filename: filename,
    uploaded_to: "local",
  });

  await mysqldump({
    connection: {
      host: database.dbHost,
      user: database.dbUsername,
      password: database.dbPassword,
      database: database.dbName,
    },
    dumpToFile: filename,
  });

  return {
    filename,
    backupInstance,
  };
};

export const dumpDatabaseToDigitalOcean = async ({ localDump, configuration }) => {
  try {
    const filename = localDump.filename;
    const digitalOceanSpacesDetails = configuration.backup.digitalOceanSpaces;

  aws.config.update({
    accessKeyId: digitalOceanSpacesDetails.accessKeyId,
    secretAccessKey: digitalOceanSpacesDetails.secretAccessKey,
  });

  const spacesEndpoint: any = new aws.Endpoint(digitalOceanSpacesDetails.spacesEndpoint);

  const s3 = new aws.S3({
    endpoint: spacesEndpoint,
  });

  const data = await fs.readFileSync(filename)

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

  } catch (e) {
    throw new Error(`
      Something went wrong while uploading backup to your digital ocean spaces object. \n
      Message Received: ${e.message}
    `);
  }

  return localDump;
};


export const dumpDatabaseToDropbox = async ({ localDump, configuration }) => {
  try {
    const filename = localDump.filename;
    const dropdboxDetails = configuration.backup.dropbox;
    const dbx = new Dropbox({ accessToken: dropdboxDetails.accessToken });

    const data: Buffer = await fs.readFileSync(filename);
    
    await dbx.filesUpload({ strict_conflict: false, path: `/${filename}`, contents: data });

    localDump.backupInstance = await localDump.backupInstance.update({
      uploaded_to: localDump.backupInstance.uploaded_to + ", dropbox",
    });

    return localDump;
    
  } catch (e) {
    console.log(e)
    throw new Error(e.message);
  }
}