import { ObjectId } from 'mongodb';

export interface Event {
  id?: ObjectId;
  owner: User;
  title: string;
  date: Date;
  description: string;
  participants: User[];
}

export interface User {
  id?: ObjectId;
  username: string;
  email: string;
  password: string;
}
