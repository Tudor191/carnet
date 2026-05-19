import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Animated,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SW } = Dimensions.get('window');
const MAX = Math.min(SW, 520);
const HALF = (MAX - 40) / 2;

// ─── Color tokens ─────────────────────────────────────────────────────────────

const C = {
  bg:     '#060C18',
  card:   '#0C1A2E',
  border: '#152847',
  accent: '#2570FF',
  acDark: '#1050CC',
  text:   '#FFFFFF',
  sub:    '#7A95B8',
  muted:  '#3D5570',
  gold:   '#F59E0B',
  green:  '#22C55E',
  warn:   '#F59E0B',
};

// ─── Mock card (hero visual) ──────────────────────────────────────────────────

function MockDocRow({
  label, days, status,
}: { label: string; days: number; status: 'ok' | 'warn' }) {
  const color = status === 'ok' ? C.green : C.warn;
  return (
    <View style={m.docRow}>
      <Text style={m.docLabel}>{label}</Text>
      <View style={[m.docBadge, { borderColor: color + '55' }]}>
        <View style={[m.docDot, { backgroundColor: color }]} />
        <Text style={[m.docDays, { color }]}>{days} zile</Text>
      </View>
    </View>
  );
}

function MockCard({ floatY }: { floatY: Animated.Value }) {
  return (
    <Animated.View style={[m.wrap, { transform: [{ translateY: floatY }] }]}>
      <LinearGradient colors={['#102040', '#081628']} style={m.card}>
        <View style={m.glow} />
        <View style={m.head}>
          <Text style={m.flag}>🇩🇪</Text>
          <View style={m.headText}>
            <Text style={m.make}>BMW 3 Series</Text>
            <Text style={m.gen}>G20 · 2022 · EU</Text>
          </View>
          <View style={m.onlineDot} />
        </View>
        <View style={m.sep} />
        <MockDocRow label="RCA" days={45} status="ok" />
        <MockDocRow label="ITP" days={118} status="ok" />
        <MockDocRow label="Rovinieta" days={12} status="warn" />
      </LinearGradient>
    </Animated.View>
  );
}

const m = StyleSheet.create({
  wrap: {
    marginTop: 32,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1A3860',
    shadowColor: C.accent,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 12,
  },
  card: { padding: 20, overflow: 'hidden' },
  glow: {
    position: 'absolute', top: -40, right: -40,
    width: 120, height: 120, borderRadius: 60,
    backgroundColor: '#2570FF20',
  },
  head: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  flag: { fontSize: 28 },
  headText: { flex: 1 },
  make: { color: C.text, fontSize: 16, fontWeight: '700' },
  gen: { color: C.sub, fontSize: 12, marginTop: 2 },
  onlineDot: {
    width: 8, height: 8, borderRadius: 4, backgroundColor: C.green,
    shadowColor: C.green, shadowOpacity: 0.8, shadowRadius: 4, elevation: 2,
  },
  sep: { height: 1, backgroundColor: '#1A3050', marginBottom: 14 },
  docRow: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', marginBottom: 10,
  },
  docLabel: { color: C.sub, fontSize: 13 },
  docBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: 20, borderWidth: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  docDot: { width: 6, height: 6, borderRadius: 3 },
  docDays: { fontSize: 12, fontWeight: '600' },
});

// ─── Reusable section components ──────────────────────────────────────────────

function SectionLabel({ text }: { text: string }) {
  return <Text style={g.label}>{text}</Text>;
}

function BenefitCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <View style={g.benefitCard}>
      <LinearGradient colors={[C.accent + '22', C.accent + '08']} style={g.benefitIconWrap}>
        <Text style={g.benefitIcon}>{icon}</Text>
      </LinearGradient>
      <Text style={g.benefitTitle}>{title}</Text>
      <Text style={g.benefitDesc}>{desc}</Text>
    </View>
  );
}

function FeatureCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <View style={[g.featureCard, { width: HALF }]}>
      <Text style={g.featureIcon}>{icon}</Text>
      <Text style={g.featureTitle}>{title}</Text>
      <Text style={g.featureDesc}>{desc}</Text>
    </View>
  );
}

