import { gql } from "apollo-server-express";

export default gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    username: String!
  }

  type Auth {
    user: User
    token: String!
    refreshToken: String!
  }

  extend type Query {
    getProfile: User
    getMyExercises: [Exercise]
    login(email: String!, password: String!): Auth!
  }

  type ToggleFavoriteResponse {
    isSuccess: Boolean
  }

  extend type Mutation {
    register(
      name: String!
      email: String!
      username: String!
      password: String!
    ): Auth!

    toggleFavorite(id: ID!): ToggleFavoriteResponse!
  }
`;
