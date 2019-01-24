import {get} from "lodash";
export default async function (model,args) {
	const page = get(args,'page',1);
	const limit = get(args,'limit',10);
  const result = await model.paginate({},{page: args.page})
  const response = get(result,'docs',[]);
  return response;
}