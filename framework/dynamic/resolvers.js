export default function (moduleName,model) {
  return {
    queries: {
      [`list${moduleName}`]: () => {

      },
      [`view${moduleName}`]: () => {

      }
    },
    mutations: {
      [`create${moduleName}`]: () => {

      },
      [`update${moduleName}`]: () => {

      },
      [`delete${moduleName}`]: () => {

      }
    }
  }
}