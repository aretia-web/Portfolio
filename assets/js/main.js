const phrases = [
  'whoami → developer',
  'ls projects/ → microweb, slam-gp...',
  'git status → all good',
];
let pi = 0, ci = 0, deleting = false;
const el = document.getElementById('typed');
function type() {
  const phrase = phrases[pi];
  if (!deleting) {
    el.textContent = phrase.slice(0, ++ci);
    if (ci === phrase.length) { deleting = true; setTimeout(type, 1800); return; }
    setTimeout(type, 55);
  } else {
    el.textContent = phrase.slice(0, --ci);
    if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; setTimeout(type, 400); return; }
    setTimeout(type, 28);
  }
}
type();