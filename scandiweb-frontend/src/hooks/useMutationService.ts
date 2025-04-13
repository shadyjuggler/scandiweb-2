import { useState } from "react";

/**
 * State of mutation operation.
 *
 * @template T - Expected return type from the mutation function
 */
type MutationState<T> = {
    isLoading: boolean;
    error: string | null;
    data: T | null;
};

/**
 * Custom React hook for performing mutation operations 
 * 
 *
 * @template T - Expected return type from the mutation function
 * @param mutationFn - Function that makes mutation and returns promise
 * @returns Object containing the mutation state and a 'mutate' function
 *
 * @example
 * const { mutate, isLoading, error, data } = useMutationService(createOrder);
 * const result = await mutate(orderInput);
 */
export function useMutationService<T>(
    mutationFn: (...args: any[]) => Promise<T>
) {

    const [state, setState] = useState<MutationState<T>>({
        isLoading: false,
        error: null,
        data: null
    });

    /**
     * Triggers the mutation function with provided arguments.
     *
     * @param args - Args to the mutation function
     * @returns Result of the mutation or null if fail
     */
    const mutate = async (...args: any[]): Promise<T | null> => {
        setState({ isLoading: true, error: null, data: null });
        try {
            const result = await mutationFn(...args);
            setState({ isLoading: false, error: null, data: result });
            return result;
        } catch (err: any) {
            setState({ isLoading: false, error: err.message, data: null });
            return null;
        }
    };

    return {
        ...state,
        mutate
    };
}
