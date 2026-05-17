import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Circle, Rect, G } from 'react-native-svg';
import { Colors } from '../constants/colors';
import { useCarStore } from '../store/useCarStore';
import { User } from '../types';

const { width: W, height: H } = Dimensions.get('window');

function CarNetLogoFull() {
  return (
    <View style={styles.logoContainer}>
      {/* Notebook SVG */}
      <Svg width={120} height={120} viewBox="0 0 120 120">
        {/* Notebook shadow */}
        <Rect x="22" y="16" width="76" height="92" rx="12" fill="#000" opacity={0.3} />
        {/* Notebook body */}
        <Rect x="20" y="12" width="76" height="92" rx="12" fill="#FFFFFF" />
        <Rect x="20" y="12" width="76" height="92" rx="12" fill={Colors.accent} opacity={0.08} />
        {/* Notebook cover lines */}
        <Rect x="20" y="12" width="76" height="20" rx="12" fill={Colors.secondary} />
        <Rect x="20" y="24" width="76" height="8" fill={Colors.secondary} />
        {/* Spiral binding holes */}
        {[22, 36, 50, 64, 78, 92].map((y, i) => (
          <Circle key={i} cx="20" cy={y} r="4.5" fill={Colors.primary} />
        ))}
        {[22, 36, 50, 64, 78, 92].map((y, i) => (
          <Circle key={i} cx="20" cy={y} r="2.5" fill={Colors.accent} opacity={0.5} />
        ))}
        {/* Notebook lines */}
        <Path d="M32 52 H88" stroke={Colors.gray200} strokeWidth="1.5" />
        <Path d="M32 60 H88" stroke={Colors.gray200} strokeWidth="1.5" />
        <Path d="M32 68 H88" stroke={Colors.gray200} strokeWidth="1.5" />
        <Path d="M32 76 H88" stroke={Colors.gray200} strokeWidth="1.5" />
        {/* Car silhouette on notebook */}
        {/* Car body */}
        <Path
          d="M28 95 L32 82 L42 74 L78 74 L88 82 L92 95 Z"
          fill={Colors.secondary}
        />
        {/* Car roof */}
        <Path
          d="M40 82 L46 68 H74 L82 82 Z"
          fill={Colors.primary}
        />
        {/* Windows */}
        <Path d="M42 82 L47 70 H61 V82 Z" fill={Colors.accent} opacity={0.6} />
        <Path d="M63 70 H73 L79 82 H63 Z" fill={Colors.accent} opacity={0.6} />
        {/* Wheels */}
        <Circle cx="42" cy="96" r="7" fill={Colors.primary} />
        <Circle cx="42" cy="96" r="3.5" fill={Colors.gray200} />
        <Circle cx="78" cy="96" r="7" fill={Colors.primary} />
        <Circle cx="78" cy="96" r="3.5" fill={Colors.gray200} />
        {/* Bumper line */}
        <Path d="M24 95 H96" stroke={Colors.secondary} strokeWidth="2.5" strokeLinecap="round" />
        {/* Headlights */}
        <Path d="M87 84 L92 87 L89 90" fill={Colors.gold} />
        <Path d="M33 84 L28 87 L31 90" fill={Colors.gold} opacity={0.5} />
      </Svg>
      <Text style={styles.appName}>CarNet</Text>
      <Text style={styles.appTagline}>Carnetul tău auto digital</Text>
    </View>
  );
}

