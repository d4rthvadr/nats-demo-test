import { Subjects } from "../types/subjects.enum";

// Interface representing a generic event in a channel
interface ChannelEvent <T = object> {
  // The topic of the event, which is an enum value from Subjects
  topic: Subjects;
  // The version to enforce application level ordering before processing
  version: number;
  // The payload of the event, which contains event-specific data
  payload: T;
}

export interface TicketCreatedEvent extends ChannelEvent {
  payload: {
    id: string;
    title: string;
    price: number;
    userId?: string;
  };
}
