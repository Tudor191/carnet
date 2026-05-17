import { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import { useCarStore } from '../store/useCarStore';
import LoadingScreen from '../components/LoadingScreen';

export default function IndexScreen() {
  const { user, isLoading, loadCars } = useCarStore();
  // Show loading for at least 2s so the animation is visible
  const [minTimePassed, setMinTimePassed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMinTimePassed(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!minTimePassed || isLoading) {
    return <LoadingScreen />;
  }

  if (user) {
    return <Redirect href="/home" />;
  }

  return <Redirect href="/login" />;
}
