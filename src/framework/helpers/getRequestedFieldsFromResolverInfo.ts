import graphqlFields from "graphql-fields";
export default function (info: any, selectIgnoreFields: Array<String> = []) {
  let fields = graphqlFields(info, null, 2);
  delete fields["pagination"];
  delete fields["filters"];
  selectIgnoreFields.map((str) => {
    if (!!fields['list']) {
      delete fields.list[str];
    } else {
      delete fields[str];
    }
  });
  return fields;
}
