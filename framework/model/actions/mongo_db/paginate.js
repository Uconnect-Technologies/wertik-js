import {get} from "lodash";
export default async function (model,args) {
	const page = get(args,'page',1);
	const limit = get(args,'limit',10);
  const result = await model.paginate({},{page: page,limit: limit})
  const response = get(result,'docs',[]);
  return response;
}