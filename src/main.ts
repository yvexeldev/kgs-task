import fastify, { FastifyInstance } from "fastify";
import { initDb } from "./config/database";
import itemsRouter from "./routes/items.router";
import usersRouter from "./routes/users.router";
async function main() {
    const server: FastifyInstance = fastify();

    try {
        await initDb();

        server.register(itemsRouter);
        server.register(usersRouter);

        server.listen({ port: 3000 }, (err, address) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            console.log(`Server listening on ${address}`);
        });
    } catch (error) {
        console.log("Error while starting application: ", error);
        process.exit(1);
    }
}

main();
