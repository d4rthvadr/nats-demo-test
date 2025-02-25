import { Stan } from "node-nats-streaming";
import { Subjects } from "../types/subjects.enum";

export interface PublishEvent<U = object> {
    subject: Subjects;
    data: U;
}

export abstract class BasePublisher<T extends PublishEvent> {
    abstract subject: T['subject'];
    private client: Stan;

    constructor(client: Stan) {
        this.client = client;
    }

    /**
     * Publishes an event with the given data to the specified subject.
     *
     * @param data - The data to be published, which conforms to the structure defined by T['data'].
     * @returns A promise that resolves when the event has been successfully published, or rejects if an error occurs.
     */
    publish(data: T['data']): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client.publish(this.subject, JSON.stringify(data), (err: any) => {
                if (err) {
                    return reject(err);
                }
                console.log(`Event published to subject ${this.subject}`);
                this.client.close();
                resolve();
            });
        });
    }


}