function StepCard({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <View style={[g.stepCard, { width: HALF }]}>
      <Text style={g.stepN}>{n}</Text>
      <Text style={g.stepTitle}>{title}</Text>
      <Text style={g.stepDesc}>{desc}</Text>
    </View>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function HomeScreen() {
  const [vin, setVin] = useState('');

  // Entrance animation values
  const fade = [0, 1, 2, 3].map(() => useRef(new Animated.Value(0)).current);
  const floatY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Staggered entrance
    Animated.stagger(
      120,
      fade.map(a =>
        Animated.spring(a, { toValue: 1, useNativeDriver: true, tension: 50, friction: 8 }),
      ),
    ).start();

    // Floating mock card
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatY, { toValue: -10, duration: 2800, useNativeDriver: true }),
        Animated.timing(floatY, { toValue: 0, duration: 2800, useNativeDriver: true }),
      ]),
    ).start();
  }, []);

  const anim = (i: number) => ({
    opacity: fade[i],
    transform: [
      {
        translateY: fade[i].interpolate({
          inputRange: [0, 1],
          outputRange: [28, 0],
        }),
      },
    ],
  });

  return (
    <SafeAreaView style={g.safe} edges={['top', 'bottom']}>
      <ScrollView
        style={g.scroll}
        contentContainerStyle={g.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* ── Nav ── */}
        <View style={g.navOuter}>
          <View style={g.navInner}>
            <Text style={g.navLogo}>CarNet</Text>
            <TouchableOpacity style={g.navBtn} onPress={() => router.push('/login')}>
              <Text style={g.navBtnText}>Autentificare</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Hero ── */}
        <LinearGradient colors={['#0C1E3C', C.bg]} style={g.heroOuter}>
          {/* background glows */}
          <View style={g.glowTR} />
          <View style={g.glowBL} />

          <View style={g.heroInner}>
            <Animated.View style={anim(0)}>
              <Text style={g.heroLabel}>GESTIONARE AUTO INTELIGENTĂ</Text>
              <Text style={g.heroTitle}>
                Organizează documentele mașinii în câteva secunde
              </Text>
            </Animated.View>

            <Animated.View style={[g.heroBullets, anim(1)]}>
              {[
                'RCA, ITP și Rovinieta la un loc',
                'Alerte cu 30 zile înainte de expirare',
                'Identificare model și origine prin VIN',
              ].map(t => (
                <View key={t} style={g.bullet}>
                  <Text style={g.bulletDot}>✓</Text>
                  <Text style={g.bulletText}>{t}</Text>
                </View>
              ))}
            </Animated.View>

            <Animated.View style={anim(2)}>
              <View style={g.vinBox}>
                <TextInput
                  style={g.vinInput}
                  placeholder="Introdu VIN-ul mașinii (17 caractere)"
                  placeholderTextColor={C.muted}
                  value={vin}
                  onChangeText={t => setVin(t.toUpperCase())}
                  maxLength={17}
                  autoCapitalize="characters"
                />
                <TouchableOpacity
                  style={g.vinBtn}
                  onPress={() => router.push('/register')}
                  activeOpacity={0.85}
                >
                  <LinearGradient colors={[C.accent, C.acDark]} style={g.vinBtnGrad}>
                    <Text style={g.vinBtnText}>Verifică acum</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={g.heroSkip}
                onPress={() => router.push('/register')}
                activeOpacity={0.7}
              >
                <Text style={g.heroSkipText}>Nu am VIN · Creează cont direct →</Text>
              </TouchableOpacity>
            </Animated.View>

            <Animated.View style={anim(3)}>
              <MockCard floatY={floatY} />
            </Animated.View>
          </View>
        </LinearGradient>

        {/* ── De ce CarNet — 3 benefit cards ── */}
        <View style={g.section}>
          <SectionLabel text="DE CE CARNET" />
          <Text style={g.sectionTitle}>De ce șoferii inteligenți{'\n'}aleg CarNet</Text>
          <Text style={g.sectionSub}>Nu mai alergi după documente. CarNet are grijă de tot.</Text>
          <View style={g.benefitsRow}>
            <BenefitCard icon="🔔" title="Evită amenzile" desc="Alertă automată cu 30 zile înainte ca orice document să expire." />
            <BenefitCard icon="📋" title="Tot la un loc" desc="RCA, ITP, Rovinieta — toate mașinile, un singur dashboard." />
            <BenefitCard icon="⚡" title="Instantaneu" desc="Introduci VIN-ul și în secunde ai cardul digital complet." />
          </View>
        </View>

        {/* ── Ce gestionăm — 2×2 feature grid ── */}
        <View style={[g.section, g.sectionAlt]}>
          <SectionLabel text="CE GESTIONĂM" />
          <Text style={g.sectionTitle}>Verificăm tot ce{'\n'}contează</Text>
          <Text style={g.sectionSub}>Documentele tale obligatorii, urmărite automat.</Text>
          <View style={g.grid}>
            <FeatureCard icon="🛡️" title="RCA" desc="Știi exact câte zile ai până la expirarea poliței de asigurare." />
            <FeatureCard icon="🔧" title="ITP" desc="Urmărești inspecția tehnică a fiecărei mașini. Alertă cu 30 zile înainte." />
            <FeatureCard icon="🛣️" title="Rovinieta" desc="Valabilitatea rovinietei pe toate mașinile din contul tău." />
            <FeatureCard icon="🔍" title="VIN Lookup" desc="Introduci VIN-ul și afli instant marca, modelul, generația și originea." />
          </View>
        </View>

        {/* ── Cum funcționează — 2×2 step grid ── */}
        <View style={g.section}>
          <SectionLabel text="CUM FUNCȚIONEAZĂ" />
          <Text style={g.sectionTitle}>Patru pași simpli</Text>
          <Text style={g.sectionSub}>Aflați cât de repede poți începe:</Text>
          <View style={g.grid}>
            <StepCard n="01" title="Creează contul" desc="Înregistrare gratuită în mai puțin de un minut, fără card bancar." />
            <StepCard n="02" title="Introdu VIN-ul" desc="CarNet identifică automat marca, modelul și generația mașinii tale." />
            <StepCard n="03" title="Adaugă documente" desc="Completezi datele de expirare pentru RCA, ITP și Rovinieta." />
            <StepCard n="04" title="Primești alerte" desc="Cu 30 de zile înainte de expirare ești notificat automat." />
          </View>
        </View>

        {/* ── Premium ── */}
        <View style={g.premOuter}>
          <LinearGradient colors={['#0F1E3A', '#091525']} style={g.premCard}>
            <View style={g.premGlow} />
            <Text style={g.premEye}>PREMIUM</Text>
            <Text style={g.premTitle}>Fă un pas în plus</Text>
            <Text style={g.premSub}>Deblochează tot potențialul aplicației.</Text>
            <View style={g.premGrid}>
              {[
                { icon: '🚗', text: 'Mașini nelimitate' },
                { icon: '📤', text: 'Export PDF' },
                { icon: '📊', text: 'Rapoarte detaliate' },
                { icon: '🔔', text: 'Alerte push avansate' },
              ].map(p => (
                <View key={p.text} style={g.premItem}>
                  <Text style={g.premItemIcon}>{p.icon}</Text>
                  <Text style={g.premItemText}>{p.text}</Text>
                </View>
              ))}
            </View>
            <TouchableOpacity
              style={g.premBtn}
              onPress={() => router.push('/register')}
              activeOpacity={0.85}
            >
              <LinearGradient colors={[C.accent, C.acDark]} style={g.premBtnGrad}>
                <Text style={g.premBtnText}>Încearcă gratuit →</Text>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* ── Footer CTA ── */}
        <View style={g.footer}>
          <Text style={g.footerTitle}>Gata să începi?</Text>
          <Text style={g.footerSub}>Cont gratuit · fără card · în mai puțin de un minut.</Text>
          <TouchableOpacity
            style={g.footerBtn}
            onPress={() => router.push('/register')}
            activeOpacity={0.85}
          >
            <LinearGradient colors={[C.accent, C.acDark]} style={g.footerBtnGrad}>
              <Text style={g.footerBtnText}>Creează cont gratuit</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/login')} style={g.footerLink}>
            <Text style={g.footerLinkText}>Ai deja cont? Intră →</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Global styles ────────────────────────────────────────────────────────────

