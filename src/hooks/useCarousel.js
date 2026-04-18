import { useState, useCallback, useRef } from 'react';

/**
 * Custom hook for carousel logic with touch support.
 *
 * @param {Array} items - Array of items in the carousel.
 * @param {number} itemsPerView - Number of items visible at once.
 * @returns {{ currentIndex: number, prev: function, next: function, canPrev: boolean, canNext: boolean, touchHandlers: object }}
 */
export function useCarousel(items, itemsPerView) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);

  const maxIndex = Math.max(0, items.length - itemsPerView);
  const canPrev = currentIndex > 0;
  const canNext = currentIndex < maxIndex;

  const prev = useCallback(() => {
    setCurrentIndex((i) => Math.max(0, i - 1));
  }, []);

  const next = useCallback(() => {
    setCurrentIndex((i) => Math.min(maxIndex, i + 1));
  }, [maxIndex]);

  const onTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const onTouchEnd = useCallback(
    (e) => {
      const diff = touchStartX.current - e.changedTouches[0].clientX;
      if (Math.abs(diff) >= 50) {
        if (diff > 0 && canNext) {
          next();
        } else if (diff < 0 && canPrev) {
          prev();
        }
      }
    },
    [canNext, canPrev, next, prev]
  );

  const touchHandlers = {
    onTouchStart,
    onTouchEnd,
  };

  return { currentIndex, prev, next, canPrev, canNext, touchHandlers };
}
