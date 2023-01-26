export const typeDefinitions = `#graphql
scalar ObjectID

type Event {
  id: ObjectID!
  owner: ObjectID!
  title: String!
  date: String
  description: String!
  participants: [ObjectID]!
}

input EventInput {
  title: String!
  date: String! @constraint(format: "date")
  description: String!
}

type Query {
  events: [Event]!
  event(id: ObjectID!): Event
}

type Mutation {
  createEvent(input: EventInput): Event
  editEvent(id: ObjectID, input: EventInput): Event
  deleteEvent(id: ObjectID): Event
  joinEvent(id: ObjectID): Event
  leaveEvent(id: ObjectID): Event
}
`;