function SocialButton({
  label,
  icon,
  bgColor,
  textColor,
  onPress,
}: {
  label: string;
  icon: string;
  bgColor: string;
  textColor: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.socialBtn, { backgroundColor: bgColor }]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Text style={styles.socialIcon}>{icon}</Text>
      <Text style={[styles.socialLabel, { color: textColor }]}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const setUser = useCarStore(s => s.setUser);

  const signIn = async (provider: string) => {
    setLoading(true);
    // Demo login — in production, integrate with Firebase/OAuth
    await new Promise(r => setTimeout(r, 800));
    const mockUser: User = {
      id: `user_${Date.now()}`,
      email: `demo@${provider.toLowerCase()}.com`,
      displayName: 'Utilizator Demo',
      isPremium: false,
      carCount: 0,
    };
    setUser(mockUser);
    setLoading(false);
    router.replace('/home');
  };

  return (
    <LinearGradient
      colors={[Colors.primary, Colors.secondary, '#1A3A6B']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.3, y: 1 }}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <CarNetLogoFull />

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Bun venit!</Text>
              <Text style={styles.cardSubtitle}>
                Autentifică-te pentru a accesa carnetul tău auto digital.
              </Text>

              <SocialButton
                label="Continuă cu Google"
                icon="G"
                bgColor="#FFFFFF"
                textColor="#1F2937"
                onPress={() => signIn('Google')}
              />
              <SocialButton
                label="Continuă cu Facebook"
                icon="f"
                bgColor="#1877F2"
                textColor="#FFFFFF"
                onPress={() => signIn('Facebook')}
              />
              <SocialButton
                label="Continuă cu Apple"
                icon=""
                bgColor="#000000"
                textColor="#FFFFFF"
                onPress={() => signIn('Apple')}
              />

              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>sau</Text>
                <View style={styles.dividerLine} />
              </View>

              <TouchableOpacity
                style={styles.guestBtn}
                onPress={() => signIn('Guest')}
                disabled={loading}
              >
                <Text style={styles.guestBtnText}>Continuă ca invitat</Text>
              </TouchableOpacity>

              <Text style={styles.legal}>
                Prin autentificare ești de acord cu{' '}
                <Text style={styles.legalLink}>Termenii și Condițiile</Text>
                {' '}și{' '}
                <Text style={styles.legalLink}>Politica de Confidențialitate</Text>.
              </Text>
            </View>

            <View style={styles.featuresList}>
              {[
                { icon: '🚗', text: 'Carte de identitate digitală pentru mașina ta' },
                { icon: '📅', text: 'Urmărire asigurare RCA și ITP' },
                { icon: '🛣️', text: 'Verificare rovinietă în timp real' },
                { icon: '🔒', text: 'Date securizate și private' },
              ].map((f, i) => (
                <View key={i} style={styles.feature}>
                  <Text style={styles.featureIcon}>{f.icon}</Text>
                  <Text style={styles.featureText}>{f.text}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safe: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  appName: {
    color: Colors.white,
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: 2,
    marginTop: 8,
  },
  appTagline: {
    color: Colors.accentLight,
    fontSize: 14,
    letterSpacing: 1,
    marginTop: 4,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.3,
    shadowRadius: 32,
    elevation: 16,
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 14,
    color: Colors.gray500,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingVertical: 13,
    paddingHorizontal: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.gray200,
    gap: 12,
  },
  socialIcon: {
    fontSize: 18,
    fontWeight: '700',
    width: 24,
    textAlign: 'center',
  },
  socialLabel: {
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
    marginRight: 24,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.gray200,
  },
  dividerText: {
    color: Colors.gray400,
    fontSize: 13,
  },
  guestBtn: {
    borderRadius: 12,
    paddingVertical: 13,
    borderWidth: 1.5,
    borderColor: Colors.gray200,
    alignItems: 'center',
    marginBottom: 16,
  },
  guestBtnText: {
    color: Colors.gray500,
    fontSize: 14,
    fontWeight: '600',
  },
  legal: {
    fontSize: 11,
    color: Colors.gray400,
    textAlign: 'center',
    lineHeight: 16,
  },
  legalLink: {
    color: Colors.accent,
    fontWeight: '600',
  },
  featuresList: {
    width: '100%',
    maxWidth: 400,
    gap: 12,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  featureIcon: {
    fontSize: 22,
  },
  featureText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
    lineHeight: 18,
  },
});
