import { ForbiddenError } from "apollo-server-express";
import { LeanDocument } from "mongoose";
import ExerciseModel, { Exercise } from "../models/Exercise";
import User from "../models/User";

import { getSelection } from "../utils/graphql";

export default {
  Query: {
    getExercises: async (parent, args, context, info) => {
      const { isAuth, userId } = context;
      const selection = getSelection(info);
      if (isAuth) {
        const [user, exercises] = await Promise.all([
          User.findById(userId),
          ExerciseModel.find({}).select(selection).lean()
        ]);
        if (user) {
          return exercises.reduce((arr, exercise) => {
            const isBookmarked = user.isExerciseFavorite(exercise._id);
            arr.push({
              ...exercise,
              isBookmarked
            });
            return arr;
          }, [] as LeanDocument<Exercise>[]);
        }
      }
      return await ExerciseModel.find({}).select(selection).lean();
    },
    getExercise: async (parent, args, context, info) => {
      const { id } = args;
      const selection = getSelection(info);
      return await ExerciseModel.findById(id).select(selection).lean();
    },
    searchExercises: async (parent, args, context, info) => {
      const { search } = args;
      const selection = getSelection(info);
      const regex = new RegExp(search, "i");
      return await ExerciseModel.find({ title: regex })
        .select(selection)
        .lean();
    }
  },
  Mutation: {
    addExercise: async (parent, args, context) => {
      const { isAuth } = context;
      if (!isAuth) {
        throw new ForbiddenError("Not authorized");
      }
      return await ExerciseModel.create(args);
    }
  }
};
