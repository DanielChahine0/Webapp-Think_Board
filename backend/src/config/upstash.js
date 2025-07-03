import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

dotenv.config();

/** Pre-configured sliding-window limiter (50 requests / 30 s)*/
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(
    Number(process.env.RATE_LIMIT_TOKENS ?? 50),
    process.env.RATE_LIMIT_WINDOW ?? "30 s"
  ),
});

export default ratelimit;