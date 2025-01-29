import gql from "graphql-tag";

export const authTypeDefs = gql`
  type User {
    id: ID!
    email: String!
    name: String!
    token: String
  }

  type Query {
    me: User
  }

  type Mutation {
    register(name: String!, email: String!, password: String!): User
    login(email: String!, password: String!): User
  }
`;
