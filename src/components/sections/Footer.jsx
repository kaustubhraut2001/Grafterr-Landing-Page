import PropTypes from 'prop-types';
import styles from './Footer.module.css';

/**
 * Footer with brand column, link columns, and bottom bar.
 */
function Footer({ footer }) {
  if (!footer) return null;

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topRow}>
          <div className={styles.brandCol}>
            <span className={styles.brandName}>{footer.brand}</span>
            <p className={styles.tagline}>{footer.tagline}</p>
          </div>

          {footer.columns.map((column) => (
            <div key={column.title}>
              <h4 className={styles.columnTitle}>{column.title}</h4>
              <nav className={styles.columnLinks}>
                {column.links.map((link) => (
                  <a
                    key={link.label}
                    className={styles.columnLink}
                    href={link.href}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          ))}
        </div>

        <hr className={styles.divider} />

        <div className={styles.bottomRow}>
          <span className={styles.copyright}>{footer.copyright}</span>
          <div className={styles.bottomLinks}>
            {footer.bottomLinks.map((link) => (
              <a
                key={link.label}
                className={styles.bottomLink}
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  footer: PropTypes.shape({
    brand: PropTypes.string.isRequired,
    tagline: PropTypes.string.isRequired,
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        links: PropTypes.arrayOf(
          PropTypes.shape({
            label: PropTypes.string.isRequired,
            href: PropTypes.string.isRequired,
          })
        ).isRequired,
      })
    ).isRequired,
    copyright: PropTypes.string.isRequired,
    bottomLinks: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired,
      })
    ).isRequired,
  }),
};

export default Footer;
