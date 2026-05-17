import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  Dimensions,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useCarStore } from '../store/useCarStore';
import CarCard from '../components/CarCard';
import { Colors } from '../constants/colors';

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

export default function HomeScreen() {
  const { user, cars, canAddCar, deleteCar, setUser } = useCarStore();
  const [refreshing, setRefreshing] = useState(false);

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

  const handleLogout = () => {
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
            <TouchableOpacity style={styles.avatarBtn} onPress={handleLogout}>
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
