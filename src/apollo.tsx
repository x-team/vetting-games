import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { ErrorCode, hasGraphQLErrorCode } from "@error";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("_vg");
  const type = localStorage.getItem("_vg_type");

  return {
    headers: {
      ...headers,
      "Access-Control-Allow-Origin": "*",
      authorization: token ? `${type} ${token}` : "",
    },
  };
}).concat(httpLink);

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.map((error) => {
      const { message, path, extensions } = error;
      console.error(
        `[GraphQL error]: ${message}\n Path: ${path}, Code: ${extensions?.code}\n`,
        error
      );
    });

    if (hasGraphQLErrorCode(graphQLErrors, ErrorCode.UNAUTHORIZED)) {
      localStorage.clear();
      window.location.href = "/";
    }
  }
});

export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink]),
  cache: new InMemoryCache(),
});
