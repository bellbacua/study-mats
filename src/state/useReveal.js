import { useEffect } from 'react';

// Fades elements marked [data-reveal] up into place as they scroll into view.
// Re-scans whenever `deps` change so newly rendered items get observed too.
export function useReveal(deps = []) {
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('in'));
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting) {
            en.target.classList.add('in');
            io.unobserve(en.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
    );
    const scan = () => document.querySelectorAll('[data-reveal]:not(.in)').forEach((el) => io.observe(el));
    scan();
    // Items that appear later (pictures loaded from the internet, data that
    // arrives after the first paint) must be watched too, or they stay hidden.
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
}
