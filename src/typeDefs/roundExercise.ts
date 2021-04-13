import { gql } from "apollo-server-express";

export default gql`
  type RoundExercise {
    _id: ID!
    repeat: Int!
    repeatType: String!
    rest: Int!
    exercise: Exercise!

    createdAt: String!
    updatedAt: String!
  }

  extend type Query {
    getRoundExercises: [RoundExercise]
  }

  extend type Mutation {
    addRoundExercise(
      repeat: Int!
      repeatType: String!
      rest: Int!
      exercise: ID!
    ): RoundExercise
  }
`;
