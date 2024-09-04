"use client";

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ReactNode } from "react";

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_SERVER_URL,
});

const authLink = setContext((_, { headers }) => {
  const authToken = localStorage.getItem("AUTH_TOKEN");

  return {
    headers: {
      ...headers,
      authorization: authToken,
    },
  };
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function ApolloClientProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
