import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { router, usePathname } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { useCarStore } from '../store/useCarStore';
import { useThemeStore } from '../store/useThemeStore';
import { Colors } from '../constants/colors';
import ThemeSwitch from './ThemeSwitch';

const SIDEBAR_W = 215;
const AUTH_ROUTES = ['/', '/login', '/register'];

export default function Sidebar() {
  const pathname = usePathname();
  const { width } = Dimensions.get('window');
  const { user, logout, canAddCar } = useCarStore();
  const { theme, toggleTheme } = useThemeStore();
  const isLight = theme === 'light';
  const [showLimitModal, setShowLimitModal] = useState(false);

  // Only visible on wide screens and outside auth pages
  if (width < 640 || AUTH_ROUTES.includes(pathname)) return null;

  const handleNewCar = () => {
    if (!canAddCar()) { setShowLimitModal(true); return; }
    router.push('/add-car');
  };

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  const isDashboard = pathname === '/dashboard' || pathname.startsWith('/car/');

  const isDark = !isLight;
  const sidebarBg = isLight ? '#FFFFFF' : Colors.primary;
  const sidebarBorder = isLight ? '#E2E8F0' : 'rgba(255,255,255,0.07)';
  const textColor = isLight ? '#0F172A' : '#FFFFFF';
  const subColor = isLight ? '#475569' : '#64748B';
  const dividerColor = isLight ? '#E2E8F0' : 'rgba(255,255,255,0.07)';
  const newBtnBg = isLight ? '#EEF5FF' : 'rgba(255,255,255,0.06)';
  const newBtnBorder = isLight ? '#DBEAFE' : 'rgba(255,255,255,0.1)';

  return (
    <View style={[styles.sidebar, { backgroundColor: sidebarBg, borderRightColor: sidebarBorder }]}>
      {/* ── Brand — click navigates to dashboard ── */}
      <TouchableOpacity style={styles.brand} onPress={() => router.push('/dashboard')} activeOpacity={0.75}>
        <Svg width={42} height={42} viewBox="0 0 120 120">
          {/* Notebook body */}
          <Rect x="20" y="12" width="76" height="92" rx="12" fill="#FFFFFF" />
          {/* Notebook cover */}
          <Rect x="20" y="12" width="76" height="20" rx="12" fill={Colors.secondary} />
          <Rect x="20" y="24" width="76" height="8" fill={Colors.secondary} />
          {/* Binding holes */}
          {[22, 36, 50, 64, 78, 92].map((y, i) => (
            <Circle key={i} cx="20" cy={y} r="4.5" fill={Colors.primary} />
          ))}
          {[22, 36, 50, 64, 78, 92].map((y, i) => (
            <Circle key={`a${i}`} cx="20" cy={y} r="2.5" fill={Colors.accent} opacity={0.5} />
          ))}
          {/* Lines above car */}
          <Path d="M32 38 H88" stroke={Colors.gray200} strokeWidth="1.5" />
          <Path d="M32 44 H88" stroke={Colors.gray200} strokeWidth="1.5" />
          {/* Lines below car */}
          <Path d="M32 90 H88" stroke={Colors.gray200} strokeWidth="1.5" />
          <Path d="M32 97 H88" stroke={Colors.gray200} strokeWidth="1.5" />
          {/* Car body */}
          <Path d="M28 77 L32 64 L42 56 L78 56 L88 64 L92 77 Z" fill={Colors.secondary} />
          {/* Car roof */}
          <Path d="M40 64 L46 50 H74 L82 64 Z" fill={Colors.primary} />
          {/* Windows */}
          <Path d="M42 64 L47 52 H61 V64 Z" fill={Colors.accent} opacity={0.6} />
          <Path d="M63 52 H73 L79 64 H63 Z" fill={Colors.accent} opacity={0.6} />
          {/* Wheels */}
          <Circle cx="42" cy="78" r="7" fill={Colors.primary} />
          <Circle cx="42" cy="78" r="3.5" fill={Colors.gray200} />
          <Circle cx="78" cy="78" r="7" fill={Colors.primary} />
          <Circle cx="78" cy="78" r="3.5" fill={Colors.gray200} />
          {/* Bumper */}
          <Path d="M24 77 H96" stroke={Colors.secondary} strokeWidth="2.5" strokeLinecap="round" />
        </Svg>
        <View>
          <Text style={[styles.brandName, { color: textColor }]}>CarNet</Text>
          <Text style={[styles.brandSub, { color: subColor }]}>România</Text>
        </View>
      </TouchableOpacity>

      {/* Premium limit modal */}
      <Modal visible={showLimitModal} transparent animationType="fade">
        <Pressable style={modalStyles.overlay} onPress={() => setShowLimitModal(false)}>
          <Pressable style={modalStyles.box} onPress={() => {}}>
            <Text style={modalStyles.icon}>🔒</Text>
            <Text style={modalStyles.title}>Limită atinsă</Text>
            <Text style={modalStyles.text}>
              Contul gratuit permite o singură mașină.{'\n'}
              Treci la <Text style={modalStyles.bold}>CarNet Premium</Text> pentru mașini nelimitate.
            </Text>
            <TouchableOpacity
              style={modalStyles.upgradeBtn}
              onPress={() => { setShowLimitModal(false); router.push('/premium'); }}
            >
              <Text style={modalStyles.upgradeBtnText}>👑  Upgrade Premium</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowLimitModal(false)}>
              <Text style={modalStyles.cancelText}>Anulează</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      {/* ── New car button ── */}
      <TouchableOpacity
        style={[styles.newBtn, { backgroundColor: newBtnBg, borderColor: newBtnBorder }]}
        onPress={handleNewCar}
        activeOpacity={0.75}
      >
        <Text style={[styles.newBtnPlus, { color: textColor }]}>+</Text>
        <Text style={[styles.newBtnLabel, { color: subColor }]}>Mașină nouă</Text>
      </TouchableOpacity>

      {/* ── Navigation ── */}
      <View style={styles.nav}>
        <TouchableOpacity
          style={[styles.navItem, isDashboard && styles.navItemActive]}
          onPress={() => router.push('/dashboard')}
        >
          <Text style={styles.navIcon}>🚗</Text>
          <Text style={[styles.navLabel, { color: isDashboard ? textColor : subColor }, isDashboard && { fontWeight: '700' }]}>
            Mașinile mele
          </Text>
        </TouchableOpacity>
        <View style={[styles.navItem, { justifyContent: 'space-between' }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Text style={styles.navIcon}>{isDark ? '🌙' : '☀️'}</Text>
            <Text style={[styles.navLabel, { color: subColor }]}>
              {isDark ? 'Dark mode' : 'Light mode'}
            </Text>
          </View>
          <ThemeSwitch isDark={isDark} onToggle={toggleTheme} />
        </View>
      </View>

      <View style={{ flex: 1 }} />

      {/* ── Premium card (bottom) ── */}
      {!user?.isPremium && (
        <TouchableOpacity style={styles.premiumCard} activeOpacity={0.85} onPress={() => router.push('/premium')}>
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
      <View style={[styles.divider, { backgroundColor: dividerColor }]} />

      {/* ── User row / auth ── */}
      {user && !user.isGuest ? (
        <View style={styles.userRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {(user.displayName || 'U')[0].toUpperCase()}
            </Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={[styles.userName, { color: textColor }]} numberOfLines={1}>
              {user.displayName}
            </Text>
            <Text style={[styles.userSub, { color: subColor }]}>
              {user.isPremium ? '⭐ Premium' : 'Cont gratuit'}
            </Text>
          </View>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
            <Text style={[styles.logoutIcon, { color: subColor }]}>↪</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.authRow}
          onPress={() => router.push('/login')}
        >
          <Text style={styles.authIcon}>🔑</Text>
          <Text style={[styles.authLabel, { color: subColor }]}>Autentifică-te</Text>
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

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  box: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    borderWidth: 2.5,
    borderColor: Colors.danger,
    padding: 28,
    alignItems: 'center',
    width: '100%',
    maxWidth: 340,
  },
  icon: { fontSize: 48, marginBottom: 12 },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.danger,
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    color: Colors.gray700,
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: 20,
  },
  bold: { fontWeight: '800', color: Colors.primary },
  upgradeBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 13,
    paddingHorizontal: 28,
    marginBottom: 12,
    width: '100%',
    alignItems: 'center',
  },
  upgradeBtnText: { color: Colors.white, fontSize: 15, fontWeight: '800' },
  cancelText: { color: Colors.gray400, fontSize: 13, fontWeight: '500' },
});
