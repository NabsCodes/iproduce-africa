import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export type PublicFormRateLimitRoute =
  | "contact"
  | "newsletter"
  | "partners-inquiry"
  | "partners-become"
  | "community-application"
  | "academy-register";

const ROUTE_PREFIX: Record<PublicFormRateLimitRoute, string> = {
  contact: "public-form:contact",
  newsletter: "public-form:newsletter",
  "partners-inquiry": "public-form:partners-inquiry",
  "partners-become": "public-form:partners-become",
  "community-application": "public-form:community-application",
  "academy-register": "public-form:academy-register",
};

function isUpstashConfigured(): boolean {
  return Boolean(
    process.env.UPSTASH_REDIS_REST_URL?.trim() &&
    process.env.UPSTASH_REDIS_REST_TOKEN?.trim(),
  );
}

function shouldSkipRateLimitLocally(): boolean {
  return (
    process.env.NODE_ENV === "development" &&
    process.env.ENABLE_DEV_RATE_LIMITS !== "true"
  );
}

export function isRateLimitRequiredInProduction(): boolean {
  return process.env.VERCEL_ENV === "production" && !isUpstashConfigured();
}

function createRedis(): Redis | null {
  if (shouldSkipRateLimitLocally() || !isUpstashConfigured()) {
    return null;
  }

  return new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  });
}

function createLimiter(
  redis: Redis,
  route: PublicFormRateLimitRoute,
  requests: number,
  window: `${number} m` | `${number} s`,
): Ratelimit {
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(requests, window),
    prefix: ROUTE_PREFIX[route],
    analytics: true,
  });
}

let limiters: Partial<Record<PublicFormRateLimitRoute, Ratelimit>> | null =
  null;

function getLimiters(): Partial<Record<PublicFormRateLimitRoute, Ratelimit>> {
  if (limiters) {
    return limiters;
  }

  const redis = createRedis();
  if (!redis) {
    limiters = {};
    return limiters;
  }

  limiters = {
    contact: createLimiter(redis, "contact", 5, "10 m"),
    newsletter: createLimiter(redis, "newsletter", 3, "5 m"),
    "partners-inquiry": createLimiter(redis, "partners-inquiry", 5, "10 m"),
    "partners-become": createLimiter(redis, "partners-become", 5, "10 m"),
    "community-application": createLimiter(
      redis,
      "community-application",
      5,
      "10 m",
    ),
    "academy-register": createLimiter(redis, "academy-register", 5, "10 m"),
  };

  return limiters;
}

export function getClientIp(request: Request): string | null {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? null;
  }

  return request.headers.get("x-real-ip")?.trim() ?? null;
}

export async function checkPublicFormRateLimit(
  route: PublicFormRateLimitRoute,
  request: Request,
): Promise<
  | { allowed: true }
  | { allowed: false; retryAfterSeconds: number }
  | { misconfigured: true }
> {
  if (isRateLimitRequiredInProduction()) {
    return { misconfigured: true };
  }

  const limiter = getLimiters()[route];
  if (!limiter) {
    return { allowed: true };
  }

  const ip = getClientIp(request) ?? "unknown";
  const { success, reset } = await limiter.limit(ip);

  if (success) {
    return { allowed: true };
  }

  const retryAfterSeconds = Math.max(1, Math.ceil((reset - Date.now()) / 1000));

  return { allowed: false, retryAfterSeconds };
}
