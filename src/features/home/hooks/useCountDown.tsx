import { useCallback, useRef, useState } from "react";

interface UseCountdownProps {
    initialSeconds: number;
    onComplete?: () => void;
}

export function useCountdown({
    initialSeconds=0,
    onComplete,
}: UseCountdownProps) {
    const [seconds, setSeconds] = useState(initialSeconds);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const countDown = useCallback(() => {
        if (intervalRef.current) return;

        setIsRunning(true);
        setSeconds(initialSeconds);

        intervalRef.current = setInterval(() => {
            setSeconds((prev) => {
                if (prev <= 1) {
                    clearInterval(intervalRef.current!);
                    intervalRef.current = null;
                    setIsRunning(false);
                    onComplete?.();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    }, [initialSeconds, onComplete]);

    const stop = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setIsRunning(false);
    }, []);

    const reset = useCallback(() => {
        stop();
        setSeconds(initialSeconds);
    }, [initialSeconds, stop]);

    return {
        seconds,
        isRunning,
        countDown,
        stop,
        reset,
    };
}