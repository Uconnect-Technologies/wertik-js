import findOneByPK from "./findOneByPK"
export default async function (model: any,args: any) {
  let response = await findOneByPK(model,args.id);
  return response;
}