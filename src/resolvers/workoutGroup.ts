import { ForbiddenError } from "apollo-server-express";
import WorkoutGroup from "../models/WorkoutGroup";

import { getSelection } from "../utils/graphql";

export default {
  Query: {
    getWorkoutGroups: async (parent, args, context, info) => {
      const selection = getSelection(info);
      return await WorkoutGroup.find({})
        .select(selection)
        .lean()
        .populate({
          path: "workouts",
          model: "Workout",
          select: getSelection(info, ["workouts"]),
          populate: {
            path: "rounds",
            model: "Round",
            select: getSelection(info, ["workouts", "rounds"]),
            populate: {
              path: "roundExercises",
              model: "RoundExercise",
              select: getSelection(info, [
                "workouts",
                "rounds",
                "roundExercises"
              ]),
              populate: {
                path: "exercise",
                model: "Exercise",
                select: getSelection(info, [
                  "workouts",
                  "rounds",
                  "roundExercises",
                  "exercise"
                ])
              }
            }
          }
        });
    }
  },
  Mutation: {
    addWorkoutGroup: async (parent, args, context) => {
      const { isAuth } = context;
      if (!isAuth) {
        throw new ForbiddenError("Not authorized");
      }
      return await WorkoutGroup.create(args);
    }
  }
};
