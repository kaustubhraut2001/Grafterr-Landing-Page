import PropTypes from 'prop-types';
import styles from './GradientButton.module.css';

/**
 * Renders a button with gradient background and hover lift animation.
 */
function GradientButton({ label, onClick }) {
  return (
    <button className={styles.gradientButton} onClick={onClick} type="button">
      {label}
    </button>
  );
}

GradientButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default GradientButton;
