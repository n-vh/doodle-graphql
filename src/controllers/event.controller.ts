import type { Event, User } from '../database/types';
import { ObjectId } from 'mongodb';
import { GraphQLError } from 'graphql';
import { EventModel } from '../database/models';

export const EventController = {
  getEvents: async () => {
    return await EventModel.find();
  },
  getEvent: async (id: ObjectId) => {
    return await EventModel.findById(id);
  },
  createEvent: async (user: User, event: Partial<Event>) => {
    const document = await EventModel.findOne({
      date: new Date(event.date),
      owner: user.id,
    });

    if (document) {
      throw new GraphQLError('EVENT_ALREADY_EXISTS');
    }

    return EventModel.create({
      date: new Date(event.date),
      description: event.description,
      owner: user.id,
      participants: [user.id],
      title: event.title,
    });
  },
  editEvent: async (user: User, id: ObjectId, event: Partial<Event>) => {
    const document = await EventModel.findOneAndUpdate(
      {
        _id: id,
        owner: user.id,
      },
      { $set: event },
      { new: true },
    );

    if (!document) {
      throw new GraphQLError('EVENT_NOT_FOUND');
    }

    return document;
  },
  deleteEvent: async (user: User, id: ObjectId) => {
    const document = await EventModel.findOneAndDelete({
      _id: id,
      owner: user.id,
    });

    if (!document) {
      throw new GraphQLError('EVENT_NOT_FOUND');
    }

    return document;
  },
  joinEvent: async (user: User, id: ObjectId) => {
    const document = await EventModel.updateOne(
      { _id: id },
      {
        $addToSet: {
          participants: user.id,
        },
      },
    );

    if (document.matchedCount === 0) {
      throw new GraphQLError('EVENT_NOT_FOUND');
    }

    if (document.modifiedCount === 0) {
      throw new GraphQLError('EVENT_ALREADY_JOINED');
    }

    return await EventModel.findById(id);
  },
  leaveEvent: async (user: User, id: ObjectId) => {
    const document = await EventModel.updateOne(
      { _id: id },
      {
        $pull: {
          participants: user.id,
        },
      },
    );

    if (!document) {
      throw new GraphQLError('EVENT_NOT_FOUND');
    }

    if (document.modifiedCount === 0) {
      throw new GraphQLError('EVENT_NOT_JOINED');
    }

    return await EventModel.findById(id);
  },
};
