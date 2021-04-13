import { gql } from "apollo-server-express";

export default gql`
  type WorkoutGroup {
    _id: ID!
    name: String!
    muscles: [MUSCLES]!
    spots: [SPOTS]!
    categories: [CATEGORIES]!
    style: STYLES!
    imageUrl: String!
    isPro: Boolean!
    workouts: [Workout]!

    createdAt: String!
    updatedAt: String!
    isBookmarked: Boolean
  }

  extend type Query {
    getWorkoutGroups: [WorkoutGroup]
  }

  extend type Mutation {
    addWorkoutGroup(
      name: String!
      imageUrl: String!
      isPro: Boolean
      workouts: [ID]!
    ): WorkoutGroup
  }
`;
