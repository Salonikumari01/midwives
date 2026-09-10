export default function decorate(block) {
  const rows = [...block.children];

  // The first four rows map to the hero-banner model fields.
  const bloomImage = rows[0];
  const heroImage = rows[1];
  const title = rows[2];
  const subtitle = rows[3];

  // Any remaining rows are authored Button child components.
  const buttonRows = rows.slice(4);

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

  // CTA buttons authored as Button child components
  const links = buttonRows
    .flatMap((row) => [...row.querySelectorAll('a')])
    .filter((a) => a.textContent.trim() || a.href);

  if (links.length) {
    const ctaWrapper = document.createElement('div');
    ctaWrapper.className = 'hero-banner-cta';

    links.forEach((link) => {
      // Preserve primary/secondary styling if the core button decoration ran.
      link.classList.add('hero-banner-cta-link');
      ctaWrapper.appendChild(link);
    });

    content.appendChild(ctaWrapper);
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
