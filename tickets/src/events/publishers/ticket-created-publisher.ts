import { Publisher, Subjects, TicketCreatedEvent } from '@tickets_test_aa/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
    
}
