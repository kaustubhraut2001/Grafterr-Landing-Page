import PropTypes from 'prop-types';
import GradientText from '../ui/GradientText';
import Skeleton from '../ui/Skeleton';
import styles from './SolutionsSection.module.css';

/**
 * Solutions section with a 2x2 grid of solution cards.
 */
function SolutionsSection({ solutionsSection, loading }) {
  if (loading) {
    return (
      <section className={styles.solutions}>
        <div className={styles.container}>
          <div className={styles.header}>
            <Skeleton width="50%" height="40px" borderRadius="8px" />
            <div style={{ height: '16px' }} />
            <Skeleton width="60%" height="20px" borderRadius="4px" />
          </div>
          <div className={styles.grid}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={styles.card}>
                <Skeleton width="48px" height="48px" borderRadius="12px" />
                <div style={{ height: '12px' }} />
                <Skeleton width="60%" height="24px" borderRadius="4px" />
                <div style={{ height: '8px' }} />
                <Skeleton width="100%" height="16px" borderRadius="4px" />
                <div style={{ height: '4px' }} />
                <Skeleton width="80%" height="16px" borderRadius="4px" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`${styles.solutions} fadeInUp`} id="solutions">
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>
            {solutionsSection.title}{' '}
            <GradientText>{solutionsSection.titleAccent}</GradientText>
          </h2>
          <p className={styles.subtitle}>{solutionsSection.subtitle}</p>
        </header>

        <div className={styles.grid}>
          {solutionsSection.solutions.map((solution) => (
            <article key={solution.id} className={styles.card}>
              <span className={styles.cardIcon}>{solution.icon}</span>
              <h3 className={styles.cardName}>{solution.name}</h3>
              <p className={styles.cardDescription}>{solution.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

SolutionsSection.propTypes = {
  solutionsSection: PropTypes.shape({
    title: PropTypes.string.isRequired,
    titleAccent: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    solutions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      })
    ).isRequired,
  }),
  loading: PropTypes.bool,
};

export default SolutionsSection;
