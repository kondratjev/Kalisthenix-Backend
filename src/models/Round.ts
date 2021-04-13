import {
  prop,
  getModelForClass,
  Ref,
  modelOptions
} from "@typegoose/typegoose";
import { Schema } from "mongoose";
import { RoundExercise } from "./RoundExercise";

@modelOptions({ schemaOptions: { timestamps: true } })
export class Round {
  _id: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;

  @prop()
  public name: string;

  @prop()
  public repeat: number;

  @prop()
  public rest: number;

  @prop({ ref: () => RoundExercise })
  public roundExercises: Ref<RoundExercise>[];
}

export default getModelForClass(Round);
