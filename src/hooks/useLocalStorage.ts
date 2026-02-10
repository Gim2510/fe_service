import { useState } from "react";

export function useLocalStorage<T>(key: string, initial: T) {
    const [value, setValue] = useState<T>(() => {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : initial;
    });

    const setStoredValue = (val: T) => {
        setValue(val);
        localStorage.setItem(key, JSON.stringify(val));
    };

    const clear = () => {
        localStorage.removeItem(key);
        setValue(initial);
    };

    return { value, setStoredValue, clear };
}
