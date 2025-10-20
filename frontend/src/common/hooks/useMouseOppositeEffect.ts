import { useState, useEffect } from "react";

type Style = React.CSSProperties;

/**
 * Custom hook to calculate style for an element to move in the opposite direction of the mouse.
 * @param maxMove Maximum movement range in pixels (default: 50)
 * @returns A style object to be applied to the moving element
 */
const useMouseOppositeEffect = (maxMove: number = 20): Style => {
    const [style, setStyle] = useState<Style>({});

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            const { clientX, clientY } = event;
            const { innerWidth, innerHeight } = window;

            // Normalize mouse position to range [-0.5, 0.5]
            const x = (clientX / innerWidth - 0.5) * -1; // Opposite direction
            const y = (clientY / innerHeight - 0.5) * -1; // Opposite direction

            // Scale the movement range
            const offsetX = x * maxMove;
            const offsetY = y * maxMove;

            setStyle({
                transform: `translate(${offsetX}px, ${offsetY}px)`,
            });
        };

        // Add mousemove event listener to the window
        window.addEventListener("mousemove", handleMouseMove);

        // Cleanup event listener on component unmount
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [maxMove]);

    return style;
};

export default useMouseOppositeEffect;
