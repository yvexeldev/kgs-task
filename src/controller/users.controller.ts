import { FastifyRequest, FastifyReply } from "fastify";
import client from "../config/database";

export async function deductBalance(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const { userId, amount } = request.body as {
        userId: number;
        amount: number;
    };

    if (!userId || !amount) {
        return reply.status(400).send({ error: "Invalid user ID or amount" });
    }

    try {
        const res = await client.query(
            "SELECT balance FROM users WHERE id = $1",
            [userId]
        );
        if (res.rowCount === 0) {
            return reply.status(404).send({ error: "User not found" });
        }

        const currentBalance = res.rows[0].balance;
        if (currentBalance < amount) {
            return reply.status(400).send({ error: "Insufficient balance" });
        }

        const newBalance = currentBalance - amount;
        await client.query("UPDATE users SET balance = $1 WHERE id = $2", [
            newBalance,
            userId,
        ]);

        reply.send({ message: "Balance deducted successfully", newBalance });
    } catch (error) {
        reply.status(500).send({ error: "Failed to deduct balance" });
    }
}

export async function addBalance(request: FastifyRequest, reply: FastifyReply) {
    const { userId, amount } = request.body as {
        userId: number;
        amount: number;
    };

    if (!userId || !amount) {
        return reply.status(400).send({ error: "Invalid user ID or amount" });
    }

    try {
        const res = await client.query(
            "SELECT balance FROM users WHERE id = $1",
            [userId]
        );
        if (res.rowCount === 0) {
            return reply.status(404).send({ error: "User not found" });
        }

        const newBalance = res.rows[0].balance + amount;
        await client.query("UPDATE users SET balance = $1 WHERE id = $2", [
            newBalance,
            userId,
        ]);

        reply.send({ message: "Balance added successfully", newBalance });
    } catch (error) {
        reply.status(500).send({ error: "Failed to add balance" });
    }
}
