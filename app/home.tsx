import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SW } = Dimensions.get('window');

// ─── Sub-components ───────────────────────────────────────────────────────────

function BenefitCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <View style={s.benefitCard}>
      <View style={s.benefitIconWrap}>
        <Text style={s.benefitIcon}>{icon}</Text>
      </View>
      <Text style={s.benefitTitle}>{title}</Text>
      <Text style={s.benefitDesc}>{desc}</Text>
    </View>
  );
}

function FeatureRow({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <View style={s.featureRow}>
      <View style={s.featureRowIconWrap}>
        <Text style={s.featureRowIcon}>{icon}</Text>
      </View>
      <View style={s.featureRowContent}>
        <Text style={s.featureRowTitle}>{title}</Text>
        <Text style={s.featureRowDesc}>{desc}</Text>
      </View>
    </View>
  );
}

function HowCard({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <View style={s.howCard}>
      <Text style={s.howN}>{n}</Text>
      <Text style={s.howTitle}>{title}</Text>
      <Text style={s.howDesc}>{desc}</Text>
    </View>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function HomeScreen() {
  const [vin, setVin] = useState('');

  return (
    <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* ── Nav ── */}
        <View style={s.nav}>
          <Text style={s.navLogo}>CarNet</Text>
          <TouchableOpacity style={s.navBtn} onPress={() => router.push('/login')}>
            <Text style={s.navBtnText}>Autentificare</Text>
          </TouchableOpacity>
        </View>

        {/* ── Hero ── */}
        <LinearGradient colors={['#0C1E3A', '#070E1A']} style={s.hero}>
          <View style={s.heroGlow} />

          <Text style={s.heroTitle}>
            Organizează documentele mașinii tale în câteva secunde
          </Text>
          <Text style={s.heroSub}>
            Adaugă VIN-ul, CarNet identifică mașina și ține evidența RCA,{' '}
            ITP și Rovinieta — cu alerte automate înainte de expirare.
          </Text>

          {/* VIN input */}
          <View style={s.vinBox}>
            <TextInput
              style={s.vinInput}
              placeholder="Introdu VIN-ul mașinii tale"
              placeholderTextColor="#3D5070"
              value={vin}
              onChangeText={t => setVin(t.toUpperCase())}
              maxLength={17}
              autoCapitalize="characters"
            />
            <TouchableOpacity
              style={s.vinBtn}
              onPress={() => router.push('/register')}
              activeOpacity={0.85}
            >
              <LinearGradient colors={['#1A6FFF', '#0A4FCC']} style={s.vinBtnGrad}>
                <Text style={s.vinBtnText}>Verifică acum</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={s.heroCTA2}
            onPress={() => router.push('/register')}
            activeOpacity={0.8}
          >
            <Text style={s.heroCTA2Text}>Nu am VIN →  Creează cont direct</Text>
          </TouchableOpacity>

          {/* Checklist */}
          <View style={s.checkList}>
            {[
              'RCA, ITP și Rovinieta la un loc',
              'Alerte cu 30 de zile înainte de expirare',
              'Identificare model și origine prin VIN',
              'Gratuit — fără card bancar',
            ].map(item => (
              <View key={item} style={s.checkRow}>
                <Text style={s.checkMark}>✓</Text>
                <Text style={s.checkText}>{item}</Text>
              </View>
            ))}
          </View>
        </LinearGradient>

        {/* ── De ce CarNet — 3 coloane ── */}
        <View style={s.section}>
          <Text style={s.sectionLabel}>DE CE CARNET</Text>
          <Text style={s.sectionTitle}>
            De ce șoferii inteligenți aleg CarNet
          </Text>
          <Text style={s.sectionSub}>
            Nu mai alergi după documente. CarNet face totul pentru tine.
          </Text>
          <View style={s.benefitsRow}>
            <BenefitCard
              icon="🔔"
              title="Evită amenzile"
              desc="Alerte automate cu 30 de zile înainte ca orice document să expire."
            />
            <BenefitCard
              icon="📋"
              title="Tot la un loc"
              desc="RCA, ITP, Rovinieta — toate mașinile, un singur loc."
            />
            <BenefitCard
              icon="⚡"
              title="Instantaneu"
              desc="Introduci VIN-ul și în secunde ai cardul digital complet."
            />
          </View>
        </View>

        {/* ── Ce gestionăm — feature rows ── */}
        <View style={[s.section, s.sectionAlt]}>
          <Text style={s.sectionLabel}>CE GESTIONĂM</Text>
          <Text style={s.sectionTitle}>
            Verificăm lucrurile pe care le uiți ușor
          </Text>
          <Text style={s.sectionSub}>
            CarNet urmărește toate documentele obligatorii ale vehiculului tău.
          </Text>

          <View style={s.featureGrid}>
            <FeatureRow
              icon="🛡️"
              title="RCA — Asigurare obligatorie"
              desc="Știi exact câte zile mai ai până la expirarea poliței și primești alertă din timp. Nu mai riști amenzi sau probleme la control."
            />
            <FeatureRow
              icon="🔧"
              title="ITP — Inspecție tehnică periodică"
              desc="Urmărești data ITP-ului fiecărei mașini. Alerta vine cu 30 de zile înainte — suficient timp să faci programare."
            />
            <FeatureRow
              icon="🛣️"
              title="Rovinieta"
              desc="Urmărești valabilitatea rovinietei pe toate mașinile din cont. Nu mai plătești amenzi pentru rovinieta expirată."
            />
            <FeatureRow
              icon="🔍"
              title="Origine și model prin VIN"
              desc="Introduci seria VIN de 17 caractere și afli instant marca, modelul, generația și originea vehiculului (EU / NA / JP)."
            />
          </View>
        </View>

        {/* ── Cum funcționează — 2×2 grid ── */}
        <View style={s.section}>
          <Text style={s.sectionLabel}>CUM FUNCȚIONEAZĂ</Text>
          <Text style={s.sectionTitle}>Cum funcționează</Text>
          <Text style={s.sectionSub}>
            Aflați ce verificăm, cât de repede se întâmplă și ce primiți:
          </Text>
          <View style={s.howGrid}>
            <HowCard
              n="1"
              title="Introdu VIN-ul mașinii"
              desc="Introdu seria VIN formată din 17 caractere și CarNet identifică automat marca, modelul și generația."
            />
            <HowCard
              n="2"
              title="Creează contul gratuit"
              desc="Înregistrare în mai puțin de un minut, fără card bancar și fără date personale inutile."
            />
            <HowCard
              n="3"
              title="Adaugă documentele"
              desc="Completezi datele de expirare pentru RCA, ITP și Rovinieta — o singură dată, CarNet ține minte."
            />
            <HowCard
              n="4"
              title="Primești alerte automate"
              desc="Cu 30 de zile înainte de fiecare expirare ești notificat. Nicio amendă, niciun document uitat."
            />
          </View>
        </View>

        {/* ── Premium ── */}
        <LinearGradient colors={['#0F1F3D', '#0A1628']} style={s.premiumSection}>
          <View style={s.premiumInner}>
            <Text style={s.premiumEyebrow}>PREMIUM</Text>
            <Text style={s.premiumTitle}>Fă un pas în plus</Text>
            <Text style={s.premiumSub}>
              Deblochează tot potențialul aplicației cu CarNet Premium.
            </Text>
            <View style={s.premiumGrid}>
              {[
                { icon: '🚗', text: 'Mașini nelimitate în cont' },
                { icon: '📤', text: 'Export PDF documente' },
                { icon: '📊', text: 'Rapoarte detaliate per vehicul' },
                { icon: '🔔', text: 'Alerte push avansate' },
              ].map(p => (
                <View key={p.text} style={s.premiumItem}>
                  <Text style={s.premiumItemIcon}>{p.icon}</Text>
                  <Text style={s.premiumItemText}>{p.text}</Text>
                </View>
              ))}
            </View>
            <TouchableOpacity
              style={s.premiumBtn}
              onPress={() => router.push('/register')}
              activeOpacity={0.85}
            >
              <LinearGradient colors={['#1A6FFF', '#0A4FCC']} style={s.premiumBtnGrad}>
                <Text style={s.premiumBtnText}>Încearcă gratuit →</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* ── Footer CTA ── */}
        <View style={s.footerCta}>
          <Text style={s.footerTitle}>Gata să începi?</Text>
          <Text style={s.footerSub}>
            Contul gratuit include toate funcțiile de bază.{'\n'}Niciun card necesar.
          </Text>
          <TouchableOpacity
            style={s.footerBtn}
            onPress={() => router.push('/register')}
            activeOpacity={0.85}
          >
            <LinearGradient colors={['#1A6FFF', '#0A4FCC']} style={s.footerBtnGrad}>
              <Text style={s.footerBtnText}>Creează cont gratuit</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={s.footerSecondary}
            onPress={() => router.push('/login')}
            activeOpacity={0.8}
          >
            <Text style={s.footerSecondaryText}>Ai deja cont? Intră →</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const CARD_W = (SW - 48) / 2;

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#070E1A' },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 48 },

  // ── Nav
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  navLogo: { fontSize: 22, fontWeight: '800', color: '#FFFFFF', letterSpacing: 1 },
  navBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  navBtnText: { color: '#FFFFFF', fontSize: 13, fontWeight: '600' },

  // ── Hero
  hero: {
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 36,
    overflow: 'hidden',
  },
  heroGlow: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#1A6FFF18',
    top: -80,
    right: -80,
  },
  heroTitle: {
    fontSize: 34,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 42,
    marginBottom: 16,
  },
  heroSub: {
    fontSize: 15,
    color: '#7A8FAF',
    lineHeight: 23,
    marginBottom: 28,
  },

  // VIN input
  vinBox: {
    backgroundColor: '#0D1B2E',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1A2E50',
    padding: 6,
    gap: 8,
    marginBottom: 12,
  },
  vinInput: {
    color: '#FFFFFF',
    fontSize: 15,
    paddingHorizontal: 14,
    paddingVertical: 12,
    letterSpacing: 1,
  },
  vinBtn: { borderRadius: 12, overflow: 'hidden' },
  vinBtnGrad: {
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vinBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },

  heroCTA2: {
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 20,
  },
  heroCTA2Text: { color: '#4A6FA5', fontSize: 13 },

  // Checklist
  checkList: { gap: 10 },
  checkRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  checkMark: { color: '#1A6FFF', fontSize: 15, fontWeight: '700', width: 18 },
  checkText: { color: '#8899BB', fontSize: 14, flex: 1 },

  // ── Sections
  section: {
    paddingHorizontal: 20,
    paddingTop: 44,
    paddingBottom: 8,
  },
  sectionAlt: {
    backgroundColor: '#0B1525',
    paddingBottom: 36,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1A6FFF',
    letterSpacing: 2,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 33,
    marginBottom: 10,
  },
  sectionSub: {
    fontSize: 14,
    color: '#6688AA',
    lineHeight: 21,
    marginBottom: 28,
  },

  // ── Benefits — 3 columns
  benefitsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  benefitCard: {
    flex: 1,
    backgroundColor: '#0D1B2E',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#132040',
    alignItems: 'center',
  },
  benefitIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(26,111,255,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  benefitIcon: { fontSize: 22 },
  benefitTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 6,
  },
  benefitDesc: {
    fontSize: 11,
    color: '#5577AA',
    textAlign: 'center',
    lineHeight: 16,
  },

  // ── Feature rows
  featureGrid: { gap: 16 },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    backgroundColor: '#0D1B2E',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#132040',
  },
  featureRowIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(26,111,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  featureRowIcon: { fontSize: 20 },
  featureRowContent: { flex: 1 },
  featureRowTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  featureRowDesc: {
    fontSize: 12,
    color: '#5577AA',
    lineHeight: 18,
  },

  // ── How it works — 2×2 grid
  howGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  howCard: {
    width: CARD_W,
    backgroundColor: '#0D1B2E',
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: '#132040',
  },
  howN: {
    fontSize: 56,
    fontWeight: '800',
    color: 'rgba(26,111,255,0.25)',
    lineHeight: 64,
    marginBottom: 4,
  },
  howTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    lineHeight: 20,
  },
  howDesc: {
    fontSize: 12,
    color: '#5577AA',
    lineHeight: 18,
  },

  // ── Premium
  premiumSection: {
    marginTop: 44,
    marginHorizontal: 16,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1A3060',
  },
  premiumInner: { padding: 28 },
  premiumEyebrow: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFB800',
    letterSpacing: 2,
    marginBottom: 10,
  },
  premiumTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  premiumSub: {
    fontSize: 14,
    color: '#6688AA',
    lineHeight: 21,
    marginBottom: 24,
  },
  premiumGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 28,
  },
  premiumItem: {
    width: (SW - 88) / 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  premiumItemIcon: { fontSize: 18 },
  premiumItemText: { fontSize: 13, color: '#AABBD4', fontWeight: '500' },
  premiumBtn: { borderRadius: 14, overflow: 'hidden' },
  premiumBtnGrad: {
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  premiumBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },

  // ── Footer CTA
  footerCta: {
    marginTop: 44,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  footerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  footerSub: {
    fontSize: 14,
    color: '#6688AA',
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: 24,
  },
  footerBtn: { width: '100%', borderRadius: 14, overflow: 'hidden', marginBottom: 14 },
  footerBtnGrad: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 },
  footerSecondary: { paddingVertical: 8 },
  footerSecondaryText: { color: '#4A6FA5', fontSize: 14 },
});
