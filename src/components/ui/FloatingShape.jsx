import PropTypes from 'prop-types';
import styles from './FloatingShape.module.css';

/**
 * Renders an absolutely positioned floating shape (circle or rectangle)
 * with a looping bob animation.
 */
function FloatingShape({ type, color, className }) {
  const shapeClass = type === 'circle' ? styles.circle : styles.rectangle;
  const combinedClass = className
    ? `${styles.shape} ${shapeClass} ${className}`
    : `${styles.shape} ${shapeClass}`;

  return (
    <div
      className={combinedClass}
      style={{ backgroundColor: color }}
    />
  );
}

FloatingShape.propTypes = {
  type: PropTypes.oneOf(['circle', 'rectangle']).isRequired,
  color: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default FloatingShape;
