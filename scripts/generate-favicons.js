const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const pngToIco = require('png-to-ico');

async function generate() {
  const src = path.join(process.cwd(), 'public', 'images', 'profile.jpg');
  if (!fs.existsSync(src)) {
    console.error('Source image not found:', src);
    process.exit(1);
  }

  const out = path.join(process.cwd(), 'public');
  if (!fs.existsSync(out)) fs.mkdirSync(out, { recursive: true });

  const sizes = [16, 32, 48, 64, 128, 180, 256];
  const pngPaths = [];

  for (const size of sizes) {
    const filename = `favicon-${size}x${size}.png`;
    const outPath = path.join(out, filename);
    await sharp(src).resize(size, size, { fit: 'cover' }).png().toFile(outPath);
    console.log('Wrote', outPath);
    // For ico generation, use 16,32,48,64,128,256
    if ([16,32,48,64,128,256].includes(size)) pngPaths.push(outPath);
  }

  // Create ico from multiple pngs (png-to-ico expects Buffer or paths)
  try {
    const icoBuffer = await pngToIco(pngPaths.slice(0, 6)); // use up to 6 sizes
    const icoPath = path.join(out, 'favicon.ico');
    fs.writeFileSync(icoPath, icoBuffer);
    console.log('Wrote', icoPath);
  } catch (err) {
    console.warn('Failed to generate .ico via png-to-ico, falling back to single png as favicon.ico');
    const fallback = path.join(out, 'favicon-64x64.png');
    fs.copyFileSync(fallback, path.join(out, 'favicon.ico'));
    console.log('Wrote fallback favicon.ico');
  }

  // Ensure apple touch icon is present (180x180)
  const applePath = path.join(out, 'apple-touch-icon.png');
  await sharp(src).resize(180, 180, { fit: 'cover' }).png().toFile(applePath);
  console.log('Wrote', applePath);

  console.log('\nAll favicons generated.');
}

generate().catch(err => { console.error(err); process.exit(1); });
