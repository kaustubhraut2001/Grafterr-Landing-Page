import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

/**
 * Modal component with signup form and success state.
 * Closes on overlay click, Escape key, or close button.
 */
function Modal({ isOpen, onClose, content }) {
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({});
      setSubmitted(false);
      setSubmitting(false);
    }
  }, [isOpen]);

  if (!isOpen || !content) return null;

  const handleChange = (fieldId, value) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick} role="dialog" aria-modal="true">
      <div className={styles.modal}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          type="button"
          aria-label="Close modal"
        >
          ✕
        </button>

        {submitted ? (
          <div className={styles.successState}>
            <span className={styles.successIcon}>🎉</span>
            <p className={styles.successMessage}>{content.successMessage}</p>
            <p className={styles.successSub}>
              {content.subtitle}
            </p>
          </div>
        ) : (
          <>
            <h2 className={styles.title}>{content.title}</h2>
            <p className={styles.subtitle}>{content.subtitle}</p>

            <form className={styles.form} onSubmit={handleSubmit}>
              {content.fields.map((field) => (
                <div key={field.id} className={styles.fieldGroup}>
                  <label className={styles.label} htmlFor={`modal-${field.id}`}>
                    {field.label}
                  </label>
                  <input
                    id={`modal-${field.id}`}
                    className={styles.input}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={formData[field.id] || ''}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    required
                  />
                </div>
              ))}

              <button
                className={styles.submitButton}
                type="submit"
                disabled={submitting}
              >
                {submitting ? 'Creating account...' : content.submitLabel}
              </button>
            </form>

            <p className={styles.disclaimer}>{content.disclaimer}</p>
          </>
        )}
      </div>
    </div>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  content: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    fields: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        placeholder: PropTypes.string.isRequired,
      })
    ).isRequired,
    submitLabel: PropTypes.string.isRequired,
    successMessage: PropTypes.string.isRequired,
    disclaimer: PropTypes.string.isRequired,
  }),
};

export default Modal;
