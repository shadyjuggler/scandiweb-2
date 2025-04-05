import { useEffect, useState } from "react";

type State<T> = {
    isLoading: boolean;
    error: string | null;
    data: T | null;
};

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
        let isMounted = true;

        setState({ isLoading: true, error: null, data: null });

        fetcher()
            .then((data) => {
                if (isMounted)
                    setState({ isLoading: false, error: null, data });
            })
            .catch((err: Error) => {
                if (isMounted)
                    setState({
                        isLoading: false,
                        error: err.message,
                        data: null,
                    });
            });

        return () => {
            isMounted = false;
        };
    }, dependencies);

    return state;
}
