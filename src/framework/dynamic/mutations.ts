export default {
  generateMutationsSchema(moduleName: any) {
    return `
        create${moduleName}(input: ${moduleName}Input): ${moduleName}
        delete${moduleName}(input: ${moduleName}Input): ${moduleName}
        update${moduleName}(input: ${moduleName}Input): ${moduleName}
        updateBulk${moduleName}(input: [${moduleName}Input]): [${moduleName}]
        createBulk${moduleName}(input: [${moduleName}Input]): [${moduleName}]
        deleteBulk${moduleName}(input: [${moduleName}Input]): [${moduleName}]
    `
  }
}