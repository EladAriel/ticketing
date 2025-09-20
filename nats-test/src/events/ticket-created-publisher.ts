import { Publisher, TicketCreatedEvent, Subjects } from '@tickets_test_aa/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}