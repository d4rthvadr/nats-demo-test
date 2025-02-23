import nats from "node-nats-streaming";
import { genID } from "./util/id-generator";
import { TicketCreatedPublisher } from "./publisher/ticket-created.publisher";

const clientId: string = genID("clientId");

// stan is the client that connects to the nats server
const stan = nats.connect("ticketing", clientId, {
  url: "http://localhost:4222",
});

stan.on("connect", async () => {
  console.log("Publisher connected to NATS");

  const publisher: TicketCreatedPublisher = new TicketCreatedPublisher(stan);
  // Publish the data to the channel
  await publisher.publish({
    payload: {
      id: "123",
      title: "concert",
      price: 20,
    },
    version: 1,
  });
});
