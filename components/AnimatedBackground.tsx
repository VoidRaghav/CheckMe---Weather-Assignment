"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Props {
  particle: string;
  accent: string;
}

function RainCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const drops: { x: number; y: number; speed: number; length: number; opacity: number }[] = Array.from(
      { length: 120 },
      () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 8 + Math.random() * 8,
        length: 15 + Math.random() * 20,
        opacity: 0.1 + Math.random() * 0.3,
      })
    );

    let frame: number;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drops.forEach((d) => {
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - 1, d.y + d.length);
        ctx.strokeStyle = `rgba(147, 210, 255, ${d.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        d.y += d.speed;
        if (d.y > canvas.height) {
          d.y = -d.length;
          d.x = Math.random() * canvas.width;
        }
      });
      frame = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(frame);
  }, []);

  return <canvas ref={ref} className="absolute inset-0 pointer-events-none" />;
}

function SnowCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const flakes = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 1 + Math.random() * 3,
      speed: 0.5 + Math.random() * 1.5,
      drift: (Math.random() - 0.5) * 0.5,
      opacity: 0.3 + Math.random() * 0.5,
    }));

    let frame: number;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      flakes.forEach((f) => {
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${f.opacity})`;
        ctx.fill();
        f.y += f.speed;
        f.x += f.drift;
        if (f.y > canvas.height) {
          f.y = -f.r;
          f.x = Math.random() * canvas.width;
        }
      });
      frame = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(frame);
  }, []);

  return <canvas ref={ref} className="absolute inset-0 pointer-events-none" />;
}

function StarsCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5,
      phase: Math.random() * Math.PI * 2,
    }));

    let frame: number;
    let t = 0;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        const opacity = 0.4 + 0.4 * Math.sin(t * 0.02 + s.phase);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${opacity})`;
        ctx.fill();
      });
      t++;
      frame = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(frame);
  }, []);

  return <canvas ref={ref} className="absolute inset-0 pointer-events-none" />;
}

export default function AnimatedBackground({ particle, accent }: Props) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {particle === "aurora" && (
          <>
            <motion.div
              className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-20"
              style={{ background: accent, top: "-10%", left: "10%" }}
              animate={{ x: [0, 80, 0], y: [0, 40, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-15"
              style={{ background: "#7c3aed", bottom: "10%", right: "5%" }}
              animate={{ x: [0, -60, 0], y: [0, -30, 0], scale: [1, 0.9, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
          </>
        )}
        {particle === "sun" && (
          <>
            <motion.div
              className="absolute w-[500px] h-[500px] rounded-full blur-[130px] opacity-25"
              style={{ background: "#fbbf24", top: "-15%", right: "0%" }}
              animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.3, 0.2] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute w-[300px] h-[300px] rounded-full blur-[80px] opacity-15"
              style={{ background: "#f97316", bottom: "20%", left: "10%" }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
          </>
        )}
        {particle === "cloud" && (
          <>
            <motion.div
              className="absolute w-[700px] h-[200px] rounded-full blur-[80px] opacity-10"
              style={{ background: "#93c5fd", top: "20%", left: "-10%" }}
              animate={{ x: [0, 100, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute w-[500px] h-[150px] rounded-full blur-[60px] opacity-10"
              style={{ background: "#bfdbfe", top: "40%", right: "-5%" }}
              animate={{ x: [0, -80, 0] }}
              transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            />
          </>
        )}
        {particle === "lightning" && (
          <motion.div
            className="absolute w-[800px] h-[800px] rounded-full blur-[150px] opacity-10"
            style={{ background: "#f59e0b", top: "-30%", left: "20%" }}
            animate={{ opacity: [0.05, 0.2, 0.05, 0.15, 0.05] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </motion.div>
      {particle === "rain" && <RainCanvas />}
      {particle === "snow" && <SnowCanvas />}
      {particle === "star" && <StarsCanvas />}
    </div>
  );
}
