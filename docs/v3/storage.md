# Storage

Wertik JS allows adding support for third party Storage services to your app. As of today 28 November 2021, Wertik JS supports `digitalocean` and `dropbox`. To use storage services you need to use `useStorage` function from wertik-js.

```js
import wertik, { useStorage } from "wertik-js/lib/next";

wertik({
  port: 1200,
  storage: {
    digitalocean: useStorage({
      for: "digitalocean",
      digitalOceanOptions: {
        accessKeyId: "",
        secretAccessKey: "",
        spacesEndpoint: "",
      },
    }),
    dropbox: useStorage({
      for: "dropbox",
      dropboxOptions: {
        accessToken: "",
      },
    }),
  },
});
```

- For digitalocean wertik-js uses `aws-sdk` package for uploading files.
- For dropbox wertik-js uses `dropbox` package for uploading files.

# Using Wertik JS Backup Module to take Backup of your Database

Wertik JS provides a builtin module to take backups of your database called Backup. To use it, it requires a table called `Backup` with following fields:

- name: VARCHAR
- uploaded_to: VARCHAR
- uploaded_to_filename: VARCHAR

To use it You can import it from Wertik JS:

```js
import wertik, { WertikBackupModule } from "wertik-js/lib/next";
wertik({
  port: 1200,
  modules: {
    // Database name and table to insert backup information. Make sure you have a database connection.
    backup: WertikBackupModule("databasename", "tablename"),
  },
});
```

Accroding to upload status Wertik JS will fill up the table. To backup you need to use GraphQL mutations that are built already:

- backupLocal: This creates a local backup of databases you have provided.

```graphql
mutation {
  backupLocal(database: ["jscontainer"]) {
    message
    filename
    backup {
      id
      uploaded_to
      uploaded_filename
    }
  }
}
```

Response:

```json
{
  "data": {
    "backupLocal": [
      {
        "message": "Backup was successfull",
        "filename": "backups/november-29-2021-4-46-42-am-database-jscontainer.sql",
        "backup": {
          "id": 35,
          "uploaded_to": "local",
          "uploaded_filename": "backups/november-29-2021-4-46-42-am-database-jscontainer.sql"
        }
      }
    ]
  }
}
```

- backupDigitalOceanSpaces: This creates a local backup + digital ocean backup of databases you have provided.

### Mutation

```graphql
mutation {
  backupDigitalOceanSpaces(
    ACL: "private"
    Bucket: "your-bucket-name"
    storage: "digitalocean"
    database: ["jscontainer"]
  ) {
    message
    filename
    backup {
      uploaded_to
      uploaded_filename
    }
  }
}
```

### Response

```json
{
  "data": {
    "backupDigitalOceanSpaces": [
      {
        "message": "Backup was successfull",
        "filename": "backups/november-29-2021-5-29-57-am-database-jscontainer.sql",
        "backup": {
          "uploaded_to": "digitalocean",
          "uploaded_filename": "backups/november-29-2021-5-29-57-am-database-jscontainer.sql"
        }
      }
    ]
  }
}
```

- backupDropbox: This creates a local backup + dropbox backup of databases you have provided.

**Note:** Make sure your dropbox app has right permissions to write files to your dropbox.

### Mutation:

```graphql
mutation {
  backupDropbox(storage: "dropbox", database: ["jscontainer"]) {
    message
    filename
    backup {
      uploaded_to
      uploaded_filename
    }
  }
}
```

### Response:

```json
{
  "data": {
    "backupDropbox": [
      {
        "message": "Backup was successfull",
        "filename": "backups/november-29-2021-5-14-02-am-database-jscontainer.sql",
        "backup": {
          "uploaded_to": "dropbox",
          "uploaded_filename": "/backups/november-29-2021-5-14-02-am-database-jscontainer.sql"
        }
      }
    ]
  }
}
```
