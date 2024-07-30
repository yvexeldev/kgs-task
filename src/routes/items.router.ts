import { FastifyInstance } from "fastify";
import { getItems } from "../controller/items.controller";

export default async function (app: FastifyInstance) {
    app.get("/items", getItems);
}
