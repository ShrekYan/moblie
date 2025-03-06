import { useState, useEffect } from "react";

/**
 * demo:
 *   const { data, loading, error } = usePromiseAll<
 *         [IResponseData<{ name: string }>, IResponseData<{ age: number }>]
 *     >([
 *         http.post<{ marketIndexScenario: string }, { name: string }>(
 *             "/v1/caribbean/queryMarketIndexs",
 *             {
 *                 marketIndexScenario: "Home"
 *             }
 *         ),
 *         http.post<{ marketIndexScenario: string }, { age: number }>(
 *             "/v1/caribbean/queryMarketIndexs",
 *             {
 *                 marketIndexScenario: "Home"
 *             }
 *         )
 *     ]);
 * @param promises
 */
const usePromiseAll = <T extends any[]>(promises: { [K in keyof T]: Promise<T[K]> }) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        Promise.all(promises)
            .then((results) => {
                setData(results as T);
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });
    }, [promises]);

    return { data, loading, error };
};

export default usePromiseAll;
