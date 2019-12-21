import graphqlFields from "graphql-fields";
export default function(info: any) {
  let fields = graphqlFields(info, null, 2);
  delete fields["pagination"];
  delete fields["filters"];
  return fields;
}
