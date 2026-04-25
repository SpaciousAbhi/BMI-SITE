import React from 'react';
import { motion } from 'framer-motion';

const BMIGauge = ({ bmi }) => {
  // Normalize BMI for the gauge (15 to 40+)
  const minBMI = 15;
  const maxBMI = 40;
  const clampedBMI = Math.min(Math.max(bmi, minBMI), maxBMI);
  
  // Calculate percentage (0 to 100)
  const percentage = ((clampedBMI - minBMI) / (maxBMI - minBMI)) * 100;
  
  // Needle rotation (from -90deg to 90deg for a semi-circle)
  const rotation = (percentage / 100) * 180 - 90;

  const segments = [
    { label: 'Under', end: 18.5, color: '#3b82f6', range: [15, 18.5] },
    { label: 'Healthy', end: 25, color: '#10b981', range: [18.5, 25] },
    { label: 'Over', end: 30, color: '#f59e0b', range: [25, 30] },
    { label: 'Obese', end: 40, color: '#ef4444', range: [30, 40] },
  ];

  return (
    <div className="relative w-full max-w-[400px] mx-auto pt-10 pb-4">
      {/* SVG Gauge */}
      <svg viewBox="0 0 200 120" className="w-full h-auto drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]">
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="15%" stopColor="#3b82f6" />
            <stop offset="25%" stopColor="#10b981" />
            <stop offset="45%" stopColor="#10b981" />
            <stop offset="60%" stopColor="#f59e0b" />
            <stop offset="75%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Background Track */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="#1e293b"
          strokeWidth="12"
          strokeLinecap="round"
        />

        {/* Colored Track */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth="12"
          strokeLinecap="round"
          className="opacity-90"
        />

        {/* Ticks and Labels */}
        {[18.5, 25, 30].map((val) => {
          const pos = ((val - minBMI) / (maxBMI - minBMI)) * 180;
          const rad = (pos - 180) * (Math.PI / 180);
          const x1 = 100 + 74 * Math.cos(rad);
          const y1 = 100 + 74 * Math.sin(rad);
          const x2 = 100 + 86 * Math.cos(rad);
          const y2 = 100 + 86 * Math.sin(rad);
          return (
            <line
              key={val}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="white"
              strokeWidth="1.5"
              strokeOpacity="0.4"
            />
          );
        })}

        {/* Value Indicators */}
        <text x="20" y="115" fontSize="8" fill="#64748b" textAnchor="middle" fontWeight="bold">15</text>
        <text x="100" y="15" fontSize="10" fill="#94a3b8" textAnchor="middle" fontWeight="black" className="uppercase tracking-widest">BMI SCALE</text>
        <text x="180" y="115" fontSize="8" fill="#64748b" textAnchor="middle" fontWeight="bold">40+</text>

        {/* Needle */}
        <motion.g
          initial={{ rotate: -90 }}
          animate={{ rotate: rotation }}
          transition={{ type: "spring", stiffness: 60, damping: 15 }}
          style={{ originX: "100px", originY: "100px" }}
        >
          <path
            d="M 100 100 L 100 35"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#glow)"
          />
          <circle cx="100" cy="100" r="6" fill="#030712" stroke="white" strokeWidth="2" />
        </motion.g>
      </svg>

      {/* Categories Bar Below */}
      <div className="flex justify-between mt-4 px-2">
        {segments.map((seg) => (
          <div key={seg.label} className="flex flex-col items-center gap-1">
            <div 
              className="w-2 h-2 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.2)]" 
              style={{ backgroundColor: seg.color }} 
            />
            <span className="text-[9px] font-black uppercase tracking-tighter text-slate-500">{seg.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BMIGauge;
