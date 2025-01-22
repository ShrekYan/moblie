import type { IResponseData } from "@/coreTools/http/http.ts";
import { useEffect, useState } from "react";
import type { AxiosError } from "axios";

/**
 * demo:
 *     // const { data, loading, error } = useFetchByPromise(
 *     //     http.post("/v1/caribbean/queryMarketIndexs", { marketIndexScenario: "Home" })
 *     // );
 * @param promise
 */
const useFetch = <TResponse,>(promise: Promise<IResponseData<TResponse>>) => {
    const [data, setData] = useState<IResponseData<TResponse>>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<IResponseData<TResponse> | AxiosError>();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: IResponseData<TResponse> = await promise;
                setData(response);
            } catch (err) {
                setError(err as IResponseData<TResponse> | AxiosError);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    return { data, loading, error };
};

export default useFetch;
