import { Subjects, Publisher, ExpirationCompleteEvent } from "@tickets_test_aa/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    readonly subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
    
}