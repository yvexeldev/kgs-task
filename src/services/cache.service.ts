import NodeCache from 'node-cache';

const cache = new NodeCache();

export const setCache = (key: string, value: any, ttl: number) => {
    cache.set(key, value, ttl / 1000);
};

export const getCache = (key: string) => {
    return cache.get(key);
};
