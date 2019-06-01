import findOneByPK from "./findOneByPK.ts"
export default async function (model,args) {
  let response = await findOneByPK(model,args.id);
  return response;
}