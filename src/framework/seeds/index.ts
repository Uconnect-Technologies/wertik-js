export default function(configuration, models) {
  return function(modules: Array<string>) {
    return new Promise((resolve, reject) => {
      if (modules && modules.constructor == Array) {
        const seeds = configuration.seeds;
          if (modules.length == 0) {
            resolve("No Seeds provided.");
            return;
          }
          modules.forEach((currentModule, index) => {
            let isEnd = modules.length - 1 == index;
            let moduleData = seeds[currentModule];
            let model = models[currentModule];
            moduleData.forEach((element, indexOfData) => {
              model.create(element);
              if (isEnd && indexOfData == moduleData.length - 1) {
                resolve(`Seeds added for modules: ${modules.join(", ")}`);
              }
            });
          });
        
      }else {
        let message = `[Wertik Seeds]: modules expected in this format: Array<string>, but received: ${modules}`;
        console.error(message);
        reject(message);
      }
    });
  };
}