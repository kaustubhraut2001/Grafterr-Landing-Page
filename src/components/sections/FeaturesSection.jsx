import PropTypes from 'prop-types';
import GradientText from '../ui/GradientText';
import Carousel from '../ui/Carousel';
import ProductCard from '../ui/ProductCard';
import Skeleton from '../ui/Skeleton';
import styles from './FeaturesSection.module.css';

/**
 * Features section with section title, subtitle, divider, and product carousel.
 * Renders skeleton placeholders during loading state.
 */
function FeaturesSection({ featuresSection, carouselConfig, loading }) {
  if (loading) {
    return (
      <section className={styles.features}>
        <div className={styles.container}>
          <div className={styles.skeletonHeader}>
            <Skeleton width="50%" height="40px" borderRadius="8px" />
            <Skeleton width="65%" height="20px" borderRadius="4px" />
            <Skeleton width="55%" height="20px" borderRadius="4px" />
          </div>
          <div className={styles.skeletonCards}>
            {[1, 2, 3].map((i) => (
              <div key={i} className={styles.skeletonCard}>
                <Skeleton width="100%" height="200px" borderRadius="16px" />
                <Skeleton width="60%" height="24px" borderRadius="4px" />
                <Skeleton width="100%" height="16px" borderRadius="4px" />
                <Skeleton width="85%" height="16px" borderRadius="4px" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`${styles.features} fadeInUp`} id="products">
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>
            {featuresSection.title}{' '}
            <GradientText>{featuresSection.titleAccent}</GradientText>
          </h2>
          <p className={styles.subtitle}>{featuresSection.subtitle}</p>
        </header>

        <hr className={styles.divider} />

        <div className={styles.carouselContainer}>
          <Carousel
            items={featuresSection.products}
            carouselConfig={carouselConfig}
            renderItem={(product) => (
              <ProductCard
                name={product.name}
                description={product.description}
                image={product.image}
                tag={product.tag}
              />
            )}
          />
        </div>
      </div>
    </section>
  );
}

FeaturesSection.propTypes = {
  featuresSection: PropTypes.shape({
    title: PropTypes.string.isRequired,
    titleAccent: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        tag: PropTypes.string.isRequired,
      })
    ).isRequired,
  }),
  carouselConfig: PropTypes.shape({
    itemsPerView: PropTypes.shape({
      mobile: PropTypes.number.isRequired,
      tablet: PropTypes.number.isRequired,
      desktop: PropTypes.number.isRequired,
    }).isRequired,
    showArrows: PropTypes.bool.isRequired,
    transitionMs: PropTypes.number.isRequired,
  }),
  loading: PropTypes.bool,
};

export default FeaturesSection;
