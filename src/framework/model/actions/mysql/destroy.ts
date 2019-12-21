export default async function(model: any, args: any) {
  await model.destroy({
    where: args
  });
  return {
    sucessMessageType: "Deleted",
    sucessMessage: `Deleted sucessfully`
  };
}
