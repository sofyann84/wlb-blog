import ApolloClient from "apollo-boost";

const API_URL = "https://graphqlzero.almansi.me/api";
export const client = new ApolloClient({
  uri: API_URL,
});