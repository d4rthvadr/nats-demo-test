import { Message, Stan } from "node-nats-streaming";
import { ChannelEvent } from "../types/subjects.interface";
import { Subjects } from "../types/subjects.enum";

export abstract class BaseListener <T extends ChannelEvent> {
    abstract subject: Subjects;
    abstract queueGroupName: string;
    private client: Stan;
    protected ackWait: number = 5 * 1000;
    constructor(client: Stan) {
      this.client = client;
    }
  
    subscriptionOptions() {
      return this.client
        .subscriptionOptions()
        .setDeliverAllAvailable()
        .setDurableName(this.queueGroupName)
        .setManualAckMode(true)
        .setAckWait(this.ackWait);
    }
  
    abstract onMessage(data: T['payload'], msg: Message): void;
  
    /**
     * Parses the incoming message data.
     *
     * @param msg - The message object containing the data to be parsed.
     * @returns The parsed data as a JavaScript object.
     *
     * @remarks
     * This method checks if the data is a string or a Buffer and parses it accordingly.
     * If the data is a string, it directly parses it using `JSON.parse`.
     * If the data is a Buffer, it converts it to a UTF-8 string before parsing.
     */
    private parseMessage(msg: Message) {
      const data = msg.getData();
      return typeof data === "string"
        ? JSON.parse(data)
        : JSON.parse(data.toString("utf-8"));
    }
  
    listen() {
      const subscription = this.client.subscribe(
        this.subject,
        this.queueGroupName,
        this.subscriptionOptions()
      );
  
      subscription.on("message", (msg: Message) => {
        console.log(`Message received: ${this.subject} / ${this.queueGroupName}`);
  
        const parseData = this.parseMessage(msg);
        this.onMessage(parseData, msg);
      });
    }
  }