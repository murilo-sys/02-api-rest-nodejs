import fastify from "fastify";
import { transactionRoutes } from "./routes/transactions";
import { env } from "./env";
import cookie from "@fastify/cookie";

const app = fastify();

//GET, POST, PUT, PATCH, DELETE

// http:

app.register(cookie);
app.register(transactionRoutes, { prefix: "transaction" });

app
  .listen({
    port: env.PORT
  })
  .then(() => {
    console.log("HTTP Server Running!");
  });
