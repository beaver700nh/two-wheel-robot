import * as Util   from "./util.js";
import * as Mathz  from "./mathz.js";
import * as Point  from "./point.js";
import * as Vector from "./vector.js";
import * as Sprite from "./sprite.js";

const FPS = 20;

// Graph a polar function `fn` on the canvas context.
CanvasRenderingContext2D.prototype.graph_polar = function(fn, domain_min, domain_max, step, thickness, color, closed) {
  this.beginPath();
  this.lineWidth = thickness;
  this.strokeStyle = color;

  for (let θ = domain_min; θ <= domain_max; θ += step) {
    const r = fn(θ);
    const p = new Point.PointPolar().from_numbers(r, θ);
    const q = new Point.PointCanvas(this.canvas.width, this.canvas.height).from_polar(p);

    this.lineTo(q.x, q.y);
  }

  if (closed) {
    this.closePath();
  }

  this.stroke();
};

// Draw a point on the canvas context.
CanvasRenderingContext2D.prototype.draw_point = function(p, radius, color) {
  this.beginPath();
  this.arc(p.x, p.y, radius, 0, 2 * Math.PI);
  this.fillStyle = color;
  this.fill();
}

// Draw a line between two points on the canvas context.
CanvasRenderingContext2D.prototype.draw_line = function(p1, p2, thickness, color) {
  this.beginPath();
  this.lineWidth = thickness;
  this.strokeStyle = color;
  this.moveTo(p1.x, p1.y);
  this.lineTo(p2.x, p2.y);
  this.stroke();
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

var robot = new Sprite.Sprite(
  [
    new Point.PointCartesian().from_numbers(-0.5, 4.0),
    new Point.PointCartesian().from_numbers(+0.5, 4.0),
    new Point.PointCartesian().from_numbers( 0.0, 4.0),
  ]
);

var wheel_vectors = [
  new Vector.Vector().from_polar(0.0, Math.PI * (1 / 4)),
  new Vector.Vector().from_polar(0.0, Math.PI * (3 / 4)),
];

var position = 0;

// Draw the current frame, `n` milliseconds since the last frame.
function draw_frame(ctx, CW, CH, t_frame) {
  ctx.clearRect(0, 0, CW, CH);
  ctx.graph_polar(Mathz.Functions.Polar.circle(4), 0, 2 * Math.PI, 0.1, 2, "black", true);

  wheel_vectors[0].r = Math.sin(position / 3 - Math.PI * 5 / 4);
  wheel_vectors[1].r = Math.cos(position / 3 - Math.PI * 5 / 4);

  const v_net = new Vector.Vector();

  for (let i = 0; i < robot.points.length - 1; ++i) {
    const wheel = new Point.PointCanvas(CW, CH).from_cartesian(robot.points[i]);
    const arrow = new Point.PointCanvas(CW, CH).from_cartesian(robot.points[i].moved_by(wheel_vectors[i]));
    const color = Util.value_to_color(wheel_vectors[i].r);

    ctx.draw_point(wheel, 5, color);
    ctx.draw_line(wheel, arrow, 3, color);

    v_net.add(wheel_vectors[i]);
  }

  ctx.draw_point(new Point.PointCanvas(CW, CH).from_cartesian(robot.points[robot.points.length - 1]), 5, "black");

  robot.move_by(v_net.scale(t_frame / 800));

  position = (position + Math.PI / 50);
}

$(document).ready(
  function() {
    const CW = $("#canvas").width();
    const CH = $("#canvas").height();

    $("#canvas").attr("width", CW);
    $("#canvas").attr("height", CH);

    const ctx = $("#canvas")[0].getContext("2d");

    let previous;

    function draw(timestamp) {
      if (previous === undefined) {
        previous = timestamp;
      }

      const t_frame = timestamp - previous;

      if (t_frame >= 1000 / FPS) {
        draw_frame(ctx, CW, CH, t_frame);
        previous = timestamp;
      }

      window.requestAnimationFrame(draw);
    }

    window.requestAnimationFrame(draw);
  }
);
