import React, { useEffect, useMemo, useRef, useState } from 'react';
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
import { useThemeStore } from '../store/useThemeStore';
import { DARK, LIGHT, ThemeColors } from '../constants/themes';

const { width: SW } = Dimensions.get('window');
const MAX = Math.min(SW, 520);
const HALF = (MAX - 52) / 2;

// ─── Mock card ────────────────────────────────────────────────────────────────

function MockDocRow({
  label, days, color,
}: { label: string; days: number; color: string }) {
  return (
    <View style={m.row}>
      <Text style={m.rowLabel}>{label}</Text>
      <View style={[m.badge, { borderColor: color + '55', backgroundColor: color + '15' }]}>
        <View style={[m.dot, { backgroundColor: color }]} />
        <Text style={[m.days, { color }]}>{days} zile</Text>
      </View>
    </View>
  );
}

function MockCard({ floatY, colors }: { floatY: Animated.Value; colors: ThemeColors }) {
  const isDark = colors === DARK;
  const cardBg = isDark ? ['#102040', '#081628'] : ['#FFFFFF', '#F0F7FF'];
  const borderCol = isDark ? '#1A3860' : colors.border;
  const nameCol = isDark ? '#FFFFFF' : colors.text;
  const genCol = isDark ? '#7A95B8' : colors.sub;
  const labelCol = isDark ? '#7A95B8' : colors.sub;
  return (
    <Animated.View
      style={[
        m.wrap,
        {
          borderColor: borderCol,
          shadowColor: colors.accent,
          shadowOpacity: isDark ? 0.2 : 0.12,
          transform: [{ translateY: floatY }],
        },
      ]}
    >
      <LinearGradient colors={cardBg} style={m.card}>
        <View style={[m.glow, { backgroundColor: colors.accent + '18' }]} />
        <View style={m.head}>
          <Text style={m.flag}>🇩🇪</Text>
          <View style={m.headText}>
            <Text style={[m.make, { color: nameCol }]}>BMW 3 Series</Text>
            <Text style={[m.gen, { color: genCol }]}>G20 · 2022 · EU</Text>
          </View>
          <View style={[m.onlineDot, { backgroundColor: colors.green }]} />
        </View>
        <View style={[m.sep, { backgroundColor: isDark ? '#1A3050' : colors.border }]} />
        <MockDocRow label="RCA" days={45} color={colors.green} />
        <MockDocRow label="ITP" days={118} color={colors.green} />
        <MockDocRow label="Rovinieta" days={12} color={colors.warn} />
      </LinearGradient>
    </Animated.View>
  );
}

const m = StyleSheet.create({
  wrap: {
    marginTop: 28,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 24,
    elevation: 12,
  },
  card: { padding: 20, overflow: 'hidden' },
  glow: {
    position: 'absolute', top: -40, right: -40,
    width: 120, height: 120, borderRadius: 60,
  },
  head: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  flag: { fontSize: 28 },
  headText: { flex: 1 },
  make: { fontSize: 16, fontWeight: '700' },
  gen: { fontSize: 12, marginTop: 2 },
  onlineDot: {
    width: 8, height: 8, borderRadius: 4,
    shadowOpacity: 0.8, shadowRadius: 4, elevation: 2,
  },
  sep: { height: 1, marginBottom: 14 },
  row: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', marginBottom: 10,
  },
  rowLabel: { fontSize: 13 },
  badge: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: 20, borderWidth: 1,
  },
  dot: { width: 6, height: 6, borderRadius: 3 },
  days: { fontSize: 12, fontWeight: '600' },
});

// ─── Section sub-components ───────────────────────────────────────────────────

function BenefitCard({
  icon, title, desc, colors,
}: { icon: string; title: string; desc: string; colors: ThemeColors }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.card,
        borderRadius: 18,
        padding: 16,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: 'center',
        shadowColor: colors.shadowColor,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: colors.shadowOpacity,
        shadowRadius: 12,
        elevation: colors.shadowOpacity > 0 ? 3 : 0,
      }}
    >
      <View
        style={{
          width: 52, height: 52, borderRadius: 26,
          backgroundColor: colors.accent + '1A',
          justifyContent: 'center', alignItems: 'center',
          marginBottom: 12,
        }}
      >
        <Text style={{ fontSize: 24 }}>{icon}</Text>
      </View>
      <Text style={{ fontSize: 13, fontWeight: '700', color: colors.text, textAlign: 'center', marginBottom: 6 }}>
        {title}
      </Text>
      <Text style={{ fontSize: 11, color: colors.muted, textAlign: 'center', lineHeight: 16 }}>
        {desc}
      </Text>
    </View>
  );
}

