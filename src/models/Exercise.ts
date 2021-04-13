import { prop, getModelForClass, modelOptions } from "@typegoose/typegoose";
import { Schema } from "mongoose";

@modelOptions({ schemaOptions: { timestamps: true } })
export class Exercise {
  _id: Schema.Types.ObjectId;
  isBookmarked?: boolean;
  createdAt: Date;
  updatedAt: Date;

  @prop()
  public name: string;

  @prop({ type: () => [String] })
  public muscles: string[];

  @prop({ type: () => [String] })
  public levels: string[];

  @prop({ type: () => [String] })
  public equipment: string[];

  @prop()
  public imageUrl: string;

  @prop()
  public videoUrl?: string;
}

export default getModelForClass(Exercise);
