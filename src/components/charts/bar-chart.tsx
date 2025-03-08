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

    // Set canvas dimensions
    canvasRef.current.width = width;
    canvasRef.current.height = height;

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
    data.datasets.forEach((dataset, datasetIndex) => {
      const datasetOffset =
        (datasetIndex - (data.datasets.length - 1) / 2) * (barWidth / 1.5);

      dataset.data.forEach((value, i) => {
        const barHeight = (value / maxValue) * chartHeight;
        const x = padding + (i + 0.5) * (chartWidth / barCount) + datasetOffset;
        const y = height - padding - barHeight;

        // Draw bar
        ctx.fillStyle = dataset.backgroundColor[i] || "#0066FF";
        ctx.fillRect(x - barWidth / 2, y, barWidth, barHeight);

        // Only draw labels for the first dataset
        if (datasetIndex === 0) {
          // Draw label
          ctx.fillStyle = "#666";
          ctx.textAlign = "center";
          ctx.textBaseline = "top";
          ctx.fillText(
            data.labels[i],
            padding + (i + 0.5) * (chartWidth / barCount),
            height - padding + 5,
          );
        }

        // Draw value
        ctx.textBaseline = "bottom";
        ctx.fillText(value.toString(), x, y - 5);
      });
    });

    // Draw legend - responsive positioning
    const legendY = padding / 2;
    let legendX = padding;
    const availableWidth = width - padding * 2;

    // Calculate total width needed for legend
    let totalLegendWidth = 0;
    data.datasets.forEach((dataset, i) => {
      const colorBox = 10;
      ctx.font = "10px sans-serif";
      const textWidth = ctx.measureText(dataset.label).width;
      totalLegendWidth += textWidth + colorBox + 20;
    });

    // Adjust starting position if legend would overflow
    if (totalLegendWidth > availableWidth) {
      legendX = Math.max(padding, (width - totalLegendWidth) / 2);
    }

    data.datasets.forEach((dataset, i) => {
      const colorBox = 10;
      ctx.fillStyle = dataset.backgroundColor[0];
      ctx.fillRect(legendX, legendY - colorBox / 2, colorBox, colorBox);

      ctx.fillStyle = "#666";
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.font = "10px sans-serif";
      ctx.fillText(dataset.label, legendX + colorBox + 5, legendY);

      legendX += ctx.measureText(dataset.label).width + colorBox + 20;
    });
  }, [data, width, height]);

  return <canvas ref={canvasRef} width={width} height={height} />;
}
