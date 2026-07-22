/*
 * Tiny language helper shared by every CodeNest canvas.html lesson page.
 * The Next.js site passes ?lang=en|th on the iframe src (see
 * LessonDisplay.tsx) so a standalone static page can still follow the
 * site's locale toggle without a bundler or React.
 *
 * Usage in a page:
 *   const LANG = getLang();
 *   const T = { en: {...}, th: {...} };
 *   applyI18n(T[LANG]); // sets textContent on every [data-i18n] element
 */
function getLang() {
  const param = new URLSearchParams(location.search).get("lang");
  return param === "th" ? "th" : "en";
}

function applyI18n(dict) {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (dict[key] !== undefined) el.innerHTML = dict[key];
  });
  document.documentElement.lang = getLang();
}
