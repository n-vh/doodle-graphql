import { ObjectId } from 'mongodb';

export interface Event {
  _id?: ObjectId;
  owner: User;
  title: string;
  date: Date;
  description: string;
  participants: User[];
}

export interface User {
  _id?: ObjectId;
  password: string;
  email: string;
}
