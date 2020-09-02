let javascript = {
  where: {
    id: {
      _eq: 1,
    },
    _or: [
      {
        id: {
          _eq: 1,
        },
      },
    ],
    a: {
      _eq: {
        eq: {
          _eq: 1,
        },
      },
    },
    _and: [
      {
        id: {
          _eq: 1,
        },
      },
      {
        last_name: {
          _eq: "nice",
        },
      },
    ],
  },
};

const wrap = (operator) => {
  return "____" + operator;
};

const iterate = (obj) => {
  const isObject = obj && obj.constructor === Object;
  const isArray = obj && obj.constructor === Array;
  if (isObject) {
    const keys = Object.keys(obj);
    keys.forEach((element) => {
      const value = obj[element];
      const isArray = value && value.constructor === Array;
      const isObject = value && value.constructor === Object;
      if (element.indexOf("_") === 0) {
        const newWrapValue = wrap(element);
        obj[newWrapValue] = obj[element];
        delete obj[element];
      }
      if (isArray === true || isObject === true) {
        iterate(value);
      }
    });
    return obj;
  } else {
    obj.forEach((element) => {
      iterate(element);
    });
  }
};

export default iterate;
