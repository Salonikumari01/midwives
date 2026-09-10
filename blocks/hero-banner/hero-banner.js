export default function decorate(block) {
  const rows = [...block.children];

  // Get the existing fields
  const bloomImage = rows[0];
  const heroImage = rows[1];
  const title = rows[2];
  const subtitle = rows[3];
  const ctaText = rows[4];
  const ctaLink = rows[5];

  // Create main container
  const container = document.createElement('div');
  container.className = 'hero-banner-container';

  // Create left content section
  const content = document.createElement('div');
  content.className = 'hero-banner-content';

  // Create right image section
  const imageContainer = document.createElement('div');
  imageContainer.className = 'hero-banner-image';

  // Bloom image
  if (bloomImage) {
    const bloomWrapper = document.createElement('div');
    bloomWrapper.className = 'hero-banner-bloom';

    bloomWrapper.appendChild(bloomImage);
    content.appendChild(bloomWrapper);
  }

  // Title
  if (title) {
    const titleElement = document.createElement('div');
    titleElement.className = 'hero-banner-title';

    titleElement.appendChild(title);
    content.appendChild(titleElement);
  }

  // Subtitle
  if (subtitle) {
    const subtitleElement = document.createElement('div');
    subtitleElement.className = 'hero-banner-subtitle';

    subtitleElement.appendChild(subtitle);
    content.appendChild(subtitleElement);
  }

  // CTA
  if (ctaText || ctaLink) {
    const cta = document.createElement('a');
    cta.className = 'hero-banner-cta';

    // CTA text
    if (ctaText) {
      cta.textContent = ctaText.textContent.trim();
    }

    // CTA link
    if (ctaLink) {
      const existingLink = ctaLink.querySelector('a');

      if (existingLink) {
        cta.href = existingLink.href;
      } else {
        cta.href = ctaLink.textContent.trim();
      }
    }

    content.appendChild(cta);
  }

  // Hero image
  if (heroImage) {
    imageContainer.appendChild(heroImage);
  }

  // Add left and right sections
  container.appendChild(content);
  container.appendChild(imageContainer);

  // Replace original block content
  block.replaceChildren(container);
}
