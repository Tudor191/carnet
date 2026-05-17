import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { useCarStore } from '../store/useCarStore';

export default function RootLayout() {
  const loadCars = useCarStore(s => s.loadCars);

  useEffect(() => {
    loadCars();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="login" />
          <Stack.Screen name="home" />
          <Stack.Screen name="add-car" />
          <Stack.Screen name="car/[id]" />
        </Stack>
      </SafeAreaProvider>
    </View>
  );
}
