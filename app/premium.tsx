import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, ActivityIndicator, Linking, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useCarStore } from '../store/useCarStore';
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
    yearlyEquiv: null,
  },
  {
    id: 'yearly' as PremiumPlan,
    label: 'Anual',
    price: '149',
    currency: 'RON',
    period: '/ an',
    badge: '2 LUNI GRATUIT',
    description: '≈ 12,4 RON/lună — cea mai bună valoare',
    yearlyEquiv: null,
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
  const [selectedPlan, setSelectedPlan] = useState<PremiumPlan>('monthly');
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState('');
  const [verifyMsg, setVerifyMsg] = useState('');

  const openURL = (url: string) => {
    if (Platform.OS === 'web') {
      window.location.href = url;
    } else {
      Linking.openURL(url);
    }
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
        router.replace('/home');
      } else {
        setVerifyMsg('Nu am găsit un abonament activ. Dacă tocmai ai plătit, mai așteaptă câteva secunde și încearcă din nou.');
      }
    } finally {
      setChecking(false);
    }
  };

  if (user?.isPremium) {
    return (
      <LinearGradient colors={['#78350F', '#B45309', '#D97706']} style={styles.gradient}>
        <SafeAreaView style={styles.safe}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Premium</Text>
            <View style={{ width: 40 }} />
          </View>
          <View style={styles.alreadyPremium}>
            <Text style={styles.crownBig}>👑</Text>
            <Text style={styles.alreadyTitle}>Ești deja Premium!</Text>
            <Text style={styles.alreadyText}>Bucură-te de toate funcționalitățile CarNet fără restricții.</Text>
            <TouchableOpacity style={styles.goHomeBtn} onPress={() => router.replace('/home')}>
              <Text style={styles.goHomeBtnText}>Mergi la Acasă</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={[Colors.primary, '#0D1F3C']} style={styles.gradient}>
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>CarNet Premium</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
          {/* Hero */}
          <View style={styles.hero}>
            <Text style={styles.heroIcon}>👑</Text>
            <Text style={styles.heroTitle}>Deblochează tot potențialul CarNet</Text>
            <Text style={styles.heroSub}>Gestionează mașini nelimitate și beneficiezi de toate funcțiile viitoare.</Text>
          </View>

          {/* Plan selector */}
          <View style={styles.plansRow}>
            {PLANS.map(plan => (
              <TouchableOpacity
                key={plan.id}
                style={[styles.planCard, selectedPlan === plan.id && styles.planCardSelected]}
                onPress={() => setSelectedPlan(plan.id)}
                activeOpacity={0.85}
              >
                {plan.badge && (
                  <View style={styles.planBadge}>
                    <Text style={styles.planBadgeText}>{plan.badge}</Text>
                  </View>
                )}
                <Text style={[styles.planLabel, selectedPlan === plan.id && styles.planLabelSelected]}>
                  {plan.label}
                </Text>
                <View style={styles.planPriceRow}>
                  <Text style={[styles.planPrice, selectedPlan === plan.id && styles.planPriceSelected]}>
                    {plan.price}
                  </Text>
                  <Text style={[styles.planCurrency, selectedPlan === plan.id && styles.planCurrencySelected]}>
                    {' '}{plan.currency}
                  </Text>
                </View>
                <Text style={styles.planPeriod}>{plan.period}</Text>
                <Text style={[styles.planDesc, selectedPlan === plan.id && styles.planDescSelected]}>
                  {plan.description}
                </Text>
                {selectedPlan === plan.id && (
                  <View style={styles.planCheck}><Text style={styles.planCheckText}>✓</Text></View>
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Feature comparison */}
          <View style={styles.featuresCard}>
            <View style={styles.featuresHeader}>
              <Text style={styles.featuresHeaderLabel} />
              <Text style={[styles.featuresHeaderTier, { color: Colors.gray400 }]}>Gratuit</Text>
              <Text style={[styles.featuresHeaderTier, { color: '#D97706' }]}>Premium</Text>
            </View>
            {FEATURES.map((f, i) => (
              <View key={i} style={[styles.featureRow, i < FEATURES.length - 1 && styles.featureRowBorder]}>
                <Text style={styles.featureIcon}>{f.icon}</Text>
                <Text style={styles.featureLabel}>{f.label}</Text>
                <Text style={[styles.featureValue, { color: Colors.gray400 }]}>{f.free}</Text>
                <Text style={[styles.featureValue, { color: Colors.success, fontWeight: '700' }]}>{f.premium}</Text>
              </View>
            ))}
          </View>

          {/* Error message */}
          {!!error && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>⚠️  {error}</Text>
            </View>
          )}

          {/* CTA */}
          <TouchableOpacity
            style={[styles.ctaBtn, loading && { opacity: 0.7 }]}
            onPress={handleBuy}
            disabled={loading}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={['#B45309', '#D97706', '#F59E0B']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.ctaBtnGradient}
            >
              {loading
                ? <ActivityIndicator color="#fff" />
                : <Text style={styles.ctaBtnText}>
                    👑  Activează {selectedPlan === 'yearly' ? 'Anual' : 'Lunar'} — {selectedPlan === 'yearly' ? '149' : '19'} RON
                  </Text>
              }
            </LinearGradient>
          </TouchableOpacity>

          {/* Post-payment verify */}
          <TouchableOpacity
            style={[styles.verifyBtn, checking && { opacity: 0.7 }]}
            onPress={handleVerify}
            disabled={checking}
          >
            {checking
              ? <ActivityIndicator color={Colors.accent} size="small" />
              : <Text style={styles.verifyBtnText}>Am plătit deja — verifică statusul</Text>
            }
          </TouchableOpacity>
          {!!verifyMsg && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{verifyMsg}</Text>
            </View>
          )}

          <Text style={styles.legalText}>
            Plata este procesată securizat prin Stripe. Poți anula abonamentul oricând din contul tău Stripe.
            Prețurile includ TVA.
          </Text>

          <View style={{ height: 40 }} />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safe: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 12,
  },
  backBtn: {
    width: 40, height: 40, justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 12,
  },
  backIcon: { color: Colors.white, fontSize: 20, fontWeight: '600' },
  headerTitle: { color: Colors.white, fontSize: 18, fontWeight: '800' },
  scroll: { padding: 16 },

  // Hero
  hero: { alignItems: 'center', paddingVertical: 20, paddingHorizontal: 16 },
  heroIcon: { fontSize: 52, marginBottom: 12 },
  heroTitle: { fontSize: 22, fontWeight: '900', color: Colors.white, textAlign: 'center', letterSpacing: 0.3 },
  heroSub: { fontSize: 14, color: Colors.accentLight, textAlign: 'center', marginTop: 8, lineHeight: 20 },

  // Plans
  plansRow: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  planCard: {
    flex: 1, backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 18, padding: 16, borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center', position: 'relative', overflow: 'hidden',
  },
  planCardSelected: {
    backgroundColor: 'rgba(212,162,0,0.15)',
    borderColor: '#D97706',
  },
  planBadge: {
    backgroundColor: '#D97706', borderRadius: 8,
    paddingHorizontal: 8, paddingVertical: 3, marginBottom: 8,
  },
  planBadgeText: { fontSize: 10, fontWeight: '800', color: '#fff', letterSpacing: 0.5 },
  planLabel: { fontSize: 14, fontWeight: '700', color: Colors.accentLight, marginBottom: 6 },
  planLabelSelected: { color: '#D97706' },
  planPriceRow: { flexDirection: 'row', alignItems: 'flex-end' },
  planPrice: { fontSize: 32, fontWeight: '900', color: Colors.white },
  planPriceSelected: { color: '#F59E0B' },
  planCurrency: { fontSize: 16, fontWeight: '700', color: Colors.accentLight, paddingBottom: 4 },
  planCurrencySelected: { color: '#D97706' },
  planPeriod: { fontSize: 12, color: Colors.gray400, marginBottom: 6 },
  planDesc: { fontSize: 11, color: Colors.gray400, textAlign: 'center', lineHeight: 16 },
  planDescSelected: { color: Colors.accentLight },
  planCheck: {
    position: 'absolute', top: 10, right: 10,
    width: 22, height: 22, borderRadius: 11,
    backgroundColor: '#D97706', justifyContent: 'center', alignItems: 'center',
  },
  planCheckText: { color: '#fff', fontSize: 12, fontWeight: '900' },

  // Features
  featuresCard: {
    backgroundColor: Colors.white, borderRadius: 20,
    padding: 16, marginBottom: 20,
  },
  featuresHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: Colors.gray100 },
  featuresHeaderLabel: { flex: 2 },
  featuresHeaderTier: { flex: 1, textAlign: 'center', fontSize: 12, fontWeight: '800' },
  featureRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  featureRowBorder: { borderBottomWidth: 1, borderBottomColor: Colors.gray100 },
  featureIcon: { fontSize: 16, width: 28 },
  featureLabel: { flex: 2, fontSize: 13, color: Colors.primary, fontWeight: '500' },
  featureValue: { flex: 1, textAlign: 'center', fontSize: 12 },

  // CTA
  ctaBtn: { borderRadius: 16, overflow: 'hidden', marginBottom: 12 },
  ctaBtnGradient: { paddingVertical: 16, alignItems: 'center', justifyContent: 'center' },
  ctaBtnText: { color: '#fff', fontSize: 16, fontWeight: '900', letterSpacing: 0.5 },

  // Verify
  verifyBtn: {
    borderWidth: 1.5, borderColor: Colors.accent + '60',
    borderRadius: 12, paddingVertical: 12, alignItems: 'center', marginBottom: 16,
  },
  verifyBtnText: { color: Colors.accent, fontSize: 13, fontWeight: '600' },

  errorBox: {
    backgroundColor: 'rgba(239,68,68,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(239,68,68,0.35)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  errorText: { color: Colors.danger, fontSize: 13, textAlign: 'center', lineHeight: 18 },
  legalText: { fontSize: 11, color: Colors.gray400, textAlign: 'center', lineHeight: 16 },

  // Already premium
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
