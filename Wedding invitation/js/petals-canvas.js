/**
 * Interactive Flower Petals Canvas Engine
 * Simulates gentle watercolor rose and marigold petals drifting softly across the screen.
 */
class PetalsCanvasEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.petals = [];
    this.maxPetals = 28;
    this.isRunning = true;
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.colors = [
      { r: 239, g: 175, b: 163, a: 0.8 }, // Rose blush
      { r: 220, g: 120, b: 110, a: 0.75 }, // Deep rose
      { r: 254, g: 202, b: 87, a: 0.8 },  // Marigold yellow
      { r: 255, g: 159, b: 67, a: 0.8 },  // Marigold orange
      { r: 255, g: 242, b: 202, a: 0.6 }  // Gold sparkle
    ];

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize(), { passive: true });

    // Spawn initial petals
    for (let i = 0; i < this.maxPetals; i++) {
      this.petals.push(this.createPetal(true));
    }

    this.animate();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  createPetal(isInitial = false) {
    const color = this.colors[Math.floor(Math.random() * this.colors.length)];
    return {
      x: Math.random() * this.width,
      y: isInitial ? Math.random() * this.height : -20,
      size: 9 + Math.random() * 11,
      speedY: 0.7 + Math.random() * 1.3,
      speedX: (Math.random() - 0.5) * 0.8,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.025,
      tilt: Math.random() * Math.PI,
      tiltSpeed: 0.02 + Math.random() * 0.03,
      color: color,
      isSparkle: Math.random() < 0.2
    };
  }

  toggle() {
    this.isRunning = !this.isRunning;
    if (this.isRunning) {
      this.animate();
    } else {
      this.ctx.clearRect(0, 0, this.width, this.height);
    }
    return this.isRunning;
  }

  animate() {
    if (!this.isRunning) return;

    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = 0; i < this.petals.length; i++) {
      const p = this.petals[i];

      p.y += p.speedY;
      p.x += Math.sin(p.tilt) * 0.8 + p.speedX;
      p.rotation += p.rotationSpeed;
      p.tilt += p.tiltSpeed;

      // Wrap around screen
      if (p.y > this.height + 25 || p.x < -30 || p.x > this.width + 30) {
        this.petals[i] = this.createPetal(false);
        continue;
      }

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.rotation);
      this.ctx.scale(Math.cos(p.tilt), 1);

      if (p.isSparkle) {
        // Draw tiny golden star sparkle
        this.ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.color.a})`;
        this.ctx.beginPath();
        this.ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
        this.ctx.fill();
      } else {
        // Draw delicate curved flower petal
        this.ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.color.a})`;
        this.ctx.beginPath();
        this.ctx.moveTo(0, -p.size);
        this.ctx.bezierCurveTo(p.size * 0.7, -p.size * 0.5, p.size * 0.7, p.size * 0.5, 0, p.size);
        this.ctx.bezierCurveTo(-p.size * 0.7, p.size * 0.5, -p.size * 0.7, -p.size * 0.5, 0, -p.size);
        this.ctx.fill();
      }

      this.ctx.restore();
    }

    requestAnimationFrame(() => this.animate());
  }
}

window.PetalsCanvasEngine = PetalsCanvasEngine;
