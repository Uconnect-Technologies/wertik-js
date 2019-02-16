export default {
  generateMutationsSchema(moduleName,schema) {
    return `
      create${moduleName}(name: String): ${schema}
      delete${moduleName}(id: Int, _id: String): ${schema}
      update${moduleName}(id: Int, name: String, _id: String): ${schema}
    `
  }
}