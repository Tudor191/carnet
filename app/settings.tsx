import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useThemeStore } from '../store/useThemeStore';
import { DARK, LIGHT } from '../constants/themes';

export default function SettingsScreen() {
  const { theme } = useThemeStore();
  const tc = theme === 'dark' ? DARK : LIGHT;

  return (
    <View style={[s.root, { backgroundColor: tc.bg }]}>
      <SafeAreaView style={s.safe} edges={['top']}>
        <View style={[s.header, { backgroundColor: tc.navBg, borderBottomColor: tc.navBorder }]}>
          <TouchableOpacity
            style={[s.backBtn, { backgroundColor: tc.card, borderColor: tc.border }]}
            onPress={() => router.back()}
          >
            <Text style={[s.backIcon, { color: tc.text }]}>←</Text>
          </TouchableOpacity>
          <Text style={[s.headerTitle, { color: tc.text }]}>Setări</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={s.body}>
          <Text style={[s.placeholder, { color: tc.muted }]}>Setările vor apărea aici în curând.</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },
  safe: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1,
  },
  backBtn: {
    width: 40, height: 40, justifyContent: 'center', alignItems: 'center',
    borderRadius: 12, borderWidth: 1,
  },
  backIcon: { fontSize: 20, fontWeight: '600' },
  headerTitle: { fontSize: 18, fontWeight: '800' },
  body: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  placeholder: { fontSize: 14 },
});