function FeatureRow({
  icon, title, desc, colors,
}: { icon: string; title: string; desc: string; colors: ThemeColors }) {
  return (
    <View
      style={{
        backgroundColor: colors.card,
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: colors.border,
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 16,
        shadowColor: colors.shadowColor,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: colors.shadowOpacity,
        shadowRadius: 10,
        elevation: colors.shadowOpacity > 0 ? 2 : 0,
      }}
    >
      <View
        style={{
          width: 52, height: 52, borderRadius: 14,
          backgroundColor: colors.accent + '15',
          justifyContent: 'center', alignItems: 'center',
          flexShrink: 0,
        }}
      >
        <Text style={{ fontSize: 24 }}>{icon}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 15, fontWeight: '700', color: colors.text, marginBottom: 6 }}>
          {title}
        </Text>
        <Text style={{ fontSize: 13, color: colors.sub, lineHeight: 19 }}>
          {desc}
        </Text>
      </View>
    </View>
  );
}

function StepCard({
  n, title, desc, colors,
}: { n: string; title: string; desc: string; colors: ThemeColors }) {
  return (
    <View
      style={{
        width: HALF,
        backgroundColor: colors.card,
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: colors.border,
        shadowColor: colors.shadowColor,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: colors.shadowOpacity,
        shadowRadius: 14,
        elevation: colors.shadowOpacity > 0 ? 3 : 0,
      }}
    >
      <View
        style={{
          width: 56, height: 56, borderRadius: 28,
          backgroundColor: colors.stepCircleBg,
          borderWidth: 2,
          borderColor: colors.stepCircleBorder,
          justifyContent: 'center', alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: '800', color: colors.accent }}>{n}</Text>
      </View>
      <Text style={{ fontSize: 14, fontWeight: '700', color: colors.text, marginBottom: 8, lineHeight: 20 }}>
        {title}
      </Text>
      <Text style={{ fontSize: 12, color: colors.muted, lineHeight: 18 }}>
        {desc}
      </Text>
    </View>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function HomeScreen() {
  const { theme, toggleTheme } = useThemeStore();
  const colors = theme === 'dark' ? DARK : LIGHT;
  const isDark = theme === 'dark';
  const s = useMemo(() => makeStyles(colors), [theme]);

  const [vin, setVin] = useState('');

  const fade = [0, 1, 2, 3].map(() => useRef(new Animated.Value(0)).current);
  const floatY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.stagger(
      120,
      fade.map(a => Animated.spring(a, { toValue: 1, useNativeDriver: true, tension: 50, friction: 8 })),
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(floatY, { toValue: -10, duration: 2800, useNativeDriver: true }),
        Animated.timing(floatY, { toValue: 0, duration: 2800, useNativeDriver: true }),
      ]),
    ).start();
  }, []);

  const anim = (i: number) => ({
    opacity: fade[i],
    transform: [{ translateY: fade[i].interpolate({ inputRange: [0, 1], outputRange: [24, 0] }) }],
  });

  return (
    <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
      <ScrollView style={s.scroll} contentContainerStyle={s.scrollContent} showsVerticalScrollIndicator={false}>

        {/* ── Nav ── */}
        <View style={s.navOuter}>
          <View style={s.navInner}>
            <Text style={s.navLogo}>CarNet</Text>
            <View style={s.navRight}>
              <TouchableOpacity style={s.themeToggle} onPress={toggleTheme} activeOpacity={0.7}>
                <Text style={s.themeIcon}>{isDark ? '☀️' : '🌙'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={s.navBtn} onPress={() => router.push('/login')}>
                <Text style={s.navBtnText}>Autentificare</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* ── Hero ── */}
        <LinearGradient colors={colors.heroBg} style={s.heroOuter}>
          <View style={[s.glowTR, { backgroundColor: colors.accent + '18' }]} />
          <View style={[s.glowBL, { backgroundColor: colors.accent + '10' }]} />

          <View style={s.heroInner}>
            <Animated.View style={anim(0)}>
              <Text style={s.heroLabel}>GESTIONARE AUTO INTELIGENTĂ</Text>
              <Text style={s.heroTitle}>
                Organizează documentele{'\n'}mașinii în câteva secunde
              </Text>
            </Animated.View>

            <Animated.View style={[s.bullets, anim(1)]}>
              {[
                'RCA, ITP și Rovinieta la un loc',
                'Alerte cu 30 de zile înainte de expirare',
                'Identificare model și origine prin VIN',
              ].map(t => (
                <View key={t} style={s.bullet}>
                  <Text style={s.bulletMark}>✓</Text>
                  <Text style={s.bulletText}>{t}</Text>
                </View>
              ))}
            </Animated.View>

            <Animated.View style={anim(2)}>
              <View style={s.vinBox}>
                <TextInput
                  style={s.vinInput}
                  placeholder="Introdu VIN-ul mașinii (17 caractere)"
                  placeholderTextColor={colors.inputPlaceholder}
                  value={vin}
                  onChangeText={t => setVin(t.toUpperCase())}
                  maxLength={17}
                  autoCapitalize="characters"
                />
                <TouchableOpacity
                  onPress={() => router.push('/register')}
                  activeOpacity={0.85}
                >
                  <LinearGradient colors={[colors.accent, colors.acDark]} style={s.vinBtnGrad}>
                    <Text style={s.vinBtnText}>Verifică acum</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={s.vinSkip} onPress={() => router.push('/register')} activeOpacity={0.7}>
                <Text style={s.vinSkipText}>Nu am VIN · Creează cont direct →</Text>
              </TouchableOpacity>
            </Animated.View>

            <Animated.View style={anim(3)}>
              <MockCard floatY={floatY} colors={colors} />
            </Animated.View>
          </View>
        </LinearGradient>

        {/* ── De ce CarNet — 3 benefit cards ── */}
        <View style={s.section}>
          <Text style={s.sectionLabel}>DE CE CARNET</Text>
          <Text style={s.sectionTitle}>De ce șoferii inteligenți{'\n'}aleg CarNet</Text>
          <Text style={s.sectionSub}>Nu mai alergi după documente. CarNet are grijă de tot.</Text>
          <View style={s.benefitsRow}>
            <BenefitCard icon="🔔" title="Evită amenzile" desc="Alertă automată cu 30 zile înainte ca orice document să expire." colors={colors} />
            <BenefitCard icon="📋" title="Tot la un loc" desc="RCA, ITP, Rovinieta — toate mașinile, un singur dashboard." colors={colors} />
            <BenefitCard icon="⚡" title="Instantaneu" desc="Introduci VIN-ul și în secunde ai cardul digital complet." colors={colors} />
          </View>
        </View>

        {/* ── Ce gestionăm — feature rows ── */}
        <View style={[s.section, { backgroundColor: colors.bgAlt, paddingBottom: 44 }]}>
          <Text style={s.sectionLabel}>CE GESTIONĂM</Text>
          <Text style={s.sectionTitle}>Verificăm tot ce{'\n'}contează</Text>
          <Text style={s.sectionSub}>Documentele tale obligatorii, urmărite automat.</Text>
          <View style={s.featuresList}>
            <FeatureRow icon="🛡️" title="RCA — Asigurare obligatorie" desc="Știi exact câte zile ai până la expirarea poliței și primești alertă din timp. Nu mai riști amenzi sau probleme la control." colors={colors} />
            <FeatureRow icon="🔧" title="ITP — Inspecție tehnică periodică" desc="Urmărești data ITP-ului fiecărei mașini. Alerta vine cu 30 de zile înainte — suficient timp să faci programare." colors={colors} />
            <FeatureRow icon="🛣️" title="Rovinieta" desc="Urmărești valabilitatea rovinietei pe toate mașinile din cont. Nu mai plătești amenzi pentru rovinieta expirată." colors={colors} />
            <FeatureRow icon="🔍" title="Origine și model prin VIN" desc="Introduci seria VIN de 17 caractere și afli instant marca, modelul, generația și originea vehiculului (EU / NA / JP)." colors={colors} />
          </View>
        </View>

        {/* ── Cum funcționează — 2×2 step grid ── */}
        <View style={s.section}>
          <Text style={s.sectionLabel}>CUM FUNCȚIONEAZĂ</Text>
          <Text style={s.sectionTitle}>Cum funcționează</Text>
          <Text style={s.sectionSub}>
            Aflați ce verificăm, cât de repede se întâmplă și ce primiți:
          </Text>
          <View style={s.stepGrid}>
            <StepCard n="1" title="Creează contul gratuit" desc="Înregistrare în mai puțin de un minut, fără card bancar și fără date personale inutile." colors={colors} />
            <StepCard n="2" title="Introdu VIN-ul mașinii" desc="CarNet identifică automat marca, modelul și generația vehiculului." colors={colors} />
            <StepCard n="3" title="Adaugă documentele" desc="Completezi datele de expirare pentru RCA, ITP și Rovinieta — o dată, CarNet ține minte." colors={colors} />
            <StepCard n="4" title="Primești alerte automate" desc="Cu 30 de zile înainte de fiecare expirare ești notificat. Nicio amendă, niciun document uitat." colors={colors} />
          </View>
        </View>

        {/* ── Premium ── */}
        <View style={s.premOuter}>
          <LinearGradient
            colors={isDark ? ['#0F1E3A', '#091525'] : ['#1A3A70', '#0A2050']}
            style={s.premCard}
          >
            <View style={[s.premGlow, { backgroundColor: colors.accent + '18' }]} />
            <Text style={s.premEye}>PREMIUM</Text>
            <Text style={s.premTitle}>Fă un pas în plus</Text>
            <Text style={s.premSub}>Deblochează tot potențialul aplicației cu CarNet Premium.</Text>
            <View style={s.premGrid}>
              {[
                { icon: '🚗', text: 'Mașini nelimitate' },
                { icon: '📤', text: 'Export PDF documente' },
                { icon: '📊', text: 'Rapoarte detaliate' },
                { icon: '🔔', text: 'Alerte push avansate' },
              ].map(p => (
                <View key={p.text} style={s.premItem}>
                  <Text style={s.premItemIcon}>{p.icon}</Text>
                  <Text style={s.premItemText}>{p.text}</Text>
                </View>
              ))}
            </View>
            <TouchableOpacity onPress={() => router.push('/register')} activeOpacity={0.85}>
              <LinearGradient colors={[colors.accent, colors.acDark]} style={s.premBtn}>
                <Text style={s.premBtnText}>Încearcă gratuit →</Text>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* ── Footer CTA ── */}
        <View style={s.footer}>
          <Text style={s.footerTitle}>Gata să începi?</Text>
          <Text style={s.footerSub}>Cont gratuit · fără card · în mai puțin de un minut.</Text>
          <TouchableOpacity onPress={() => router.push('/register')} activeOpacity={0.85} style={s.footerBtn}>
            <LinearGradient colors={[colors.accent, colors.acDark]} style={s.footerBtnGrad}>
              <Text style={s.footerBtnText}>Creează cont gratuit</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/login')} style={s.footerLink}>
            <Text style={s.footerLinkText}>Ai deja cont? Intră →</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles factory ───────────────────────────────────────────────────────────

