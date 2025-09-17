declare module "koa-ratelimit" {
  import { Middleware } from "koa";

  interface RateLimitOptions {
    driver: "memory" | "redis";
    db: any;
    duration?: number;
    errorMessage?: string;
    id?: (ctx: any) => string;
    max?: number;
    disableHeader?: boolean;
    headers?: {
      remaining: string;
      reset: string;
      total: string;
    };
    whitelist?: (ctx: any) => boolean | Promise<boolean>;
    blacklist?: (ctx: any) => boolean | Promise<boolean>;
    onLimited?: (ctx: any) => void;
  }

  function ratelimit(options: RateLimitOptions): Middleware;

  export = ratelimit;
}
