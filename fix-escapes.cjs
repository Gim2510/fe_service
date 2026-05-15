const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'Components', 'Home');
const files = [
  'CinematicHero.tsx', 'HorizontalSolutions.tsx', 'VideoSection.tsx',
  'CinematicFAQ.tsx', 'CinematicCTA.tsx', 'MaturitySection.tsx',
  'DepthMethod.tsx', 'PrivateAIFlow.tsx', 'ParallaxTestimonials.tsx',
  'StatsReveal.tsx', 'ScrollProblems.tsx', 'LiquidTextBanner.tsx',
  'SunsetTransition.tsx'
];

const replacements = [
  ['\\u00E8', 'è'], ['\\u00E0', 'à'], ['\\u00E9', 'é'],
  ['\\u00F2', 'ò'], ['\\u00F9', 'ù'], ['\\u00EC', 'ì'],
  ['\\u00F3', 'ó'], ['\\u00C8', 'È'], ['\\u00C0', 'À'],
  ['\\u00C9', 'É'], ['\\u00AB', '«'], ['\\u00BB', '»'],
  ['\\u2019', "'"], ['\\u201C', '"'], ['\\u201D', '"'],
  ['\\u2026', '...'], ['\\u00B7', '·'], ['\\u00D7', '×'],
  ['\\u2212', '−'], ['\\u00E2', 'â'], ['\\u00EE', 'î'],
  ['\\u00F4', 'ô'], ['\\u00FB', 'û'], ['\\u00E7', 'ç'],
  ['\\u00F1', 'ñ'], ['\\u00FC', 'ü'], ['\\u00F6', 'ö'],
  ['\\u2014', ','], ['\\u2013', '-'],
];

files.forEach(f => {
  const fp = path.join(dir, f);
  if (!fs.existsSync(fp)) { console.log('SKIP: ' + f); return; }
  let c = fs.readFileSync(fp, 'utf8');
  replacements.forEach(([from, to]) => {
    c = c.split(from).join(to);
  });
  fs.writeFileSync(fp, c, 'utf8');
  console.log('FIXED: ' + f);
});
