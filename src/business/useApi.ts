import { useMemo } from "react";
import api from "@/api";

const useApi = () => {
    return useMemo(() => {
        return api;
    }, []);
};

export default useApi;
