// Particles.jsx
import React, { useEffect, useRef } from "react";
import "./Particles.css";

const Particles = ({
  particleCount = 120,
  particleColors = ["#0dcaf0", "#00e0ff", "#ffffff"],
  particleBaseSize = 80,
  speed = 0.3,
  particleSpread = 10,
  moveParticlesOnHover = true,
}) => {
  const canvasRef = useRef(null);
  const particles = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const createParticles = () => {
      particles.current = [];
      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * particleBaseSize * 0.02 + 1;
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size,
          color: particleColors[Math.floor(Math.random() * particleColors.length)],
          dx: (Math.random() - 0.5) * speed * particleSpread,
          dy: (Math.random() - 0.5) * speed * particleSpread,
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.current.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.9;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
      });
    };

    const moveParticles = () => {
      particles.current.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
    };

    const animate = () => {
      drawParticles();
      moveParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    createParticles();
    animate();

    if (moveParticlesOnHover) {
      const handleMouseMove = (e) => {
        particles.current.forEach((p) => {
          const dx = p.x - e.clientX;
          const dy = p.y - e.clientY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            p.x += dx / dist;
            p.y += dy / dist;
          }
        });
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [particleCount, particleColors, particleBaseSize, speed, particleSpread, moveParticlesOnHover]);

  return <canvas ref={canvasRef} className="particles-canvas"></canvas>;
};

export default Particles;
