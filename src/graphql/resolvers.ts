import { WithEvent, WithId, WithUser } from './index';
import { EventController } from '../controllers';

export const queryResolver = {
  events: () => {
    return EventController.events();
  },
  event: async (_, variables: WithId) => {
    return EventController.event(variables.id);
  },
};

export const mutationResolver = {
  createEvent: (_, variables: WithEvent, ctx: WithUser) => {
    return EventController.createEvent(variables.input, ctx.user);
  },
  editEvent: (_, variables: WithId & WithEvent, ctx: WithUser) => {
    return EventController.editEvent(variables.id, ctx.user, variables.input);
  },
  deleteEvent: (_, variables: WithId, ctx: WithUser) => {
    return EventController.deleteEvent(variables.id, ctx.user);
  },
  joinEvent: (_, variables: WithId, ctx: WithUser) => {
    return EventController.joinEvent(variables.id, ctx.user._id);
  },
  leaveEvent: (_, variables: WithId, ctx: WithUser) => {
    return EventController.leaveEvent(variables.id, ctx.user._id);
  },
};
