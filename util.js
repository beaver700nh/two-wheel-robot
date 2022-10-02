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

export { SCREEN_SIZE, map_ranges };
