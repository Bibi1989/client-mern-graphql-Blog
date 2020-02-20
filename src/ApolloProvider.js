import React from "react";
// import ApolloClient from "apollo-client";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
// import { InMemoryCache } from "apollo-cache-inmemory";
// import { createHttpLink } from "apollo-link-http";
// import { ApolloProvider } from "@apollo/react-hooks";
// import { setContext } from "apollo-link-context";
import App from "./App";
import { AuthProvider } from "./components/context/AuthProvider";

// const httpLink = createHttpLink({
//   uri: "http://localhost:7001"
// });

// const authlink = setContext(() => {
//   const tok = JSON.parse(sessionStorage.getItem("users"));
//   console.log(tok);
//   const token = tok.token;
//   return {
//     headers: {
//       Authorization: token ? `Bearer ${token}` : ""
//     }
//   };
// });

const client = new ApolloClient({
  uri: "http://localhost:7001",
  request: operation => {
    const token = JSON.parse(sessionStorage.getItem("auth"));
    operation.setContext({
      headers: {
        auth: `${token}`
      }
    });
  }
});

// const client = new ApolloClient({
//   link: authlink.concat(httpLink),
//   // link: httpLink,
//   cache: new InMemoryCache()
// });

export default (
  <ApolloProvider client={client}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ApolloProvider>
);