function makeStyles(c: ThemeColors) {
  return StyleSheet.create({
    safe: { flex: 1, backgroundColor: c.bg },
    scroll: { flex: 1 },
    scrollContent: { paddingBottom: 60 },

    // Nav
    navOuter: { backgroundColor: c.navBg, borderBottomWidth: 1, borderBottomColor: c.navBorder },
    navInner: {
      maxWidth: MAX, alignSelf: 'center', width: '100%',
      flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
      paddingHorizontal: 20, paddingVertical: 14,
    },
    navLogo: { fontSize: 21, fontWeight: '800', color: c.text, letterSpacing: 0.5 },
    navRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    themeToggle: {
      width: 36, height: 36, borderRadius: 18,
      backgroundColor: c.accent + '15',
      justifyContent: 'center', alignItems: 'center',
    },
    themeIcon: { fontSize: 18 },
    navBtn: {
      paddingHorizontal: 16, paddingVertical: 8,
      borderRadius: 20, borderWidth: 1, borderColor: c.border,
    },
    navBtnText: { color: c.text, fontSize: 13, fontWeight: '600' },

    // Hero
    heroOuter: { overflow: 'hidden' },
    glowTR: {
      position: 'absolute', top: -60, right: -60,
      width: 260, height: 260, borderRadius: 130,
    },
    glowBL: {
      position: 'absolute', bottom: -40, left: -40,
      width: 180, height: 180, borderRadius: 90,
    },
    heroInner: {
      maxWidth: MAX, alignSelf: 'center', width: '100%',
      paddingHorizontal: 20, paddingTop: 36, paddingBottom: 48,
    },
    heroLabel: {
      fontSize: 10, fontWeight: '700', color: c.accent,
      letterSpacing: 2.5, marginBottom: 14,
    },
    heroTitle: {
      fontSize: 34, fontWeight: '800', color: c.text,
      lineHeight: 42, marginBottom: 22,
    },

    // Bullets
    bullets: { gap: 10, marginBottom: 26 },
    bullet: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    bulletMark: { color: c.accent, fontWeight: '700', fontSize: 14, width: 16 },
    bulletText: { color: c.sub, fontSize: 14, flex: 1 },

    // VIN input
    vinBox: {
      backgroundColor: c.inputBg,
      borderRadius: 16, borderWidth: 1, borderColor: c.inputBorder,
      overflow: 'hidden',
      shadowColor: c.shadowColor,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: c.shadowOpacity,
      shadowRadius: 12,
      elevation: c.shadowOpacity > 0 ? 4 : 0,
    },
    vinInput: {
      color: c.inputText, fontSize: 15,
      paddingHorizontal: 16, paddingVertical: 14, letterSpacing: 1,
    },
    vinBtnGrad: { paddingVertical: 16, alignItems: 'center', justifyContent: 'center' },
    vinBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },
    vinSkip: { alignItems: 'center', paddingVertical: 12 },
    vinSkipText: { color: c.muted, fontSize: 13 },

    // Sections
    section: {
      maxWidth: MAX, alignSelf: 'center', width: '100%',
      paddingHorizontal: 20, paddingTop: 48, paddingBottom: 12,
    },
    sectionLabel: {
      fontSize: 10, fontWeight: '800', color: c.accent,
      letterSpacing: 2.5, marginBottom: 12,
    },
    sectionTitle: {
      fontSize: 28, fontWeight: '800', color: c.text,
      lineHeight: 36, marginBottom: 10,
    },
    sectionSub: { fontSize: 14, color: c.sub, lineHeight: 21, marginBottom: 24 },

    // Benefits
    benefitsRow: { flexDirection: 'row', gap: 10 },

    // Feature rows
    featuresList: { gap: 12 },

    // Step grid
    stepGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },

    // Premium
    premOuter: {
      maxWidth: MAX, alignSelf: 'center', width: '100%',
      paddingHorizontal: 20, paddingTop: 48,
    },
    premCard: {
      borderRadius: 24, padding: 28, overflow: 'hidden',
      borderWidth: 1, borderColor: c.accent + '30',
    },
    premGlow: {
      position: 'absolute', top: -50, right: -50,
      width: 200, height: 200, borderRadius: 100,
    },
    premEye: {
      fontSize: 10, fontWeight: '800', color: c.gold,
      letterSpacing: 2.5, marginBottom: 10,
    },
    premTitle: { fontSize: 26, fontWeight: '800', color: '#FFFFFF', marginBottom: 8 },
    premSub: { fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 24 },
    premGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 14, marginBottom: 28 },
    premItem: { width: (MAX - 96) / 2, flexDirection: 'row', alignItems: 'center', gap: 8 },
    premItemIcon: { fontSize: 18 },
    premItemText: { fontSize: 13, color: 'rgba(255,255,255,0.75)', fontWeight: '500' },
    premBtn: { borderRadius: 14, paddingVertical: 15, alignItems: 'center', justifyContent: 'center' },
    premBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },

    // Footer
    footer: {
      maxWidth: MAX, alignSelf: 'center', width: '100%',
      paddingHorizontal: 20, paddingTop: 56, alignItems: 'center',
    },
    footerTitle: {
      fontSize: 30, fontWeight: '800', color: c.text,
      textAlign: 'center', marginBottom: 10,
    },
    footerSub: { fontSize: 14, color: c.sub, textAlign: 'center', marginBottom: 28 },
    footerBtn: { width: '100%', borderRadius: 14, overflow: 'hidden', marginBottom: 16 },
    footerBtnGrad: { paddingVertical: 16, alignItems: 'center', justifyContent: 'center' },
    footerBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 },
    footerLink: { paddingVertical: 8 },
    footerLinkText: { color: c.muted, fontSize: 14 },
  });
}
