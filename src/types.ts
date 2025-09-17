import { Context } from "koa";
import { Redis } from "ioredis";

export interface RateLimitOptions {
  driver?: "redis" | "memory";
  redisClient?: Redis;
  duration?: number;
  max?: number;
  errorMessage?: string;
  whitelist?: (ctx: Context) => boolean | Promise<boolean>;
  blacklist?: (ctx: Context) => boolean | Promise<boolean>;
  onLimited?: (ctx: Context) => void;
}
