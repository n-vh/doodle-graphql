import type { Event } from '../types';
import { model, Schema } from 'mongoose';

const schema = new Schema<Event>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
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

export const EventModel = model<Event>('Event', schema);
