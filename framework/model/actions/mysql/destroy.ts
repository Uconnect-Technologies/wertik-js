export default async function (model,args) {
  await model.destroy({
    where: args
  });
  return {
    sucessMessageType: "Deleted",
    sucessMessage: `Deleted sucessfully`
  }
}