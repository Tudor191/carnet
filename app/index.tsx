import { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { useCarStore } from '../store/useCarStore';
import { Colors } from '../constants/colors';

export default function IndexScreen() {
  const { user, isLoading } = useCarStore();

  // Wait for the store to finish loading session from AsyncStorage
  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.primary }} />
    );
  }

  if (user) {
    return <Redirect href="/dashboard" />;
  }

  return <Redirect href="/home" />;
}
