import store, { wertikApp } from "../store"
import isPlainObject from "lodash.isplainobject"

const getModuleNameFromKey = (key: string) => {
  return store.database.relationships.find((c) => c.graphqlKey === key)
    .referencedModule
}

const clean = (cleanObject) => {
  let recursion = (_obj) => {
    Object.keys(_obj).forEach((key) => {
      if (key === "list") {
        _obj = { ..._obj, ..._obj["list"] }
        delete _obj["list"]
      }
    })

    Object.keys(_obj).forEach((key) => {
      if (isPlainObject(_obj[key])) {
        _obj[key] = recursion(_obj[key])
      }
    })

    return _obj
  }

  return recursion(cleanObject)
}

export const convertGraphqlRequestedFieldsIntoInclude = (
  graphqlFields = {},
  where: { [key: string]: any } = {}
) => {
  graphqlFields = clean(graphqlFields)
  const keys = store.database.relationships.map((c) => c.graphqlKey)

  let recursion = (_obj) => {
    let includes = []

    for (const key in _obj) {
      if (keys.includes(key)) {
        includes.push({
          required: false,
          model:
            wertikApp.models[
              store.database.relationships.find((c) => c.graphqlKey === key)
                .referencedModule
            ],
          as: key,
          include:
            Object.keys(_obj[key]).length > 0 ? recursion(_obj[key]) : [],
        })
      }
    }
    return includes
  }

  let include = recursion(graphqlFields)

  include.forEach((item, index) => {
    let __where = where[getModuleNameFromKey(item.as)]
    include[index].where = __where
  })

  return include
}
