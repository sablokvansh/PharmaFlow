// 📁 src/GhostCursor.jsx
import React, { useEffect } from "react";
import "./GhostCursor.css";

export default function GhostCursor() {
  useEffect(() => {
    const cursor = document.createElement("div");
    cursor.classList.add("ghost-cursor");
    document.body.appendChild(cursor);

    const trailCount = 8; // Number of trailing circles
    const trails = [];

    for (let i = 0; i < trailCount; i++) {
      const trail = document.createElement("div");
      trail.classList.add("ghost-trail");
      document.body.appendChild(trail);
      trails.push(trail);
    }

    let mouseX = 0, mouseY = 0;
    const coords = Array(trailCount).fill({ x: 0, y: 0 });

    const moveCursor = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", moveCursor);

    const animate = () => {
      let x = mouseX;
      let y = mouseY;

      coords.forEach((coord, index) => {
        const next = coords[index + 1] || { x: x, y: y };
        coord.x += (next.x - coord.x) * 0.2;
        coord.y += (next.y - coord.y) * 0.2;

        trails[index].style.left = coord.x + "px";
        trails[index].style.top = coord.y + "px";
      });

      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.body.removeChild(cursor);
      trails.forEach((t) => t.remove());
    };
  }, []);

  return null; // Nothing to render inside React
}
