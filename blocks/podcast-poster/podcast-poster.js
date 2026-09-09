export default function decorate(block) {
  [...block.children].forEach((item) => {
    const fields = [...item.children];
 
    // Existing fields
    const image = fields[0];
    const title = fields[1];
    const description = fields[2];
    const link = fields[3];
   image.className = 'podcast-poster-image';
    // Create right-side content container
    const content = document.createElement('div');
    content.className = 'podcast-poster-content';

   

    // Get CTA text from Description
    const descriptionText = description?.querySelector('p')?.textContent.trim();

    // Get actual link
    const anchor = link?.querySelector('a');

    // Use Description as button text
    if (anchor && descriptionText) {
      anchor.textContent = descriptionText;
    }

    // Add title and button to right-side container
    if (title) {
      content.appendChild(title);
    }

    if (link) {
      content.appendChild(link);
    }

    // Add the new content container
    item.appendChild(content);

    // Remove the original description
    if (description) {
      description.remove();
    }
  });
}