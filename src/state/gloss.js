// One glossary card for the whole app: a tapped word anywhere opens it.
const listeners = new Set();
export const openGloss = (g, el) => listeners.forEach((fn) => fn({ g, rect: el.getBoundingClientRect(), el }));
export const onGloss = (fn) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};
