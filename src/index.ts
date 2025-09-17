import ratelimit from "koa-ratelimit";
import { Context } from "koa";
import Redis from "ioredis";
import { RateLimitOptions } from "./types";

export function createRateLimiter(options: RateLimitOptions) {
  const {
    driver = "memory",
    redisClient,
    duration = 60_000,
    max = 100,
    errorMessage = "Too many requests, slow down.",
    whitelist,
    blacklist,
    onLimited,
  } = options;

  const db =
    driver === "redis"
      ? redisClient || new Redis()
      : new Map(); // memory fallback

  return ratelimit({
    driver,
    db,
    duration,
    max,
    errorMessage,
    id: (ctx: Context) => ctx.ip,
    headers: {
      remaining: "Rate-Limit-Remaining",
      reset: "Rate-Limit-Reset",
      total: "Rate-Limit-Total",
    },
    disableHeader: false,
    whitelist,
    blacklist,
    onLimited,
  } as any); // temporary cast until typings are patched
}
