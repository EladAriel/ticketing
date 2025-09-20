import { Publisher, OrderCreatedEvent, Subjects } from "@tickets_test_aa/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    readonly subject: Subjects.OrderCreated = Subjects.OrderCreated;
}