import { Subjects, Publisher, PaymentCreatedEvent } from "@tickets_test_aa/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    readonly subject: Subjects.PaymentCreated = Subjects.PaymentCreated; 
}