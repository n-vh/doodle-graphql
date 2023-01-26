import type { User } from '../types';
import { model, Schema } from 'mongoose';

const schema = new Schema<User>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

schema.virtual('id').get((e) => {
  return e?._id;
});

export const UserModel = model<User>('User', schema);
