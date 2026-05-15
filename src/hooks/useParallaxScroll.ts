import { useEffect, useRef, useState, useCallback } from "react";

interface ParallaxLayer {
    speed: number;
    element: HTMLElement | null;
}

interface UseParallaxScrollReturn {
    scrollY: number;
    scrollProgress: number;
    registerLayer: (speed: number) => (el: HTMLElement | null) => void;
    viewportHeight: number;
    isScrolling: boolean;
}

export function useParallaxScroll(): UseParallaxScrollReturn {
    const [scrollY, setScrollY] = useState(0);
    const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
    const [isScrolling, setIsScrolling] = useState(false);
    const layers = useRef<ParallaxLayer[]>([]);
    const scrollTimeout = useRef<number | undefined>(undefined);
    const rafId = useRef<number | undefined>(undefined);

    const getTotalHeight = useCallback(() => {
        return document.documentElement.scrollHeight - window.innerHeight;
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (rafId.current) cancelAnimationFrame(rafId.current);

            setIsScrolling(true);
            clearTimeout(scrollTimeout.current);

            rafId.current = requestAnimationFrame(() => {
                setScrollY(window.scrollY);
            });

            scrollTimeout.current = window.setTimeout(() => {
                setIsScrolling(false);
            }, 150);
        };

        const handleResize = () => {
            setViewportHeight(window.innerHeight);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleResize, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
            if (rafId.current) cancelAnimationFrame(rafId.current);
            clearTimeout(scrollTimeout.current);
        };
    }, []);

    useEffect(() => {
        layers.current.forEach(layer => {
            if (layer.element) {
                const yPos = -(scrollY * layer.speed);
                layer.element.style.transform = `translate3d(0, ${yPos}px, 0)`;
            }
        });
    }, [scrollY]);

    const registerLayer = useCallback((speed: number) => {
        return (element: HTMLElement | null) => {
            if (element) {
                element.style.willChange = "transform";
                layers.current.push({ speed, element });
            }
        };
    }, []);

    return {
        scrollY,
        scrollProgress: scrollY / getTotalHeight(),
        registerLayer,
        viewportHeight,
        isScrolling,
    };
}
