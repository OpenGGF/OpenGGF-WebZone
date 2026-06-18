// Lazy-loads the Pagefind UI bundle (emitted to /pagefind by the build) the first
// time the user invokes search. No JS cost until then.
let loaded = false;
async function openSearch() {
  if (loaded) { document.querySelector<HTMLInputElement>('.pagefind-ui__search-input')?.focus(); return; }
  loaded = true;
  // @ts-expect-error - emitted at build time, not present during typecheck.
  // @vite-ignore prevents Astro/Vite from trying to resolve this path at build
  // time (the file only exists after `pagefind --site dist` runs post-build).
  const { PagefindUI } = await import(/* @vite-ignore */ '/pagefind/pagefind-ui.js');
  const host = document.getElementById('search-modal')!;
  host.hidden = false;
  new PagefindUI({ element: '#search-modal .inner', showSubResults: true });
  host.querySelector<HTMLInputElement>('.pagefind-ui__search-input')?.focus();
}
export function initSearch() {
  const btn = document.getElementById('nav-search');
  btn?.addEventListener('click', openSearch);
  // First keyboard focus (tabbing to the button) also loads search — matches the
  // spec's "loads on first focus". One-shot; openSearch is idempotent via `loaded`.
  btn?.addEventListener('focus', openSearch, { once: true });
  document.getElementById('search-close')?.addEventListener('click', () => {
    document.getElementById('search-modal')!.hidden = true;
  });
}
document.addEventListener('DOMContentLoaded', initSearch);
