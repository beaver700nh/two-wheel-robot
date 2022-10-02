import * as Util   from "./util.js";
import * as Vector from "./vector.js";

/*
 * A point on a `w`x`h` HTML5 canvas, using Cartesian coordinates (x, y).
 */
class PointCanvas {
  constructor(w, h) {
    this.w = w;
    this.h = h;
    this.from_numbers(0, 0);
  }

  // construct a new point from another PointCanvas `p`
  from_canvas(p) {
    this.x = point.x;
    this.y = point.y;

    return this;
  }

  // construct a new point from a PointCartesian `p`
  from_cartesian(p) {
    const min = Util.SCREEN_SIZE / -2;
    const max = Util.SCREEN_SIZE / 2;
    const ratio = this.w / this.h;

    if (ratio < 1) {
      this.x = Util.map_ranges(p.x, min,         max,         0, this.w);
      this.y = Util.map_ranges(p.y, min / ratio, max / ratio, this.h, 0);
    }
    else {
      this.x = Util.map_ranges(p.x, min * ratio, max * ratio, 0, this.w);
      this.y = Util.map_ranges(p.y, min,         max,         this.h, 0);
    }

    return this;
  }

  // construct a new point from a PointPolar `p`
  from_polar(p) {
    return this.from_cartesian(
      new PointCartesian().from_polar(p)
    );
  }

  // construct a new point from two numbers `x` and `y`
  from_numbers(x, y) {
    this.x = x;
    this.y = y;

    return this;
  }

  // return this point moved by a Vector `v`
  moved_by(v) {
    v = v.to_cartesian();

    return new PointCanvas(this.w, this.h).from_numbers(
      this.x + v.x,
      this.y + v.y
    );
  }

  // move the point by a Vector `v`
  move_by(v) {
    return this.from_canvas(this.moved_by(v));
  }
}

/*
 * A point in Cartesian coordinates (x, y).
 */
class PointCartesian {
  constructor() {
    this.from_numbers(0, 0);
  }

  // construct a new point from another PointCartesian `p`
  from_cartesian(p) {
    this.x = p.x;
    this.y = p.y;

    return this;
  }

  // construct a new point from a PointCanvas `p`
  from_canvas(p) {
    const min = Util.SCREEN_SIZE / -2;
    const max = Util.SCREEN_SIZE / 2;
    const ratio = p.w / p.h;

    if (ratio < 1) {
      this.x = Util.map_ranges(p.x, 0, p.w, min,         max        );
      this.y = Util.map_ranges(p.y, p.h, 0, min / ratio, max / ratio);
    }
    else {
      this.x = Util.map_ranges(p.x, 0, p.w, min * ratio, max * ratio);
      this.y = Util.map_ranges(p.y, p.h, 0, min,         max        );
    }

    return this;
  }

  // construct a new point from a PointPolar `p`
  from_polar(p) {
    this.x = p.r * Math.cos(p.θ);
    this.y = p.r * Math.sin(p.θ);

    return this;
  }

  // construct a new point from two numbers `x` and `y`
  from_numbers(x, y) {
    this.x = x;
    this.y = y;

    return this;
  }

  // return this point moved by a Vector `v`
  moved_by(v) {
    v = v.to_cartesian();

    return new PointCartesian().from_numbers(
      this.x + v.x,
      this.y + v.y
    );
  }

  // move the point by a Vector `v`
  move_by(v) {
    return this.from_cartesian(this.moved_by(v));
  }
}

/*
 * A point in polar coordinates (r, θ).
 */
class PointPolar {
  constructor() {
    this.from_numbers(0, 0);
  }

  // construct a new point from another PointPolar `p`
  from_polar(p) {
    this.r = p.r;
    this.θ = p.θ;

    return this;
  }

  // construct a new point from a PointCanvas `p`
  from_canvas(p) {
    return this.from_cartesian(
      new PointCartesian().from_canvas(p)
    );
  }

  // construct a new point from a PointCartesian `p`
  from_cartesian(p) {
    this.r = Math.sqrt(p.x * p.x + p.y * p.y);
    this.θ = Math.atan2(p.y, p.x);

    return this;
  }

  // construct a new point from two numbers `r` and `θ`
  from_numbers(r, θ) {
    this.r = r;
    this.θ = θ;

    return this;
  }

  // return this point moved by a Vector `v`
  moved_by(v) {
    return new PointPolar().from_cartesian(
      new PointCartesian().from_polar(this).moved_by(v)
    );
  }

  // move the point by a Vector `v`
  move_by(v) {
    return this.from_polar(this.moved_by(v));
  }
}

export { PointCanvas, PointCartesian, PointPolar };
