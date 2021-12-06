const pause = function (timeout = 1000) {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve();
      }, timeout);
    } catch (e) {
      reject(e);
    }
  });
};

export default pause;
