export default function decorate(block) {
  [...block.children].forEach((item) => {
    const fields = [...item.children];

    // Get "Download now" from the Description field
    const description = fields[2]?.querySelector('p')?.textContent.trim();

    // Get the actual URL from the Link field
    const link = fields[3]?.querySelector('a');

    // Use the Description as the visible CTA text
    if (link && description) {
      link.textContent = description;
    }
  });
}