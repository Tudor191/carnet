import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../constants/colors';

const TRACK_WIDTH = 160;
const TOTAL_MS = 2000;

export default function LoadingScreen() {
  const [dots, setDots] = useState('');
  const startTimeRef = useRef(Date.now());
  const [fillWidth, setFillWidth] = useState(0);
  const scaleAnim = useRef(new Animated.Value(0.7)).current;
  const glowAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    startTimeRef.current = Date.now();
    const id = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      setFillWidth(Math.min(elapsed / TOTAL_MS, 1) * TRACK_WIDTH);
    }, 16);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setDots(d => (d.length >= 3 ? '' : d + '.'));
    }, 400);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    Animated.spring(scaleAnim, { toValue: 1, tension: 60, friction: 7, useNativeDriver: true }).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 1, duration: 1000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(glowAnim, { toValue: 0.4, duration: 1000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <LinearGradient
      colors={[Colors.primary, '#0D1F3C', Colors.secondary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.4, y: 1 }}
      style={styles.container}
    >
      <Animated.View style={[styles.iconWrap, { transform: [{ scale: scaleAnim }] }]}>
        <Animated.View style={[styles.glow, { opacity: glowAnim }]} />
        <View style={styles.iconCircle}>
          <Text style={styles.carEmoji}>🚗</Text>
        </View>
      </Animated.View>

      <Text style={styles.appName}>CarNet</Text>
      <Text style={styles.tagline}>Se încarcă{dots}</Text>

      <View style={styles.loadingBarTrack}>
        <View style={[styles.loadingBarFill, { width: fillWidth }]} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrap: {
    marginBottom: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glow: {
    position: 'absolute',
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: Colors.accent,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  carEmoji: {
    fontSize: 44,
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
    marginTop: 6,
  },
  loadingBarTrack: {
    width: TRACK_WIDTH,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    marginTop: 20,
    overflow: 'hidden',
  },
  loadingBarFill: {
    height: 4,
    backgroundColor: Colors.accent,
    borderRadius: 2,
  },
});
