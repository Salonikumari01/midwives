import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

/**
 * Loads and decorates the news-card block.
 * Expected DOM from AEM field collapse:
 *   Row 0: image (picture)
 *   Row 1: title (text)
 *   Row 2: content (richtext)
 *   Row 3: link + linkText → rendered as <a href="...">label</a>
 *   Row 4: video + videoText → rendered as <a href="...">label</a>
 * @param {Element} block
 */
export default function decorate(block) {
  const rows = [...block.children];

  const card = document.createElement('div');
  card.className = 'news-card-inner';
  moveInstrumentation(block, card);

  // Row 0 — image
  const imageRow = rows[0];
  if (imageRow) {
    const picture = imageRow.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimized = createOptimizedPicture(img.src, img.alt || '', false, [{ width: '800' }]);
      moveInstrumentation(img, optimized.querySelector('img'));
      const figure = document.createElement('figure');
      figure.className = 'news-card-image';
      figure.append(optimized);
      card.append(figure);
    }
  }

  // Row 1 — title
  const titleRow = rows[1];
  if (titleRow?.textContent.trim()) {
    const h2 = document.createElement('h2');
    h2.className = 'news-card-title';
    moveInstrumentation(titleRow, h2);
    h2.textContent = titleRow.textContent.trim();
    card.append(h2);
  }

  // Row 2 — content (richtext)
  const contentRow = rows[2];
  if (contentRow?.innerHTML.trim()) {
    const body = document.createElement('div');
    body.className = 'news-card-body';
    moveInstrumentation(contentRow, body);
    body.innerHTML = contentRow.innerHTML;
    card.append(body);
  }

  // Row 3 — CTA link (field collapse: link + linkText → <a>)
  const ctaRow = rows[3];
  if (ctaRow) {
    const anchor = ctaRow.querySelector('a');
    if (anchor?.href) {
      const cta = document.createElement('a');
      cta.href = anchor.href;
      cta.textContent = anchor.textContent.trim() || anchor.href;
      cta.className = 'news-card-cta button primary';
      moveInstrumentation(ctaRow, cta);
      card.append(cta);
    }
  }

  block.replaceChildren(card);
}
