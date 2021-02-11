"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "Me",
    useDatabase: false,
    graphql: {
        schema: `
      type Me {
        user: User
        name: String
        permissions: [Permission]
      }
    `,
        mutation: {
            schema: ``,
            resolvers: {}
        },
        query: {
            schema: `
        me: Me
      `,
            resolvers: {
                me: (_, args, context, info) => {
                    return {
                        name: "Ilyas",
                        user: context.user,
                        permissions: context.permissions.map(element => {
                            return {
                                cant: element.permission_cant,
                                can: element.permission_can,
                                id: element.permission_id
                            };
                        })
                    };
                }
            }
        }
    },
    restApi: {}
};
//# sourceMappingURL=index.js.map