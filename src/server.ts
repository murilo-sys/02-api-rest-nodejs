import fastify from "fastify";
import { transactionRoutes } from "./routes/transactions";
import { env } from "./env";

const app = fastify();

//GET, POST, PUT, PATCH, DELETE

// http:

app.register(transactionRoutes, { prefix: "transaction" });

app
  .listen({
    port: env.PORT
  })
  .then(() => {
    console.log("HTTP Server Running!");
  });
