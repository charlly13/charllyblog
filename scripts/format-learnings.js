const fs = require('fs');
const path = require('path');

const learningsDir = path.join(__dirname, '..', 'content', 'learnings');

// Function to improve formatting
function improveFormatting(content) {
  // Split into frontmatter and body
  let frontmatter = '';
  let body = content;
  
  if (content.startsWith('---')) {
    const parts = content.split('---');
    if (parts.length >= 3) {
      frontmatter = parts[0] + '---' + parts[1] + '---\n';
      body = parts.slice(2).join('---');
    }
  }
  
  // Clean up excessive blank lines (more than 2 in a row become 2)
  body = body.replace(/\n\n\n+/g, '\n\n');
  
  // Convert dash bullets to asterisk bullets with proper nesting
  // This regex handles:
  // - Single dash bullets become single asterisks
  // - Indented dash bullets (2+ spaces) become nested asterisks
  
  const lines = body.split('\n');
  const improved = [];
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    
    // Handle dash bullets: "- " or "  - " etc
    if (line.match(/^(\s*)- /)) {
      const indent = line.match(/^(\s*)/)[1].length;
      const nestLevel = Math.floor(indent / 2); // 0, 1, 2, etc
      const spaces = '  '.repeat(nestLevel);
      const content = line.replace(/^(\s*)- /, '');
      line = spaces + '* ' + content;
    }
    
    improved.push(line);
  }
  
  let result = improved.join('\n');
  
  // Ensure proper spacing before headings (one blank line before h2 and h3)
  result = result.replace(/\n([^\n])\n(##[^#])/g, '\n$1\n\n$2');
  result = result.replace(/\n(###[^#])/g, '\n\n$1');
  
  return frontmatter + result;
}

// Process all markdown files
const files = fs.readdirSync(learningsDir).filter(f => f.endsWith('.md'));

files.forEach(file => {
  const filePath = path.join(learningsDir, file);
  console.log(`Processing: ${file}`);
  
  let content = fs.readFileSync(filePath, 'utf-8');
  const improved = improveFormatting(content);
  
  fs.writeFileSync(filePath, improved, 'utf-8');
  console.log(`✓ Formatted: ${file}`);
});

console.log(`\n✓ All ${files.length} files formatted successfully!`);
