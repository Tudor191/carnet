import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SW } = Dimensions.get('window');

// ─── Feature card ─────────────────────────────────────────────────────────────

function FeatureCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <View style={styles.featureCard}>
      <Text style={styles.featureIcon}>{icon}</Text>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDesc}>{desc}</Text>
    </View>
  );
}

// ─── Step ─────────────────────────────────────────────────────────────────────

function Step({ n, title, desc }: { n: number; title: string; desc: string }) {
  return (
    <View style={styles.step}>
      <LinearGradient colors={['#1A6FFF', '#0A4FCC']} style={styles.stepBadge}>
        <Text style={styles.stepN}>{n}</Text>
      </LinearGradient>
      <View style={styles.stepText}>
        <Text style={styles.stepTitle}>{title}</Text>
        <Text style={styles.stepDesc}>{desc}</Text>
      </View>
    </View>
  );
}

// ─── Perk row ─────────────────────────────────────────────────────────────────

function Perk({ text }: { text: string }) {
  return (
    <View style={styles.perkRow}>
      <View style={styles.perkDot} />
      <Text style={styles.perkText}>{text}</Text>
    </View>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Nav */}
        <View style={styles.nav}>
          <Text style={styles.navLogo}>CarNet</Text>
          <View style={styles.navActions}>
            <TouchableOpacity onPress={() => router.push('/login')} style={styles.navLoginBtn}>
              <Text style={styles.navLoginText}>Intră în cont</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Hero */}
        <LinearGradient colors={['#0F2744', '#070E1A']} style={styles.hero}>
          {/* Glow circles */}
          <View style={[styles.glow, { top: -60, left: -60, backgroundColor: '#1A6FFF22' }]} />
          <View style={[styles.glow, { bottom: -40, right: -40, backgroundColor: '#1A6FFF15' }]} />

          <Text style={styles.heroTag}>Gestionare auto inteligentă</Text>
          <Text style={styles.heroTitle}>
            Toate mașinile tale,{'\n'}într-un singur loc
          </Text>
          <Text style={styles.heroSub}>
            Ține evidența documentelor, primești alerte înainte de expirare și ai istoricul
            complet al fiecărei mașini — fără foi de hârtie.
          </Text>

          <View style={styles.heroCtas}>
            <TouchableOpacity
              style={styles.ctaPrimary}
              onPress={() => router.push('/register')}
              activeOpacity={0.85}
            >
              <LinearGradient colors={['#1A6FFF', '#0A4FCC']} style={styles.ctaGrad}>
                <Text style={styles.ctaPrimaryText}>Începe gratuit</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.ctaSecondary}
              onPress={() => router.push('/login')}
              activeOpacity={0.85}
            >
              <Text style={styles.ctaSecondaryText}>Ai deja cont? Intră →</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* What is CarNet */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>CE ESTE CARNET</Text>
          <Text style={styles.sectionTitle}>Un registru digital pentru mașinile tale</Text>
          <Text style={styles.sectionBody}>
            CarNet este o aplicație mobilă care centralizează tot ce ai nevoie pentru a-ți
            gestiona parcul auto personal: documente, scadențe, informații tehnice și
            alerte automate — totul sincronizat în timp real.
          </Text>
        </View>

        {/* Features grid */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>CE OFERIM</Text>
          <Text style={styles.sectionTitle}>De ce să alegi CarNet?</Text>
          <View style={styles.featuresGrid}>
            <FeatureCard
              icon="📋"
              title="Documente organizate"
              desc="RCA, ITP, Rovinieta — stocate într-un singur loc, mereu la îndemână."
            />
            <FeatureCard
              icon="🔔"
              title="Alerte de expirare"
              desc="Primești notificări cu 30 de zile înainte ca un document să expire."
            />
            <FeatureCard
              icon="🔍"
              title="Lookup VIN"
              desc="Introdu seria VIN și aflați instant modelul, generația și originea mașinii."
            />
            <FeatureCard
              icon="🚗"
              title="Mai multe mașini"
              desc="Gestionezi întreaga flotă personală — de la prima mașină la ultima achiziție."
            />
            <FeatureCard
              icon="🌍"
              title="Originea vehiculului"
              desc="Detectăm automat dacă mașina este de origine EU, NA sau JP pe baza VIN-ului."
            />
            <FeatureCard
              icon="🔒"
              title="Date în siguranță"
              desc="Contul tău este protejat prin autentificare securizată, fără date partajate cu terți."
            />
          </View>
        </View>

        {/* How it works */}
        <View style={[styles.section, styles.sectionDark]}>
          <Text style={[styles.sectionLabel, { color: '#1A6FFF' }]}>CUM FUNCȚIONEAZĂ</Text>
          <Text style={styles.sectionTitle}>Trei pași simpli</Text>
          <Step
            n={1}
            title="Creează-ți contul"
            desc="Înregistrare gratuită în mai puțin de un minut — fără card bancar."
          />
          <Step
            n={2}
            title="Adaugă mașinile tale"
            desc="Completezi VIN-ul sau introduci manual datele vehiculului."
          />
          <Step
            n={3}
            title="Lasă CarNet să facă treaba"
            desc="Primești alerte automate și ai toate documentele organizate la un click."
          />
        </View>

        {/* Premium */}
        <LinearGradient colors={['#1A1200', '#2A1F00']} style={styles.premiumBanner}>
          <View style={styles.premiumHeader}>
            <Text style={styles.premiumBadge}>PREMIUM</Text>
            <Text style={styles.premiumTitle}>Fă un pas în plus</Text>
            <Text style={styles.premiumSub}>
              Deblochează funcționalități avansate pentru cei care vor mai mult de la aplicație.
            </Text>
          </View>
          <View style={styles.premiumPerks}>
            <Perk text="Mașini nelimitate în cont" />
            <Perk text="Export PDF pentru toate documentele" />
            <Perk text="Rapoarte detaliate per vehicul" />
            <Perk text="Istoric complet nelimitat" />
          </View>
        </LinearGradient>

        {/* Footer CTA */}
        <View style={styles.footerCta}>
          <Text style={styles.footerTitle}>Gata să începi?</Text>
          <Text style={styles.footerSub}>
            Contul gratuit include toate funcțiile de bază. Niciun card necesar.
          </Text>
          <TouchableOpacity
            style={styles.footerBtn}
            onPress={() => router.push('/register')}
            activeOpacity={0.85}
          >
            <LinearGradient colors={['#1A6FFF', '#0A4FCC']} style={styles.ctaGrad}>
              <Text style={styles.ctaPrimaryText}>Creează cont gratuit</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#070E1A' },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 40 },

  // Nav
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#070E1A',
  },
  navLogo: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  navActions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  navLoginBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1A6FFF',
  },
  navLoginText: { color: '#1A6FFF', fontSize: 14, fontWeight: '600' },

  // Hero
  hero: {
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 20,
    padding: 28,
    overflow: 'hidden',
  },
  glow: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  heroTag: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1A6FFF',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 40,
    marginBottom: 14,
  },
  heroSub: {
    fontSize: 15,
    color: '#8899BB',
    lineHeight: 22,
    marginBottom: 28,
  },
  heroCtas: { gap: 12 },
  ctaPrimary: { borderRadius: 12, overflow: 'hidden' },
  ctaGrad: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaPrimaryText: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 },
  ctaSecondary: { alignItems: 'center', paddingVertical: 10 },
  ctaSecondaryText: { color: '#8899BB', fontSize: 14 },

  // Sections
  section: {
    marginTop: 36,
    paddingHorizontal: 20,
  },
  sectionDark: {
    backgroundColor: '#0B1525',
    marginHorizontal: 0,
    paddingHorizontal: 20,
    paddingVertical: 28,
    marginTop: 36,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#4466AA',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  sectionBody: {
    fontSize: 15,
    color: '#8899BB',
    lineHeight: 23,
  },

  // Features grid
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 8,
  },
  featureCard: {
    width: (SW - 52) / 2,
    backgroundColor: '#0D1B2E',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#132040',
  },
  featureIcon: { fontSize: 28, marginBottom: 10 },
  featureTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  featureDesc: {
    fontSize: 12,
    color: '#6688AA',
    lineHeight: 18,
  },

  // Steps
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    marginTop: 20,
  },
  stepBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  stepN: { color: '#FFFFFF', fontWeight: '800', fontSize: 16 },
  stepText: { flex: 1 },
  stepTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  stepDesc: {
    fontSize: 13,
    color: '#6688AA',
    lineHeight: 19,
  },

  // Premium
  premiumBanner: {
    marginHorizontal: 16,
    marginTop: 36,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: '#4A3800',
  },
  premiumHeader: { marginBottom: 20 },
  premiumBadge: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFB800',
    letterSpacing: 2,
    marginBottom: 8,
  },
  premiumTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  premiumSub: {
    fontSize: 14,
    color: '#AA8833',
    lineHeight: 20,
  },
  premiumPerks: { gap: 10 },
  perkRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  perkDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFB800',
  },
  perkText: { fontSize: 14, color: '#DDBB66' },

  // Footer CTA
  footerCta: {
    marginTop: 44,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  footerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  footerSub: {
    fontSize: 14,
    color: '#6688AA',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  footerBtn: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
  },
});
