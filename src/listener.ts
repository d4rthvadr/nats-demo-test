import nats, { Message } from "node-nats-streaming";
import { genID } from "./util/id-generator";
import { Subjects } from "./types/subjects.enum";
import { TicketCreatedEvent } from "./types/subjects.interface";

const clientId: string = genID("clientId");

const queueGroupName = "tickets-queue-group";

const stan = nats.connect("ticketing", clientId, {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  const options = stan.subscriptionOptions()
  .setDeliverAllAvailable()
  .setDurableName("tickets-service")
  .setManualAckMode(true);

  console.log("Listener connected to NATS");

  const subscription = stan.subscribe(
    Subjects.TicketCreated,
    queueGroupName,
    options
  );

  stan.on("close", () => {
    console.log("NATS connection closed");
    process.exit();
  });

  subscription.on("message", (msg: Message) => {
    const data: TicketCreatedEvent["payload"] = JSON.parse(
      msg.getData().toString()
    );

    console.log("Message received", data);
    console.log("Message sequence", msg.getSequence());

    msg.ack();
  });
});

// Graceful shutdown
process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());