import type { IOptionsAndUndefined, IResponseData } from "awesome-utils-owner/http";
import { useEffect, useState } from "react";
import type { AxiosError } from "axios";
import http from "@/core-tools/http";

/**
 * demo:
 *    // const { data, loading, error } = useFetch(
 *     //     "/v1/caribbean/queryMarketIndex1s",
 *     //     { marketIndexScenario: "Home" },
 *     //     { autoInteract: false }
 *     // );
 * @param url
 * @param params
 * @param options
 */
const useFetch = <KParams, TResponse>(
    url: string,
    params: KParams,
    options?: IOptionsAndUndefined
) => {
    const [data, setData] = useState<IResponseData<TResponse>>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<IResponseData<TResponse> | AxiosError>();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: IResponseData<TResponse> = await http.post<KParams, TResponse>(
                    url,
                    params,
                    options
                );
                setData(response);
            } catch (err) {
                setError(err as IResponseData<TResponse> | AxiosError);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [url]);
    return { data, loading, error };
};

export default useFetch;
