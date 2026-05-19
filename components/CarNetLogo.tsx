import React from 'react';
import Svg, { Rect, Path, Circle } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

export default function CarNetLogo({ size = 80, color = '#FFFFFF' }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* Notebook shadow */}
      <Rect x="16" y="11" width="62" height="80" rx="8" fill="#000" opacity={0.2} />
      {/* Notebook body */}
      <Rect x="15" y="10" width="62" height="80" rx="8" fill={color} opacity={0.9} />
      {/* Notebook cover (top bar) */}
      <Rect x="15" y="10" width="62" height="16" rx="8" fill={color} opacity={0.3} />
      <Rect x="15" y="18" width="62" height="8" fill={color} opacity={0.3} />

      {/* Spiral binding */}
      {[18, 30, 42, 54, 66, 78].map((y, i) => (
        <Circle key={i} cx="15" cy={y} r="3.5" fill={color} opacity={0.5} />
      ))}
      {[18, 30, 42, 54, 66, 78].map((y, i) => (
        <Circle key={i} cx="15" cy={y} r="1.8" fill={color} opacity={0.8} />
      ))}

      {/* Notebook lines — above car */}
      <Path d="M24 30 H70" stroke={color} strokeWidth="1.5" opacity={0.25} />
      <Path d="M24 36 H70" stroke={color} strokeWidth="1.5" opacity={0.25} />

      {/* ── Car centered in notebook ── */}
      {/* Car body */}
      <Path
        d="M22 58 L25 48 L33 42 L60 42 L68 48 L72 58 Z"
        fill={color === '#FFFFFF' ? '#3B82F6' : color}
        opacity={0.9}
      />
      {/* Car roof */}
      <Path
        d="M30 48 L34 38 L58 38 L64 48 Z"
        fill={color === '#FFFFFF' ? '#1E40AF' : color}
        opacity={0.95}
      />
      {/* Left window */}
      <Path d="M32 48 L35 40 H48 V48 Z" fill={color} opacity={0.4} />
      {/* Right window */}
      <Path d="M50 40 H57 L62 48 H50 Z" fill={color} opacity={0.4} />
      {/* Left wheel */}
      <Circle cx="33" cy="59" r="6" fill={color === '#FFFFFF' ? '#1E3A5F' : '#333'} opacity={0.9} />
      <Circle cx="33" cy="59" r="3" fill={color} opacity={0.5} />
      {/* Right wheel */}
      <Circle cx="61" cy="59" r="6" fill={color === '#FFFFFF' ? '#1E3A5F' : '#333'} opacity={0.9} />
      <Circle cx="61" cy="59" r="3" fill={color} opacity={0.5} />
      {/* Bumper */}
      <Path d="M19 58 H75" stroke={color} strokeWidth="2" opacity={0.6} />

      {/* Notebook lines — below car */}
      <Path d="M24 72 H70" stroke={color} strokeWidth="1.5" opacity={0.25} />
      <Path d="M24 78 H70" stroke={color} strokeWidth="1.5" opacity={0.25} />
    </Svg>
  );
}
