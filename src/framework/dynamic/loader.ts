export default function(moduleName: any, graphql: any) {
  let { mutations, queries } = graphql;
  return {
    subscriptions: graphql.subscriptions,
    queries: {
      [`list${moduleName}`]: queries[`list${moduleName}`],
      [`view${moduleName}`]: queries[`view${moduleName}`]
    },
    mutations: {
      [`create${moduleName}`]: mutations[`create${moduleName}`],
      [`delete${moduleName}`]: mutations[`delete${moduleName}`],
      [`update${moduleName}`]: mutations[`update${moduleName}`],
      [`updateBulk${moduleName}`]: mutations[`updateBulk${moduleName}`],
      [`createBulk${moduleName}`]: mutations[`createBulk${moduleName}`],
      [`deleteBulk${moduleName}`]: mutations[`deleteBulk${moduleName}`]
    }
  };
}
