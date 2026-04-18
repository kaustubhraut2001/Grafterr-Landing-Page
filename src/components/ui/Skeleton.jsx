import PropTypes from 'prop-types';
import styles from './Skeleton.module.css';

/**
 * CSS-only animated shimmer skeleton placeholder.
 * Accepts width, height, and borderRadius for flexible shaping.
 */
function Skeleton({ width, height, borderRadius }) {
  return (
    <div
      className={styles.skeleton}
      style={{
        width: width || '100%',
        height: height || '20px',
        borderRadius: borderRadius || undefined,
      }}
      aria-hidden="true"
    />
  );
}

Skeleton.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  borderRadius: PropTypes.string,
};

export default Skeleton;
