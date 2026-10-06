import setupKnex, { type Knex } from "knex";
import { env } from "./env";

export const config: Knex.Config = {
  client: "sqlite",
  connection: {
    filename: "./db/app.db"
  },
  useNullAsDefault: true,
  migrations: {
    extension: "ts",
    directory: env.DATABASE_URL
  }
};

export const knex = setupKnex(config);
