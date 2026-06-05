import { useEffect, useRef } from 'react';

export default function useMagnetic() {
    const magnetic = useRef(null);

    useEffect(() => {
        const element = magnetic.current;
        if (!element) return;

        let xTo, yTo;
        let mouseMove, mouseLeave;

        import('gsap').then(({ gsap }) => {
            xTo = gsap.quickTo(element, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
            yTo = gsap.quickTo(element, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

            mouseMove = (e) => {
                const { clientX, clientY } = e;
                const { height, width, left, top } = element.getBoundingClientRect();
                const x = clientX - (left + width / 2);
                const y = clientY - (top + height / 2);
                // Apply magnetic effect with a factor (e.g., 0.35)
                xTo(x * 0.35);
                yTo(y * 0.35);
            };

            mouseLeave = () => {
                xTo(0);
                yTo(0);
            };

            element.addEventListener("mousemove", mouseMove);
            element.addEventListener("mouseleave", mouseLeave);
        });

        return () => {
            if (mouseMove) element.removeEventListener("mousemove", mouseMove);
            if (mouseLeave) element.removeEventListener("mouseleave", mouseLeave);
        };
    }, []);

    return magnetic;
}
