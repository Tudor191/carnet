import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { G, Rect, Circle, Path, Line } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../constants/colors';

const { width: W } = Dimensions.get('window');
const SVG_W = Math.min(W * 0.72, 300);
const SVG_H = SVG_W * 0.8;

// ── Wheel component with animated spokes ──────────────────────────────────────
function Wheel({ cx, cy, r, rotation }: { cx: number; cy: number; r: number; rotation: number }) {
  const spokeDeg = rotation % 360;
  // 4 spokes at 90° intervals, drawn as 2 crossing lines
  const toRad = (d: number) => (d * Math.PI) / 180;
  const spokes = [0, 45].map(offset => {
    const a1 = toRad(spokeDeg + offset);
    const a2 = toRad(spokeDeg + offset + 180);
    return {
      x1: cx + Math.cos(a1) * r,
      y1: cy + Math.sin(a1) * r,
      x2: cx + Math.cos(a2) * r,
      y2: cy + Math.sin(a2) * r,
    };
  });

  return (
    <G>
      {/* Tire */}
      <Circle cx={cx} cy={cy} r={r} fill="#1E293B" />
      {/* Spokes */}
      {spokes.map((s, i) => (
        <Line
          key={i}
          x1={s.x1} y1={s.y1}
          x2={s.x2} y2={s.y2}
          stroke="#94A3B8"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
      ))}
      {/* Hub */}
      <Circle cx={cx} cy={cy} r={r * 0.28} fill="#64748B" />
      <Circle cx={cx} cy={cy} r={r * 0.12} fill="#CBD5E1" />
    </G>
  );
}

// ── Road dash component ───────────────────────────────────────────────────────
function RoadDashes({ offset, y, viewWidth }: { offset: number; y: number; viewWidth: number }) {
  const dashW = 28;
  const gap = 18;
  const step = dashW + gap;
  const dashes = [];
  // Enough dashes to fill the view + one extra on each side for seamless loop
  for (let x = -step + (offset % step); x < viewWidth + step; x += step) {
    dashes.push(
      <Rect key={x} x={x} y={y} width={dashW} height={3} rx={1.5} fill="#334155" opacity={0.8} />
    );
  }
  return <G>{dashes}</G>;
}

