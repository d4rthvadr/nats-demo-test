import nats, { Message, Stan } from "node-nats-streaming";
import { genID } from "./util/id-generator";
import { TicketCreatedListener } from "./listeners/ticket-created.listener";

const clientId: string = genID("clientId");

const stan = nats.connect("ticketing", clientId, {
  url: "http://localhost:4222",
  reconnect: true,
  maxReconnectAttempts: 5,
  reconnectTimeWait: 9000,
});

stan.on("connect", () => {

  console.log("Listener connected to NATS");

  stan.on("close", () => {
    console.log("NATS connection closed");
    process.exit();
  });

  new TicketCreatedListener(stan).listen();

});

// Handle reconnection
stan.on("reconnect", () => {
  console.log("🔄 Reconnected to NATS Streaming!");
});


// Handle connection errors
stan.on("error", (err) => {
  console.error("Connection error:", err);
});

stan.on("disconnect", () => {
  console.warn("⚠️ Disconnected! The client will try to reconnect.");
});



// Graceful shutdown
process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());



