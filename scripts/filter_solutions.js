const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'src', 'data', 'solutionWords.ts');
const text = fs.readFileSync(file, 'utf8');

const arrMatch = text.match(/const\s+solutions\s*=\s*\[([\s\S]*?)\]/m);
if (!arrMatch) {
  console.error('Could not find solutions array');
  process.exit(2);
}

const body = arrMatch[1];
const wordMatches = Array.from(body.matchAll(/'([^']+)'/g), m => m[1]);

const withLen = wordMatches.map(w => ({ w, len: Array.from(w).length }));

console.log('Words and lengths:\n');
withLen.forEach(x => console.log(`${x.w} : ${x.len}`));

const filtered = withLen.filter(x => x.len === 5).map(x => x.w);

console.log('\n----- FILTERED (only length===5) -----\n');
console.log('[\n' + filtered.map(w => `  '${w}',`).join('\n') + '\n]');

// Optionally write to a file for easy copy
fs.writeFileSync(path.join(__dirname, 'filtered_solutions.txt'), filtered.join('\n'));
console.log('\nWrote filtered list to scripts/filtered_solutions.txt');
