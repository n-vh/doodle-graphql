import type { IEvent, IUser } from '../database/models';
import { ObjectId } from 'mongodb';
import { EventModel } from '../database/models';
import { GraphQLError } from 'graphql';

export namespace EventController {
  export const events = async () => {
    return await EventModel.find();
  };

  export const event = async (eventId: string) => {
    return await EventModel.findById(new Object(eventId));
  };

  export const createEvent = async (event: Partial<IEvent>, owner: IUser) => {
    const document = await EventModel.findOne({
      date: new Date(event.date),
      owner: owner,
    });

    if (document) {
      throw new GraphQLError('EVENT_ALREADY_EXISTS');
    }

    return EventModel.create({
      date: new Date(event.date),
      description: event.description,
      owner: owner,
      participants: [owner],
      title: event.title,
    });
  };

  export const editEvent = async (
    eventId: string,
    user: IUser,
    event: Partial<IEvent>,
  ) => {
    const document = await EventModel.findOneAndUpdate(
      {
        _id: new ObjectId(eventId),
        owner: user,
      },
      {
        $set: event,
      },
      {
        new: true,
      },
    );

    if (!document) {
      throw new GraphQLError('EVENT_NOT_FOUND');
    }

    return document;
  };

  export const deleteEvent = async (id: string, owner: IUser) => {
    const document = await EventModel.findOneAndDelete({
      _id: new ObjectId(id),
      owner: owner,
    });

    if (!document) {
      throw new GraphQLError('EVENT_NOT_FOUND');
    }

    return document;
  };

  export const joinEvent = async (eventId: string, userId: ObjectId) => {
    const document = await EventModel.updateOne(
      { _id: new ObjectId(eventId) },
      {
        $addToSet: {
          participants: userId,
        },
      },
    );

    if (document.matchedCount === 0) {
      throw new GraphQLError('EVENT_NOT_FOUND');
    }

    if (document.modifiedCount === 0) {
      throw new GraphQLError('EVENT_ALREADY_JOINED');
    }

    return await EventModel.findById(new ObjectId(eventId));
  };

  export const leaveEvent = async (eventId: string, userId: ObjectId) => {
    const document = await EventModel.updateOne(
      { _id: new ObjectId(eventId) },
      {
        $pull: {
          participants: userId,
        },
      },
    );

    if (!document) {
      throw new GraphQLError('EVENT_NOT_FOUND');
    }

    if (document.modifiedCount === 0) {
      throw new GraphQLError('EVENT_NOT_JOINED');
    }

    return await EventModel.findById(new ObjectId(eventId));
  };
}
