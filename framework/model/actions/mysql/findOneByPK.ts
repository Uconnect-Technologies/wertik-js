export default async function (model,id) {
  let object = await model.findByPk(id);
  return object;
}