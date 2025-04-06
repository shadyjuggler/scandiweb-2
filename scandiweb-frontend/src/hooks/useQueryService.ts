import { useEffect, useState } from "react";
import { queryCache } from "../utils/QueryCache";

/**
 * Generic state interface for async data fetching.
 *
 * @template T - Type of the expected data
 */
type State<T> = {
    isLoading: boolean;
    error: string | null;
    data: T | null;
};

type Options = {
    skip?: boolean; // prevent auto-fetch
};

/**
 * Custom hook for executing fetch operations with state management.
 *
 * @template T - Type of the expected data
 * @param fetcher - A function that returns a promise with the expected data
 * @param dependencies - React effect dependencies to specify when to re-fetch
 * @param options - Optional config
 *
 * @returns State<T> object
 *
 * @example
 * const { data, isLoading, error } = useQueryService(() => ProductService.getProductById("ps-5"), [isRefreshed]);
 */
export function useQueryService<T>(
    key: any[],
    fetcher: () => Promise<T>,
    dependencies: any[] = [],
    options?: Options
): State<T> {
    const [state, setState] = useState<State<T>>(() => {
        const cached = queryCache.get<T>(key);
        return {
            isLoading: !cached,
            error: null,
            data: cached || null,
        };
    });

    useEffect(() => {
        if (options?.skip) return;

        const cached = queryCache.get<T>(key);

        // Use cache if available
        if (cached) {
            setState({ isLoading: false, error: null, data: cached });
            return;
        }

        // Guard to prevent setting state on an unmounted component
        let isMounted = true;

        // Reset the state
        setState({ isLoading: true, error: null, data: null });

        // Execute fetcher
        fetcher()
            .then((data) => {
                if (!isMounted) return;
                queryCache.set(key, data);
                setState({ isLoading: false, error: null, data });
            })
            .catch((err: Error) => {
                if (!isMounted) return;
                setState({ isLoading: false, error: err.message, data: null });
            });

        // To avoid setting state after unmount
        return () => {
            isMounted = false;
        };
    }, dependencies);

    return state;
}
