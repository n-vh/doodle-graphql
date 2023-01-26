import type { User } from '../types';
import { model, Schema } from 'mongoose';

const schema = new Schema<User>(
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

export const UserModel = model<User>('User', schema);
