import { Listener, TicketCreatedEvent, Subjects } from '@tickets_test_aa/common';
import { Message } from 'node-nats-streaming';

class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
    queueGroupName = 'orders-service-queue-group';

    onMessage(data: TicketCreatedEvent['data'], msg: Message) {
        console.log('Event data:', data);
        msg.ack();
    }
}

export { TicketCreatedListener };