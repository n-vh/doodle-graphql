import type { FilterQuery } from 'mongoose';
import type { User } from '../database/types';
import { UserModel } from '../database/models';

export const UserController = {
  getUser: async (filter: FilterQuery<User>) => {
    const document = await UserModel.findOne(filter);

    if (!document) {
      throw Error('User Not Found');
    }

    return document.toObject();
  },
  createUser: async (user: User) => {
    const document = await UserModel.findOne({ email: user.email });

    if (document) {
      throw new Error('User Already Exists');
    }

    return await UserModel.create({
      email: user.email,
      password: user.password,
    });
  },
};
