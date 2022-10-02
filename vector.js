/*
 * A vector in Polar coordinates, can be converted to and from Cartesian coordinates.
 */
class Vector {
  constructor() {
    this.from_polar(0, 0);
  }

  // construct a new vector from another Vector `v`.
  from_other(v) {
    this.r = v.r;
    this.θ = v.θ;

    return this;
  }

  // construct a new vector from two numbers `r` and `θ`.
  from_polar(r, θ) {
    this.r = r;
    this.θ = θ;

    return this;
  }

  // construct a new vector from two numbers `x` and `y`.
  from_cartesian(x, y) {
    this.r = Math.sqrt(x * x + y * y);
    this.θ = Math.atan2(y, x);

    return this;
  }

  // convert to Cartesian coordinates.
  to_cartesian() {
    return {
      x: this.r * Math.cos(this.θ),
      y: this.r * Math.sin(this.θ),
    };
  }

  // normalize this vector.
  normalize() {
    this.r = 1;
    return this;
  }

  // return this vector added to another vector `v`.
  plus(v) {
    const a = this.to_cartesian();
    const b = v.to_cartesian();

    return new Vector().from_cartesian(a.x + b.x, a.y + b.y);
  }

  // add another vector `v` to this vector.
  add(v) {
    return this.from_other(this.plus(v));
  }

  // return this vector multiplied by a scalar `s`.
  times(s) {
    return new Vector().from_polar(this.r * s, this.θ);
  }

  // multiply this vector by a scalar `s`.
  scale(s) {
    return this.from_other(this.times(s));
  }
}

export { Vector };
