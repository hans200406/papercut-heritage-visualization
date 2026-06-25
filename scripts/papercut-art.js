let motifMode = 'petal';
let complexity = 7;
let artSeed = 12;

function setup() {
  const holder = document.getElementById('artCanvas');
  const size = Math.min(560, holder.parentElement.clientWidth * 0.92 || 560);
  const cnv = createCanvas(size, size);
  cnv.parent('artCanvas');
  pixelDensity(1);
  noLoop();
  bindControls();
}

function bindControls() {
  document.querySelectorAll('#motifButtons button').forEach(button => {
    if (button.dataset.bound === 'true') return;
    button.dataset.bound = 'true';
    button.addEventListener('click', () => {
      document.querySelectorAll('#motifButtons button').forEach(item => item.classList.remove('active'));
      button.classList.add('active');
      motifMode = button.dataset.motif;
      artSeed += 17;
      redraw();
    });
  });

  const slider = document.getElementById('complexitySlider');
  const label = document.getElementById('complexityValue');
  slider.addEventListener('input', () => {
    complexity = Number(slider.value);
    label.textContent = complexity;
    redraw();
  });
}

function draw() {
  randomSeed(artSeed);
  background('#fffaf2');
  drawPaperFibers();
  drawMotif();
}

function drawPaperFibers() {
  stroke(125, 20, 32, 18);
  strokeWeight(1);
  for (let i = 0; i < 90; i++) {
    const x = random(width);
    const y = random(height);
    line(x, y, x + random(-18, 18), y + random(-5, 5));
  }
}

function drawMotif() {
  push();
  translate(width / 2, height / 2);
  noStroke();
  fill('#b21f2d');

  radialSymmetry(complexity, () => {
    if (motifMode === 'petal') drawPetalMotif();
    if (motifMode === 'bird') drawBirdMotif();
    if (motifMode === 'auspicious') drawAuspiciousMotif();
  });

  drawCentralCutout();
  pop();
}

function radialSymmetry(count, drawUnit) {
  const angle = TWO_PI / count;
  for (let i = 0; i < count; i++) {
    push();
    rotate(i * angle);
    drawUnit();
    scale(1, -1);
    drawUnit();
    pop();
  }
}

function drawPetalMotif() {
  const outer = width * 0.38;
  const inner = width * 0.12;
  beginShape();
  vertex(inner, -18);
  bezierVertex(width * 0.22, -62, width * 0.34, -46, outer, 0);
  bezierVertex(width * 0.33, 34, width * 0.2, 46, inner, 18);
  endShape(CLOSE);

  fill('#fffaf2');
  ellipse(width * 0.24, 0, 28, 74);
  fill('#b21f2d');
}

function drawBirdMotif() {
  const bodyX = width * 0.18;
  ellipse(bodyX, 0, 94, 38);
  triangle(bodyX + 46, 0, bodyX + 88, -18, bodyX + 82, 14);
  arc(bodyX - 28, -8, 86, 78, PI * 1.05, PI * 1.82, PIE);

  fill('#fffaf2');
  ellipse(bodyX + 18, 0, 30, 12);
  ellipse(bodyX + 48, -5, 8, 8);
  fill('#b21f2d');
}

function drawAuspiciousMotif() {
  const r = width * 0.22;
  rectMode(CENTER);
  push();
  translate(r, 0);
  rotate(PI / 4);
  rect(0, 0, 70, 70, 4);
  pop();
  ellipse(r + 58, 0, 54, 28);

  fill('#fffaf2');
  push();
  translate(r, 0);
  rotate(PI / 4);
  rect(0, 0, 30, 30, 3);
  pop();
  fill('#b21f2d');
}

function drawCentralCutout() {
  fill('#fffaf2');
  ellipse(0, 0, width * 0.18, width * 0.18);
  fill('#b21f2d');
  ellipse(0, 0, width * 0.10, width * 0.10);
  fill('#fffaf2');
  ellipse(0, 0, width * 0.045, width * 0.045);
}

function windowResized() {
  const holder = document.getElementById('artCanvas');
  if (!holder) return;
  const size = Math.min(560, holder.parentElement.clientWidth * 0.92 || 560);
  resizeCanvas(size, size);
  redraw();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bindControls);
} else {
  bindControls();
}


