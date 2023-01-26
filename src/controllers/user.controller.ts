import type { FilterQuery } from 'mongoose';
import type { IUser } from '../database/models/user.model';
import { UserModel } from '../database/models';

export namespace UserController {
  export const getUser = async (filter: FilterQuery<IUser>) => {
    const document = await UserModel.findOne(filter);

    if (!document) {
      throw Error('User Not Found');
    }

    return document.toObject();
  };

  export const createUser = async (user: IUser) => {
    const document = await UserModel.findOne({ email: user.email });

    if (document) {
      throw new Error('User Already Exists');
    }

    return await UserModel.create({
      email: user.email,
      password: user.password,
    });
  };
}
