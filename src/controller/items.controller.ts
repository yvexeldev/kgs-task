import { FastifyRequest, FastifyReply } from "fastify";
import axios from "axios";
import { getCache, setCache } from "../services/cache.service";

const SKINPORT_API_URL = "https://api.skinport.com/v1/items";
const CACHE_KEY = "skinport_items";
const CACHE_DURATION = 60000;

export async function getItems(request: FastifyRequest, reply: FastifyReply) {
    const cachedData = getCache(CACHE_KEY);
    console.log({ cachedData });
    if (cachedData) {
        return reply.send(cachedData);
    }

    try {
        const response = await axios.get(SKINPORT_API_URL);
        const items = response.data
            .filter(
                (item: any) =>
                    item.min_price !== null &&
                    item.max_price !== null &&
                    item.mean_price !== null &&
                    item.median_price !== null &&
                    item.suggested_price !== null
            )
            .map((item: any) => {
                return {
                    ...item,
                    tradable_price: item.min_price,
                    non_tradable_price: item.max_price,
                    currency: item.currency,
                };
            });

        setCache(CACHE_KEY, items, CACHE_DURATION);
        reply.send(items);
    } catch (error) {
        reply
            .status(500)
            .send({ error: "Failed to fetch items from Skinport" });
    }
}
