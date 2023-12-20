import { useState, useEffect } from 'react';

const usePersistedState = (key, defaultValue) => {
    const [state, setState] = useState(() => {
      try {
        const storedValue = localStorage.getItem(key);
        if (storedValue) {
          try {
            return JSON.parse(storedValue);
          } catch (jsonError) {
            return jsonError;
          }
        } else {
          return defaultValue;
        }
      } catch (error) {
        console.error(`Error parsing ${key} from localStorage: `, error);
        return defaultValue;
      }
    });
  
    useEffect(() => {
      const valueToStore =
        typeof state === "object" ? JSON.stringify(state) : state;
      localStorage.setItem(key, valueToStore);
    }, [key, state]);
  
    return [state, setState];
};

export default usePersistedState;