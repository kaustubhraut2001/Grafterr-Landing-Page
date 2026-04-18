import PropTypes from 'prop-types';
import styles from './ProductCard.module.css';

/**
 * Product card with image, name, tag badge, and description.
 * Maintains correct image aspect ratio via padding-top technique.
 */
function ProductCard({ name, description, image, tag }) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          className={styles.image}
          src={image}
          alt={name}
          loading="lazy"
        />
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.name}>{name}</h3>
          <span className={styles.tag}>{tag}</span>
        </div>
        <p className={styles.description}>{description}</p>
      </div>
    </article>
  );
}

ProductCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
};

export default ProductCard;
