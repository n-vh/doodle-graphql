import type { WithEvent, WithId, WithUser } from './types';
import { EventController } from '../controllers';

export const queryResolver = {
  events: () => {
    return EventController.getEvents();
  },
  event: (_, v: WithId) => {
    return EventController.getEvent(v.id);
  },
};

export const mutationResolver = {
  createEvent: (_, v: WithEvent, c: WithUser) => {
    return EventController.createEvent(c.user, v.input);
  },
  editEvent: (_, v: WithId & WithEvent, c: WithUser) => {
    return EventController.editEvent(c.user, v.id, v.input);
  },
  deleteEvent: (_, v: WithId, c: WithUser) => {
    return EventController.deleteEvent(c.user, v.id);
  },
  joinEvent: (_, v: WithId, c: WithUser) => {
    return EventController.joinEvent(c.user, v.id);
  },
  leaveEvent: (_, v: WithId, c: WithUser) => {
    return EventController.leaveEvent(c.user, v.id);
  },
};
