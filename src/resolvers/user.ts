import argon2 from "argon2";
import {
  AuthenticationError,
  ForbiddenError,
  UserInputError
} from "apollo-server-errors";

import User from "../models/User";
import ExerciseModel from "../models/Exercise";

import { getTokens } from "../utils/auth";
import { getSelection } from "../utils/graphql";

export default {
  Query: {
    login: async (parent, args, context, info) => {
      const { email, password } = args;
      const user = await User.findOne({ email }).lean();
      if (!user) {
        throw new AuthenticationError("User is not found.");
      }
      const isPasswordsEquals = await argon2.verify(user.password, password);
      if (!isPasswordsEquals) {
        throw new AuthenticationError("User is not found.");
      }
      const tokens = getTokens(user);
      return {
        user,
        ...tokens
      };
    },

    getProfile: async (parent, args, context, info) => {
      const { isAuth, userId } = context;
      if (!isAuth) {
        throw new ForbiddenError("Not authorized");
      }
      const selection = getSelection(info);
      return await User.findById(userId).select(selection).lean();
    },
    getMyExercises: async (parent, args, context, info) => {
      const { isAuth, userId } = context;
      if (!isAuth) {
        throw new ForbiddenError("Not authorized");
      }
      const selection = getSelection(info);
      const user = await User.findById(userId)
        .lean()
        .populate("exercises", selection);
      return user?.exercises;
    }
  },
  Mutation: {
    register: async (parent, args, context, info) => {
      const { email, username, password } = args;
      const user = await User.findOne({ email, username }).lean();
      if (user) {
        throw new UserInputError("User is already registered.");
      }
      const newUser = await User.create(args);
      const tokens = getTokens(args);
      return {
        user: newUser,
        ...tokens
      };
    },

    toggleFavorite: async (parent, args, context, info) => {
      const { isAuth, userId } = context;
      if (!isAuth) {
        throw new ForbiddenError("Not authorized");
      }
      const { id } = args;
      const exercise = await ExerciseModel.findById(id).lean();
      if (!exercise) {
        throw new UserInputError("Exercise not found.");
      }
      const user = await User.findById(userId);
      if (!user) {
        throw new UserInputError("User not found.");
      }
      await user.modifyExercises(id);
      return { isSuccess: true };
    }
  }
};
