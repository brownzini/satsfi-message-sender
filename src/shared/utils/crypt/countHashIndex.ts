import { Redis } from "@upstash/redis";
import generateHash from "./cryptCode";

const redis = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_TOKEN,
});

export async function getHash(handle: string) {
  const index = await redis.get<string>(handle);
  if (typeof index !== "number") {
    return undefined;
  } else {
    const result = await generateHash(index);
    return result[0];
  }
}