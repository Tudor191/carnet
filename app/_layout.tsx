import { useEffect, useRef, useState } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Animated, StyleSheet, View } from 'react-native';
import { useCarStore } from '../store/useCarStore';
import { useThemeStore } from '../store/useThemeStore';
import { DARK, LIGHT } from '../constants/themes';
import LoadingScreen from '../components/LoadingScreen';
import Sidebar from '../components/Sidebar';

const LOADER_DURATION = 2000;
const PUBLIC_SEGMENTS = ['', 'login', 'register', 'index', 'home'];

export default function RootLayout() {
  const loadCars = useCarStore(s => s.loadCars);
  const user = useCarStore(s => s.user);
  const isLoading = useCarStore(s => s.isLoading);
  const [showLoader, setShowLoader] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();
  const segments = useSegments();
  const { theme, loadTheme } = useThemeStore();
  const colors = theme === 'dark' ? DARK : LIGHT;

  // Smooth fade transition when theme changes
  const appOpacity = useRef(new Animated.Value(1)).current;
  const isFirstMount = useRef(true);
  const prevTheme = useRef(theme);

  useEffect(() => {
    if (isFirstMount.current) { isFirstMount.current = false; return; }
    if (prevTheme.current === theme) return;
    prevTheme.current = theme;
    Animated.sequence([
      Animated.timing(appOpacity, { toValue: 0.1, duration: 130, useNativeDriver: true }),
      Animated.timing(appOpacity, { toValue: 1, duration: 420, useNativeDriver: true }),
    ]).start();
  }, [theme]);

  useEffect(() => {
    timerRef.current = setTimeout(() => setShowLoader(false), LOADER_DURATION);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  useEffect(() => {
    loadCars();
    loadTheme();
  }, []);

  useEffect(() => {
    if (isLoading) return;
    const currentSegment = (segments[0] as string) ?? '';
    const isPublic = PUBLIC_SEGMENTS.includes(currentSegment);
    if (!user && !isPublic) router.replace('/home');
  }, [user, isLoading, segments]);

  return (
    <View style={[styles.root, { backgroundColor: colors.bg }]}>
      <SafeAreaProvider>
        <StatusBar style={colors.statusBar} />
        <Animated.View style={[styles.appRow, { opacity: appOpacity }]}>
          {segments[0] !== 'home' && <Sidebar />}
          <View style={styles.content}>
            <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="login" />
              <Stack.Screen name="register" />
              <Stack.Screen name="home" />
              <Stack.Screen name="dashboard" />
              <Stack.Screen name="add-car" />
              <Stack.Screen name="premium" />
              <Stack.Screen name="car/[id]" />
            </Stack>
          </View>
        </Animated.View>
      </SafeAreaProvider>

      {showLoader && (
        <View style={StyleSheet.absoluteFill}>
          <LoadingScreen />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  appRow: { flex: 1, flexDirection: 'row' },
  content: { flex: 1 },
});
