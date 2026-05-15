import { useEffect, useRef, useState, useCallback } from "react";

interface UseScrollProgressReturn {
    ref: React.RefObject<HTMLDivElement | null>;
    progress: number;
    isInView: boolean;
    scrollY: number;
}

export function useScrollProgress(threshold = 0.1): UseScrollProgressReturn {
    const ref = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);
    const [isInView, setIsInView] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    const updateProgress = useCallback(() => {
        const element = ref.current;
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        const elementHeight = rect.height;
        const viewportHeight = window.innerHeight;

        const startTrigger = elementTop - viewportHeight * (1 - threshold);
        const endTrigger = elementTop + elementHeight * threshold;

        const currentScroll = window.scrollY;
        setScrollY(currentScroll);

        const elementProgress = Math.min(
            Math.max((currentScroll - startTrigger) / (endTrigger - startTrigger), 0),
            1
        );

        setProgress(elementProgress);
        setIsInView(elementProgress > 0 && elementProgress < 1);
    }, [threshold]);

    useEffect(() => {
        const handleScroll = () => {
            requestAnimationFrame(updateProgress);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        updateProgress();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [updateProgress]);

    return { ref: ref as React.RefObject<HTMLDivElement | null>, progress, isInView, scrollY };
}
