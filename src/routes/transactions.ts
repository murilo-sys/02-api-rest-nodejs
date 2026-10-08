import type { FastifyInstance } from "fastify";
import { knex } from "../database";
import z from "zod";
import { randomUUID } from "node:crypto";

export async function transactionRoutes(app: FastifyInstance) {
  app.get("/", async () => {
    const transactions = await knex("transactions").select();

    return { transactions };
  });

  app.get("/:id", async (request) => {
    const getTransactionParamsSchema = z.object({
      id: z.uuid()
    });

    const { id } = getTransactionParamsSchema.parse(request.params);

    const transaction = await knex("transactions").where("id", id).first();

    return { transaction };
  });

  app.get("/summary", async () => {
    const summary = await knex("transactions").sum("amount", { as: "amount" }).first();

    return { summary };
  });

  app.post("/", async (request, reply) => {
    const createTransactionSchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(["credit", "debit"])
    });

    const body = createTransactionSchema.parse(request.body);

    let sessionId = request.cookies.sessionId;

    if (!sessionId) {
      sessionId = randomUUID();
      reply.cookie("sessionId", sessionId, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7 // 7 days
      });
    }

    await knex("transactions").insert({
      id: randomUUID(),
      title: body.title,
      amount: body.type === "credit" ? body.amount : body.amount * -1,
      session_id: sessionId
    });

    return reply.code(201).send();
  });
}
