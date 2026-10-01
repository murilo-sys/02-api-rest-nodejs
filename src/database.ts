import "dotenv/config";
import setupKnex, { type Knex } from "knex";

if (!process.env.DATABASE_URL) {
  throw new Error("Database .env not found");
}

export const config: Knex.Config = {
  client: "sqlite",
  connection: {
    filename: "./db/app.db"
  },
  useNullAsDefault: true,
  migrations: {
    extension: "ts",
    directory: process.env.DATABASE_URL
  }
};

export const knex = setupKnex(config);
