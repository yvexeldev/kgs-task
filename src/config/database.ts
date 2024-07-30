import { Client } from "pg";
import { getEnv } from "./env";

const client = new Client({
    user: getEnv("PG_USER"),
    host: getEnv("PG_HOST"),
    database: getEnv("PG_DB"),
    password: getEnv("PG_PASSWORD"),
    port: 5432,
});

export async function initDb() {
    await client.connect();
    console.log("Database connected successfully!");
    await client.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            balance NUMERIC NOT NULL DEFAULT 0
        );
    `);
    console.log("Tables created successfully!");
}

export default client;
