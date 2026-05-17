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
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';
import { registerWithEmail } from '../services/auth';
import { useCarStore } from '../store/useCarStore';

export default function RegisterScreen() {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const { setUser } = useCarStore();

  const validate = (): string => {
    if (!displayName.trim()) return 'Introduceți numele complet.';
    if (!email.trim() || !email.includes('@')) return 'Introduceți un email valid.';
    if (password.length < 6) return 'Parola trebuie să aibă cel puțin 6 caractere.';
    if (password !== confirmPassword) return 'Parolele nu coincid.';
    return '';
  };

  const handleRegister = async () => {
    setError('');
    const validationError = validate();
    if (validationError) { setError(validationError); return; }

    setLoading(true);
    const result = await registerWithEmail(displayName, email, password);
    setLoading(false);

    if (result.error === 'EMAIL_TAKEN') {
      setError('Există deja un cont cu acest email. Încearcă să te autentifici.');
      return;
    }
    if (result.error === 'WEAK_PASSWORD') {
      setError('Parola trebuie să aibă cel puțin 6 caractere.');
      return;
    }
    if (result.error) {
      setError('A apărut o eroare. Încearcă din nou.');
      return;
    }

    setSuccess(true);
  };

  if (success) {
    return (
      <LinearGradient colors={[Colors.primary, Colors.secondary]} style={styles.gradient}>
        <SafeAreaView style={styles.safe}>
          <View style={styles.successContainer}>
            <Text style={styles.successIcon}>🎉</Text>
            <Text style={styles.successTitle}>Cont creat cu succes!</Text>
            <Text style={styles.successDesc}>
              Te poți autentifica acum cu email-ul și parola alese.
            </Text>
            <TouchableOpacity style={styles.successBtn} onPress={() => router.replace('/login')}>
              <Text style={styles.successBtnText}>Mergi la Autentificare</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

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
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                <Text style={styles.backIcon}>←</Text>
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Cont nou</Text>
              <View style={{ width: 40 }} />
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Înregistrare</Text>
              <Text style={styles.cardSubtitle}>
                Creează-ți un cont gratuit CarNet și adaugă prima ta mașină.
              </Text>

              <View style={styles.formGroup}>
                <Text style={styles.fieldLabel}>Nume complet</Text>
                <TextInput
                  style={styles.input}
                  value={displayName}
                  onChangeText={t => { setDisplayName(t); setError(''); }}
                  placeholder="Ion Popescu"
                  placeholderTextColor={Colors.gray400}
                  autoCorrect={false}
                  returnKeyType="next"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.fieldLabel}>Adresă email</Text>
                <TextInput
                  style={styles.input}
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
                    style={[styles.input, styles.passwordInput]}
                    value={password}
                    onChangeText={t => { setPassword(t); setError(''); }}
                    placeholder="Minim 6 caractere"
                    placeholderTextColor={Colors.gray400}
                    secureTextEntry={!showPassword}
                    returnKeyType="next"
                  />
                  <TouchableOpacity style={styles.eyeBtn} onPress={() => setShowPassword(v => !v)}>
                    <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁'}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.fieldLabel}>Confirmă parola</Text>
                <TextInput
                  style={styles.input}
                  value={confirmPassword}
                  onChangeText={t => { setConfirmPassword(t); setError(''); }}
                  placeholder="Repetă parola"
                  placeholderTextColor={Colors.gray400}
                  secureTextEntry={!showPassword}
                  returnKeyType="done"
                  onSubmitEditing={handleRegister}
                />
              </View>

              {!!error && (
                <View style={styles.errorBox}>
                  <Text style={styles.errorText}>⚠️  {error}</Text>
                </View>
              )}

              <View style={styles.infoBox}>
                <Text style={styles.infoText}>
                  ℹ️  Contul gratuit include o singură mașină. Poți face upgrade la Premium oricând.
                </Text>
              </View>

              <TouchableOpacity
                style={[styles.registerBtn, loading && styles.btnDisabled]}
                onPress={handleRegister}
                disabled={loading}
              >
                {loading
                  ? <ActivityIndicator color="#FFF" size="small" />
                  : <Text style={styles.registerBtnText}>Creează contul</Text>
                }
              </TouchableOpacity>

              <View style={styles.loginRow}>
                <Text style={styles.loginText}>Ai deja cont? </Text>
                <TouchableOpacity onPress={() => router.replace('/login')}>
                  <Text style={styles.loginLink}>Autentifică-te</Text>
                </TouchableOpacity>
              </View>
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
    paddingTop: 16,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 420,
    marginBottom: 20,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
  },
  backIcon: { color: Colors.white, fontSize: 20, fontWeight: '600' },
  headerTitle: { color: Colors.white, fontSize: 18, fontWeight: '700' },
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
  cardTitle: { fontSize: 22, fontWeight: '800', color: Colors.primary, textAlign: 'center', marginBottom: 6 },
  cardSubtitle: { fontSize: 13, color: Colors.gray500, textAlign: 'center', marginBottom: 20, lineHeight: 18 },
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
  passwordRow: { position: 'relative' },
  passwordInput: { paddingRight: 48 },
  eyeBtn: { position: 'absolute', right: 12, top: 0, bottom: 0, justifyContent: 'center' },
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
  infoBox: {
    backgroundColor: '#EFF6FF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.accent + '30',
  },
  infoText: { color: Colors.accent, fontSize: 12, lineHeight: 17 },
  registerBtn: {
    backgroundColor: Colors.accent,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 14,
  },
  btnDisabled: { opacity: 0.6 },
  registerBtnText: { color: Colors.white, fontSize: 15, fontWeight: '700' },
  loginRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  loginText: { fontSize: 14, color: Colors.gray500 },
  loginLink: { fontSize: 14, color: Colors.accent, fontWeight: '700' },
  successContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  successIcon: { fontSize: 64, marginBottom: 20 },
  successTitle: { fontSize: 24, fontWeight: '800', color: Colors.white, textAlign: 'center', marginBottom: 12 },
  successDesc: { fontSize: 15, color: Colors.accentLight, textAlign: 'center', lineHeight: 22, marginBottom: 32 },
  successBtn: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 32,
  },
  successBtnText: { color: Colors.primary, fontSize: 15, fontWeight: '700' },
});