// ── Main Loading Screen ───────────────────────────────────────────────────────
export default function LoadingScreen() {
  const [tick, setTick] = useState(0);
  const [dots, setDots] = useState('');
  const startTime = useRef(Date.now());

  useEffect(() => {
    // Reset start time every time the component mounts
    startTime.current = Date.now();
    // Animation loop ~60fps
    const id = setInterval(() => setTick(t => t + 1), 16);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    // Loading dots cycle
    const id = setInterval(() => {
      setDots(d => (d.length >= 3 ? '' : d + '.'));
    }, 400);
    return () => clearInterval(id);
  }, []);

  // Animation values derived from tick
  const wheelDeg = (tick * 4) % 360;           // wheel rotation speed
  const roadOffset = (tick * 1.8) % (28 + 18); // road dash scroll speed
  const bobY = Math.sin(tick * 0.18) * 1.2;    // subtle car body bob

  // Progress bar: linear 0→100% over 2000ms
  const TOTAL_MS = 2000;
  const elapsed = Date.now() - startTime.current;
  const progress = Math.min(elapsed / TOTAL_MS, 1) * 100;

  // ── SVG coordinate constants ─────────────────────────────────────────────
  const VW = 200;  // viewBox width
  const VH = 160;  // viewBox height

  // Notebook
  const NB = { x: 14, y: 8, w: 172, h: 145, rx: 14 };
  const COVER_H = 22;

  // Car (centered in notebook content area)
  const WR = 13;       // wheel radius
  const LWX = 58;      // left wheel X
  const RWX = 142;     // right wheel X
  const WY = 103;      // wheel center Y  (road surface)

  // Car body & roof offset by bobY for the driving feel
  const carBob = bobY;

  return (
    <LinearGradient
      colors={[Colors.primary, '#0D1F3C', Colors.secondary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.4, y: 1 }}
      style={styles.container}
    >
      {/* Animated SVG */}
      <Svg
        width={SVG_W}
        height={SVG_H}
        viewBox={`0 0 ${VW} ${VH}`}
        style={styles.svg}
      >
        {/* ── Notebook shadow ── */}
        <Rect
          x={NB.x + 4} y={NB.y + 4}
          width={NB.w} height={NB.h}
          rx={NB.rx}
          fill="#000" opacity={0.3}
        />

        {/* ── Notebook body ── */}
        <Rect
          x={NB.x} y={NB.y}
          width={NB.w} height={NB.h}
          rx={NB.rx}
          fill="#F8FAFC"
        />

        {/* ── Notebook cover (top bar) ── */}
        <Rect
          x={NB.x} y={NB.y}
          width={NB.w} height={COVER_H}
          rx={NB.rx}
          fill={Colors.secondary}
        />
        <Rect
          x={NB.x} y={NB.y + NB.rx}
          width={NB.w} height={COVER_H - NB.rx}
          fill={Colors.secondary}
        />

        {/* ── Spiral binding ── */}
        {[18, 30, 42, 54, 66, 78, 90, 102, 114, 126, 138].map((y) => (
          <G key={y}>
            <Circle cx={NB.x} cy={y} r={5} fill={Colors.primary} />
            <Circle cx={NB.x} cy={y} r={2.8} fill={Colors.accent} opacity={0.6} />
          </G>
        ))}

        {/* ── Notebook lines — above car ── */}
        <Rect x={NB.x + 14} y={35} width={NB.w - 22} height={2} rx={1} fill={Colors.gray200} opacity={0.7} />
        <Rect x={NB.x + 14} y={42} width={NB.w - 22} height={2} rx={1} fill={Colors.gray200} opacity={0.7} />
        <Rect x={NB.x + 14} y={49} width={NB.w - 22} height={2} rx={1} fill={Colors.gray200} opacity={0.7} />

        {/* ── Road surface (clipped to notebook) ── */}
        <Rect
          x={NB.x + 1} y={WY + WR}
          width={NB.w - 2} height={18}
          fill="#1E293B" opacity={0.9}
        />
        {/* Road dashes (animated, clipped inside notebook bounds) */}
        <RoadDashes offset={roadOffset} y={WY + WR + 6} viewWidth={VW} />

        {/* ── Notebook lines — below road ── */}
        <Rect x={NB.x + 14} y={130} width={NB.w - 22} height={2} rx={1} fill={Colors.gray200} opacity={0.7} />
        <Rect x={NB.x + 14} y={137} width={NB.w - 22} height={2} rx={1} fill={Colors.gray200} opacity={0.7} />
        <Rect x={NB.x + 14} y={144} width={NB.w - 22} height={2} rx={1} fill={Colors.gray200} opacity={0.4} />

        {/* ── Car body (bobs slightly) ── */}
        <G y={carBob}>
          {/* Car undercarriage / body */}
          <Path
            d={`M${LWX - 26} ${WY} L${LWX - 18} ${WY - 16} L${LWX + 4} ${WY - 22} L${RWX - 4} ${WY - 22} L${RWX + 18} ${WY - 16} L${RWX + 26} ${WY} Z`}
            fill={Colors.secondary}
          />
          {/* Car roof */}
          <Path
            d={`M${LWX - 4} ${WY - 22} L${LWX + 6} ${WY - 38} L${RWX - 6} ${WY - 38} L${RWX + 4} ${WY - 22} Z`}
            fill={Colors.primary}
          />
          {/* Left window */}
          <Path
            d={`M${LWX - 2} ${WY - 22} L${LWX + 5} ${WY - 36} H${100} V${WY - 22} Z`}
            fill={Colors.accentLight}
            opacity={0.5}
          />
          {/* Right window */}
          <Path
            d={`M${102} ${WY - 36} H${RWX - 5} L${RWX + 2} ${WY - 22} H${102} Z`}
            fill={Colors.accentLight}
            opacity={0.5}
          />
          {/* Window divider */}
          <Line
            x1={100} y1={WY - 36}
            x2={100} y2={WY - 22}
            stroke={Colors.primary} strokeWidth={1.5}
          />
          {/* Headlight */}
          <Rect
            x={RWX + 18} y={WY - 12}
            width={8} height={5}
            rx={2}
            fill="#FCD34D"
            opacity={0.9}
          />
          {/* Taillight */}
          <Rect
            x={LWX - 27} y={WY - 12}
            width={6} height={5}
            rx={2}
            fill="#EF4444"
            opacity={0.8}
          />
        </G>

        {/* ── Wheels (outside car body group, so bob doesn't affect them) ── */}
        <Wheel cx={LWX} cy={WY} r={WR} rotation={wheelDeg} />
        <Wheel cx={RWX} cy={WY} r={WR} rotation={wheelDeg} />
      </Svg>

      {/* App name */}
      <Text style={styles.appName}>CarNet</Text>
      <Text style={styles.tagline}>Se încarcă{dots}</Text>

      {/* Loading bar */}
      <View style={styles.loadingBarTrack}>
        <View
          style={[styles.loadingBarFill, { width: `${progress}%` }]}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  svg: {
    marginBottom: 8,
  },
  appName: {
    color: Colors.white,
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: 3,
  },
  tagline: {
    color: Colors.accentLight,
    fontSize: 14,
    letterSpacing: 1,
    minWidth: 100,
    textAlign: 'center',
  },
  loadingBarTrack: {
    width: 160,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    marginTop: 16,
    overflow: 'hidden',
  },
  loadingBarFill: {
    height: '100%',
    backgroundColor: Colors.accent,
    borderRadius: 2,
  },
});
