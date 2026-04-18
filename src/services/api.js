import content from '../data/content.json';

/**
 * Simulates a network request with random delay and occasional failures.
 * @param {object} data - The data to resolve with.
 * @returns {Promise<object>}
 */
function simulateRequest(data) {
  return new Promise((resolve, reject) => {
    const delay = 1000 + Math.random() * 500;
    const shouldFail = Math.random() < 0.15;

    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Network error: Failed to fetch content. Please try again.'));
      } else {
        resolve(data);
      }
    }, delay);
  });
}

/**
 * Fetches hero and navigation content.
 * @returns {Promise<{ hero: object, navigation: object, modal: object }>}
 */
export function fetchHeroContent() {
  const { hero, navigation, modal } = content;
  return simulateRequest({ hero, navigation, modal });
}

/**
 * Fetches features, solutions, CTA, footer, and carousel config.
 * @returns {Promise<{ featuresSection: object, solutionsSection: object, ctaSection: object, footer: object, carousel: object }>}
 */
export function fetchFeaturesContent() {
  const { featuresSection, solutionsSection, ctaSection, footer, carousel } = content;
  return simulateRequest({ featuresSection, solutionsSection, ctaSection, footer, carousel });
}
