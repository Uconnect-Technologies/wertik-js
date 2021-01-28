import { get } from "lodash";
export default function (configuration, models) {
  return function (modules: Array<string>) {
    return new Promise(async (resolve, reject) => {
      const keys = Object.keys(configuration.seeds);
      for (const name of keys) {
        const nameSeeds = configuration.seeds[name];
        if (Array.isArray(nameSeeds)) {
          for (const seed of nameSeeds) {
            const { value } = seed;
            const afterCreate = get(seed, "afterCreate", function () {});
            if (value) {
              const instance = await models[name].create(value);
              afterCreate(instance, models);
            }
          }
        }
      }
    });
  };
}
