let Validator = require("validatorjs");

export default async function(schema: any, args: any) {
  let keys = Object.keys(schema);
  keys.forEach(element => {
    schema[element] = schema[element].replace("int", "integer");
  });
  let validate = new Validator(args, schema);
  if (validate.passes()) {
    return { success: true };
  } else {
    return { success: false, errors: validate.errors.all() };
  }
}
