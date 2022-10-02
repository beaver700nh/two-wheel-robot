/*
 * A sprite is a collection of points in 2D space that can be moved collectively by some vector.
 */
class Sprite {
  constructor(points) {
    this.points = points;
  }

  // move the sprite by a Vector `v`
  move_by(v) {
    for (const p of this.points) {
      p.move_by(v);
    }

    return this;
  }
}

export { Sprite };
