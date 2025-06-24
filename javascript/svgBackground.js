const svg = document.getElementById("animated-bg");
const width = window.innerWidth;
const height = window.innerHeight;
svg.setAttribute("width", width);
svg.setAttribute("height", height);
svg.style.position = "fixed";
svg.style.top = "0";
svg.style.left = "0";
svg.style.zIndex = "-1";

const particleCount = 45;
const particles = [];
const maxDistance = 120;

for (let i = 0; i < particleCount; i++) {
  const cx = Math.random() * width;
  const cy = Math.random() * height;
  const dx = (Math.random() - 0.5) * 0.5;
  const dy = (Math.random() - 0.5) * 0.5;

  const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("r", 3);
  circle.setAttribute("fill", "#3b82f6");
  svg.appendChild(circle);

  particles.push({ cx, cy, dx, dy, el: circle });
}

const lines = [];
for (let i = 0; i < particleCount; i++) {
  for (let j = i + 1; j < particleCount; j++) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("stroke", "#3b82f6");
    line.setAttribute("stroke-opacity", "0.15");
    line.setAttribute("stroke-width", "1");
    svg.appendChild(line);
    lines.push({ i, j, el: line });
  }
}

function animate() {
  particles.forEach(p => {
    p.cx += p.dx;
    p.cy += p.dy;

    if (p.cx < 0 || p.cx > width) p.dx *= -1;
    if (p.cy < 0 || p.cy > height) p.dy *= -1;

    p.el.setAttribute("cx", p.cx);
    p.el.setAttribute("cy", p.cy);
  });

  lines.forEach(({ i, j, el }) => {
    const pi = particles[i];
    const pj = particles[j];
    const dx = pi.cx - pj.cx;
    const dy = pi.cy - pj.cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < maxDistance) {
      el.setAttribute("x1", pi.cx);
      el.setAttribute("y1", pi.cy);
      el.setAttribute("x2", pj.cx);
      el.setAttribute("y2", pj.cy);
      el.setAttribute("visibility", "visible");
    } else {
      el.setAttribute("visibility", "hidden");
    }
  });

  requestAnimationFrame(animate);
}

animate();