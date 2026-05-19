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

function EmptyState() {
  return (
    <View style={styles.emptyState}>
      <Text style={styles.emptyIcon}>🚗</Text>
      <Text style={styles.emptyTitle}>Nicio mașină adăugată</Text>
      <Text style={styles.emptyDesc}>
        Apasă butonul + pentru a adăuga prima ta mașină. Vei primi un card digital complet cu toate datele vehiculului.
      </Text>
    </View>
  );
}

function PremiumBanner() {
  return (
    <LinearGradient
      colors={[Colors.premiumGradientStart, Colors.premiumGradientEnd]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.premiumBanner}
    >
      <Text style={styles.premiumIcon}>⭐</Text>
      <View style={styles.premiumContent}>
        <Text style={styles.premiumTitle}>Treci la Premium</Text>
        <Text style={styles.premiumDesc}>Adaugă mașini nelimitate și mai multe funcții</Text>
      </View>
      <TouchableOpacity style={styles.premiumBtn}>
        <Text style={styles.premiumBtnText}>Upgrade</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

function AvatarDropdown({
  visible,
  isGuest,
  onClose,
  onLogout,
}: {
  visible: boolean;
  isGuest: boolean;
  onClose: () => void;
  onLogout: () => void;
}) {
  if (!visible) return null;

  return (
    <>
      {/* Invisible backdrop to close on outside tap */}
      <Pressable style={dropdownStyles.backdrop} onPress={onClose} />

      <View style={dropdownStyles.dropdown}>
        {/* Arrow tip */}
        <View style={dropdownStyles.arrow} />

        {isGuest ? (
          // Guest user: show Login + Register
          <>
            <TouchableOpacity
              style={dropdownStyles.item}
              onPress={() => { onClose(); router.push('/login'); }}
            >
              <Text style={dropdownStyles.itemIcon}>🔑</Text>
              <View>
                <Text style={dropdownStyles.itemLabel}>Autentifică-te</Text>
                <Text style={dropdownStyles.itemDesc}>Ai deja un cont</Text>
              </View>
            </TouchableOpacity>

            <View style={dropdownStyles.separator} />

            <TouchableOpacity
              style={dropdownStyles.item}
              onPress={() => { onClose(); router.push('/register'); }}
            >
              <Text style={dropdownStyles.itemIcon}>✨</Text>
              <View>
                <Text style={dropdownStyles.itemLabel}>Înregistrează-te</Text>
                <Text style={dropdownStyles.itemDesc}>Creează un cont nou</Text>
              </View>
            </TouchableOpacity>
          </>
        ) : (
          // Logged-in user: show Logout
          <TouchableOpacity style={dropdownStyles.item} onPress={onLogout}>
            <Text style={dropdownStyles.itemIcon}>🚪</Text>
            <View>
              <Text style={[dropdownStyles.itemLabel, { color: Colors.danger }]}>Deconectează-te</Text>
              <Text style={dropdownStyles.itemDesc}>Ieși din cont</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
}

export default function HomeScreen() {
  const { user, cars, canAddCar, deleteCar, logout, loadCars } = useCarStore();
  const [refreshing, setRefreshing] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [premiumModalVisible, setPremiumModalVisible] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{ visible: boolean; carId: string; carName: string }>({
    visible: false, carId: '', carName: '',
  });

  const isGuest = user?.isGuest === true;

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadCars();
    setRefreshing(false);
  };

  const handleAddCar = () => {
    if (!canAddCar()) {
      setPremiumModalVisible(true);
      return;
    }
    router.push('/add-car');
  };

  const handleDeleteCar = (carId: string, carName: string) => {
    setDeleteModal({ visible: true, carId, carName });
  };

  const confirmDelete = () => {
    deleteCar(deleteModal.carId);
    setDeleteModal({ visible: false, carId: '', carName: '' });
  };

  const handleLogout = async () => {
    setDropdownVisible(false);
    await logout();
    router.replace('/login');
  };

  return (
    <LinearGradient colors={[Colors.primary, '#0D1F3C']} style={styles.gradient}>
      <SafeAreaView style={styles.safe} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Bună ziua,</Text>
            <Text style={styles.username}>{user?.displayName || 'Utilizator'}</Text>
          </View>

          <View style={styles.headerActions}>
            {!user?.isPremium && (
              <View style={styles.freeBadge}>
                <Text style={styles.freeBadgeText}>GRATUIT</Text>
              </View>
            )}

            {/* Avatar + dropdown anchored here */}
            <View style={styles.avatarWrapper}>
              <TouchableOpacity
                style={styles.avatarBtn}
                onPress={() => setDropdownVisible(v => !v)}
              >
                <Text style={styles.avatarText}>
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
          contentContainerStyle={styles.scroll}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor={Colors.accent} />
          }
        >
          {/* Stats bar */}
          <View style={styles.statsBar}>
            <View style={styles.stat}>
              <Text style={styles.statNum}>{cars.length}</Text>
              <Text style={styles.statLabel}>Mașini</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statNum}>
                {cars.filter(c => {
                  if (!c.insuranceExpiry) return false;
                  const [d, m, y] = c.insuranceExpiry.split('.').map(Number);
                  return new Date(y, m - 1, d) > new Date();
                }).length}
              </Text>
              <Text style={styles.statLabel}>RCA Active</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statNum}>
                {cars.filter(c => {
                  if (!c.itpExpiry) return false;
                  const [d, m, y] = c.itpExpiry.split('.').map(Number);
                  return new Date(y, m - 1, d) > new Date();
                }).length}
              </Text>
              <Text style={styles.statLabel}>ITP Valid</Text>
            </View>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Mașinile mele</Text>
            <Text style={styles.sectionCount}>{cars.length}/{user?.isPremium ? '∞' : '1'}</Text>
          </View>

          {cars.length === 0 ? (
            <EmptyState />
          ) : (
            <View style={styles.carsList}>
              {cars.map(car => (
                <View key={car.id} style={styles.cardWrapper}>
                  <CarCard car={car} onPress={() => router.push(`/car/${car.id}`)} />
                  <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => handleDeleteCar(car.id, `${car.make} ${car.model}`)}
                  >
                    <Text style={styles.deleteBtnText}>🗑</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Premium limit modal */}
        <Modal visible={premiumModalVisible} transparent animationType="fade">
          <Pressable style={styles.modalOverlay} onPress={() => setPremiumModalVisible(false)}>
            <Pressable style={styles.modalBox} onPress={() => {}}>
              <Text style={styles.modalIcon}>🔒</Text>
              <Text style={styles.modalTitle}>Limită atinsă</Text>
              <Text style={styles.modalText}>
                Contul gratuit permite o singură mașină.{'\n'}
                Treci la <Text style={styles.modalBold}>CarNet Premium</Text> pentru mașini nelimitate.
              </Text>
              <TouchableOpacity
                style={styles.modalUpgradeBtn}
                onPress={() => { setPremiumModalVisible(false); router.push('/premium'); }}
              >
                <Text style={styles.modalUpgradeBtnText}>👑  Upgrade Premium</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setPremiumModalVisible(false)}>
                <Text style={styles.modalCancelText}>Anulează</Text>
              </TouchableOpacity>
            </Pressable>
          </Pressable>
        </Modal>

        {/* Delete confirmation modal */}
        <Modal visible={deleteModal.visible} transparent animationType="fade">
          <Pressable style={styles.modalOverlay} onPress={() => setDeleteModal({ visible: false, carId: '', carName: '' })}>
            <Pressable style={styles.modalBox} onPress={() => {}}>
              <Text style={styles.modalIcon}>🗑️</Text>
              <Text style={[styles.modalTitle, { color: Colors.danger }]}>Șterge mașina</Text>
              <Text style={styles.modalText}>
                Ești sigur că vrei să ștergi{'\n'}
                <Text style={styles.modalBold}>{deleteModal.carName}</Text>?{'\n'}
                Această acțiune este ireversibilă.
              </Text>
              <TouchableOpacity style={[styles.modalUpgradeBtn, { backgroundColor: Colors.danger }]} onPress={confirmDelete}>
                <Text style={styles.modalUpgradeBtnText}>Șterge</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setDeleteModal({ visible: false, carId: '', carName: '' })}>
                <Text style={styles.modalCancelText}>Anulează</Text>
              </TouchableOpacity>
            </Pressable>
          </Pressable>
        </Modal>

        {/* FAB */}
        <TouchableOpacity style={styles.fab} onPress={handleAddCar} activeOpacity={0.85}>
          <LinearGradient colors={[Colors.accent, '#1D4ED8']} style={styles.fabGradient}>
            <Text style={styles.fabIcon}>+</Text>
          </LinearGradient>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safe: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    zIndex: 100,
  },
  greeting: { color: Colors.gray400, fontSize: 13 },
  username: { color: Colors.white, fontSize: 20, fontWeight: '700' },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  freeBadge: {
    backgroundColor: Colors.gold + '22',
    borderWidth: 1,
    borderColor: Colors.gold + '60',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  freeBadgeText: { color: Colors.gold, fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  avatarWrapper: { position: 'relative', zIndex: 200 },
  avatarBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { color: Colors.white, fontSize: 16, fontWeight: '700' },
  scroll: { paddingHorizontal: 16, paddingTop: 8 },
  statsBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  stat: { flex: 1, alignItems: 'center' },
  statNum: { color: Colors.white, fontSize: 24, fontWeight: '800' },
  statLabel: { color: Colors.gray400, fontSize: 11, marginTop: 2 },
  statDivider: { width: 1, height: '100%', backgroundColor: 'rgba(255,255,255,0.1)' },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: { color: Colors.white, fontSize: 18, fontWeight: '700' },
  sectionCount: { color: Colors.gray400, fontSize: 13 },
  carsList: { gap: 16, marginBottom: 20 },
  cardWrapper: { position: 'relative' },
  deleteBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteBtnText: { fontSize: 14 },
  emptyState: { alignItems: 'center', paddingVertical: 48, paddingHorizontal: 32 },
  emptyIcon: { fontSize: 60, marginBottom: 16 },
  emptyTitle: { color: Colors.white, fontSize: 20, fontWeight: '700', marginBottom: 8, textAlign: 'center' },
  emptyDesc: { color: Colors.gray400, fontSize: 14, textAlign: 'center', lineHeight: 20 },
  premiumBanner: { flexDirection: 'row', alignItems: 'center', borderRadius: 16, padding: 16, gap: 12 },
  premiumIcon: { fontSize: 28 },
  premiumContent: { flex: 1 },
  premiumTitle: { color: Colors.white, fontSize: 15, fontWeight: '700' },
  premiumDesc: { color: Colors.white, opacity: 0.8, fontSize: 12, marginTop: 2 },
  premiumBtn: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  premiumBtnText: { color: Colors.white, fontSize: 13, fontWeight: '700' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  modalBox: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    borderWidth: 2.5,
    borderColor: Colors.danger,
    padding: 28,
    alignItems: 'center',
    width: '100%',
    maxWidth: 340,
  },
  modalIcon: { fontSize: 48, marginBottom: 12 },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.danger,
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    color: Colors.gray700,
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: 20,
  },
  modalBold: { fontWeight: '800', color: Colors.primary },
  modalUpgradeBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 13,
    paddingHorizontal: 28,
    marginBottom: 12,
    width: '100%',
    alignItems: 'center',
  },
  modalUpgradeBtnText: { color: Colors.white, fontSize: 15, fontWeight: '800' },
  modalCancelText: { color: Colors.gray400, fontSize: 13, fontWeight: '500' },
  fab: {
    position: 'absolute',
    bottom: 32,
    right: 24,
    borderRadius: 28,
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 12,
  },
  fabGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabIcon: { color: Colors.white, fontSize: 28, fontWeight: '300', lineHeight: 32 },
});

const dropdownStyles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: -1000,
    left: -2000,
    right: -2000,
    bottom: -2000,
    zIndex: 150,
  },
  dropdown: {
    position: 'absolute',
    top: 48,
    right: 0,
    backgroundColor: Colors.white,
    borderRadius: 16,
    paddingVertical: 6,
    minWidth: 220,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 20,
    zIndex: 300,
  },
  arrow: {
    position: 'absolute',
    top: -8,
    right: 14,
    width: 16,
    height: 16,
    backgroundColor: Colors.white,
    transform: [{ rotate: '45deg' }],
    borderRadius: 3,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  itemIcon: { fontSize: 20 },
  itemLabel: { fontSize: 14, fontWeight: '700', color: Colors.primary },
  itemDesc: { fontSize: 11, color: Colors.gray400, marginTop: 1 },
  separator: { height: 1, backgroundColor: Colors.gray100, marginHorizontal: 12 },
});
