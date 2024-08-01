import { useState } from "react";

export default function useLoading() {
  const [isLoading, setIsLoading] = useState(false);

  const loadWith = async <T = void,>(callback: () => Promise<T>) => {
    setIsLoading(true);
    await callback().finally(() => {
      setIsLoading(false);
    });
  };

  return {
    loadWith,
    isLoading,
  };
}
