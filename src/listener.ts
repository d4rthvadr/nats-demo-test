import nats, { Message, Stan } from "node-nats-streaming";
import { genID } from "./util/id-generator";
import { TicketCreatedListener } from "./listeners/ticket-created.listener";

const clientId: string = genID("clientId");

const stan = nats.connect("ticketing", clientId, {
  url: "http://localhost:4222",
});

stan.on("connect", () => {

  console.log("Listener connected to NATS");

  stan.on("close", () => {
    console.log("NATS connection closed");
    process.exit();
  });

  new TicketCreatedListener(stan).listen();

});

// Graceful shutdown
process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());



