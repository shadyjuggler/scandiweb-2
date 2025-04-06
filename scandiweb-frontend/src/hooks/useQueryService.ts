import { useEffect, useState } from "react";

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

/**
 * Custom hook for executing fetch operations with state management.
 * 
 * @template T - Type of the expected data
 * @param fetcher - A function that returns a promise with the expected data
 * @param dependencies - React effect dependencies to specify when to re-fetch
 * 
 * @returns State<T> object
 * 
 * @example
 * const { data, isLoading, error } = useQueryService(() => ProductService.getProductById("ps-5"), [isRefreshed]);
 */
export function useQueryService<T>(
    fetcher: () => Promise<T>,
    dependencies: any[] = []
): State<T> {
    const [state, setState] = useState<State<T>>({
        isLoading: true,
        error: null,
        data: null,
    });

    useEffect(() => {
        // Guard to prevent setting state on an unmounted component
        let isMounted = true;

        // Reset the state
        setState({ isLoading: true, error: null, data: null });

        // Execute fetcher
        fetcher()
            .then((data) => {
                if (isMounted) {
                    setState({ isLoading: false, error: null, data });
                }
            })
            .catch((err: Error) => {
                if (isMounted) {
                    setState({
                        isLoading: false,
                        error: err.message,
                        data: null,
                    });
                }
            });

        // To avoid setting state after unmount
        return () => {
            isMounted = false;
        };
    }, dependencies);

    return state;
}
