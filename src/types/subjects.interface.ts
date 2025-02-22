import { Subjects } from "../types/subjects.enum";

// Interface representing a generic event in a channel
export interface ChannelEvent <T = object> {
  // The subject/topic of the event, which is an enum value from Subjects
  subject: Subjects;
  // The version to enforce application level ordering before processing
  version: number;
  // The payload of the event, which contains event-specific data
  payload: T;
}

export interface TicketCreatedEvent extends ChannelEvent {
  subject: Subjects.TicketCreated;
  payload: {
    id: string;
    title: string;
    price: number;
    userId?: string;
  };
}
