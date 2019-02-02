import {get} from "lodash";
export default async function (model,args = {}) {
	const page = get(args,'page',1);
	const limit = get(args,'limit',10);
	let filters = args;
  delete filters['limit'];
  delete filters['page'];
  let totalFilters = Object.keys(filters).length;
  let result = {};
  if (totalFilters > 0) {
  	result = await model.paginate({},{page: page,limit: limit})
  }else {
  	result = await model.paginate(filters,{page: page,limit: limit})
  }
  const response = get(result,'docs',[]);
  return response;
}