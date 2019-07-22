import findOneByPK from "./findOneByPK"

export default async function (model: any,args: any,requestedFields: any) {
  console.log("view mysql", requestedFields);
  let response = await findOneByPK(model,args.id);
  return response;
}