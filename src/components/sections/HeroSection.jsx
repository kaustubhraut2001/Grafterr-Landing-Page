import PropTypes from 'prop-types';
import GradientText from '../ui/GradientText';
import GradientButton from '../ui/GradientButton';
import FloatingShape from '../ui/FloatingShape';
import Skeleton from '../ui/Skeleton';
import styles from './HeroSection.module.css';

/**
 * Hero section with navbar, headline, subheadline, CTA, and floating shapes.
 * Renders skeleton placeholders during loading state.
 */
function HeroSection({ navigation, hero, loading, onCtaClick }) {
  if (loading) {
    return (
      <section className={styles.hero}>
        <nav className={styles.skeletonNav}>
          <Skeleton width="120px" height="32px" borderRadius="8px" />
          <div className={styles.skeletonNavLinks}>
            <Skeleton width="72px" height="16px" />
            <Skeleton width="72px" height="16px" />
          </div>
          <Skeleton width="110px" height="40px" borderRadius="20px" />
        </nav>
        <div className={styles.skeletonContent}>
          <Skeleton width="60%" height="48px" borderRadius="8px" />
          <Skeleton width="75%" height="48px" borderRadius="8px" />
          <Skeleton width="45%" height="48px" borderRadius="8px" />
          <div style={{ height: '16px' }} />
          <Skeleton width="55%" height="20px" borderRadius="4px" />
          <Skeleton width="45%" height="20px" borderRadius="4px" />
          <div style={{ height: '8px' }} />
          <Skeleton width="160px" height="48px" borderRadius="24px" />
        </div>
      </section>
    );
  }

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className={styles.hero} id="hero">
      {/* Navbar */}
      <nav className={styles.navbar} id="main-navbar">
        <a
          href="#hero"
          className={styles.logoText}
          onClick={(e) => handleNavClick(e, '#hero')}
        >
          {navigation.logo.alt}
        </a>
        <ul className={styles.navLinks}>
          {navigation.links.map((link) => (
            <li key={link.label}>
              <a
                className={styles.navLink}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className={styles.navCta}>
          <GradientButton label={navigation.cta.label} onClick={onCtaClick} />
        </div>
      </nav>

      {/* Hero Content */}
      <div className={`${styles.heroContent} fadeInUp`}>
        <h1 className={styles.headline}>
          {hero.headlinePrefix}{' '}
          <GradientText>{hero.headlineGradient}</GradientText>
          <br />
          {hero.headlineSuffix}
        </h1>
        <p className={styles.subheadline}>{hero.subheadline}</p>
        <div className={styles.heroCta}>
          <GradientButton label={hero.cta.label} onClick={onCtaClick} />
        </div>
      </div>

      {/* Floating Shapes */}
      {hero.shapes.map((shape) => (
        <FloatingShape
          key={shape.id}
          type={shape.type}
          color={shape.color}
          className={
            shape.id === 'teal-circle'
              ? styles.shapeTeal
              : styles.shapeCoral
          }
        />
      ))}
    </section>
  );
}

HeroSection.propTypes = {
  navigation: PropTypes.shape({
    logo: PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    }).isRequired,
    links: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired,
      })
    ).isRequired,
    cta: PropTypes.shape({
      label: PropTypes.string.isRequired,
    }).isRequired,
  }),
  hero: PropTypes.shape({
    headlinePrefix: PropTypes.string.isRequired,
    headlineGradient: PropTypes.string.isRequired,
    headlineSuffix: PropTypes.string.isRequired,
    subheadline: PropTypes.string.isRequired,
    cta: PropTypes.shape({
      label: PropTypes.string.isRequired,
    }).isRequired,
    shapes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
      })
    ).isRequired,
  }),
  loading: PropTypes.bool,
  onCtaClick: PropTypes.func,
};

export default HeroSection;
