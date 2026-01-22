type RateLimitStore = Map<string, { count: number; lastReset: number }>;

const store: RateLimitStore = new Map();

// Allow 10 requests per minute per IP
const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 10;

export function rateLimit(ip: string) {
    const now = Date.now();
    const record = store.get(ip) || { count: 0, lastReset: now };

    // Reset window if needed
    if (now - record.lastReset > WINDOW_MS) {
        record.count = 0;
        record.lastReset = now;
    }

    // Check limit
    if (record.count >= MAX_REQUESTS) {
        return { success: false, limit: MAX_REQUESTS, remaining: 0, reset: record.lastReset + WINDOW_MS };
    }

    // Increment
    record.count++;
    store.set(ip, record);

    return {
        success: true,
        limit: MAX_REQUESTS,
        remaining: MAX_REQUESTS - record.count,
        reset: record.lastReset + WINDOW_MS
    };
}
