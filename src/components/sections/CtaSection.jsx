import PropTypes from 'prop-types';
import GradientButton from '../ui/GradientButton';
import Skeleton from '../ui/Skeleton';
import styles from './CtaSection.module.css';

/**
 * Call-to-action section with headline, CTA button, and stats.
 */
function CtaSection({ ctaSection, onCtaClick, loading }) {
  if (loading) {
    return (
      <section className={styles.cta}>
        <div className={styles.container}>
          <Skeleton width="55%" height="40px" borderRadius="8px" />
          <div style={{ height: '16px' }} />
          <Skeleton width="50%" height="20px" borderRadius="4px" />
          <div style={{ height: '32px' }} />
          <Skeleton width="180px" height="48px" borderRadius="24px" />
          <div style={{ height: '48px' }} />
          <div className={styles.stats}>
            {[1, 2, 3].map((i) => (
              <div key={i} className={styles.stat}>
                <Skeleton width="100px" height="36px" borderRadius="4px" />
                <div style={{ height: '8px' }} />
                <Skeleton width="80px" height="16px" borderRadius="4px" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`${styles.cta} fadeInUp`} id="cta">
      <div className={styles.container}>
        <h2 className={styles.headline}>{ctaSection.headline}</h2>
        <p className={styles.subheadline}>{ctaSection.subheadline}</p>

        <div className={styles.ctaButton}>
          <GradientButton label={ctaSection.cta.label} onClick={onCtaClick} />
        </div>

        <div className={styles.stats}>
          {ctaSection.stats.map((stat) => (
            <div key={stat.label} className={styles.stat}>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

CtaSection.propTypes = {
  ctaSection: PropTypes.shape({
    headline: PropTypes.string.isRequired,
    subheadline: PropTypes.string.isRequired,
    cta: PropTypes.shape({
      label: PropTypes.string.isRequired,
    }).isRequired,
    stats: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
      })
    ).isRequired,
  }),
  onCtaClick: PropTypes.func,
  loading: PropTypes.bool,
};

export default CtaSection;
