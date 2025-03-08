"use client";

import { useEffect, useRef } from "react";

interface RadarChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
    }[];
  };
  width?: number;
  height?: number;
}

export function RadarChart({
  data,
  width = 300,
  height = 300,
}: RadarChartProps) {
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

    const numPoints = data.labels.length;
    const angleStep = (Math.PI * 2) / numPoints;

    // Draw background grid
    ctx.strokeStyle = "rgba(200, 200, 200, 0.3)";
    ctx.fillStyle = "rgba(200, 200, 200, 0.1)";

    for (let level = 5; level > 0; level--) {
      const levelRadius = (radius * level) / 5;

      ctx.beginPath();
      for (let i = 0; i < numPoints; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const x = centerX + levelRadius * Math.cos(angle);
        const y = centerY + levelRadius * Math.sin(angle);

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
    }

    // Draw axis lines
    ctx.strokeStyle = "rgba(200, 200, 200, 0.5)";
    ctx.beginPath();
    for (let i = 0; i < numPoints; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);

      // Draw labels
      const labelX = centerX + (radius + 20) * Math.cos(angle);
      const labelY = centerY + (radius + 20) * Math.sin(angle);

      ctx.font = "12px sans-serif";
      ctx.fillStyle = "#666";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(data.labels[i], labelX, labelY);
    }
    ctx.stroke();

    // Draw data
    data.datasets.forEach((dataset) => {
      const points: [number, number][] = [];

      // Draw data points
      for (let i = 0; i < numPoints; i++) {
        const value = dataset.data[i] / 100; // Normalize to 0-1
        const angle = i * angleStep - Math.PI / 2;
        const x = centerX + radius * value * Math.cos(angle);
        const y = centerY + radius * value * Math.sin(angle);
        points.push([x, y]);
      }

      // Draw filled area
      ctx.beginPath();
      points.forEach(([x, y], i) => {
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.closePath();
      ctx.fillStyle = dataset.backgroundColor;
      ctx.fill();

      // Draw border
      ctx.beginPath();
      points.forEach(([x, y], i) => {
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.closePath();
      ctx.strokeStyle = dataset.borderColor;
      ctx.lineWidth = dataset.borderWidth;
      ctx.stroke();

      // Draw points
      points.forEach(([x, y]) => {
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = dataset.borderColor;
        ctx.fill();
      });
    });
  }, [data, width, height]);

  return <canvas ref={canvasRef} width={width} height={height} />;
}
