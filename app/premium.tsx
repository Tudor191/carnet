import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, ActivityIndicator, Linking, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useCarStore } from '../store/useCarStore';
import { useThemeStore } from '../store/useThemeStore';
import { DARK, LIGHT } from '../constants/themes';
import { Colors } from '../constants/colors';
import { createCheckoutSession, checkPremiumStatus, PremiumPlan } from '../services/premium';

const PLANS = [
  {
    id: 'monthly' as PremiumPlan,
    label: 'Lunar',
    price: '19',
    currency: 'RON',
    period: '/ lună',
    badge: null,
    description: 'Acces complet, anulezi oricând',
  },
  {
    id: 'yearly' as PremiumPlan,
    label: 'Anual',
    price: '149',
    currency: 'RON',
    period: '/ an',
    badge: '2 LUNI GRATUIT',
    description: '≈ 12,4 RON/lună — cea mai bună valoare',
  },
];

const FEATURES = [
  { icon: '🚗', label: 'Mașini nelimitate', free: '1 mașină', premium: 'Nelimitat' },
  { icon: '🔧', label: 'Istoric schimburi ulei', free: '✓', premium: '✓' },
  { icon: '📄', label: 'RCA & ITP tracking', free: '✓', premium: '✓' },
  { icon: '🛡️', label: 'ROVinieta auto-detect', free: '✓', premium: '✓' },
  { icon: '🔔', label: 'Notificări expirare', free: '—', premium: 'În curând' },
  { icon: '☁️', label: 'Backup în cloud', free: '—', premium: 'În curând' },
  { icon: '📱', label: 'Export PDF', free: '—', premium: 'În curând' },
];

