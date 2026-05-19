import React, { useEffect, useRef } from 'react';
import { Animated, TouchableOpacity, View, Text, StyleSheet } from 'react-native';

interface Props {
  isDark: boolean;
  onToggle: () => void;
}

export default function ThemeSwitch({ isDark, onToggle }: Props) {
  const thumbX = useRef(new Animated.Value(isDark ? 0 : 1)).current;

  useEffect(() => {
    Animated.spring(thumbX, {
      toValue: isDark ? 0 : 1,
      useNativeDriver: true,
      tension: 80,
      friction: 9,
    }).start();
  }, [isDark]);

  const translateX = thumbX.interpolate({ inputRange: [0, 1], outputRange: [2, 24] });

  return (
    <TouchableOpacity onPress={onToggle} activeOpacity={0.85}>
      <View
        style={[
          styles.track,
          {
            backgroundColor: isDark ? '#1A3060' : '#BFDBFE',
            borderColor: isDark ? '#2A4080' : '#93C5FD',
          },
        ]}
      >
        <Animated.View
          style={[
            styles.thumb,
            {
              backgroundColor: isDark ? '#4A6FA5' : '#2570FF',
              transform: [{ translateX }],
            },
          ]}
        >
          <Text style={styles.icon}>{isDark ? '🌙' : '☀️'}</Text>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  track: {
    width: 50,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    justifyContent: 'center',
    padding: 2,
  },
  thumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  icon: { fontSize: 11 },
});
