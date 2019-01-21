export default async function (model,id,name) {
  await model.destroy({
    where: {
      id: id
    }
  });
  return {
    sucessMessageType: "Deleted",
    sucessMessage: `${name} deleted sucessfully`
  }
}