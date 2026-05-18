import { useEffect, useRef, useState } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';
import { useCarStore } from '../store/useCarStore';
import LoadingScreen from '../components/LoadingScreen';
import Sidebar from '../components/Sidebar';

const LOADER_DURATION = 2000;
const AUTH_SEGMENTS = ['', 'login', 'register', 'index'];

export default function RootLayout() {
  const loadCars = useCarStore(s => s.loadCars);
  const user = useCarStore(s => s.user);
  const isLoading = useCarStore(s => s.isLoading);
  const [showLoader, setShowLoader] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();
  const segments = useSegments();

  // Show loader only on initial page load / refresh — not on navigation
  useEffect(() => {
    timerRef.current = setTimeout(() => setShowLoader(false), LOADER_DURATION);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    loadCars();
  }, []);

  // Redirect to login when session check completes and no user is found
  useEffect(() => {
    if (isLoading) return;
    const currentSegment = (segments[0] as string) ?? '';
    const onAuthScreen = AUTH_SEGMENTS.includes(currentSegment);
    if (!user && !onAuthScreen) {
      router.replace('/login');
    }
  }, [user, isLoading, segments]);

  return (
    <View style={styles.root}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <View style={styles.appRow}>
          <Sidebar />
          <View style={styles.content}>
            <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="login" />
              <Stack.Screen name="register" />
              <Stack.Screen name="home" />
              <Stack.Screen name="add-car" />
              <Stack.Screen name="premium" />
              <Stack.Screen name="car/[id]" />
            </Stack>
          </View>
        </View>
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
