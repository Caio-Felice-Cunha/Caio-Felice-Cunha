import fs from 'node:fs';
const readme = fs.readFileSync(new URL('../README.md', import.meta.url), 'utf8');
const urls = [...readme.matchAll(/https:\/\/[^)\s]+/g)].map((match) => match[0]);
if (urls.length < 15) throw new Error('Expected a complete set of public links.');
if (urls.some((url) => /\s|localhost/.test(url))) throw new Error('Invalid public URL.');
for (const slug of ['drumai-demo', 'morarfora-case-study', 'scoopy-demo', 'linkedin-x-scheduler', 'instagram-reels-poster', 'youtube-shorts-scheduler', 'Supply-Chain-Intelligence-Hub']) {
  if (!readme.includes('github.io/' + slug + '/')) throw new Error('Missing public route: ' + slug);
}
if (/github\.com\/Caio-Felice-Cunha\/(redaxjuris|voxpage)-case-study/.test(readme)) throw new Error('Blocked case repository exposed.');
if (/Mega\s*Brain/i.test(readme)) throw new Error('Excluded content found.');
console.log('README structure and public URL syntax: PASS');

