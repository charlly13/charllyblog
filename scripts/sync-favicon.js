const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function hashFileShort(filePath) {
  const buf = fs.readFileSync(filePath);
  const hash = crypto.createHash('sha256').update(buf).digest('hex');
  return hash.slice(0, 8).toUpperCase();
}

function copyFavicon() {
  const src = path.join(process.cwd(), 'src', 'app', 'favicon.ico');
  const destDir = path.join(process.cwd(), 'public');
  const dest = path.join(destDir, 'favicon.ico');

  if (!fs.existsSync(src)) {
    console.error('Source favicon not found:', src);
    process.exit(1);
  }

  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
  fs.copyFileSync(src, dest);
  console.log('Copied', src, '→', dest);

  return dest;
}

function updateLayout(hash) {
  const layoutPath = path.join(process.cwd(), 'src', 'app', 'layout.tsx');
  let content = fs.readFileSync(layoutPath, 'utf8');

  // Replace any existing ?v= token on favicon links with new hash
  content = content.replace(/(\/favicon(?:-[0-9]+x[0-9]+)?\.png|\/favicon\.ico|\/apple-touch-icon\.png)(\?v=[A-F0-9]{1,16})?/g, `$1?v=${hash}`);

  fs.writeFileSync(layoutPath, content, 'utf8');
  console.log('Updated', layoutPath, 'with cache token', hash);
}

function main() {
  const publicFavicon = copyFavicon();
  const short = hashFileShort(publicFavicon);
  updateLayout(short);
  console.log('Sync complete.');
}

main();
