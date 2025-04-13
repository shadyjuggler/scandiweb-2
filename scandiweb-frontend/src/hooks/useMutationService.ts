import { useState } from "react";

type MutationState<T> = {
    isLoading: boolean;
    error: string | null;
    data: T | null;
};

export function useMutationService<T>(
    mutationFn: (...args: any[]) => Promise<T>
) {
    const [state, setState] = useState<MutationState<T>>({
        isLoading: false,
        error: null,
        data: null
    });

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
