import mongoose, { Document, ObjectId, Schema, Types } from "mongoose";
import argon2 from "argon2";

export interface User extends Document {
  _id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  exercises: Types.Array<string>;
}

interface UserBaseDocument extends User {
  modifyExercises(id: string): Promise<User>;
  isExerciseFavorite(id: string | ObjectId): boolean;
}

const UserSchema = new Schema<UserBaseDocument>({
  name: {
    type: String,
    required: true,
    minlength: 2
  },
  username: {
    type: String,
    required: true,
    minlength: 2
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    trim: true
  },
  exercises: [
    {
      type: Schema.Types.ObjectId,
      ref: "Exercise"
    }
  ]
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await argon2.hash(this.password, { saltLength: 10 });
  }

  next();
});

UserSchema.methods = {
  async modifyExercises(id: string) {
    if (this.exercises.includes(id)) {
      this.exercises.remove(id);
    } else {
      this.exercises.push(id);
    }
    return await this.save();
  },
  isExerciseFavorite(id: string) {
    return this.exercises.includes(id);
  }
};

export default mongoose.model("User", UserSchema);
