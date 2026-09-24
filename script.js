document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation Toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector("nav ul");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
      if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove("active");
      }
    });
  }

  // Smooth Radial Glow Follower for Glass Cards
  const glowCards = document.querySelectorAll(".glass-card");
  glowCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });

  // Animated Progress Bars on Scroll
  const progressFills = document.querySelectorAll(".progress-fill");
  const animateProgress = () => {
    progressFills.forEach((fill) => {
      const targetWidth = fill.getAttribute("data-progress");
      const rect = fill.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        fill.style.width = targetWidth + "%";
      }
    });
  };

  window.addEventListener("scroll", animateProgress);
  animateProgress();

  // Number Counter Animation for Home Page Stats
  const statNumbers = document.querySelectorAll(".stat-number");
  statNumbers.forEach((stat) => {
    const target = parseInt(stat.getAttribute("data-target"));
    const duration = 2000; // 2 seconds duration
    const stepTime = 30;
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;

    const counter = setInterval(() => {
      current += increment;
      if (current >= target) {
        stat.textContent = target + "+";
        clearInterval(counter);
      } else {
        stat.textContent = Math.floor(current) + "+";
      }
    }, stepTime);
  });
});

// ==========================================================================
// INTERACTIVE CYBER MESH & CONSTELLATION ANIMATION
// ==========================================================================
const initCyberCanvas = () => {
  const canvas = document.getElementById("cyber-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width, height;
  let particles = [];

  const resize = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  };

  window.addEventListener("resize", resize);
  resize();

  // Create Node Particles
  const particleCount = Math.floor((width * height) / 18000);
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.8 + 1,
    });
  }

  // Animation Loop
  const animate = () => {
    ctx.clearRect(0, 0, width, height);

    // Draw and Update Nodes
    for (let i = 0; i < particles.length; i++) {
      let p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      // Render Node Dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 242, 254, 0.6)";
      ctx.fill();

      // Connect Nearby Nodes with Subtle Laser Lines
      for (let j = i + 1; j < particles.length; j++) {
        let p2 = particles[j];
        let dx = p.x - p2.x;
        let dy = p.y - p2.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(0, 242, 254, ${0.15 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  };

  animate();
};

// Initialize Canvas on DOM Load
document.addEventListener("DOMContentLoaded", initCyberCanvas);
