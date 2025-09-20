import { Publisher, TicketUpdatedEvent, Subjects } from '@tickets_test_aa/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}