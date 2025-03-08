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

    // Set canvas dimensions to match the container
    canvasRef.current.width = width;
    canvasRef.current.height = height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) * 0.65; // Further reduced to prevent text overflow

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

      // Draw labels with better positioning
      const labelDistance = radius + 35; // Further increased distance for labels
      const labelX = centerX + labelDistance * Math.cos(angle);
      const labelY = centerY + labelDistance * Math.sin(angle);

      ctx.font = "12px sans-serif";
      ctx.fillStyle = "#666";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Adjust label position based on angle to prevent distortion
      let adjustedLabelX = labelX;
      let adjustedLabelY = labelY;

      // Adjust horizontal alignment for labels on far left/right
      if (angle < -Math.PI * 0.25 && angle > -Math.PI * 0.75) {
        ctx.textAlign = "right";
        adjustedLabelX -= 5;
      } else if (angle > Math.PI * 0.25 && angle < Math.PI * 0.75) {
        ctx.textAlign = "left";
        adjustedLabelX += 5;
      }

      // Adjust vertical alignment for labels on top/bottom
      if (angle > -Math.PI * 0.25 && angle < Math.PI * 0.25) {
        ctx.textBaseline = "top";
        adjustedLabelY += 5;
      } else if (angle > Math.PI * 0.75 || angle < -Math.PI * 0.75) {
        ctx.textBaseline = "bottom";
        adjustedLabelY -= 5;
      }

      ctx.fillText(data.labels[i], adjustedLabelX, adjustedLabelY);
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
