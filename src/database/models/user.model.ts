import type { ObjectId } from 'mongodb';
import { model, Schema } from 'mongoose';

export interface IUser {
  _id?: ObjectId;
  password: string;
  email: string;
}

const schema = new Schema<IUser>(
  {
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    versionKey: false,
  },
);

export const UserModel = model<IUser>('User', schema);
