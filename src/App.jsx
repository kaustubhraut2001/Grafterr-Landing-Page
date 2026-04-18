import { useState, useCallback } from 'react';
import { useContent } from './hooks/useContent';
import HeroSection from './components/sections/HeroSection';
import FeaturesSection from './components/sections/FeaturesSection';
import SolutionsSection from './components/sections/SolutionsSection';
import CtaSection from './components/sections/CtaSection';
import Footer from './components/sections/Footer';
import Modal from './components/ui/Modal';
import styles from './App.module.css';

/**
 * Main App component.
 * Uses useContent hook to manage data fetching.
 * Renders loading skeletons, error state, or content sections.
 * Manages modal state for CTA interactions.
 */
function App() {
  const { data, loading, error, retry } = useContent();
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorIcon}>⚠️</div>
        <h1 className={styles.errorTitle}>Something went wrong</h1>
        <p className={styles.errorMessage}>{error}</p>
        <button
          className={styles.retryButton}
          onClick={retry}
          type="button"
        >
          ↻ Try Again
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.app}>
        <HeroSection loading />
        <FeaturesSection loading />
        <SolutionsSection loading />
        <CtaSection loading />
      </div>
    );
  }

  return (
    <div className={styles.app}>
      <HeroSection
        navigation={data.navigation}
        hero={data.hero}
        onCtaClick={openModal}
      />
      <FeaturesSection
        featuresSection={data.featuresSection}
        carouselConfig={data.carousel}
      />
      <SolutionsSection
        solutionsSection={data.solutionsSection}
      />
      <CtaSection
        ctaSection={data.ctaSection}
        onCtaClick={openModal}
      />
      <Footer footer={data.footer} />

      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        content={data.modal}
      />
    </div>
  );
}

export default App;
