import PropTypes from 'prop-types';
import styles from './GradientText.module.css';

/**
 * Renders a span with a gradient color applied via CSS background-clip.
 */
function GradientText({ children, className }) {
  const combinedClass = className
    ? `${styles.gradientText} ${className}`
    : styles.gradientText;

  return <span className={combinedClass}>{children}</span>;
}

GradientText.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default GradientText;
