import { ForbiddenError } from "apollo-server-express";
import Workout from "../models/Workout";

import { getSelection } from "../utils/graphql";

export default {
  Query: {
    getWorkouts: async (parent, args, context, info) => {
      const selection = getSelection(info);
      return await Workout.find({})
        .select(selection)
        .lean()
        .populate({
          path: "rounds",
          model: "Round",
          select: getSelection(info, ["rounds"]),
          populate: {
            path: "roundExercises",
            model: "RoundExercise",
            select: getSelection(info, ["rounds", "roundExercises"]),
            populate: {
              path: "exercise",
              model: "Exercise",
              select: getSelection(info, [
                "rounds",
                "roundExercises",
                "exercise"
              ])
            }
          }
        });
    }
  },
  Mutation: {
    addWorkout: async (parent, args, context) => {
      const { isAuth } = context;
      if (!isAuth) {
        throw new ForbiddenError("Not authorized");
      }
      return await Workout.create(args);
    }
  }
};
