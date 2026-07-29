import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Car } from '../types';
import { Colors } from '../constants/colors';
import { formatPlate } from '../services/rovinieta';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = Math.min(SCREEN_WIDTH - 32, 400);

interface Props {
  car: Car;
  onPress?: () => void;
}

// Pure View-based flag badges — avoids react-native-svg Fabric prop-type conflicts on iOS
function OriginBadge({ origin }: { origin?: string }) {
  if (!origin || origin === 'OTHER') return null;
  const SIZE = 22;
  const R = SIZE / 2;
  const DOT = 1.5; // star dot radius

  if (origin === 'EU') {
    const dots = Array.from({ length: 12 }, (_, i) => {
      const angle = (i * 30 - 90) * (Math.PI / 180);
      return {
        left: R + R * 0.6 * Math.cos(angle) - DOT,
        top:  R + R * 0.6 * Math.sin(angle) - DOT,
      };
    });
    return (
      <View style={{ width: SIZE, height: SIZE, borderRadius: R, backgroundColor: '#003399', marginTop: 6, overflow: 'hidden' }}>
        {dots.map((d, i) => (
          <View key={i} style={{ position: 'absolute', width: DOT * 2, height: DOT * 2, borderRadius: DOT, backgroundColor: '#FFDD00', left: d.left, top: d.top }} />
        ))}
      </View>
    );
  }

  if (origin === 'NA') {
    const s = SIZE;
    return (
      <View style={{ width: s, height: s, borderRadius: R, backgroundColor: '#B22234', marginTop: 6, overflow: 'hidden' }}>
        <View style={{ position: 'absolute', left: 0, right: 0, top: s * 0.27, height: s * 0.15, backgroundColor: '#FFFFFF' }} />
        <View style={{ position: 'absolute', left: 0, right: 0, top: s * 0.57, height: s * 0.15, backgroundColor: '#FFFFFF' }} />
        <View style={{ position: 'absolute', left: 0, right: 0, top: s * 0.85, height: s * 0.15, backgroundColor: '#FFFFFF' }} />
        <View style={{ position: 'absolute', left: 0, top: 0, width: s * 0.45, height: s * 0.57, backgroundColor: '#3C3B6E' }} />
      </View>
    );
  }

  if (origin === 'JP') {
    return (
      <View style={{ width: SIZE, height: SIZE, borderRadius: R, backgroundColor: '#FFFFFF', marginTop: 6, overflow: 'hidden', justifyContent: 'center', alignItems: 'center', borderWidth: 0.5, borderColor: '#DDD' }}>
        <View style={{ width: SIZE * 0.48, height: SIZE * 0.48, borderRadius: SIZE * 0.24, backgroundColor: '#BC002D' }} />
      </View>
    );
  }

  return null;
}

