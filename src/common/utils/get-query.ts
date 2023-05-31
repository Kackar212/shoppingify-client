import { GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "querystring";

export function getQuery<Params extends ParsedUrlQuery, T>(
  query: (params: Params) => T,
  context: GetServerSidePropsContext
) {
  const { params = {} } = context;

  const selectedQuery = query(params as Params);

  return { ...context.params, ...selectedQuery };
}
