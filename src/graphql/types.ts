import type { Event, User } from '../database/types';
import { ObjectId } from 'mongodb';

export interface WithId {
  id: ObjectId;
}

export interface WithEvent {
  input: Event;
}

export interface WithUser {
  user: User;
}
