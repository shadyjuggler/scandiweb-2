/**
 * Single cache entry
 * 
 * @template T - Data type being cached
 */
type CacheEntry<T> = {
    data: T;
};

/**
 * In-memory cache for query results 
 */
class QueryCache {
    private cache = new Map<string, CacheEntry<any>>();

    /**
     * Creates a unique string key for a given key parts.
     *
     * @param keyParts - Array of keys
     * @returns JSON representation used as key
     */
    generateKey(keyParts: any[]): string {
        return JSON.stringify(keyParts);
    }

    /**
     * Gets cached data for specific given key.
     *
     * @template T - The expected return data type
     * @param key - Array with cache keys
     * @returns Cached data or null
     */
    get<T>(key: any[]): T | null {
        const cacheKey = this.generateKey(key);
        const entry = this.cache.get(cacheKey);
        return entry ? entry.data : null;
    }

    /**
     * Caches the data under a generated key.
     *
     * @template T - The type of data being stored
     * @param key - Array to generate the cache key
     * @param data - Data to store
     */
    set<T>(key: any[], data: T): void {
        const cacheKey = this.generateKey(key);
        this.cache.set(cacheKey, { data });
    }

    /**
     * Clearsspecific entry.
     *
     * @param key - Array with the keys to delete
     */
    clear(key: any[]): void {
        const cacheKey = this.generateKey(key);
        this.cache.delete(cacheKey);
    }

    /**
     * Clears all
     */
    clearAll(): void {
        this.cache.clear();
    }
}

// Singleton
export const queryCache = new QueryCache();
