import { GraphQLResolveInfo } from "graphql";
import graphqlFields from "graphql-fields";
import { Model } from "mongoose";

const getNestedObject = (nestedObj: object, pathArr: string[]) => {
  return pathArr.reduce(
    (obj, key) => (obj && obj[key] !== "undefined" ? obj[key] : undefined),
    nestedObj
  );
};

export function getSelection(info: GraphQLResolveInfo, pathArr?: string[]) {
  const fields = graphqlFields(info);
  const keys = pathArr?.length ? getNestedObject(fields, pathArr) : fields;
  return Object.keys(keys).reduce((a, b) => ({ ...a, [b]: 1 }), {});
}
