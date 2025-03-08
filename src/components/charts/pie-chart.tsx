"use client";

import { useEffect, useRef } from "react";

interface PieChartProps {
  data: {
    labels: string[];
    values: number[];
    colors: string[];
  };
  width?: number;
  height?: number;
}

export function PieChart({ data, width = 300, height = 300 }: PieChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) * 0.8;

    const total = data.values.reduce((sum, value) => sum + value, 0);
    let startAngle = 0;

    // Draw pie slices
    data.values.forEach((value, i) => {
      const sliceAngle = (value / total) * 2 * Math.PI;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
      ctx.closePath();

      ctx.fillStyle = data.colors[i];
      ctx.fill();

      // Draw percentage in the middle of the slice
      const percentage = Math.round((value / total) * 100);
      const midAngle = startAngle + sliceAngle / 2;
      const labelRadius = radius * 0.7;
      const labelX = centerX + labelRadius * Math.cos(midAngle);
      const labelY = centerY + labelRadius * Math.sin(midAngle);

      ctx.font = "bold 14px sans-serif";
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      if (percentage > 5) {
        // Only show percentage if slice is big enough
        ctx.fillText(`${percentage}%`, labelX, labelY);
      }

      startAngle += sliceAngle;
    });

    // Draw center circle (optional, for donut chart)
    // ctx.beginPath();
    // ctx.arc(centerX, centerY, radius * 0.5, 0, 2 * Math.PI);
    // ctx.fillStyle = "#fff";
    // ctx.fill();
  }, [data, width, height]);

  return <canvas ref={canvasRef} width={width} height={height} />;
}
