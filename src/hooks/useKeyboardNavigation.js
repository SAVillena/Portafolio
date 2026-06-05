import { useEffect } from 'react';

export default function useKeyboardNavigation(handlers, isActive = true) {
    useEffect(() => {
        if (!isActive) return;

        const handleKey = (e) => {
            if (e.key === 'Escape' && handlers.onEscape) {
                handlers.onEscape();
            }
            if (e.key === 'ArrowLeft' && handlers.onArrowLeft) {
                handlers.onArrowLeft();
            }
            if (e.key === 'ArrowRight' && handlers.onArrowRight) {
                handlers.onArrowRight();
            }
        };

        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [handlers, isActive]);
}
