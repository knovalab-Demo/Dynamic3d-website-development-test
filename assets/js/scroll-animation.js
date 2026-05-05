import { model } from './three-scene.js';

function lerp(start, end, t) {
  return start + (end - start) * t;
}

window.addEventListener('scroll', () => {

  if (!model) return;

  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = scrollTop / docHeight;

  /* SECTION BREAKPOINTS */
  const sectionCount = 5;
  const segment = 1 / sectionCount;

  /* HERO → Section 2 */
  if (progress <= segment) {
    const t = progress / segment;

    model.position.x = lerp(0, -2, t);
    model.position.y = lerp(0, -1, t);
    model.rotation.y = lerp(0, Math.PI / 2, t);
  }

  /* Section 2 → 3 */
  else if (progress <= segment * 2) {
    const t = (progress - segment) / segment;

    model.position.x = lerp(-2, 2, t);
    model.rotation.y = lerp(Math.PI / 2, -Math.PI / 2, t);
  }

  /* Section 3 → 4 */
  else if (progress <= segment * 3) {
    const t = (progress - segment * 2) / segment;

    model.rotation.x = lerp(0, -Math.PI / 4, t);
  }

  /* Section 4 → Final */
  else if (progress <= segment * 4) {
    const t = (progress - segment * 3) / segment;

    model.position.x = lerp(2, 1.5, t);
    model.rotation.y = lerp(-Math.PI / 2, 0, t);
    model.rotation.x = lerp(-Math.PI / 4, 0, t);
  }

});
