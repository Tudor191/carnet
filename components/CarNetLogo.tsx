import React from 'react';
import Svg, { Rect, Path, Circle, G } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

export default function CarNetLogo({ size = 80, color = '#FFFFFF' }: Props) {
  const s = size;
  const scale = s / 100;

  return (
    <Svg width={s} height={s} viewBox="0 0 100 100">
      {/* Notebook body */}
      <Rect x="15" y="10" width="65" height="80" rx="8" ry="8" fill={color} opacity={0.15} />
      <Rect x="18" y="10" width="62" height="80" rx="7" ry="7" fill={color} opacity={0.9} />

      {/* Spiral binding */}
      {[20, 30, 40, 50, 60, 70, 80].map((y, i) => (
        <Circle key={i} cx="15" cy={y} r="3" fill={color} opacity={0.6} />
      ))}

      {/* Notebook lines */}
      <Path d="M27 28 H73" stroke={color} strokeWidth="1.5" opacity={0.3} />
      <Path d="M27 35 H73" stroke={color} strokeWidth="1.5" opacity={0.3} />

      {/* Car silhouette */}
      {/* Car body */}
      <Path
        d="M28 62 L30 54 L36 49 L54 49 L62 54 L67 62 Z"
        fill={color === '#FFFFFF' ? '#3B82F6' : color}
        opacity={0.85}
      />
      {/* Car roof */}
      <Path
        d="M34 54 L37 46 L55 46 L60 54 Z"
        fill={color === '#FFFFFF' ? '#1E40AF' : color}
        opacity={0.9}
      />
      {/* Windows */}
      <Path d="M37 54 L39 48 H52 L55 54 Z" fill={color} opacity={0.4} />
      {/* Wheels */}
      <Circle cx="36" cy="63" r="5" fill={color === '#FFFFFF' ? '#1E3A5F' : '#333'} />
      <Circle cx="36" cy="63" r="2.5" fill={color} opacity={0.5} />
      <Circle cx="59" cy="63" r="5" fill={color === '#FFFFFF' ? '#1E3A5F' : '#333'} />
      <Circle cx="59" cy="63" r="2.5" fill={color} opacity={0.5} />
      {/* Bumpers */}
      <Path d="M25 62 H70" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity={0.6} />

      {/* "CN" text bottom */}
      <Path
        d="M33 82 L33 77 L37 82 L37 77 M40 77 C38 77 38 82 40 82 C42 82 42 77 40 82"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        opacity={0.7}
        strokeLinecap="round"
      />
    </Svg>
  );
}
