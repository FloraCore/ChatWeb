import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, feedBackValue: T){
    const [value, setValue] = useState(feedBackValue);
    useEffect(()=>{
        const storage = localStorage.getItem(key);
        setValue(storage ? storage as T : feedBackValue);
    },[feedBackValue, key])
    useEffect(()=>{
        localStorage.setItem(key,value instanceof Object ? JSON.stringify(value) : String(value));
    }, [key,value])
    return [value,setValue] as const;
}