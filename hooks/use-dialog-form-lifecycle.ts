import { useCallback, useEffect, useRef, useState } from "react";

const RESET_DELAY_MS = 200;

export function useDialogFormLifecycle(resetForm: () => void) {
  const [submitted, setSubmitted] = useState(false);
  const resetTimerRef = useRef<number | null>(null);
  const submissionIdRef = useRef(0);

  const clearResetTimer = useCallback(() => {
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    clearResetTimer();
    submissionIdRef.current += 1;
    setSubmitted(false);
    resetForm();
  }, [clearResetTimer, resetForm]);

  useEffect(() => {
    return () => clearResetTimer();
  }, [clearResetTimer]);

  const handleOpenChange = useCallback(
    (nextOpen: boolean, onOpenChange: (open: boolean) => void) => {
      onOpenChange(nextOpen);
      if (!nextOpen) {
        clearResetTimer();
        submissionIdRef.current += 1;
        resetTimerRef.current = window.setTimeout(reset, RESET_DELAY_MS);
      }
    },
    [clearResetTimer, reset],
  );

  const runSubmission = useCallback(async (task: () => Promise<void>) => {
    const id = ++submissionIdRef.current;
    await task();
    if (id === submissionIdRef.current) {
      setSubmitted(true);
    }
  }, []);

  return { submitted, handleOpenChange, runSubmission, reset };
}
