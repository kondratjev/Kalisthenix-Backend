import mongoose, { Document, Schema } from "mongoose";
import { Workout } from "./Workout";
import { getSelection } from "../utils/graphql";

export interface WorkoutGroup extends Document {
  _id: string;
  name: string;
  muscles: string[];
  spots: string[];
  categories: string[];
  style: string;
  imageUrl: string;
  isPro: boolean;
  workouts: Workout[];

  createdAt: string;
  updatedAt: string;
  isBookmarked?: boolean;
}

const WorkoutGroupSchema = new Schema<WorkoutGroup>(
  {
    name: {
      type: String,
      required: true
    },
    muscles: {
      type: [String],
      required: true
    },
    spots: {
      type: [String],
      required: true
    },
    categories: {
      type: [String],
      required: true
    },
    style: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    isPro: {
      type: Boolean,
      required: true
    },
    workouts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Workout",
        required: true
      }
    ]
  },
  {
    timestamps: true
  }
);

WorkoutGroupSchema.pre("validate", async function (next) {
  await this.populate({
    path: "workouts",
    model: "Workout"
  }).execPopulate();
  this.muscles = this.workouts.reduce(
    (acc, workout) => {
      acc.push(...workout.muscles);
      return acc;
    },
    [""]
  );
  this.muscles = [...new Set(this.muscles)].filter(Boolean);
  this.spots = this.workouts.reduce(
    (acc, workout) => {
      acc.push(...workout.spots);
      return acc;
    },
    [""]
  );
  this.spots = [...new Set(this.spots)].filter(Boolean);
  this.categories = this.workouts.reduce(
    (acc, workout) => {
      acc.push(...workout.categories);
      return acc;
    },
    [""]
  );
  this.categories = [...new Set(this.categories)].filter(Boolean);
  this.style = this.workouts.reduce((acc, workout) => {
    acc = workout.style !== this.style ? workout.style : this.style;
    return acc;
  }, "");

  next();
});

export default mongoose.model("WorkoutGroup", WorkoutGroupSchema);