const g = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 60 },

  // Nav
  navOuter: { backgroundColor: C.bg, borderBottomWidth: 1, borderBottomColor: C.border },
  navInner: {
    maxWidth: MAX,
    alignSelf: 'center',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  navLogo: { fontSize: 21, fontWeight: '800', color: C.text, letterSpacing: 0.5 },
  navBtn: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  navBtnText: { color: C.text, fontSize: 13, fontWeight: '600' },

  // Hero
  heroOuter: { overflow: 'hidden' },
  glowTR: {
    position: 'absolute', top: -60, right: -60,
    width: 260, height: 260, borderRadius: 130,
    backgroundColor: C.accent + '18',
  },
  glowBL: {
    position: 'absolute', bottom: -40, left: -40,
    width: 180, height: 180, borderRadius: 90,
    backgroundColor: C.accent + '10',
  },
  heroInner: {
    maxWidth: MAX,
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 36,
    paddingBottom: 48,
  },
  heroLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: C.accent,
    letterSpacing: 2,
    marginBottom: 14,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: C.text,
    lineHeight: 44,
    marginBottom: 24,
  },
  heroBullets: { gap: 10, marginBottom: 28 },
  bullet: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  bulletDot: { color: C.accent, fontWeight: '700', fontSize: 14, width: 16 },
  bulletText: { color: C.sub, fontSize: 14, flex: 1 },

  // VIN input
  vinBox: {
    backgroundColor: '#0D1B2E',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: C.border,
    overflow: 'hidden',
  },
  vinInput: {
    color: C.text,
    fontSize: 15,
    paddingHorizontal: 16,
    paddingVertical: 14,
    letterSpacing: 1,
  },
  vinBtn: {},
  vinBtnGrad: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vinBtnText: { color: C.text, fontWeight: '700', fontSize: 15 },
  heroSkip: { alignItems: 'center', paddingVertical: 12 },
  heroSkipText: { color: C.muted, fontSize: 13 },

  // Sections
  section: {
    maxWidth: MAX,
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 12,
  },
  sectionAlt: {
    maxWidth: 9999,
    width: '100%',
    backgroundColor: '#090F1C',
    paddingBottom: 48,
  },
  label: {
    fontSize: 10,
    fontWeight: '800',
    color: C.accent,
    letterSpacing: 2.5,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: C.text,
    lineHeight: 36,
    marginBottom: 10,
  },
  sectionSub: {
    fontSize: 14,
    color: C.sub,
    lineHeight: 21,
    marginBottom: 28,
  },

  // Benefits
  benefitsRow: { flexDirection: 'row', gap: 10 },
  benefitCard: {
    flex: 1,
    backgroundColor: C.card,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: C.border,
    alignItems: 'center',
  },
  benefitIconWrap: {
    width: 52, height: 52, borderRadius: 26,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 12,
  },
  benefitIcon: { fontSize: 24 },
  benefitTitle: {
    fontSize: 13, fontWeight: '700', color: C.text,
    textAlign: 'center', marginBottom: 6,
  },
  benefitDesc: {
    fontSize: 11, color: C.muted, textAlign: 'center', lineHeight: 16,
  },

  // Feature / Step grid (shared 2×2)
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  featureCard: {
    backgroundColor: C.card,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: C.border,
  },
  featureIcon: { fontSize: 28, marginBottom: 12 },
  featureTitle: {
    fontSize: 15, fontWeight: '700', color: C.text, marginBottom: 6,
  },
  featureDesc: { fontSize: 12, color: C.muted, lineHeight: 17 },

  stepCard: {
    backgroundColor: C.card,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: C.border,
  },
  stepN: {
    fontSize: 48,
    fontWeight: '800',
    color: C.accent + '28',
    lineHeight: 54,
    marginBottom: 4,
  },
  stepTitle: {
    fontSize: 14, fontWeight: '700', color: C.text, marginBottom: 6, lineHeight: 20,
  },
  stepDesc: { fontSize: 12, color: C.muted, lineHeight: 17 },

  // Premium
  premOuter: {
    maxWidth: MAX,
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 48,
  },
  premCard: {
    borderRadius: 24,
    padding: 28,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1A3060',
  },
  premGlow: {
    position: 'absolute', top: -50, right: -50,
    width: 200, height: 200, borderRadius: 100,
    backgroundColor: C.accent + '12',
  },
  premEye: {
    fontSize: 10, fontWeight: '800', color: C.gold,
    letterSpacing: 2.5, marginBottom: 10,
  },
  premTitle: { fontSize: 26, fontWeight: '800', color: C.text, marginBottom: 8 },
  premSub: { fontSize: 14, color: C.sub, marginBottom: 24 },
  premGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 14, marginBottom: 28 },
  premItem: {
    width: (MAX - 96) / 2,
    flexDirection: 'row', alignItems: 'center', gap: 8,
  },
  premItemIcon: { fontSize: 18 },
  premItemText: { fontSize: 13, color: '#A0B4CC', fontWeight: '500' },
  premBtn: { borderRadius: 14, overflow: 'hidden' },
  premBtnGrad: {
    paddingVertical: 15, alignItems: 'center', justifyContent: 'center',
  },
  premBtnText: { color: C.text, fontWeight: '700', fontSize: 15 },

  // Footer
  footer: {
    maxWidth: MAX,
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 56,
    alignItems: 'center',
  },
  footerTitle: {
    fontSize: 30, fontWeight: '800', color: C.text,
    textAlign: 'center', marginBottom: 10,
  },
  footerSub: {
    fontSize: 14, color: C.sub, textAlign: 'center', marginBottom: 28,
  },
  footerBtn: { width: '100%', borderRadius: 14, overflow: 'hidden', marginBottom: 16 },
  footerBtnGrad: {
    paddingVertical: 16, alignItems: 'center', justifyContent: 'center',
  },
  footerBtnText: { color: C.text, fontWeight: '700', fontSize: 16 },
  footerLink: { paddingVertical: 8 },
  footerLinkText: { color: C.muted, fontSize: 14 },
});
