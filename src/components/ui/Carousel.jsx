import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useCarousel } from '../../hooks/useCarousel';
import styles from './Carousel.module.css';

/**
 * Determines the number of items per view based on window width and config.
 */
function getItemsPerView(config) {
  if (typeof window === 'undefined') return config.desktop;
  const width = window.innerWidth;
  if (width < 768) return config.mobile;
  if (width < 1024) return config.tablet;
  return config.desktop;
}

/**
 * Carousel component that wraps children with overflow hidden and translateX sliding.
 * Renders left/right arrow buttons, hidden at boundaries.
 */
function Carousel({ items, renderItem, carouselConfig }) {
  const [itemsPerView, setItemsPerView] = useState(() =>
    getItemsPerView(carouselConfig.itemsPerView)
  );

  useEffect(() => {
    function handleResize() {
      setItemsPerView(getItemsPerView(carouselConfig.itemsPerView));
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [carouselConfig.itemsPerView]);

  const { currentIndex, prev, next, canPrev, canNext, touchHandlers } =
    useCarousel(items, itemsPerView);

  /* Calculate slide width percentage based on items per view and gaps */
  const getTranslateX = () => {
    if (itemsPerView >= items.length) return 0;
    const slidePercent = 100 / itemsPerView;
    return -(currentIndex * slidePercent);
  };

  return (
    <div className={styles.carouselWrapper}>
      {carouselConfig.showArrows && (
        <button
          className={`${styles.arrowButton} ${styles.arrowLeft} ${
            !canPrev ? styles.hidden : ''
          }`}
          onClick={prev}
          aria-label="Previous"
          type="button"
        >
          ‹
        </button>
      )}

      <div className={styles.carouselViewport} {...touchHandlers}>
        <div
          className={styles.carouselTrack}
          style={{
            transform: `translateX(${getTranslateX()}%)`,
            transition: `transform ${carouselConfig.transitionMs}ms ease`,
          }}
        >
          {items.map((item, index) => (
            <div className={styles.carouselSlide} key={item.id || index}>
              {renderItem(item)}
            </div>
          ))}
        </div>
      </div>

      {carouselConfig.showArrows && (
        <button
          className={`${styles.arrowButton} ${styles.arrowRight} ${
            !canNext ? styles.hidden : ''
          }`}
          onClick={next}
          aria-label="Next"
          type="button"
        >
          ›
        </button>
      )}
    </div>
  );
}

Carousel.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  renderItem: PropTypes.func.isRequired,
  carouselConfig: PropTypes.shape({
    itemsPerView: PropTypes.shape({
      mobile: PropTypes.number.isRequired,
      tablet: PropTypes.number.isRequired,
      desktop: PropTypes.number.isRequired,
    }).isRequired,
    showArrows: PropTypes.bool.isRequired,
    transitionMs: PropTypes.number.isRequired,
  }).isRequired,
};

export default Carousel;
