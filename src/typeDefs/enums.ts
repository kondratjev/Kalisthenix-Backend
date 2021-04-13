import { gql } from "apollo-server-express";

export default gql`
  enum MUSCLES {
    Back
    Shoulders
    Biceps
    Triceps
    Chest
    Abs
    Legs
  }

  enum LEVELS {
    Beginner
    Intermediate
    Advanced
  }

  enum SPOTS {
    Home
    Gym
    Outdoors
  }

  enum CATEGORIES {
    Calisthenics
    WeightedCalisthenics
    Weighted
  }

  enum STYLES {
    FatBurning
    Endurance
    Strength
  }
`;
