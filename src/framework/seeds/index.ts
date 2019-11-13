export default function (configuration, models) {
  return function () {
    const seeds = configuration.seeds;
    const modules = Object.keys(seeds);
    return new Promise((resolve, reject) => {
      if (modules.length == 0) {
        resolve("No Seeds provided.");
        return;
      }
      modules.forEach((currentModule,index) => {
        let isEnd = modules.length - 1 == index;
        let moduleData = seeds[currentModule];
        let model = models[currentModule];
        moduleData.forEach((element,indexOfData) => {
          model.create(element);
          if (isEnd && indexOfData == moduleData.length - 1) {
            resolve("Seeds added");
          }
        });
      });
    });
  }
}