import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
  RefreshControl,
  Modal,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useCarStore } from '../store/useCarStore';
import CarCard from '../components/CarCard';
import { Colors } from '../constants/colors';
import { User } from '../types';

const { width: W } = Dimensions.get('window');

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

function ProfileModal({
  visible,
  onClose,
  user,
  onLogin,
  onLogout,
  loginLoading,
}: {
  visible: boolean;
  onClose: () => void;
  user: User | null;
  onLogin: (provider: string) => void;
  onLogout: () => void;
  loginLoading: string | null;
}) {
  const isGuest = user?.id?.startsWith('user_') && user?.email?.includes('Guest');

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={modalStyles.backdrop} onPress={onClose}>
        <Pressable style={modalStyles.sheet} onPress={e => e.stopPropagation()}>
          {/* User info */}
          <View style={modalStyles.userInfo}>
            <View style={modalStyles.avatarLarge}>
              <Text style={modalStyles.avatarLargeText}>
                {(user?.displayName || 'U')[0].toUpperCase()}
              </Text>
            </View>
            <View style={modalStyles.userDetails}>
              <Text style={modalStyles.userName}>{user?.displayName || 'Utilizator'}</Text>
              <Text style={modalStyles.userEmail}>{user?.email || ''}</Text>
              <View style={[modalStyles.planBadge, user?.isPremium && modalStyles.planBadgePremium]}>
                <Text style={[modalStyles.planBadgeText, user?.isPremium && modalStyles.planBadgeTextPremium]}>
                  {user?.isPremium ? '⭐ PREMIUM' : 'GRATUIT'}
                </Text>
              </View>
            </View>
          </View>

          <View style={modalStyles.divider} />

          {/* Auth section */}
          {isGuest && (
            <>
              <Text style={modalStyles.sectionLabel}>Autentifică-te cu un cont real</Text>
              <Text style={modalStyles.sectionDesc}>
                Contul tău de invitat nu salvează datele permanent. Autentifică-te pentru a nu pierde mașinile adăugate.
              </Text>

              {[
                { provider: 'Google', icon: 'G', bg: '#FFFFFF', color: '#1F2937', border: Colors.gray200 },
                { provider: 'Facebook', icon: 'f', bg: '#1877F2', color: '#FFFFFF', border: '#1877F2' },
                { provider: 'Apple', icon: '', bg: '#000000', color: '#FFFFFF', border: '#000000' },
              ].map(({ provider, icon, bg, color, border }) => (
                <TouchableOpacity
                  key={provider}
                  style={[modalStyles.socialBtn, { backgroundColor: bg, borderColor: border }]}
                  onPress={() => onLogin(provider)}
                  disabled={loginLoading !== null}
                >
                  {loginLoading === provider ? (
                    <ActivityIndicator color={color} size="small" style={{ width: 24 }} />
                  ) : (
                    <Text style={[modalStyles.socialIcon, { color }]}>{icon}</Text>
                  )}
                  <Text style={[modalStyles.socialLabel, { color }]}>
                    Continuă cu {provider}
                  </Text>
                </TouchableOpacity>
              ))}

              <View style={modalStyles.divider} />
            </>
          )}

          {/* Logout */}
          <TouchableOpacity style={modalStyles.logoutBtn} onPress={onLogout}>
            <Text style={modalStyles.logoutIcon}>🚪</Text>
            <Text style={modalStyles.logoutText}>Deconectează-te</Text>
          </TouchableOpacity>

          <TouchableOpacity style={modalStyles.cancelBtn} onPress={onClose}>
            <Text style={modalStyles.cancelText}>Anulează</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export default function HomeScreen() {
  const { user, cars, canAddCar, deleteCar, setUser } = useCarStore();
  const [refreshing, setRefreshing] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);
  const [loginLoading, setLoginLoading] = useState<string | null>(null);

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(r => setTimeout(r, 600));
    setRefreshing(false);
  };

  const handleAddCar = () => {
    if (!canAddCar()) {
      Alert.alert(
        'Limită atinsă',
        'Contul gratuit permite o singură mașină. Treci la Premium pentru a adăuga mai multe.',
        [
          { text: 'Anulează', style: 'cancel' },
          { text: 'Upgrade Premium', style: 'default' },
        ]
      );
      return;
    }
    router.push('/add-car');
  };

  const handleCarPress = (carId: string) => {
    router.push(`/car/${carId}`);
  };

  const handleDeleteCar = (carId: string, carName: string) => {
    Alert.alert(
      'Șterge mașina',
      `Ești sigur că vrei să ștergi ${carName}?`,
      [
        { text: 'Anulează', style: 'cancel' },
        {
          text: 'Șterge',
          style: 'destructive',
          onPress: () => deleteCar(carId),
        },
      ]
    );
  };

  const handleLogin = async (provider: string) => {
    setLoginLoading(provider);
    await new Promise(r => setTimeout(r, 900));
    const mockUser: User = {
      id: `user_${provider}_${Date.now()}`,
      email: `utilizator@${provider.toLowerCase()}.com`,
      displayName: `Utilizator ${provider}`,
      isPremium: false,
      carCount: cars.length,
    };
    setUser(mockUser);
    setLoginLoading(null);
    setProfileVisible(false);
  };

  const handleLogout = () => {
    setProfileVisible(false);
    setTimeout(() => {
      Alert.alert(
        'Deconectare',
        'Ești sigur că vrei să te deconectezi?',
        [
          { text: 'Anulează', style: 'cancel' },
          {
            text: 'Deconectează',
            style: 'destructive',
            onPress: () => {
              setUser(null);
              router.replace('/login');
            },
          },
        ]
      );
    }, 300);
  };

  return (
    <LinearGradient
      colors={[Colors.primary, '#0D1F3C']}
      style={styles.gradient}
    >
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
            <TouchableOpacity style={styles.avatarBtn} onPress={() => setProfileVisible(true)}>
              <Text style={styles.avatarText}>
                {(user?.displayName || 'U')[0].toUpperCase()}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={Colors.accent}
            />
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

          {/* Cars section title */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Mașinile mele</Text>
            <Text style={styles.sectionCount}>
              {cars.length}/{user?.isPremium ? '∞' : '1'}
            </Text>
          </View>

          {/* Car cards */}
          {cars.length === 0 ? (
            <EmptyState />
          ) : (
            <View style={styles.carsList}>
              {cars.map(car => (
                <View key={car.id} style={styles.cardWrapper}>
                  <CarCard
                    car={car}
                    onPress={() => handleCarPress(car.id)}
                  />
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

          {/* Premium banner */}
          {!user?.isPremium && <PremiumBanner />}

          <View style={{ height: 100 }} />
        </ScrollView>

        {/* FAB */}
        <TouchableOpacity style={styles.fab} onPress={handleAddCar} activeOpacity={0.85}>
          <LinearGradient
            colors={[Colors.accent, '#1D4ED8']}
            style={styles.fabGradient}
          >
            <Text style={styles.fabIcon}>+</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Profile modal */}
        <ProfileModal
          visible={profileVisible}
          onClose={() => setProfileVisible(false)}
          user={user}
          onLogin={handleLogin}
          onLogout={handleLogout}
          loginLoading={loginLoading}
        />
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
  },
  greeting: {
    color: Colors.gray400,
    fontSize: 13,
  },
  username: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: '700',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  freeBadge: {
    backgroundColor: Colors.gold + '22',
    borderWidth: 1,
    borderColor: Colors.gold + '60',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  freeBadgeText: {
    color: Colors.gold,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
  },
  avatarBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  scroll: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  statsBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statNum: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: '800',
  },
  statLabel: {
    color: Colors.gray400,
    fontSize: 11,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '700',
  },
  sectionCount: {
    color: Colors.gray400,
    fontSize: 13,
  },
  carsList: {
    gap: 16,
    marginBottom: 20,
  },
  cardWrapper: {
    position: 'relative',
  },
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
  deleteBtnText: {
    fontSize: 14,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 32,
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 16,
  },
  emptyTitle: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyDesc: {
    color: Colors.gray400,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  premiumBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  premiumIcon: {
    fontSize: 28,
  },
  premiumContent: {
    flex: 1,
  },
  premiumTitle: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
  premiumDesc: {
    color: Colors.white,
    opacity: 0.8,
    fontSize: 12,
    marginTop: 2,
  },
  premiumBtn: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  premiumBtnText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
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
  fabIcon: {
    color: Colors.white,
    fontSize: 28,
    fontWeight: '300',
    lineHeight: 32,
  },
});

const modalStyles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    paddingBottom: 40,
    maxWidth: 500,
    width: '100%',
    alignSelf: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 16,
  },
  avatarLarge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarLargeText: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: '700',
  },
  userDetails: {
    flex: 1,
    gap: 3,
  },
  userName: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.primary,
  },
  userEmail: {
    fontSize: 12,
    color: Colors.gray500,
  },
  planBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.gray100,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginTop: 2,
  },
  planBadgePremium: {
    backgroundColor: Colors.gold + '22',
  },
  planBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.gray500,
    letterSpacing: 0.5,
  },
  planBadgeTextPremium: {
    color: Colors.gold,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.gray100,
    marginVertical: 16,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 6,
  },
  sectionDesc: {
    fontSize: 12,
    color: Colors.gray500,
    lineHeight: 17,
    marginBottom: 14,
  },
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
  socialIcon: {
    fontSize: 17,
    fontWeight: '700',
    width: 24,
    textAlign: 'center',
  },
  socialLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: Colors.danger + '30',
    marginBottom: 10,
  },
  logoutIcon: {
    fontSize: 18,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.danger,
  },
  cancelBtn: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  cancelText: {
    fontSize: 14,
    color: Colors.gray400,
    fontWeight: '500',
  },
});