// Pure View-based car silhouette — avoids react-native-svg Fabric prop-type issues
function CarSilhouette() {
  return (
    <View style={{ width: 120, height: 58, marginTop: 2, marginBottom: 2 }}>
      {/* Road line */}
      <View style={{ position: 'absolute', top: 40, left: 5, right: 5, height: 2, backgroundColor: 'rgba(255,255,255,0.4)' }} />
      {/* Body */}
      <View style={{ position: 'absolute', top: 26, left: 8, right: 8, height: 15, backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 4 }} />
      {/* Cabin */}
      <View style={{ position: 'absolute', top: 10, left: 25, right: 25, height: 18, backgroundColor: 'rgba(255,255,255,0.3)', borderTopLeftRadius: 6, borderTopRightRadius: 6 }} />
      {/* Windows */}
      <View style={{ position: 'absolute', top: 13, left: 27, width: 24, height: 11, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 2 }} />
      <View style={{ position: 'absolute', top: 13, right: 27, width: 24, height: 11, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 2 }} />
      {/* Left wheel */}
      <View style={{ position: 'absolute', top: 30, left: 15, width: 20, height: 20, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.35)' }}>
        <View style={{ position: 'absolute', top: 6, left: 6, width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.15)' }} />
      </View>
      {/* Right wheel */}
      <View style={{ position: 'absolute', top: 30, right: 15, width: 20, height: 20, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.35)' }}>
        <View style={{ position: 'absolute', top: 6, left: 6, width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.15)' }} />
      </View>
    </View>
  );
}

function isExpiringSoon(dateStr?: string): boolean {
  if (!dateStr) return false;
  const [day, month, year] = dateStr.split('.').map(Number);
  const diff = new Date(year, month - 1, day).getTime() - Date.now();
  return diff > 0 && diff < 30 * 24 * 60 * 60 * 1000;
}

function isExpired(dateStr?: string): boolean {
  if (!dateStr) return false;
  const [day, month, year] = dateStr.split('.').map(Number);
  return new Date(year, month - 1, day).getTime() < Date.now();
}

function statusColor(date?: string): string {
  if (!date) return '#475569';
  if (isExpired(date)) return Colors.danger;
  if (isExpiringSoon(date)) return Colors.warning;
  return Colors.success;
}

function ExpiryBadge({ label, date }: { label: string; date?: string }) {
  const color = statusColor(date);
  return (
    <View style={styles.expiryBadge}>
      <Text style={styles.expiryLabel}>{label}</Text>
      <View style={[styles.expiryDateBox, { borderColor: color + '55' }]}>
        <View style={[styles.expiryDot, { backgroundColor: color }]} />
        <Text style={[styles.expiryDate, { color }]} numberOfLines={1}>
          {date || 'Necompletat'}
        </Text>
      </View>
    </View>
  );
}

export default function CarCard({ car, onPress }: Props) {
  const hasPlate = !!car.registrationNumber;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.92}>
      {/* Shadow wrapper is separate from the overflow:hidden LinearGradient.
          On iOS, overflow:hidden clips shadows — so shadow must live on a parent View. */}
      <View style={[styles.cardShadow, { width: CARD_WIDTH }]}>
      <LinearGradient
        colors={['#0F2027', '#203A43', '#2C5364']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.card, { width: CARD_WIDTH }]}
      >
        <View style={styles.glowCircle1} />
        <View style={styles.glowCircle2} />

        {/* Top row: logo + car identity */}
        <View style={styles.topRow}>
          <View>
            <Text style={styles.logoText}>CarNet</Text>
            <Text style={styles.logoSubText}>România</Text>
            <OriginBadge origin={car.origin} />
          </View>
          <View style={styles.carNameArea}>
            <Text style={styles.carMake}>{car.make}</Text>
            <Text style={styles.carModel}>{car.model}</Text>
            <Text style={styles.carYear}>{car.year > 0 ? car.year : '—'}</Text>
            {!!car.generation && (
              <Text style={styles.carGeneration}>{car.generation}</Text>
            )}
            {hasPlate && (
              <View style={styles.plateBadge}>
                <View style={styles.plateRO}>
                  <Text style={styles.plateROText}>RO</Text>
                </View>
                <Text style={styles.plateText}>{formatPlate(car.registrationNumber!)}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Car silhouette */}
        <View style={styles.silhouetteArea}>
          <CarSilhouette />
        </View>

        {/* Chip + VIN */}
        <View style={styles.chipArea}>
          <LinearGradient
            colors={['#D4AF37', '#F5E080', '#D4AF37']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.chip}
          >
            <View style={styles.chipLines}>
              {[0, 1, 2].map(i => <View key={i} style={styles.chipLine} />)}
            </View>
          </LinearGradient>
          <View style={styles.vinArea}>
            <Text style={styles.vinLabel}>Serie șasiu</Text>
            <Text style={styles.vinNumber} numberOfLines={1}>{car.vin.toUpperCase()}</Text>
          </View>
        </View>

        {/* Expiry row: RCA + ITP */}
        <View style={styles.expiryRow}>
          <ExpiryBadge label="RCA" date={car.insuranceExpiry} />
          <View style={styles.expiryRowDivider} />
          <ExpiryBadge label="ITP" date={car.itpExpiry} />
        </View>

        {/* ROVinieta row — centered */}
        <View style={styles.rovinetaRow}>
          <View style={styles.rovinetaBadgeWrapper}>
            <ExpiryBadge label="ROVinieta" date={car.rovinetaExpiry} />
          </View>
        </View>
      </LinearGradient>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // iOS: shadow must be on a parent that does NOT have overflow:hidden
  cardShadow: {
    borderRadius: 20,
    backgroundColor: '#0F2027', // matches gradient start — required for iOS shadow rendering
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
  },
  card: {
    borderRadius: 20,
    padding: 16,
    overflow: 'hidden', // clips glow circles and child content to the card shape
    elevation: 12,      // Android shadow
  },
  glowCircle1: {
    position: 'absolute',
    width: 200, height: 200, borderRadius: 100,
    backgroundColor: '#3B82F6', opacity: 0.06,
    top: -60, right: -60,
  },
  glowCircle2: {
    position: 'absolute',
    width: 150, height: 150, borderRadius: 75,
    backgroundColor: '#60A5FA', opacity: 0.04,
    bottom: -40, left: -30,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  logoText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800', letterSpacing: 1 },
  logoSubText: { color: '#94A3B8', fontSize: 9, letterSpacing: 2, textTransform: 'uppercase' },
  carNameArea: { alignItems: 'flex-end' },
  carMake: { color: '#94A3B8', fontSize: 10, letterSpacing: 1, textTransform: 'uppercase' },
  carModel: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  carYear: { color: '#60A5FA', fontSize: 11, fontWeight: '500' },
  carGeneration: { color: '#94A3B8', fontSize: 9, marginTop: 1, letterSpacing: 0.3 },
  plateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#334155',
  },
  plateRO: {
    backgroundColor: '#1E3A8A',
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
  plateROText: { color: '#FFFFFF', fontSize: 8, fontWeight: '800', letterSpacing: 0.5 },
  plateText: {
    color: '#E2E8F0',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    paddingHorizontal: 7,
    paddingVertical: 3,
    backgroundColor: 'rgba(255,255,255,0.07)',
  },
  silhouetteArea: {
    alignItems: 'center',
    marginTop: 2,
    marginBottom: 2,
  },
  chipArea: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 5,
  },
  chip: {
    width: 36, height: 28, borderRadius: 5,
    justifyContent: 'center', alignItems: 'center', padding: 4,
  },
  chipLines: { width: '100%', height: '100%', justifyContent: 'space-between' },
  chipLine: { height: 2, backgroundColor: '#92400E', borderRadius: 1, opacity: 0.5 },
  vinArea: { flex: 1 },
  vinLabel: { color: '#64748B', fontSize: 8, letterSpacing: 1.5, textTransform: 'uppercase' },
  vinNumber: {
    color: '#E2E8F0', fontSize: 11, fontWeight: '600',
    letterSpacing: 1.5, fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  expiryRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginBottom: 6,
  },
  expiryRowDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.12)',
    marginHorizontal: 8,
  },
  rovinetaRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 4,
  },
  rovinetaBadgeWrapper: {
    width: '50%',
  },
  expiryBadge: { flex: 1 },
  expiryLabel: {
    color: '#64748B', fontSize: 8, textTransform: 'uppercase',
    letterSpacing: 0.5, marginBottom: 4,
  },
  expiryDateBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
    gap: 5,
  },
  expiryDot: { width: 6, height: 6, borderRadius: 3 },
  expiryDate: { fontSize: 11, fontWeight: '600', flex: 1 },
});
