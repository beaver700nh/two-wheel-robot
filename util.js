/*
 * Minimum dimension of canvas, in grid units.
 */
const SCREEN_SIZE = 10;

/*
 * Map a value from one range to another.
 */
function map_ranges(value, a1, b1, a2, b2) {
  return a2 + (value - a1) * (b2 - a2) / (b1 - a1);
}

/*
 * Convert a value to a color; red is positive, blue is negative.
 */
function value_to_color(value) {
  const r = Math.max(map_ranges(value, -1, 1, -255, 255), 0);
  const b = Math.max(map_ranges(value, 1, -1, -255, 255), 0);

  return `rgb(${r}, 0, ${b})`;
}

export { SCREEN_SIZE, map_ranges, value_to_color };
