// Where the learner is inside the open class (tab, story card, animation
// step), so that a side trip to an earlier class ("I'm lost", a glossary
// word) can bring them back to the same spot afterwards.
let place = null;
export const setPlace = (p) => {
  place = p;
};
export const getPlace = () => place;
