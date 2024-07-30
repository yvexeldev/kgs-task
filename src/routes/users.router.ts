import { FastifyInstance } from "fastify";
import { addBalance, deductBalance } from "../controller/users.controller";

export default async function (app: FastifyInstance) {
    app.post("/users/deduct", deductBalance);
    app.post("/users/add", addBalance);
}
