import React, { useMemo, useState, useRef } from 'react';
import { AnchorPoint } from '../contexts/GameContext';

export function LifeGraph({ anchorPoints, onPointClick, interactive = false, maxAge = 100, investorPoints = [], showLabels = true, revealProgress = 100 }: any) {
  const [hoveredPoint, setHoveredPoint] = useState<any>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const width = 800; const height = 400;
  const padding = { top: 40, right: 40, bottom: 50, left: 60 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const getX = (age: number) => (age / maxAge) * chartWidth + padding.left;
  const getY = (score: number) => ((100 - score) / 100) * chartHeight + padding.top;

  const getAgeAndScoreFromEvent = (e: any) => {
    if (!svgRef.current) return null;
    const rect = svgRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (width / rect.width);
    const y = (e.clientY - rect.top) * (height / rect.height);
    const age = Math.round(((x - padding.left) / chartWidth) * maxAge);
    const score = Math.round(100 - ((y - padding.top) / chartHeight) * 100);
    return { age: Math.max(0, Math.min(maxAge, age)), score: Math.max(0, Math.min(100, score)) };
  };

  const linePath = useMemo(() => {
    const sorted = [...anchorPoints].sort((a, b) => a.age - b.age);
    if (sorted.length < 2) return "";
    return sorted.reduce((path, point, i) => {
      const x = getX(point.age); const y = getY(point.score);
      return path + (i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`);
    }, "");
  }, [anchorPoints, maxAge]);

  return (
    <svg ref={svgRef} viewBox={`0 0 ${width} ${height}`} className="w-full h-full" onMouseMove={(e) => interactive && setHoveredPoint(getAgeAndScoreFromEvent(e))} onClick={(e) => interactive && onPointClick && onPointClick(getAgeAndScoreFromEvent(e)?.age, getAgeAndScoreFromEvent(e)?.score)}>
      <path d={linePath} fill="none" stroke="#16a34a" strokeWidth="3" />
      {anchorPoints.map((p: any, i: number) => <circle key={i} cx={getX(p.age)} cy={getY(p.score)} r="4" fill="white" stroke="#16a34a" />)}
    </svg>
  );
}
