import mongoose, { Document, Schema } from "mongoose";
import { Round } from "./Round";

export interface Workout extends Document {
  _id: string;
  name: string;
  level: string;
  muscles: string[];
  spots: string[];
  categories: string[];
  style: string;
  imageUrl: string;
  videoUrl?: string;
  isPro: boolean;
  rounds: Round[];

  createdAt: string;
  updatedAt: string;
  isBookmarked?: boolean;
}

const WorkoutSchema = new Schema<Workout>(
  {
    name: {
      type: String,
      required: true
    },
    level: {
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
    videoUrl: String,
    isPro: {
      type: Boolean,
      required: true
    },
    rounds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Round",
        required: true
      }
    ]
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Workout", WorkoutSchema);
