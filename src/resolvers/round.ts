import { ForbiddenError } from "apollo-server-express";
import Round from "../models/Round";

import { getSelection } from "../utils/graphql";

export default {
  Query: {
    getRounds: async (parent, args, context, info) => {
      const selection = getSelection(info);
      return await Round.find({})
        .select(selection)
        .lean()
        .populate({
          path: "roundExercises",
          model: "RoundExercise",
          select: getSelection(info, ["roundExercises"]),
          populate: {
            path: "exercise",
            model: "Exercise",
            select: getSelection(info, ["roundExercises", "exercise"])
          }
        });
    }
  },
  Mutation: {
    addRound: async (parent, args, context) => {
      const { isAuth } = context;
      if (!isAuth) {
        throw new ForbiddenError("Not authorized");
      }
      return await Round.create(args);
    }
  }
};
