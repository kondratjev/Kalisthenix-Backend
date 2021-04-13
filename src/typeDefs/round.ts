import { gql } from "apollo-server-express";

export default gql`
  type Round {
    _id: ID!
    name: String!
    repeat: Int!
    rest: Int!
    roundExercises: [RoundExercise]!

    createdAt: String!
    updatedAt: String!
  }

  extend type Query {
    getRounds: [Round]
    getRound(id: ID!): Round
    searchRounds(search: String!): [Round]
  }

  extend type Mutation {
    addRound(
      name: String!
      repeat: Int!
      rest: Int!
      roundExercises: [ID]!
    ): Round
  }
`;
