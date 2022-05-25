import { WertikApp } from "../../next/types/index"

export const resolveModulesTableInstancesToWeritkModels = (
  wertikApp: WertikApp
) => {
  var obj: any = {}
  Object.keys(wertikApp.modules).forEach((key) => {
    obj[key] = wertikApp.modules[key].tableInstance
  })
  return obj
}
