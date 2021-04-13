import { gql } from "apollo-server-express";

export default gql`
  type Workout {
    _id: ID!
    name: String!
    level: LEVELS!
    muscles: [MUSCLES]!
    spots: [SPOTS]!
    categories: [CATEGORIES]!
    style: STYLES!
    imageUrl: String!
    videoUrl: String
    isPro: Boolean!
    rounds: [Round]!

    createdAt: String!
    updatedAt: String!
    isBookmarked: Boolean
  }

  extend type Query {
    getWorkouts: [Workout]
  }

  extend type Mutation {
    addWorkout(
      name: String!
      level: LEVELS!
      muscles: [MUSCLES]!
      spots: [SPOTS]!
      categories: [CATEGORIES]!
      style: STYLES!
      imageUrl: String!
      videoUrl: String
      isPro: Boolean
      rounds: [ID]!
    ): Workout
  }
`;
