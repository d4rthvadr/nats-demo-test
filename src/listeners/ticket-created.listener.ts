import { Message } from "node-nats-streaming";
import { Subjects } from "../types/subjects.enum";
import { TicketCreatedEvent } from "../types/subjects.interface";
import { BaseListener } from "./base.listener";

export class TicketCreatedListener extends BaseListener<TicketCreatedEvent> {
    readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
    readonly queueGroupName = "tickets-service";
  
    onMessage(data: TicketCreatedEvent["payload"], msg: Message) {
      console.log("Event data!", data);
  
      console.log("Message sequence", msg.getSequence());
      msg.ack();
    }
  }
  