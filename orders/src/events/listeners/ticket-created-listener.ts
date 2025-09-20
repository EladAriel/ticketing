import { Message } from "node-nats-streaming";
import { Listener, Subjects, TicketCreatedEvent } from "@tickets_test_aa/common";
import { Ticket } from "../../models/ticket";
import { queueGroupName } from "./queue-group-name";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
    readonly queueGroupName = queueGroupName;

    async onMessage(data: TicketCreatedEvent["data"], msg: Message) {
        const { title, price } = data;

        const ticket = Ticket.build({
            id: data.id,
            title,
            price
        });

        await ticket.save();
        msg.ack();
    }
}