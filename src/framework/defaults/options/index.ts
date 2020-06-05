import Sequelize from "sequelize";
export const databaseDefaultOptions = {
  postgres: {
    dbInitializeOptions: {
      logging: false,
      operatorsAliases: "0",
      dialectOptions: {
        ssl: true,
      },
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
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
      updated_at: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
    },
  },
  mongoDB: {
    defaultTableOptions: {
      timestamps: {
        currentTime: function () {
          return new Date().toISOString()
        },
        createdAt: "created_at",
        updatedAt: "updated_at",
      },
    },
  },
};

export const defaultSocketOptions = {
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
    clientNoContextTakeover: true, // Defaults to negotiated value.
    serverNoContextTakeover: true, // Defaults to negotiated value.
    serverMaxWindowBits: 10, // Defaults to negotiated value.
    // Below options specified as default values.
    concurrencyLimit: 10, // Limits zlib concurrency for perf.
    threshold: 1024, // Size (in bytes) below which messages
  },
};

export const defaultApolloGraphqlOptions = {
  cacheControl: {
    defaultMaxAge: 0,
  },
  subscriptions: {
    path: "/subscriptions",
  },
};
