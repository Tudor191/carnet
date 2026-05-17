import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { router, usePathname } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useCarStore } from '../store/useCarStore';
import { Colors } from '../constants/colors';

const SIDEBAR_W = 215;
const AUTH_ROUTES = ['/', '/login', '/register'];

export default function Sidebar() {
  const pathname = usePathname();
  const { width } = Dimensions.get('window');
  const { user, logout } = useCarStore();

  // Only visible on wide screens and outside auth pages
  if (width < 640 || AUTH_ROUTES.includes(pathname)) return null;

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  const isHome = pathname === '/home' || pathname.startsWith('/car/');
  const isAddCar = pathname === '/add-car';

  return (
    <View style={styles.sidebar}>
      {/* ── Brand ── */}
      <View style={styles.brand}>
        <View style={styles.brandIcon}>
          <Text style={styles.brandIconText}>C</Text>
        </View>
        <View>
          <Text style={styles.brandName}>CarNet</Text>
          <Text style={styles.brandSub}>România</Text>
        </View>
      </View>

      {/* ── New car button ── */}
      <TouchableOpacity
        style={styles.newBtn}
        onPress={() => router.push('/add-car')}
        activeOpacity={0.75}
      >
        <Text style={styles.newBtnPlus}>+</Text>
        <Text style={styles.newBtnLabel}>Mașină nouă</Text>
      </TouchableOpacity>

      {/* ── Navigation ── */}
      <View style={styles.nav}>
        <TouchableOpacity
          style={[styles.navItem, isHome && styles.navItemActive]}
          onPress={() => router.push('/home')}
        >
          <Text style={styles.navIcon}>🚗</Text>
          <Text style={[styles.navLabel, isHome && styles.navLabelActive]}>
            Mașinile mele
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navItem, isAddCar && styles.navItemActive]}
          onPress={() => router.push('/add-car')}
        >
          <Text style={styles.navIcon}>➕</Text>
          <Text style={[styles.navLabel, isAddCar && styles.navLabelActive]}>
            Adaugă mașină
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }} />

      {/* ── Premium card (bottom) ── */}
      {!user?.isPremium && (
        <TouchableOpacity style={styles.premiumCard} activeOpacity={0.85}>
          <LinearGradient
            colors={['#78350F', '#B45309', '#D97706']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.premiumGrad}
          >
            <Text style={styles.premiumCrown}>👑</Text>
            <Text style={styles.premiumTitle}>Premium</Text>
            <Text style={styles.premiumDesc}>
              Mașini nelimitate și funcții avansate
            </Text>
            <View style={styles.upgradeBtn}>
              <Text style={styles.upgradeBtnText}>Upgrade</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      )}

      {/* ── Divider ── */}
      <View style={styles.divider} />

      {/* ── User row / auth ── */}
      {user && !user.isGuest ? (
        <View style={styles.userRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {(user.displayName || 'U')[0].toUpperCase()}
            </Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName} numberOfLines={1}>
              {user.displayName}
            </Text>
            <Text style={styles.userSub}>
              {user.isPremium ? '⭐ Premium' : 'Cont gratuit'}
            </Text>
          </View>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
            <Text style={styles.logoutIcon}>↪</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.authRow}
          onPress={() => router.push('/login')}
        >
          <Text style={styles.authIcon}>🔑</Text>
          <Text style={styles.authLabel}>Autentifică-te</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: SIDEBAR_W,
    backgroundColor: Colors.primary,
    borderRightWidth: 1,
    borderRightColor: 'rgba(255,255,255,0.07)',
    paddingTop: 22,
    paddingBottom: 18,
    paddingHorizontal: 12,
    flexDirection: 'column',
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 18,
    paddingHorizontal: 4,
  },
  brandIcon: {
    width: 34,
    height: 34,
    borderRadius: 9,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandIconText: { color: Colors.white, fontSize: 18, fontWeight: '900' },
  brandName: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  brandSub: {
    color: Colors.gray400,
    fontSize: 9,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  newBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 9,
    marginBottom: 14,
  },
  newBtnPlus: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: '300',
    lineHeight: 22,
  },
  newBtnLabel: { color: Colors.gray400, fontSize: 13, fontWeight: '500' },
  nav: { gap: 2 },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 10,
    paddingVertical: 9,
    borderRadius: 9,
  },
  navItemActive: { backgroundColor: 'rgba(59,130,246,0.14)' },
  navIcon: { fontSize: 15 },
  navLabel: { color: Colors.gray400, fontSize: 13, fontWeight: '500' },
  navLabelActive: { color: Colors.white, fontWeight: '700' },
  premiumCard: {
    borderRadius: 13,
    overflow: 'hidden',
    marginBottom: 10,
  },
  premiumGrad: { padding: 14 },
  premiumCrown: { fontSize: 24, marginBottom: 6 },
  premiumTitle: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 4,
  },
  premiumDesc: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 11,
    lineHeight: 15,
    marginBottom: 11,
  },
  upgradeBtn: {
    backgroundColor: 'rgba(255,255,255,0.22)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  upgradeBtnText: { color: Colors.white, fontSize: 12, fontWeight: '700' },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.07)',
    marginBottom: 12,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 4,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { color: Colors.white, fontSize: 12, fontWeight: '700' },
  userInfo: { flex: 1 },
  userName: { color: Colors.white, fontSize: 12, fontWeight: '600' },
  userSub: { color: Colors.gray400, fontSize: 10, marginTop: 1 },
  logoutBtn: { padding: 6 },
  logoutIcon: { color: Colors.gray400, fontSize: 16 },
  authRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 4,
  },
  authIcon: { fontSize: 15 },
  authLabel: { color: Colors.gray400, fontSize: 13, fontWeight: '500' },
});
