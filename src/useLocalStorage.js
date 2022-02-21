import { useEffect, useReducer } from "react";

export function getSavedValue(key, initialValue) {
    const savedValue = JSON.parse(localStorage.getItem(key));
    if (savedValue) return savedValue;

    return initialValue;
}

export default function useLocalStorage(reducer, key, initialValue) {
    const [state, dispatch] = useReducer(reducer, getSavedValue(key, initialValue));

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state])

    return [state, dispatch];
}