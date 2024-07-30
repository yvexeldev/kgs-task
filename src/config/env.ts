export const getEnv = (value: string): string => {
    if (process.env[value]) {
        return process.env[value] as string;
    }
    throw new Error(`env ${value} not found`);
};
