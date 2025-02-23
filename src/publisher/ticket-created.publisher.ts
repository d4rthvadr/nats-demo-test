import { Subjects } from "../types/subjects.enum";
import { TicketCreatedEvent } from "../types/subjects.interface";
import { BasePublisher, PublishEvent } from "./base.publisher";

export class TicketCreatedPublisher extends BasePublisher<PublishEvent<TicketCreatedEvent>> {
    readonly subject = Subjects.TicketCreated;
}

