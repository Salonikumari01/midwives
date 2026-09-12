import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

/**
 * Loads and decorates the article block.
 * Expected row order from the model:
 *   Row 0: image
 *   Row 1: title
 *   Row 2: content (richtext)
 *   Row 3: cta group — ctaText, ctaLink, videoItem, videoItemLink
 * @param {Element} block
 */
export default function decorate(block) {
  const rows = [...block.children];

  const article = document.createElement('article');
  article.className = 'article-content';
  moveInstrumentation(block, article);

  // Row 0 — image
  const imageRow = rows[0];
  if (imageRow) {
    const picture = imageRow.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimized = createOptimizedPicture(img.src, img.alt || '', false, [{ width: '800' }]);
      moveInstrumentation(img, optimized.querySelector('img'));
      const figure = document.createElement('figure');
      figure.className = 'article-image';
      figure.append(optimized);
      article.append(figure);
    }
  }

  // Row 1 — title
  const titleRow = rows[1];
  if (titleRow) {
    const titleEl = document.createElement('h2');
    titleEl.className = 'article-title';
    moveInstrumentation(titleRow, titleEl);
    titleEl.textContent = titleRow.textContent.trim();
    article.append(titleEl);
  }

  // Row 2 — content
  const contentRow = rows[2];
  if (contentRow) {
    const contentEl = document.createElement('div');
    contentEl.className = 'article-body';
    moveInstrumentation(contentRow, contentEl);
    contentEl.innerHTML = contentRow.innerHTML;
    article.append(contentEl);
  }

  // Row 3 — CTA group (ctaText, ctaLink, videoItem, videoItemLink)
  const ctaRow = rows[3];
  if (ctaRow) {
    const cells = [...ctaRow.children];
    const ctaLabel = cells[0]?.textContent.trim();
    const ctaLink = cells[1]?.textContent.trim();
    const videoLabel = cells[2]?.textContent.trim();
    const videoLink = cells[3]?.textContent.trim();

    const ctaWrapper = document.createElement('div');
    ctaWrapper.className = 'article-cta';
    moveInstrumentation(ctaRow, ctaWrapper);

    if (ctaLink && ctaLabel) {
      const link = document.createElement('a');
      link.href = ctaLink;
      link.textContent = ctaLabel;
      link.className = 'article-cta-link button';
      ctaWrapper.append(link);
    }

    if (videoLink && videoLabel) {
      const videoLinkEl = document.createElement('a');
      videoLinkEl.href = videoLink;
      videoLinkEl.textContent = videoLabel;
      videoLinkEl.className = 'article-video-link';
      ctaWrapper.append(videoLinkEl);
    }

    if (ctaWrapper.hasChildNodes()) article.append(ctaWrapper);
  }

  block.replaceChildren(article);
}
