import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  RefreshControl,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useCarStore } from '../store/useCarStore';
import CarCard from '../components/CarCard';
import { Colors } from '../constants/colors';

// ─── Helpers ────────────────────────────────────────────────────────────────

function parseDate(dateStr?: string): Date | null {
  if (!dateStr) return null;
  const [d, m, y] = dateStr.split('.').map(Number);
  return new Date(y, m - 1, d);
}

function daysUntil(dateStr?: string): number | null {
  const d = parseDate(dateStr);
  if (!d) return null;
  return Math.ceil((d.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
}

function isExpired(dateStr?: string): boolean {
  const d = daysUntil(dateStr);
  return d !== null && d < 0;
}

function isExpiringSoon(dateStr?: string): boolean {
  const d = daysUntil(dateStr);
  return d !== null && d >= 0 && d <= 30;
}

// ─── Avatar Dropdown ─────────────────────────────────────────────────────────

function AvatarDropdown({
  visible, isGuest, onClose, onLogout,
}: {
  visible: boolean; isGuest: boolean;
  onClose: () => void; onLogout: () => void;
}) {
  if (!visible) return null;
  return (
    <>
      <Pressable style={dd.backdrop} onPress={onClose} />
      <View style={dd.dropdown}>
        <View style={dd.arrow} />
        {isGuest ? (
          <>
            <TouchableOpacity style={dd.item} onPress={() => { onClose(); router.push('/login'); }}>
              <View style={[dd.iconWrap, { backgroundColor: Colors.accent + '20' }]}>
                <Text style={dd.icon}>🔑</Text>
              </View>
              <View>
                <Text style={dd.label}>Autentifică-te</Text>
                <Text style={dd.sub}>Ai deja un cont</Text>
              </View>
            </TouchableOpacity>
            <View style={dd.sep} />
            <TouchableOpacity style={dd.item} onPress={() => { onClose(); router.push('/register'); }}>
              <View style={[dd.iconWrap, { backgroundColor: Colors.success + '20' }]}>
                <Text style={dd.icon}>✨</Text>
              </View>
              <View>
                <Text style={dd.label}>Înregistrează-te</Text>
                <Text style={dd.sub}>Creează un cont nou</Text>
              </View>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={dd.item} onPress={onLogout}>
            <View style={[dd.iconWrap, { backgroundColor: Colors.danger + '20' }]}>
              <Text style={dd.icon}>🚪</Text>
            </View>
            <View>
              <Text style={[dd.label, { color: Colors.danger }]}>Deconectează-te</Text>
              <Text style={dd.sub}>Ieși din cont</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
}

// ─── Alert Card ──────────────────────────────────────────────────────────────

function AlertCard({ carName, docType, dateStr }: {
  carName: string; docType: string; dateStr: string;
}) {
  const days = daysUntil(dateStr) ?? 0;
  const expired = days < 0;
  const color = expired ? Colors.danger : Colors.warning;
  const bg = expired ? '#3B0000' : '#2D1800';
  return (
    <TouchableOpacity
      style={[s.alertCard, { backgroundColor: bg, borderColor: color + '55' }]}
      onPress={() => {}}
      activeOpacity={0.8}
    >
      <View style={[s.alertDot, { backgroundColor: color }]} />
      <View style={{ flex: 1 }}>
        <Text style={s.alertCarName} numberOfLines={1}>{carName}</Text>
        <Text style={[s.alertDoc, { color }]}>
          {docType} — {expired ? `expirat acum ${Math.abs(days)} zile` : `expiră în ${days} zile`}
        </Text>
      </View>
      <Text style={[s.alertArrow, { color }]}>›</Text>
    </TouchableOpacity>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function HomeScreen() {
  const { user, cars, canAddCar, deleteCar, logout, loadCars } = useCarStore();
  const [refreshing, setRefreshing] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [premiumModalVisible, setPremiumModalVisible] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{ visible: boolean; carId: string; carName: string }>({
    visible: false, carId: '', carName: '',
  });

  const isGuest = user?.isGuest === true;

  // Build alerts from all cars
  const alerts: { carName: string; docType: string; dateStr: string }[] = [];
  cars.forEach(car => {
    const name = `${car.make} ${car.model}`;
    if (isExpired(car.insuranceExpiry) || isExpiringSoon(car.insuranceExpiry))
      alerts.push({ carName: name, docType: 'RCA', dateStr: car.insuranceExpiry! });
    if (isExpired(car.itpExpiry) || isExpiringSoon(car.itpExpiry))
      alerts.push({ carName: name, docType: 'ITP', dateStr: car.itpExpiry! });
    if (isExpired(car.rovinetaExpiry) || isExpiringSoon(car.rovinetaExpiry))
      alerts.push({ carName: name, docType: 'Rovinieta', dateStr: car.rovinetaExpiry! });
  });

  // Stats
  const activeRCA = cars.filter(c => {
    const d = daysUntil(c.insuranceExpiry);
    return d !== null && d >= 0;
  }).length;
  const activeITP = cars.filter(c => {
    const d = daysUntil(c.itpExpiry);
    return d !== null && d >= 0;
  }).length;

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadCars();
    setRefreshing(false);
  };

  const handleAddCar = () => {
    if (!canAddCar()) { setPremiumModalVisible(true); return; }
    router.push('/add-car');
  };

  const handleLogout = async () => {
    setDropdownVisible(false);
    await logout();
    router.replace('/login');
  };

  const confirmDelete = () => {
    deleteCar(deleteModal.carId);
    setDeleteModal({ visible: false, carId: '', carName: '' });
  };

  return (
    <View style={s.root}>
      <SafeAreaView style={s.safe} edges={['top']}>

        {/* ── Navbar ── */}
        <View style={s.navbar}>
          <View>
            <Text style={s.navLogo}>CarNet</Text>
            <Text style={s.navTagline}>Istoricul tău auto</Text>
          </View>
          <View style={s.navRight}>
            {!user?.isPremium && (
              <TouchableOpacity
                style={s.freePill}
                onPress={() => setPremiumModalVisible(true)}
              >
                <Text style={s.freePillText}>GRATUIT</Text>
              </TouchableOpacity>
            )}
            {user?.isPremium && (
              <View style={s.premiumPill}>
                <Text style={s.premiumPillText}>PREMIUM</Text>
              </View>
            )}
            <View style={s.avatarWrap}>
              <TouchableOpacity
                style={s.avatarBtn}
                onPress={() => setDropdownVisible(v => !v)}
              >
                <Text style={s.avatarLetter}>
                  {(user?.displayName || 'U')[0].toUpperCase()}
                </Text>
              </TouchableOpacity>
              <AvatarDropdown
                visible={dropdownVisible}
                isGuest={isGuest}
                onClose={() => setDropdownVisible(false)}
                onLogout={handleLogout}
              />
            </View>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={s.scroll}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor={Colors.accent} />
          }
        >

          {/* ── Hero ── */}
          <LinearGradient
            colors={['#0F2744', '#0A1628']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={s.hero}
          >
            {/* Decorative glow */}
            <View style={s.heroGlow1} />
            <View style={s.heroGlow2} />

            <Text style={s.heroEyebrow}>
              {cars.length > 0
                ? `Bună, ${user?.displayName?.split(' ')[0] || 'șofer'}! 👋`
                : 'Bun venit la CarNet'}
            </Text>
            <Text style={s.heroTitle}>
              {cars.length > 0
                ? 'Tabloul de\nbord auto'
                : 'Istoricul complet\nal mașinii tale'}
            </Text>
            <Text style={s.heroSub}>
              {cars.length > 0
                ? 'Toate documentele și datele mașinilor tale, într-un singur loc.'
                : 'Adaugă VIN-ul și ai instantaneu un card digital cu toate datele vehiculului.'}
            </Text>

            <TouchableOpacity style={s.heroBtn} onPress={handleAddCar} activeOpacity={0.85}>
              <LinearGradient
                colors={[Colors.accent, '#2563EB']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={s.heroBtnGrad}
              >
                <Text style={s.heroBtnText}>+ Adaugă mașina</Text>
              </LinearGradient>
            </TouchableOpacity>

            {cars.length === 0 && (
              <View style={s.heroTrust}>
                <Text style={s.heroTrustItem}>✓ Gratuit</Text>
                <Text style={s.heroTrustItem}>✓ Fără cont obligatoriu</Text>
                <Text style={s.heroTrustItem}>✓ Instant</Text>
              </View>
            )}
          </LinearGradient>

          {/* ── Stats ── */}
          <View style={s.statsRow}>
            <View style={s.statCard}>
              <Text style={s.statNum}>{cars.length}</Text>
              <Text style={s.statLabel}>Mașini</Text>
            </View>
            <View style={s.statCard}>
              <Text style={[s.statNum, { color: activeRCA === cars.length && cars.length > 0 ? Colors.success : Colors.white }]}>
                {activeRCA}
              </Text>
              <Text style={s.statLabel}>RCA Active</Text>
            </View>
            <View style={s.statCard}>
              <Text style={[s.statNum, { color: activeITP === cars.length && cars.length > 0 ? Colors.success : Colors.white }]}>
                {activeITP}
              </Text>
              <Text style={s.statLabel}>ITP Valid</Text>
            </View>
            <View style={s.statCard}>
              <Text style={[s.statNum, { color: alerts.length > 0 ? Colors.danger : Colors.success }]}>
                {alerts.length}
              </Text>
              <Text style={s.statLabel}>Alerte</Text>
            </View>
          </View>

          {/* ── Alerts ── */}
          {alerts.length > 0 && (
            <View style={s.section}>
              <View style={s.sectionHead}>
                <View style={s.sectionHeadLeft}>
                  <View style={s.alertBadge}>
                    <Text style={s.alertBadgeText}>{alerts.length}</Text>
                  </View>
                  <Text style={s.sectionTitle}>Documente ce necesită atenție</Text>
                </View>
              </View>
              <View style={s.alertsList}>
                {alerts.map((a, i) => (
                  <AlertCard key={i} carName={a.carName} docType={a.docType} dateStr={a.dateStr} />
                ))}
              </View>
            </View>
          )}

          {/* ── My Cars ── */}
          <View style={s.section}>
            <View style={s.sectionHead}>
              <Text style={s.sectionTitle}>Mașinile mele</Text>
              <View style={s.countPill}>
                <Text style={s.countPillText}>
                  {cars.length}/{user?.isPremium ? '∞' : '1'}
                </Text>
              </View>
            </View>

            {cars.length === 0 ? (
              <View style={s.emptyBox}>
                <Text style={s.emptyBoxIcon}>🚘</Text>
                <Text style={s.emptyBoxTitle}>Nicio mașină adăugată</Text>
                <Text style={s.emptyBoxDesc}>
                  Apasă „+ Adaugă mașina" de mai sus sau butonul albastru din colțul din dreapta jos.
                </Text>
              </View>
            ) : (
              <View style={s.cardsList}>
                {cars.map(car => (
                  <View key={car.id} style={s.cardWrap}>
                    <CarCard car={car} onPress={() => router.push(`/car/${car.id}`)} />
                    <TouchableOpacity
                      style={s.deleteBtn}
                      onPress={() => setDeleteModal({
                        visible: true, carId: car.id,
                        carName: `${car.make} ${car.model}`,
                      })}
                    >
                      <Text style={s.deleteBtnText}>🗑</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* ── Premium Banner ── */}
          {!user?.isPremium && (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => router.push('/premium')}
            >
              <LinearGradient
                colors={['#1C0A00', '#3D1A00']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={s.premiumBanner}
              >
                <View style={s.premiumGlow} />
                <View style={s.premiumLeft}>
                  <View style={s.premiumCrown}>
                    <Text style={s.premiumCrownText}>👑</Text>
                  </View>
                  <View>
                    <Text style={s.premiumLabel}>CarNet Premium</Text>
                    <Text style={s.premiumTitle}>Mașini nelimitate &amp; funcții avansate</Text>
                    <View style={s.premiumPerks}>
                      {['Mașini nelimitate', 'Alerte push', 'Suport prioritar'].map(p => (
                        <Text key={p} style={s.premiumPerk}>✓ {p}</Text>
                      ))}
                    </View>
                  </View>
                </View>
                <View style={s.premiumCTA}>
                  <Text style={s.premiumCTAText}>Upgrade</Text>
                  <Text style={s.premiumArrow}>›</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          )}

          <View style={{ height: 40 }} />
        </ScrollView>

        {/* ── Premium modal ── */}
        <Modal visible={premiumModalVisible} transparent animationType="fade">
          <Pressable style={s.overlay} onPress={() => setPremiumModalVisible(false)}>
            <Pressable style={s.modalBox} onPress={() => {}}>
              <Text style={s.modalIcon}>🔒</Text>
              <Text style={s.modalTitle}>Limită atinsă</Text>
              <Text style={s.modalText}>
                Contul gratuit permite o singură mașină.{'\n'}
                Treci la <Text style={s.modalBold}>CarNet Premium</Text> pentru mașini nelimitate.
              </Text>
              <TouchableOpacity
                style={s.modalBtn}
                onPress={() => { setPremiumModalVisible(false); router.push('/premium'); }}
              >
                <Text style={s.modalBtnText}>👑  Upgrade Premium</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setPremiumModalVisible(false)}>
                <Text style={s.modalCancel}>Anulează</Text>
              </TouchableOpacity>
            </Pressable>
          </Pressable>
        </Modal>

        {/* ── Delete modal ── */}
        <Modal visible={deleteModal.visible} transparent animationType="fade">
          <Pressable
            style={s.overlay}
            onPress={() => setDeleteModal({ visible: false, carId: '', carName: '' })}
          >
            <Pressable style={[s.modalBox, { borderColor: Colors.danger }]} onPress={() => {}}>
              <Text style={s.modalIcon}>🗑️</Text>
              <Text style={[s.modalTitle, { color: Colors.danger }]}>Șterge mașina</Text>
              <Text style={s.modalText}>
                Ești sigur că vrei să ștergi{'\n'}
                <Text style={s.modalBold}>{deleteModal.carName}</Text>?{'\n'}
                Această acțiune este ireversibilă.
              </Text>
              <TouchableOpacity
                style={[s.modalBtn, { backgroundColor: Colors.danger }]}
                onPress={confirmDelete}
              >
                <Text style={s.modalBtnText}>Șterge definitiv</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setDeleteModal({ visible: false, carId: '', carName: '' })}
              >
                <Text style={s.modalCancel}>Anulează</Text>
              </TouchableOpacity>
            </Pressable>
          </Pressable>
        </Modal>

      </SafeAreaView>
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#070E1A' },
  safe: { flex: 1 },

  // Navbar
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
    zIndex: 100,
  },
  navLogo: { color: '#FFFFFF', fontSize: 18, fontWeight: '800', letterSpacing: 0.5 },
  navTagline: { color: '#475569', fontSize: 10, marginTop: 1, letterSpacing: 0.3 },
  navRight: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  freePill: {
    backgroundColor: 'rgba(245,158,11,0.12)',
    borderWidth: 1, borderColor: 'rgba(245,158,11,0.35)',
    borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4,
  },
  freePillText: { color: Colors.gold, fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  premiumPill: {
    backgroundColor: 'rgba(245,158,11,0.2)',
    borderWidth: 1, borderColor: Colors.gold + '88',
    borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4,
  },
  premiumPillText: { color: Colors.gold, fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  avatarWrap: { position: 'relative', zIndex: 200 },
  avatarBtn: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: Colors.accent,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 2, borderColor: Colors.accent + '55',
  },
  avatarLetter: { color: '#fff', fontSize: 15, fontWeight: '800' },

  scroll: { paddingBottom: 0 },

  // Hero
  hero: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 24,
    padding: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(59,130,246,0.15)',
  },
  heroGlow1: {
    position: 'absolute', width: 240, height: 240, borderRadius: 120,
    backgroundColor: '#3B82F6', opacity: 0.06, top: -80, right: -60,
  },
  heroGlow2: {
    position: 'absolute', width: 160, height: 160, borderRadius: 80,
    backgroundColor: '#60A5FA', opacity: 0.04, bottom: -40, left: -20,
  },
  heroEyebrow: { color: Colors.accent, fontSize: 13, fontWeight: '600', marginBottom: 8 },
  heroTitle: { color: '#FFFFFF', fontSize: 28, fontWeight: '800', lineHeight: 34, marginBottom: 10 },
  heroSub: { color: '#94A3B8', fontSize: 14, lineHeight: 21, marginBottom: 22 },
  heroBtn: {
    borderRadius: 14,
    overflow: 'hidden',
    alignSelf: 'flex-start',
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  heroBtnGrad: { paddingHorizontal: 22, paddingVertical: 13 },
  heroBtnText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
  heroTrust: { flexDirection: 'row', gap: 14, marginTop: 16 },
  heroTrustItem: { color: '#64748B', fontSize: 12, fontWeight: '500' },

  // Stats
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  statNum: { color: '#FFFFFF', fontSize: 22, fontWeight: '800' },
  statLabel: { color: '#475569', fontSize: 10, marginTop: 3, textAlign: 'center' },

  // Sections
  section: { paddingHorizontal: 16, marginTop: 28 },
  sectionHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sectionHeadLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  sectionTitle: { color: '#FFFFFF', fontSize: 17, fontWeight: '700' },
  sectionSub: { color: '#475569', fontSize: 13, marginTop: 4, marginBottom: 16 },
  countPill: {
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  countPillText: { color: '#64748B', fontSize: 12, fontWeight: '600' },

  // Alerts
  alertBadge: {
    width: 22, height: 22, borderRadius: 11,
    backgroundColor: Colors.danger,
    justifyContent: 'center', alignItems: 'center',
  },
  alertBadgeText: { color: '#fff', fontSize: 11, fontWeight: '800' },
  alertsList: { gap: 8 },
  alertCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
  },
  alertDot: { width: 8, height: 8, borderRadius: 4 },
  alertCarName: { color: '#E2E8F0', fontSize: 13, fontWeight: '600' },
  alertDoc: { fontSize: 12, marginTop: 2 },
  alertArrow: { fontSize: 20, fontWeight: '300' },

  // Cars
  emptyBox: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 24,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    borderRadius: 20,
    borderStyle: 'dashed',
  },
  emptyBoxIcon: { fontSize: 48, marginBottom: 14 },
  emptyBoxTitle: { color: '#FFFFFF', fontSize: 17, fontWeight: '700', marginBottom: 8, textAlign: 'center' },
  emptyBoxDesc: { color: '#475569', fontSize: 13, textAlign: 'center', lineHeight: 19 },
  cardsList: { gap: 16 },
  cardWrap: { position: 'relative' },
  deleteBtn: {
    position: 'absolute', top: 12, right: 12,
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderRadius: 20,
    width: 32, height: 32,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
  },
  deleteBtnText: { fontSize: 14 },

  // Premium banner
  premiumBanner: {
    marginHorizontal: 16,
    marginTop: 28,
    borderRadius: 22,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(245,158,11,0.2)',
  },
  premiumGlow: {
    position: 'absolute', width: 180, height: 180, borderRadius: 90,
    backgroundColor: Colors.gold, opacity: 0.05, top: -60, right: -40,
  },
  premiumLeft: { flexDirection: 'row', alignItems: 'flex-start', gap: 14, flex: 1 },
  premiumCrown: {
    width: 44, height: 44, borderRadius: 14,
    backgroundColor: 'rgba(245,158,11,0.15)',
    justifyContent: 'center', alignItems: 'center',
    flexShrink: 0,
  },
  premiumCrownText: { fontSize: 22 },
  premiumLabel: { color: Colors.gold, fontSize: 11, fontWeight: '700', letterSpacing: 0.5 },
  premiumTitle: { color: '#FFFFFF', fontSize: 14, fontWeight: '700', marginTop: 3, marginBottom: 10 },
  premiumPerks: { gap: 4 },
  premiumPerk: { color: '#94A3B8', fontSize: 11 },
  premiumCTA: {
    alignItems: 'center',
    backgroundColor: 'rgba(245,158,11,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(245,158,11,0.3)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
    flexShrink: 0,
  },
  premiumCTAText: { color: Colors.gold, fontSize: 13, fontWeight: '800' },
  premiumArrow: { color: Colors.gold, fontSize: 18 },

  // Modals
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 28,
  },
  modalBox: {
    backgroundColor: '#111827',
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: Colors.accent + '44',
    padding: 28,
    alignItems: 'center',
    width: '100%',
    maxWidth: 340,
  },
  modalIcon: { fontSize: 48, marginBottom: 12 },
  modalTitle: { fontSize: 20, fontWeight: '800', color: Colors.white, marginBottom: 10 },
  modalText: { fontSize: 14, color: '#94A3B8', textAlign: 'center', lineHeight: 21, marginBottom: 20 },
  modalBold: { fontWeight: '800', color: Colors.white },
  modalBtn: {
    backgroundColor: Colors.accent,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 28,
    marginBottom: 12,
    width: '100%',
    alignItems: 'center',
  },
  modalBtnText: { color: '#fff', fontSize: 15, fontWeight: '800' },
  modalCancel: { color: '#475569', fontSize: 13, fontWeight: '500' },
});

const dd = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: -1000, left: -2000, right: -2000, bottom: -2000,
    zIndex: 150,
  },
  dropdown: {
    position: 'absolute', top: 48, right: 0,
    backgroundColor: '#111827',
    borderRadius: 18,
    paddingVertical: 8,
    minWidth: 230,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 24,
    zIndex: 300,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  arrow: {
    position: 'absolute', top: -7, right: 13,
    width: 14, height: 14,
    backgroundColor: '#111827',
    transform: [{ rotate: '45deg' }],
    borderRadius: 3,
    borderTopWidth: 1, borderLeftWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  item: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingHorizontal: 16, paddingVertical: 13,
  },
  iconWrap: {
    width: 36, height: 36, borderRadius: 10,
    justifyContent: 'center', alignItems: 'center',
  },
  icon: { fontSize: 18 },
  label: { fontSize: 14, fontWeight: '700', color: '#E2E8F0' },
  sub: { fontSize: 11, color: '#475569', marginTop: 1 },
  sep: { height: 1, backgroundColor: 'rgba(255,255,255,0.06)', marginHorizontal: 14 },
});
