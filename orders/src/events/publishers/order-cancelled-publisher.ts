import { Publisher, OrderCancelledEvent, Subjects } from "@tickets_test_aa/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    readonly subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}