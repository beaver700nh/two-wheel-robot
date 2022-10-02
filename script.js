import * as Point from "./point.js";
import * as Mathz from "./mathz.js";

CanvasRenderingContext2D.prototype.graph_polar = function(fn, domain_min, domain_max, step, thickness, color) {
  for (let θ = domain_min; θ <= domain_max; θ += step) {
    const r = fn(θ);
    const p = new Point.PointPolar().from_numbers(r, θ);
    const q = new Point.PointCanvas(this.canvas.width, this.canvas.height).from_polar(p);

    this.beginPath();
    this.arc(q.x, q.y, thickness, 0, 2 * Math.PI);
    this.fillStyle = color;
    this.fill();
    this.closePath();
  }
};

$(document).ready(
  function() {
    const CW = $("#canvas").width();
    const CH = $("#canvas").height();

    $("#canvas").attr("width", CW);
    $("#canvas").attr("height", CH);

    const ctx = $("#canvas")[0].getContext("2d");

    ctx.graph_polar(
      Mathz.Functions.Polar.circle(4),
      0, 2 * Math.PI, 0.005, 1, "black"
    );
  }
);
