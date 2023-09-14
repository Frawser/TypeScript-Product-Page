import { useEffect, useState } from 'react';

// Custom hook for managing state in local storage
export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
    // Initialize state with a function to calculate the initial value
    const [value, setValue] = useState<T>(() => {
        // Try to retrieve the stored value from local storage
        const storedValue = localStorage.getItem(key);

        // If a stored value exists, parse and return it
        if (storedValue !== null) 
            return JSON.parse(storedValue);

        // If initialValue is a function, call it to get the initial value
        if (typeof initialValue === 'function') {
            return (initialValue as () => T)();
        }
        // Otherwise, use the provided initialValue
        else {
            return initialValue;
        }
    });

    // Use an effect to update local storage whenever the value changes
    useEffect(() => {
        // Store the current value in local storage as a JSON string
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    // Return the value and a function to update it, similar to useState
    return [value, setValue] as [typeof value, typeof setValue]; 
}
