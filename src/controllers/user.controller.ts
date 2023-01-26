import type { FilterQuery } from 'mongoose';
import type { User } from '../database/types';
import { UserModel } from '../database/models';

export const UserController = {
  getUser: async (filter: FilterQuery<User>) => {
    const document = await UserModel.findOne(filter);

    if (!document) {
      throw Error('USER_NOT_FOUND');
    }

    return document;
  },
  createUser: async (user: User) => {
    const document = await UserModel.findOne({ username: user.username });

    if (document) {
      throw new Error('USER_ALREADY_EXISTS');
    }

    return await UserModel.create(user);
  },
};
