
// ===================================
// 1. TYPING ANIMATION
// ===================================

const typingElement = document.getElementById("typing");

const roles = [
    "Aspiring Embedded Systems Engineer",
    "Embedded Software Enthusiast",
    "Embedded Hardware Enthusiast",
    "IoT Enthusiast"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    if (!typingElement) return;

    const currentRole = roles[roleIndex];

    typingElement.textContent = currentRole.substring(0, charIndex);

    if (!deleting && charIndex < currentRole.length) {
        charIndex++;
        setTimeout(typeEffect, 90);
    } else if (deleting && charIndex > 0) {
        charIndex--;
        setTimeout(typeEffect, 45);
    } else {
        deleting = !deleting;

        if (!deleting) {
            roleIndex = (roleIndex + 1) % roles.length;
        }

        setTimeout(typeEffect, 800);
    }
}

typeEffect();


// ===================================
// 2. CONNECTED PARTICLE BACKGROUND
// ===================================

const canvas = document.getElementById("particles");
const ctx = canvas ? canvas.getContext("2d") : null;

if (canvas && ctx) {

    let particles = [];
    let width = 0;
    let height = 0;

    const particleCount = 65;
    const connectionDistance = 130;

    function resizeCanvas() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        width = window.innerWidth;
        height = window.innerHeight;

        canvas.width = width * dpr;
        canvas.height = height * dpr;

        canvas.style.width = width + "px";
        canvas.style.height = height + "px";

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.radius = Math.random() * 2 + 1;

            this.speedX = (Math.random() - 0.5) * 0.7;
            this.speedY = (Math.random() - 0.5) * 0.7;
        }

        move() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > width) {
                this.speedX *= -1;
            }

            if (this.y < 0 || this.y > height) {
                this.speedY *= -1;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

            ctx.fillStyle = "#00d9ff";
            ctx.shadowBlur = 12;
            ctx.shadowColor = "#00d9ff";

            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    function createParticles() {
        particles = [];

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {

                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;

                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    const opacity = 1 - distance / connectionDistance;

                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);

                    ctx.strokeStyle = `rgba(0, 217, 255, ${opacity * 0.35})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach(particle => {
            particle.move();
            particle.draw();
        });

        connectParticles();

        requestAnimationFrame(animateParticles);
    }

    resizeCanvas();
    createParticles();
    animateParticles();

    window.addEventListener("resize", () => {
        resizeCanvas();
        createParticles();
    });
}


// ===================================
// 3. SCROLL REVEAL ANIMATION
// ===================================

const revealElements = document.querySelectorAll(
    ".section-title, .about-card, .skill-card, .project-card, .experience-card, .certification-card, .education-stats"
);

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.12
    });

    revealElements.forEach(element => {
        element.classList.add("reveal");
        observer.observe(element);
    });

} else {
    revealElements.forEach(element => {
        element.classList.add("show");
    });
}


