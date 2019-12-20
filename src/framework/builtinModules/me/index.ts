export default {
  name: "Me",
  useDatabase: false,
  graphql: {
    crud: {
      query: {
        generate: false,
        operations: "*"
      },
      mutation: {
        generate: false,
        operations: "*"
      }
    },
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
        me: (_: any, args: any, context: any, info: any) => {
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
