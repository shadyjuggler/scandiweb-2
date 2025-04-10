type CacheEntry<T> = {
    data: T;
};

class QueryCache {
    private cache = new Map<string, CacheEntry<any>>();

    generateKey(keyParts: any[]): string {
        return JSON.stringify(keyParts);
    }

    get<T>(key: any[]): T | null {
        const cacheKey = this.generateKey(key);
        const entry = this.cache.get(cacheKey);
        return entry ? entry.data : null;
    }

    set<T>(key: any[], data: T): void {
        const cacheKey = this.generateKey(key);
        this.cache.set(cacheKey, { data });
    }

    clear(key: any[]): void {
        const cacheKey = this.generateKey(key);
        this.cache.delete(cacheKey);
    }

    clearAll(): void {
        this.cache.clear();
    }
}

export const queryCache = new QueryCache();
