import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { Colors } from '../constants/colors';
import { useCarStore } from '../store/useCarStore';
import { loginWithEmail } from '../services/auth';
import {
  FIREBASE_CONFIGURED,
  signInWithGoogle,
  signInWithFacebook,
  signInWithApple,
  firebaseUserToAppUser,
} from '../services/firebase';

function CarNetLogoFull() {
  return (
    <View style={styles.logoContainer}>
      <Svg width={100} height={100} viewBox="0 0 120 120">
        {/* Notebook body */}
        <Rect x="20" y="12" width="76" height="92" rx="12" fill="#FFFFFF" />
        {/* Notebook cover (top blue bar) */}
        <Rect x="20" y="12" width="76" height="20" rx="12" fill={Colors.secondary} />
        <Rect x="20" y="24" width="76" height="8" fill={Colors.secondary} />
        {/* Spiral binding holes */}
        {[22, 36, 50, 64, 78, 92].map((y, i) => (
          <Circle key={i} cx="20" cy={y} r="4.5" fill={Colors.primary} />
        ))}
        {[22, 36, 50, 64, 78, 92].map((y, i) => (
          <Circle key={i} cx="20" cy={y} r="2.5" fill={Colors.accent} opacity={0.5} />
        ))}
        {/* Notebook lines — above the car */}
        <Path d="M32 38 H88" stroke={Colors.gray200} strokeWidth="1.5" />
        <Path d="M32 44 H88" stroke={Colors.gray200} strokeWidth="1.5" />
        {/* Notebook lines — below the car */}
        <Path d="M32 90 H88" stroke={Colors.gray200} strokeWidth="1.5" />
        <Path d="M32 97 H88" stroke={Colors.gray200} strokeWidth="1.5" />
        {/* ── Car centered in notebook (y shifted -18 from original) ── */}
        {/* Car body */}
        <Path d="M28 77 L32 64 L42 56 L78 56 L88 64 L92 77 Z" fill={Colors.secondary} />
        {/* Car roof */}
        <Path d="M40 64 L46 50 H74 L82 64 Z" fill={Colors.primary} />
        {/* Left window */}
        <Path d="M42 64 L47 52 H61 V64 Z" fill={Colors.accent} opacity={0.6} />
        {/* Right window */}
        <Path d="M63 52 H73 L79 64 H63 Z" fill={Colors.accent} opacity={0.6} />
        {/* Left wheel */}
        <Circle cx="42" cy="78" r="7" fill={Colors.primary} />
        <Circle cx="42" cy="78" r="3.5" fill={Colors.gray200} />
        {/* Right wheel */}
        <Circle cx="78" cy="78" r="7" fill={Colors.primary} />
        <Circle cx="78" cy="78" r="3.5" fill={Colors.gray200} />
        {/* Bumper line */}
        <Path d="M24 77 H96" stroke={Colors.secondary} strokeWidth="2.5" strokeLinecap="round" />
      </Svg>
      <Text style={styles.appName}>CarNet</Text>
      <Text style={styles.appTagline}>Carnetul tău auto digital</Text>
    </View>
  );
}

