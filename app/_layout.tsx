import { useEffect, useRef, useState } from 'react';
import { Stack, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';
import { useCarStore } from '../store/useCarStore';
import LoadingScreen from '../components/LoadingScreen';
import Sidebar from '../components/Sidebar';

const LOADER_DURATION = 2000;

export default function RootLayout() {
  const loadCars = useCarStore(s => s.loadCars);
  const pathname = usePathname();

  const [showLoader, setShowLoader] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirst = useRef(true);

  useEffect(() => {
    if (!isFirst.current) {
      setShowLoader(true);
    }
    isFirst.current = false;

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setShowLoader(false), LOADER_DURATION);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [pathname]);

  useEffect(() => {
    loadCars();
  }, []);

  return (
    <View style={styles.root}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <View style={styles.appRow}>
          {/* Left sidebar — renders null on auth pages / narrow screens */}
          <Sidebar />

          {/* Main content */}
          <View style={styles.content}>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="login" />
              <Stack.Screen name="register" />
              <Stack.Screen name="home" />
              <Stack.Screen name="add-car" />
              <Stack.Screen name="car/[id]" />
            </Stack>
          </View>
        </View>
      </SafeAreaProvider>

      {/* Loading overlay — on top of everything */}
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
