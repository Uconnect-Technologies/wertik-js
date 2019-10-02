import findOneByPK from "./findOneByPK"

export default async function (model: any,args: any,requestedFields: any) {
  let response = await findOneByPK(model,args.id,requestedFields);
  return response;
}