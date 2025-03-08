"use client";

import { useEffect, useRef } from "react";

interface BarChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
    }[];
  };
  width?: number;
  height?: number;
}

export function BarChart({ data, width = 300, height = 200 }: BarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const barCount = data.labels.length;
    const barWidth = chartWidth / barCount / 1.5;
    const maxValue = Math.max(...data.datasets[0].data);

    // Draw axes
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.strokeStyle = "#ccc";
    ctx.stroke();

    // Draw horizontal grid lines
    const gridCount = 5;
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    ctx.font = "10px sans-serif";
    ctx.fillStyle = "#666";

    for (let i = 0; i <= gridCount; i++) {
      const y = height - padding - (i / gridCount) * chartHeight;
      const value = Math.round((i / gridCount) * maxValue);

      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.strokeStyle = "rgba(200, 200, 200, 0.3)";
      ctx.stroke();

      ctx.fillText(value.toString(), padding - 5, y);
    }

    // Draw bars and labels
    data.datasets[0].data.forEach((value, i) => {
      const barHeight = (value / maxValue) * chartHeight;
      const x = padding + (i + 0.5) * (chartWidth / barCount);
      const y = height - padding - barHeight;

      // Draw bar
      ctx.fillStyle = data.datasets[0].backgroundColor[i] || "#0066FF";
      ctx.fillRect(x - barWidth / 2, y, barWidth, barHeight);

      // Draw label
      ctx.fillStyle = "#666";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText(data.labels[i], x, height - padding + 5);

      // Draw value
      ctx.textBaseline = "bottom";
      ctx.fillText(value.toString(), x, y - 5);
    });
  }, [data, width, height]);

  return <canvas ref={canvasRef} width={width} height={height} />;
}
