import { searchProperties, getProperties } from "@/lib/actions";
import { Property } from "@/lib/types/data";
import { useState, useTransition, useEffect } from "react";
import { useDebounce } from "./useDebounce";

export function usePropertySearch() {
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query);
    const [properties, setProperties] = useState<Property[]>([]);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        startTransition(() => {
            if (debouncedQuery.trim()) {
                searchProperties(debouncedQuery).then(setProperties);
            } else {
                getProperties().then(setProperties);
            }
        });
    }, [debouncedQuery]);
    return { query, setQuery, properties, isPending }
}