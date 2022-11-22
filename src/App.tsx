import { apolloClient } from "@apollo";
import { ApolloProvider } from "@apollo/client";
import routes from "@router/routes";
import { AuthProvider } from "react-auth-kit";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <AuthProvider authType="localstorage" authName="_vg">
      <ApolloProvider client={apolloClient}>
        <RouterProvider router={routes} />
      </ApolloProvider>
    </AuthProvider>
  );
}

export default App;