export default function PremiumScreen() {
  const { user, setUser } = useCarStore();
  const { theme } = useThemeStore();
  const tc = theme === 'dark' ? DARK : LIGHT;

  const [selectedPlan, setSelectedPlan] = useState<PremiumPlan>('monthly');
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState('');
  const [verifyMsg, setVerifyMsg] = useState('');

  const openURL = (url: string) => {
    if (Platform.OS === 'web') { window.location.href = url; }
    else { Linking.openURL(url); }
  };

  const handleBuy = async () => {
    setError('');
    if (!user?.email) {
      setError('Trebuie să fii autentificat cu un email valid pentru a cumpăra Premium.');
      return;
    }
    setLoading(true);
    try {
      const url = await createCheckoutSession(user.email, selectedPlan);
      openURL(url);
    } catch (err: any) {
      setError(err.message || 'Nu s-a putut inițializa plata. Încearcă din nou.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!user?.email) return;
    setChecking(true);
    setVerifyMsg('');
    try {
      const status = await checkPremiumStatus(user.email);
      if (status.isPremium) {
        await setUser({ ...user, isPremium: true });
        router.replace('/dashboard');
      } else {
        setVerifyMsg('Nu am găsit un abonament activ. Dacă tocmai ai plătit, mai așteaptă câteva secunde și încearcă din nou.');
      }
    } finally {
      setChecking(false);
    }
  };

  if (user?.isPremium) {
    return (
      <LinearGradient colors={['#78350F', '#B45309', '#D97706']} style={styles.root}>
        <SafeAreaView style={styles.safe}>
          <View style={[styles.header, { borderBottomColor: 'rgba(255,255,255,0.15)' }]}>
            <TouchableOpacity onPress={() => router.back()} style={[styles.backBtn, { backgroundColor: 'rgba(255,255,255,0.15)', borderColor: 'rgba(255,255,255,0.25)' }]}>
              <Text style={[styles.backIcon, { color: '#fff' }]}>←</Text>
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { color: '#fff' }]}>Premium</Text>
            <View style={{ width: 40 }} />
          </View>
          <View style={styles.alreadyPremium}>
            <Text style={styles.crownBig}>👑</Text>
            <Text style={styles.alreadyTitle}>Ești deja Premium!</Text>
            <Text style={styles.alreadyText}>Bucură-te de toate funcționalitățile CarNet fără restricții.</Text>
            <TouchableOpacity style={styles.goHomeBtn} onPress={() => router.replace('/dashboard')}>
              <Text style={styles.goHomeBtnText}>Mergi la Dashboard</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <View style={[styles.root, { backgroundColor: tc.bg }]}>
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={[styles.header, { borderBottomColor: tc.navBorder, backgroundColor: tc.navBg }]}>
          <TouchableOpacity onPress={() => router.back()} style={[styles.backBtn, { backgroundColor: tc.card, borderColor: tc.border }]}>
            <Text style={[styles.backIcon, { color: tc.text }]}>←</Text>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: tc.text }]}>CarNet Premium</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

          {/* Hero */}
          <View style={styles.hero}>
            <Text style={styles.heroIcon}>👑</Text>
            <Text style={[styles.heroTitle, { color: tc.text }]}>Deblochează tot potențialul CarNet</Text>
            <Text style={[styles.heroSub, { color: tc.sub }]}>Gestionează mașini nelimitate și beneficiezi de toate funcțiile viitoare.</Text>
          </View>

          {/* Plan selector */}
          <View style={styles.plansRow}>
            {PLANS.map(plan => (
              <TouchableOpacity
                key={plan.id}
                style={[
                  styles.planCard,
                  { backgroundColor: tc.card, borderColor: tc.border },
                  selectedPlan === plan.id && styles.planCardSelected,
                ]}
                onPress={() => setSelectedPlan(plan.id)}
                activeOpacity={0.85}
              >
                {plan.badge && (
                  <View style={styles.planBadge}>
                    <Text style={styles.planBadgeText}>{plan.badge}</Text>
                  </View>
                )}
                <Text style={[styles.planLabel, { color: tc.sub }, selectedPlan === plan.id && { color: '#D97706' }]}>
                  {plan.label}
                </Text>
                <View style={styles.planPriceRow}>
                  <Text style={[styles.planPrice, { color: tc.text }, selectedPlan === plan.id && { color: '#F59E0B' }]}>
                    {plan.price}
                  </Text>
                  <Text style={[styles.planCurrency, { color: tc.sub }, selectedPlan === plan.id && { color: '#D97706' }]}>
                    {' '}{plan.currency}
                  </Text>
                </View>
                <Text style={[styles.planPeriod, { color: tc.muted }]}>{plan.period}</Text>
                <Text style={[styles.planDesc, { color: tc.sub }, selectedPlan === plan.id && { color: '#D97706' }]}>
                  {plan.description}
                </Text>
                {selectedPlan === plan.id && (
                  <View style={styles.planCheck}><Text style={styles.planCheckText}>✓</Text></View>
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Feature comparison */}
          <View style={[styles.featuresCard, { backgroundColor: tc.card, borderColor: tc.border }]}>
            <View style={[styles.featuresHeader, { borderBottomColor: tc.border }]}>
              <Text style={styles.featuresHeaderLabel} />
              <Text style={[styles.featuresHeaderTier, { color: tc.muted }]}>Gratuit</Text>
              <Text style={[styles.featuresHeaderTier, { color: '#D97706' }]}>Premium</Text>
            </View>
            {FEATURES.map((f, i) => (
              <View key={i} style={[styles.featureRow, i < FEATURES.length - 1 && { borderBottomWidth: 1, borderBottomColor: tc.border }]}>
                <Text style={styles.featureIcon}>{f.icon}</Text>
                <Text style={[styles.featureLabel, { color: tc.text }]}>{f.label}</Text>
                <Text style={[styles.featureValue, { color: tc.muted }]}>{f.free}</Text>
                <Text style={[styles.featureValue, { color: Colors.success, fontWeight: '700' }]}>{f.premium}</Text>
              </View>
            ))}
          </View>

          {/* Error */}
          {!!error && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>⚠️  {error}</Text>
            </View>
          )}

          {/* CTA */}
          <TouchableOpacity style={[styles.ctaBtn, loading && { opacity: 0.7 }]} onPress={handleBuy} disabled={loading} activeOpacity={0.85}>
            <LinearGradient colors={['#B45309', '#D97706', '#F59E0B']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.ctaBtnGradient}>
              {loading
                ? <ActivityIndicator color="#fff" />
                : <Text style={styles.ctaBtnText}>
                    👑  Activează {selectedPlan === 'yearly' ? 'Anual' : 'Lunar'} — {selectedPlan === 'yearly' ? '149' : '19'} RON
                  </Text>
              }
            </LinearGradient>
          </TouchableOpacity>

          {/* Verify */}
          <TouchableOpacity style={[styles.verifyBtn, { borderColor: Colors.accent + '60' }, checking && { opacity: 0.7 }]} onPress={handleVerify} disabled={checking}>
            {checking
              ? <ActivityIndicator color={Colors.accent} size="small" />
              : <Text style={[styles.verifyBtnText, { color: Colors.accent }]}>Am plătit deja — verifică statusul</Text>
            }
          </TouchableOpacity>

          {!!verifyMsg && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{verifyMsg}</Text>
            </View>
          )}

          <Text style={[styles.legalText, { color: tc.muted }]}>
            Plata este procesată securizat prin Stripe. Poți anula abonamentul oricând din contul tău Stripe.
            Prețurile includ TVA.
          </Text>

          <View style={{ height: 40 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
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
  scroll: { padding: 16 },

  hero: { alignItems: 'center', paddingVertical: 20, paddingHorizontal: 16 },
  heroIcon: { fontSize: 52, marginBottom: 12 },
  heroTitle: { fontSize: 22, fontWeight: '900', textAlign: 'center', letterSpacing: 0.3 },
  heroSub: { fontSize: 14, textAlign: 'center', marginTop: 8, lineHeight: 20 },

  plansRow: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  planCard: {
    flex: 1, borderRadius: 18, padding: 16, borderWidth: 2,
    alignItems: 'center', position: 'relative', overflow: 'hidden',
  },
  planCardSelected: { backgroundColor: 'rgba(212,162,0,0.12)', borderColor: '#D97706' },
  planBadge: {
    backgroundColor: '#D97706', borderRadius: 8,
    paddingHorizontal: 8, paddingVertical: 3, marginBottom: 8,
  },
  planBadgeText: { fontSize: 10, fontWeight: '800', color: '#fff', letterSpacing: 0.5 },
  planLabel: { fontSize: 14, fontWeight: '700', marginBottom: 6 },
  planPriceRow: { flexDirection: 'row', alignItems: 'flex-end' },
  planPrice: { fontSize: 32, fontWeight: '900' },
  planCurrency: { fontSize: 16, fontWeight: '700', paddingBottom: 4 },
  planPeriod: { fontSize: 12, marginBottom: 6 },
  planDesc: { fontSize: 11, textAlign: 'center', lineHeight: 16 },
  planCheck: {
    position: 'absolute', top: 10, right: 10,
    width: 22, height: 22, borderRadius: 11,
    backgroundColor: '#D97706', justifyContent: 'center', alignItems: 'center',
  },
  planCheckText: { color: '#fff', fontSize: 12, fontWeight: '900' },

  featuresCard: { borderRadius: 20, padding: 16, marginBottom: 20, borderWidth: 1 },
  featuresHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, paddingBottom: 8, borderBottomWidth: 1 },
  featuresHeaderLabel: { flex: 2 },
  featuresHeaderTier: { flex: 1, textAlign: 'center', fontSize: 12, fontWeight: '800' },
  featureRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  featureIcon: { fontSize: 16, width: 28 },
  featureLabel: { flex: 2, fontSize: 13, fontWeight: '500' },
  featureValue: { flex: 1, textAlign: 'center', fontSize: 12 },

  ctaBtn: { borderRadius: 16, overflow: 'hidden', marginBottom: 12 },
  ctaBtnGradient: { paddingVertical: 16, alignItems: 'center', justifyContent: 'center' },
  ctaBtnText: { color: '#fff', fontSize: 16, fontWeight: '900', letterSpacing: 0.5 },

  verifyBtn: { borderWidth: 1.5, borderRadius: 12, paddingVertical: 12, alignItems: 'center', marginBottom: 16 },
  verifyBtnText: { fontSize: 13, fontWeight: '600' },

  errorBox: {
    backgroundColor: 'rgba(239,68,68,0.12)', borderWidth: 1,
    borderColor: 'rgba(239,68,68,0.35)', borderRadius: 12,
    padding: 12, marginBottom: 12,
  },
  errorText: { color: Colors.danger, fontSize: 13, textAlign: 'center', lineHeight: 18 },
  legalText: { fontSize: 11, textAlign: 'center', lineHeight: 16 },

  alreadyPremium: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  crownBig: { fontSize: 72, marginBottom: 20 },
  alreadyTitle: { fontSize: 26, fontWeight: '900', color: '#fff', marginBottom: 12 },
  alreadyText: { fontSize: 15, color: 'rgba(255,255,255,0.8)', textAlign: 'center', lineHeight: 22 },
  goHomeBtn: {
    marginTop: 32, backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 14, paddingHorizontal: 32, paddingVertical: 14,
  },
  goHomeBtnText: { color: '#fff', fontSize: 16, fontWeight: '800' },
});
