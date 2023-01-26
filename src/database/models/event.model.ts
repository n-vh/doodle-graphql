import type { IUser } from './user.model';
import { model, ObjectId, Schema } from 'mongoose';

export interface IEvent {
  _id?: ObjectId;
  owner: IUser;
  title: string;
  date: Date;
  description: string;
  participants: IUser[];
}

const schema = new Schema<IEvent>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
    },
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    versionKey: false,
  },
);

schema.virtual('id').get((e) => {
  return e?._id;
});

export const EventModel = model<IEvent>('Event', schema);
