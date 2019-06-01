import findOneByPK from "./findOneByPK"
export default async function (model,args) {
  let response = await findOneByPK(model,args.id);
  return response;
}