function Checkbox({ checked, onPress, label }: { checked: boolean; onPress: () => void; label: string }) {
  return (
    <TouchableOpacity style={styles.checkboxRow} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked && <Text style={styles.checkboxTick}>✓</Text>}
      </View>
      <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { setUser } = useCarStore();

  const handleLogin = async () => {
    setError('');
    if (!email.trim()) { setError('Introduceți email-ul sau numele de utilizator.'); return; }
    if (!password) { setError('Introduceți parola.'); return; }

    setLoading(true);
    const result = await loginWithEmail(email.trim(), password, keepLoggedIn);
    setLoading(false);

    if (result.error) {
      setError('Email sau parolă incorectă. Verificați datele și încercați din nou.');
      return;
    }
    await setUser(result.user);
    router.replace('/home');
  };

  const handleSocialLogin = async (provider: string) => {
    if (!FIREBASE_CONFIGURED) {
      setError('Firebase nu este configurat încă. Vezi instrucțiunile de mai jos.');
      return;
    }
    if (Platform.OS !== 'web') {
      setError('Login cu ' + provider + ' funcționează doar pe web momentan. Folosește email și parolă.');
      return;
    }
    setSocialLoading(provider);
    setError('');
    try {
      let fbUser;
      if (provider === 'Google') fbUser = await signInWithGoogle();
      else if (provider === 'Facebook') fbUser = await signInWithFacebook();
      else fbUser = await signInWithApple();

      await setUser(firebaseUserToAppUser(fbUser));
      router.replace('/home');
    } catch (e: any) {
      const code = e?.code || '';
      if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') {
        // utilizatorul a închis popup-ul — fără eroare
      } else if (code === 'auth/operation-not-allowed') {
        setError(`Autentificarea cu ${provider} nu este activată încă. Activează-o în Firebase Console → Authentication → Sign-in method.`);
      } else if (code === 'auth/popup-blocked') {
        setError('Popup-ul a fost blocat de browser. Permite popup-uri pentru localhost și încearcă din nou.');
      } else if (code === 'auth/network-request-failed') {
        setError('Eroare de conexiune. Verifică internetul și încearcă din nou.');
      } else {
        setError(`Eroare ${provider}: ${e?.message || 'Încearcă din nou.'}`);
      }
    } finally {
      setSocialLoading(null);
    }
  };

  const handleGuest = async () => {
    await setUser({
      id: `guest_${Date.now()}`,
      email: 'demo@guest.com',
      displayName: 'Utilizator Demo',
      isPremium: false,
      carCount: 0,
      isGuest: true,
    });
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
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <CarNetLogoFull />

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Autentificare</Text>

              {/* Email/password form */}
              <View style={styles.formGroup}>
                <Text style={styles.fieldLabel}>Email sau utilizator</Text>
                <TextInput
                  style={[styles.input, error ? styles.inputError : null]}
                  value={email}
                  onChangeText={t => { setEmail(t); setError(''); }}
                  placeholder="email@exemplu.com"
                  placeholderTextColor={Colors.gray400}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  returnKeyType="next"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.fieldLabel}>Parolă</Text>
                <View style={styles.passwordRow}>
                  <TextInput
                    style={[styles.input, styles.passwordInput, error ? styles.inputError : null]}
                    value={password}
                    onChangeText={t => { setPassword(t); setError(''); }}
                    placeholder="••••••••"
                    placeholderTextColor={Colors.gray400}
                    secureTextEntry={!showPassword}
                    returnKeyType="done"
                    onSubmitEditing={handleLogin}
                  />
                  <TouchableOpacity style={styles.eyeBtn} onPress={() => setShowPassword(v => !v)}>
                    <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁'}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {!!error && (
                <View style={styles.errorBox}>
                  <Text style={styles.errorText}>⚠️  {error}</Text>
                </View>
              )}

              <Checkbox
                checked={keepLoggedIn}
                onPress={() => setKeepLoggedIn(v => !v)}
                label="Ține-mă autentificat"
              />

              <TouchableOpacity
                style={[styles.loginBtn, loading && styles.btnDisabled]}
                onPress={handleLogin}
                disabled={loading}
              >
                {loading
                  ? <ActivityIndicator color="#FFF" size="small" />
                  : <Text style={styles.loginBtnText}>Autentifică-te</Text>
                }
              </TouchableOpacity>

              {/* Register link */}
              <View style={styles.registerRow}>
                <Text style={styles.registerText}>Nu ai cont? </Text>
                <TouchableOpacity onPress={() => router.push('/register')}>
                  <Text style={styles.registerLink}>Înregistrează-te</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>sau</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Firebase setup banner */}
              {!FIREBASE_CONFIGURED && (
                <TouchableOpacity
                  style={styles.firebaseBanner}
                  onPress={() => Linking.openURL('https://console.firebase.google.com/')}
                >
                  <Text style={styles.firebaseBannerTitle}>⚙️  Configurare necesară</Text>
                  <Text style={styles.firebaseBannerText}>
                    Pentru login cu Google/Facebook/Apple, creează un proiect Firebase gratuit și adaugă credențialele în{' '}
                    <Text style={styles.firebaseBannerCode}>services/firebase.ts</Text>.
                    Apasă aici pentru a deschide Firebase Console.
                  </Text>
                </TouchableOpacity>
              )}

              {/* Social login */}
              {[
                { provider: 'Google', icon: 'G', bg: '#FFFFFF', color: '#1F2937', border: Colors.gray200 },
                { provider: 'Facebook', icon: 'f', bg: '#1877F2', color: '#FFFFFF', border: '#1877F2' },
                { provider: 'Apple', icon: '', bg: '#000000', color: '#FFFFFF', border: '#000000' },
              ].map(({ provider, icon, bg, color, border }) => (
                <TouchableOpacity
                  key={provider}
                  style={[styles.socialBtn, { backgroundColor: bg, borderColor: border }]}
                  onPress={() => handleSocialLogin(provider)}
                  disabled={socialLoading !== null}
                >
                  {socialLoading === provider
                    ? <ActivityIndicator color={color} size="small" style={{ width: 24 }} />
                    : <Text style={[styles.socialIcon, { color }]}>{icon}</Text>
                  }
                  <Text style={[styles.socialLabel, { color }]}>Continuă cu {provider}</Text>
                </TouchableOpacity>
              ))}

              <TouchableOpacity style={styles.guestBtn} onPress={handleGuest}>
                <Text style={styles.guestBtnText}>Continuă ca invitat</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safe: { flex: 1 },
  scroll: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  logoContainer: { alignItems: 'center', marginBottom: 24 },
  appName: { color: Colors.white, fontSize: 34, fontWeight: '900', letterSpacing: 2, marginTop: 8 },
  appTagline: { color: Colors.accentLight, fontSize: 13, letterSpacing: 1, marginTop: 4 },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 420,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.3,
    shadowRadius: 32,
    elevation: 16,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: 20,
  },
  formGroup: { marginBottom: 14 },
  fieldLabel: { fontSize: 13, fontWeight: '600', color: Colors.gray700, marginBottom: 6 },
  input: {
    borderWidth: 1.5,
    borderColor: Colors.gray200,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: Colors.primary,
    backgroundColor: Colors.gray100,
  },
  inputError: { borderColor: Colors.danger },
  passwordRow: { position: 'relative' },
  passwordInput: { paddingRight: 48 },
  eyeBtn: {
    position: 'absolute',
    right: 12,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  eyeIcon: { fontSize: 18 },
  errorBox: {
    backgroundColor: '#FEF2F2',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.danger + '30',
  },
  errorText: { color: Colors.danger, fontSize: 13 },
  checkboxRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16 },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: Colors.gray400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: { backgroundColor: Colors.accent, borderColor: Colors.accent },
  checkboxTick: { color: '#FFF', fontSize: 12, fontWeight: '700' },
  checkboxLabel: { fontSize: 14, color: Colors.gray700 },
  loginBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 14,
  },
  btnDisabled: { opacity: 0.6 },
  loginBtnText: { color: Colors.white, fontSize: 15, fontWeight: '700' },
  registerRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  registerText: { fontSize: 14, color: Colors.gray500 },
  registerLink: { fontSize: 14, color: Colors.accent, fontWeight: '700' },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: 12, gap: 12 },
  dividerLine: { flex: 1, height: 1, backgroundColor: Colors.gray200 },
  dividerText: { color: Colors.gray400, fontSize: 13 },
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 10,
    borderWidth: 1,
    gap: 12,
  },
  socialIcon: { fontSize: 17, fontWeight: '700', width: 24, textAlign: 'center' },
  socialLabel: { fontSize: 14, fontWeight: '600', flex: 1, textAlign: 'center', marginRight: 24 },
  guestBtn: {
    borderRadius: 12,
    paddingVertical: 12,
    borderWidth: 1.5,
    borderColor: Colors.gray200,
    alignItems: 'center',
    marginTop: 4,
  },
  guestBtnText: { color: Colors.gray500, fontSize: 14, fontWeight: '600' },
  firebaseBanner: {
    backgroundColor: '#FFFBEB',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.gold + '60',
  },
  firebaseBannerTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#92400E',
    marginBottom: 4,
  },
  firebaseBannerText: {
    fontSize: 12,
    color: '#78350F',
    lineHeight: 17,
  },
  firebaseBannerCode: {
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    backgroundColor: '#FEF3C7',
    fontSize: 11,
  },
});
