import { useState, useEffect } from "react";
import { toast } from "sonner";

export const useLoadingTimeout = (loading: boolean, timeoutDuration: number = 2000) => {
  const [timeoutError, setTimeoutError] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (loading) {
      timer = setTimeout(() => {
        setTimeoutError(true);
        toast.error("Loading is taking longer than expected. Please try signing out and back in.");
      }, timeoutDuration);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [loading, timeoutDuration]);

  useEffect(() => {
    if (!loading) {
      setTimeoutError(false);
    }
  }, [loading]);

  return timeoutError;
};