import {
  prop,
  getModelForClass,
  Ref,
  modelOptions
} from "@typegoose/typegoose";
import { Schema } from "mongoose";
import { Exercise } from "./Exercise";

@modelOptions({ schemaOptions: { timestamps: true } })
export class RoundExercise {
  _id: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;

  @prop()
  public name: string;

  @prop()
  public repeat: number;

  @prop()
  public repeatType: string;

  @prop()
  public rest: number;

  @prop({ ref: () => Exercise })
  public exercise: Ref<Exercise>;

  @prop({ type: () => [String] })
  public muscles: string[];
}

export default getModelForClass(RoundExercise);
