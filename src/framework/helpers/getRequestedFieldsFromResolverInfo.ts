import {get} from "lodash";
export default function (info: any) {
  let fields = get(info,'operation.selectionSet.selections[0].selectionSet.selections',[]);
  return fields.map((c) => {
    return get(c,'name.value','');
  });
}
