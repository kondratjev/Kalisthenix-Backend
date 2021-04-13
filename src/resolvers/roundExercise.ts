import { ForbiddenError } from "apollo-server-express";
import RoundExercise from "../models/RoundExercise";

import { getSelection } from "../utils/graphql";

export default {
  Query: {
    getRoundExercises: async (parent, args, context, info) => {
      const selection = getSelection(info);
      return await RoundExercise.find({})
        .select(selection)
        .lean()
        .populate({
          path: "exercise",
          model: "Exercise",
          select: getSelection(info, ["exercise"])
        });
    }
  },
  Mutation: {
    addRoundExercise: async (parent, args, context) => {
      const { isAuth } = context;
      if (!isAuth) {
        throw new ForbiddenError("Not authorized");
      }
      return await RoundExercise.create(args);
    }
  }
};
