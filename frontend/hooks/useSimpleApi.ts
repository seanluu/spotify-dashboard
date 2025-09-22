import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export function useSimpleApi<T>(endpoint: string, params: Record<string, string | number> = {}) {
    const [data, setData] = useState<T[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const startTime = performance.now();
            setIsLoading(true);
            try {
                const response = await api.get(endpoint, { params });
                const newData = response.data.items || response.data || [];
                setData(newData);

                const loadTime = Math.round(performance.now() - startTime);
                console.log(`Frontend API call to ${endpoint} took ${loadTime}ms`);
            } catch (error) {
                const loadTime = Math.round(performance.now() - startTime);
                console.log(`Error fetching data from ${endpoint} after ${loadTime}ms`);
                console.error(`Error fetching data from ${endpoint}:`, error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();

    }, [endpoint, JSON.stringify(params)]);

    return { data, isLoading };
}