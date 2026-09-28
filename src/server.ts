import fastify from "fastify";

const app = fastify();

//GET, POST, PUT, PATCH, DELETE

// http:

app.get("/hello", () => {
  return "Hello World";
});

app
  .listen({
    port: 3333
  })
  .then(() => {
    console.log("HTTP Server Running!");
  });
