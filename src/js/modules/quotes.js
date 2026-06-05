const quotes = [
  'Small steps every day lead to big results.',
  'Discipline beats motivation.',
  'Hydrate, focus, and conquer!',
  'Consistency is the key to success.',
  'Balance study with rest for true growth.'
];

export function initQuotes() {
  let quoteIndex = 0;
  const q = document.getElementById('quote-text');
  if (!q) return;
  setInterval(() => {
    quoteIndex = (quoteIndex + 1) % quotes.length;
    q.textContent = `"${quotes[quoteIndex]}"`;
  }, 7000);
}