import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider as ApolloProviderBase,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

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

export const apolloClient = new ApolloClient({
  link: authLink,
  cache: new InMemoryCache(),
});
