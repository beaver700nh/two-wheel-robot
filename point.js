import * as Util from "./util.js";

class PointCanvas {
  constructor(w, h) {
    this.w = w;
    this.h = h;
  }

  from_canvas(p) {
    this.x = point.x;
    this.y = point.y;

    return this;
  }

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

  from_polar(p) {
    return this.from_cartesian(
      new PointCartesian().from_polar(p)
    );
  }

  from_numbers(x, y) {
    this.x = x;
    this.y = y;

    return this;
  }
}

class PointCartesian {
  from_cartesian(p) {
    this.x = p.x;
    this.y = p.y;

    return this;
  }

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

  from_polar(p) {
    this.x = p.r * Math.cos(p.θ);
    this.y = p.r * Math.sin(p.θ);

    return this;
  }

  from_numbers(x, y) {
    this.x = x;
    this.y = y;

    return this;
  }
}

class PointPolar {
  from_polar(p) {
    this.r = p.r;
    this.θ = p.θ;

    return this;
  }

  from_canvas(p) {
    return this.from_cartesian(
      new PointCartesian().from_canvas(p)
    );
  }

  from_cartesian(p) {
    this.r = Math.sqrt(p.x * p.x + p.y * p.y);
    this.θ = Math.atan2(p.y, p.x);

    return this;
  }

  from_numbers(r, θ) {
    this.r = r;
    this.θ = θ;

    return this;
  }
}

export { PointCanvas, PointCartesian, PointPolar };
