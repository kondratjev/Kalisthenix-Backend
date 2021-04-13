import { gql } from "apollo-server-express";

export default gql`
  type Exercise {
    _id: ID!
    name: String!
    muscles: [MUSCLES]!
    levels: [LEVELS]!
    equipment: [String]
    imageUrl: String!
    videoUrl: String

    createdAt: String
    updatedAt: String
    isBookmarked: Boolean
  }

  extend type Query {
    getExercises: [Exercise]
    getExercise(id: ID!): Exercise
    searchExercises(search: String!): [Exercise]
  }

  extend type Mutation {
    addExercise(
      name: String!
      muscles: [MUSCLES]!
      levels: [LEVELS]!
      equipment: [String]
      imageUrl: String!
      videoUrl: String
    ): Exercise
  }
`;
