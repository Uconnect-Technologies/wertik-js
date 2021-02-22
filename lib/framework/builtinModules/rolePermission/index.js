"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "RolePermission",
    graphql: {
        schema: `
      type RolePermission {
        id: Int
        name: String
        role: Role
        role_id: Int
        permission: Permission
        permission_id: Int
        created_by: User
        created_by_id: Int
        created_at: String
        updated_at: String
      }
      input RolePermissionInput {
        id: Int
        name: String
        role_id: Int
        permission_id: Int
        created_by_id: Int
      }
    `,
        customResolvers: {},
        mutation: {
            schema: ``,
            resolvers: {},
        },
        query: {
            schema: ``,
            resolvers: {},
        },
    },
    restApi: {},
    database: {
        selectIgnoreFields: ["permission", "role", "created_by"],
        relationships: {
            belongsTo: {
                Permission: {
                    sourceKey: "permission_id",
                    as: "permission",
                    foreignKey: "id",
                },
                Role: {
                    sourceKey: "role_id",
                    as: "role",
                    foreignKey: "id",
                },
            },
            oneToOne: {
                User: {
                    as: "created_by",
                    foreignKey: "id",
                    sourceKey: "created_by_id",
                },
            },
        },
        sql: {
            tableName: "rolePermission",
            fields: {
                name: {
                    type: "STRING",
                },
                role_id: {
                    type: "INTEGER",
                },
                permission_id: {
                    type: "INTEGER",
                },
                is_deleted: {
                    type: "INTEGER",
                },
                created_by_id: {
                    type: "INTEGER",
                },
            },
        },
    },
};
//# sourceMappingURL=index.js.map