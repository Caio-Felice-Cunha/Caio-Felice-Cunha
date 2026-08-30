import fs from 'node:fs';
const readme = fs.readFileSync(new URL('../README.md', import.meta.url), 'utf8');
const urls = [...readme.matchAll(/https:\/\/[^)\s]+/g)].map((match) => match[0]);
if (urls.length < 15) throw new Error('Expected a complete set of public links.');
if (urls.some((url) => /\s|localhost/.test(url))) throw new Error('Invalid public URL.');
for (const slug of ['drumai-demo', 'morarfora-case-study', 'scoopy-demo', 'linkedin-x-scheduler', 'instagram-reels-poster', 'youtube-shorts-scheduler', 'Supply-Chain-Intelligence-Hub']) {
  if (!readme.includes('github.io/' + slug + '/')) throw new Error('Missing public route: ' + slug);
}
for (const fragment of ['drumai-demo/#case-study', 'morarfora-case-study/#case', 'scoopy-demo/case-study/', 'linkedin-x-scheduler/#architecture', 'instagram-reels-poster/#architecture', 'youtube-shorts-scheduler/#architecture', 'Supply-Chain-Intelligence-Hub/#engineering']) {
  if (!readme.includes(fragment)) throw new Error('Missing engineering route: ' + fragment);
}
if (/github\.com\/Caio-Felice-Cunha\/(redaxjuris|voxpage)-case-study/.test(readme)) throw new Error('Blocked case repository exposed.');
if (/Mega\s*Brain/i.test(readme)) throw new Error('Excluded content found.');
console.log('README structure and public URL syntax: PASS');

