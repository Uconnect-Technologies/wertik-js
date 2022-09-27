import moment from 'moment'
import { useModule } from '../../modules/modules'
import mysqldump from 'mysqldump'
import fs from 'fs'

const dumpDatabase = async (
  dbName: string,
  model: any,
  credentials: {
    host: string
    username: string
    password: string
    name: string
  }
): Promise<{
  message: string
  filename: string
  backup: any
}> => {
  const filename = `backups/${moment().format(
    'MMMM-DD-YYYY-h-mm-ss-a'
  )}-database-${dbName}.sql`.toLowerCase()

  const backupInstance = await model.create({
    uploaded_filename: filename,
    uploaded_to: 'local',
  })

  await mysqldump({
    connection: {
      host: credentials.host,
      user: credentials.username,
      password: credentials.password,
      database: credentials.name,
    },
    dumpToFile: filename,
  })

  return {
    message: 'Backup was successfull',
    filename,
    backup: backupInstance,
  }
}
const uploadDumpToDigitalOceanSpaces = async (
  filename,
  digitaloceanInstance,
  Bucket,
  ACL
): Promise<any> => {
  const data = await fs.readFileSync(filename)

  const params = {
    Bucket,
    Key: filename,
    Body: data,
    ACL,
  }

  const response = await digitaloceanInstance.s3.upload(params).promise()

  return response
}
const uploadDumpToDropbox = async (
  filename: string,
  dropboxInstance
): Promise<any> => {
  const data: Buffer = await fs.readFileSync(filename)
  const response = await dropboxInstance.dropbox.filesUpload({
    strict_conflict: false,
    path: `/${filename}`,
    contents: data,
  })
  return response
}

export const WertikBackupModule = (
  database: string,
  table: string,
  tableOptions: any = {}
): any =>
  useModule({
    name: 'Backup',
    useDatabase: true,
    database,
    table,
    tableOptions,
    on: function ({ useSchema, useMutation }) {
      useSchema(`
      type BackupSuccessResponse {
        message: String
        filename: String
        backup: Backup
      }
    `)
      useMutation({
        name: 'backupLocal',
        query: 'backupLocal(database: [String]!): [BackupSuccessResponse]',
        async resolver(_, args, context) {
          const push: any[] = []
          for (const dbName of args.database) {
            const database = context.wertik.database[dbName]
            if (!database) {
              throw new Error(`No such database ${dbName as string}`)
            }
            push.push(
              await dumpDatabase(
                dbName,
                context.wertik.database[dbName].instance.models.Backup,
                context.wertik.database[dbName].credentials
              )
            )
          }
          return push
        },
      })
      useMutation({
        name: 'backupDigitalOceanSpaces',
        query:
          'backupDigitalOceanSpaces(ACL: String!, Bucket: String!, storage: String!, database: [String]!): [BackupSuccessResponse]',
        async resolver(_, args, context) {
          try {
<<<<<<< HEAD
            const push: any[] = []
            const storage = context.wertik.storage[args.storage]
            if (!storage) {
              throw new Error(`No such storage found: ${args.storage}`)
=======
            const push: any = []
            const storage = context.wertik.storage[args.storage]
            if (
              storage === undefined ||
              storage === null ||
              storage === false
            ) {
              throw new Error(
                `No such storage found: ${args.storage as string}`
              )
>>>>>>> 681bf23 (Fixing lint issues)
            }

            for (const dbName of args.database) {
              const database = context.wertik.database[dbName]
              if (
                database === undefined ||
                database === null ||
                database === false
              ) {
                throw new Error(`No such database ${dbName as string}`)
              }
              const dump = await dumpDatabase(
                dbName,
                context.wertik.database[dbName].instance.models.Backup,
                context.wertik.database[dbName].credentials
              )
              push.push(dump)

              const uploadToDigitalOcean = await uploadDumpToDigitalOceanSpaces(
                dump.filename,
                storage,
                args.Bucket,
                args.ACL
              )
              await dump.backup.update({
                uploaded_to: 'digitalocean',
                uploaded_filename: uploadToDigitalOcean.Tag,
              })
              dump.backup.uploaded_to = 'digitalocean'
              dump.backup.uploaded_filename = uploadToDigitalOcean.key
            }

            return push
          } catch (e) {
            throw new Error(e)
          }
        },
      })
      useMutation({
        name: 'backupDropbox',
        query:
          'backupDropbox(storage: String!, database: [String]): [BackupSuccessResponse]',
        async resolver(_, args, context) {
          try {
            const push: any = []
            const storage = context.wertik.storage[args.storage]
            if (
              storage === undefined ||
              storage === null ||
              storage === false
            ) {
              throw new Error(
                `No such storage found: ${args.storage as string}`
              )
            }

            for (const dbName of args.database) {
              const database = context.wertik.database[dbName]
              if (
                database === undefined ||
                database === null ||
                database === false
              ) {
                throw new Error(`No such database ${dbName as string}`)
              }
              const dump = await dumpDatabase(
                dbName,
                context.wertik.database[dbName].instance.models.Backup,
                context.wertik.database[dbName].credentials
              )
              push.push(dump)
              const uploadToDropbox = await uploadDumpToDropbox(
                dump.filename,
                storage
              )
              await dump.backup.update({
                uploaded_to: 'dropbox',
                uploaded_filename: uploadToDropbox.result.path_lower,
              })
              dump.backup.uploaded_to = 'dropbox'
              dump.backup.uploaded_filename = uploadToDropbox.result.path_lower
            }

            return push
          } catch (e) {
            console.log(e)
            throw new Error(e)
          }
        },
      })
    },
  })
