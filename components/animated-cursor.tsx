"use client";

import { useEffect, useState } from "react";

export function AnimatedCursor() {
  const [cursors, setCursors] = useState([
    { id: 1, x: 20, y: 30 },
    { id: 2, x: 70, y: 60 },
    { id: 3, x: 45, y: 45 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursors((prev) =>
        prev.map((cursor) => ({
          ...cursor,
          x: Math.random() * 80 + 10,
          y: Math.random() * 70 + 15,
        }))
      );
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {cursors.map((cursor) => (
        <div
          key={cursor.id}
          className="absolute transition-all duration-700 ease-out"
          style={{
            left: `${cursor.x}%`,
            top: `${cursor.y}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* Cursor SVG with pink gradient outline */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-lg"
            style={{
              filter: "drop-shadow(0 0 8px rgba(255, 182, 193, 0.6))",
            }}
          >
            <defs>
              <linearGradient id={`pinkGradient-${cursor.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fff" />
                <stop offset="50%" stopColor="#ffc0cb" />
                <stop offset="100%" stopColor="#ff69b4" />
              </linearGradient>
            </defs>
            <path
              d="M4 4L10.5 20L13 13L20 10.5L4 4Z"
              fill="white"
              stroke={`url(#pinkGradient-${cursor.id})`}
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
          {/* Glow trail */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full opacity-30"
            style={{
              background: "radial-gradient(circle, rgba(255,182,193,0.5) 0%, transparent 70%)",
            }}
          />
        </div>
      ))}
    </div>
  );
}
