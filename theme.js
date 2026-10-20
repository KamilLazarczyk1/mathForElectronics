// Local-file browsers may isolate storage for each page. Carry the preference
// on internal links as well as saving it, so offline navigation stays consistent.
(() => {
  const valid = value => value === 'dark' || value === 'light';
  const current = new URL(location.href);
  let saved;
  try { saved = localStorage.getItem('math-theme'); } catch {}
  let theme = current.searchParams.get('theme');
  if (!valid(theme)) theme = valid(saved) ? saved : 'light';

  function urlFor(href) {
    const url = new URL(href, location.href);
    const directory = new URL('.', location.href);
    if (url.protocol === directory.protocol && url.host === directory.host &&
        new URL('.', url).pathname === directory.pathname && /\.html$/i.test(url.pathname)) {
      url.searchParams.set('theme', theme);
    }
    return url.href;
  }

  function updateLinks(root = document) {
    root.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#')) return;
      const url = urlFor(href);
      if (link.href !== url) link.href = url;
    });
  }

  function set(value) {
    if (!valid(value)) return;
    theme = value;
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('math-theme', theme); } catch {}
    const url = new URL(location.href);
    url.searchParams.set('theme', theme);
    try { history.replaceState(history.state, '', url.href); } catch {}
    updateLinks();
  }

  window.GuideTheme = { set, url: urlFor };
  set(theme); // Runs in the head, before the page is painted.
  document.addEventListener('DOMContentLoaded', () => {
    updateLinks();
    new MutationObserver(() => updateLinks()).observe(document.body, { childList: true, subtree: true });
  });
  document.addEventListener('click', event => {
    const link = event.target.closest?.('a[href]');
    if (link && !link.getAttribute('href').startsWith('#')) link.href = urlFor(link.href);
  }, true);
})();
