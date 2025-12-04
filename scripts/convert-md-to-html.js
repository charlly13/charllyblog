const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const learningsDir = path.join(__dirname, '..', 'content', 'learnings');

// Configure marked
marked.setOptions({
  breaks: true,
  gfm: true,
});

function mdToHtml(mdContent) {
  return marked.parse(mdContent);
}

function extractFrontmatter(content) {
  const meta = {};
  let body = content;

  if (content.startsWith('---')) {
    const end = content.indexOf('\n---', 3);
    if (end !== -1) {
      const front = content.slice(3, end).trim();
      body = content.slice(end + 5).trim();
      front.split(/\r?\n/).forEach((line) => {
        const idx = line.indexOf(':');
        if (idx !== -1) {
          const key = line.slice(0, idx).trim();
          const val = line.slice(idx + 1).trim().replace(/^"|"$/g, '');
          meta[key] = val;
        }
      });
    }
  }

  return { meta, body };
}

function convertMarkdownToHtml(filename, content) {
  const { meta, body } = extractFrontmatter(content);

  // Convert markdown to HTML
  const htmlBody = mdToHtml(body);

  // Create frontmatter for HTML file
  const frontmatter = Object.entries(meta)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n');

  // Create HTML wrapper with embedded styles
  const htmlContent = `---
${frontmatter}
---

<style>
.section {
  margin-bottom: 2rem;
}

.subsection {
  margin-bottom: 1.5rem;
  margin-left: 1rem;
}

.concept-box {
  background-color: rgba(0, 0, 0, 0.05);
  border-left: 4px solid rgb(219, 39, 119);
  padding: 1rem;
  margin: 1.5rem 0;
  border-radius: 0.375rem;
}

.dark .concept-box {
  background-color: rgba(255, 255, 255, 0.05);
}

ul.nested-list {
  list-style: none;
  padding-left: 0;
}

ul.nested-list > li {
  margin-bottom: 0.5rem;
}

ul.nested-list > li::before {
  content: "• ";
  color: rgb(219, 39, 819);
  font-weight: bold;
  margin-right: 0.5rem;
}

ul.nested-list ul {
  margin-left: 1.5rem;
  margin-top: 0.5rem;
  list-style: none;
}

ul.nested-list ul > li::before {
  content: "◦ ";
  color: rgb(219, 39, 819);
  margin-right: 0.5rem;
}
</style>

${htmlBody}`;

  return htmlContent;
}

// Process all markdown files
const files = fs.readdirSync(learningsDir).filter((f) => f.endsWith('.md'));

files.forEach((filename) => {
  const mdPath = path.join(learningsDir, filename);
  const htmlFilename = filename.replace(/\.md$/, '.html');
  const htmlPath = path.join(learningsDir, htmlFilename);

  // Skip if HTML already exists (like intro-it-security-new.html)
  if (fs.existsSync(htmlPath) && htmlFilename !== 'intro-it-security-new.html') {
    console.log(`⊘ Skipping ${filename} (${htmlFilename} already exists)`);
    return;
  }

  try {
    const content = fs.readFileSync(mdPath, 'utf-8');
    const htmlContent = convertMarkdownToHtml(filename, content);

    fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
    console.log(`✓ Converted: ${filename} → ${htmlFilename}`);
  } catch (err) {
    console.error(`✗ Error converting ${filename}:`, err.message);
  }
});

console.log('\n✓ Conversion complete!');
