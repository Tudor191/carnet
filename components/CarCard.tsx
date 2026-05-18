import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle, Ellipse } from 'react-native-svg';
import { Car } from '../types';
import { Colors } from '../constants/colors';
import { formatPlate } from '../services/rovinieta';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = Math.min(SCREEN_WIDTH - 32, 400);

interface Props {
  car: Car;
  onPress?: () => void;
}

function CarSilhouette({ color }: { color: string }) {
  return (
    <Svg width={120} height={58} viewBox="0 0 140 70">
      <Path d="M10 48 L15 32 L28 22 L88 22 L102 32 L118 48 Z" fill={color} opacity={0.25} />
      <Path d="M30 32 L38 14 H88 L98 32 Z" fill={color} opacity={0.3} />
      <Path d="M34 32 L41 17 H85 L92 32 Z" fill={color} opacity={0.15} />
      <Path d="M8 48 H122" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity={0.4} />
      <Circle cx="32" cy="49" r="11" fill={color} opacity={0.35} />
      <Circle cx="32" cy="49" r="6" fill={color} opacity={0.15} />
      <Circle cx="32" cy="49" r="2" fill={color} opacity={0.3} />
      <Circle cx="97" cy="49" r="11" fill={color} opacity={0.35} />
      <Circle cx="97" cy="49" r="6" fill={color} opacity={0.15} />
      <Circle cx="97" cy="49" r="2" fill={color} opacity={0.3} />
      <Ellipse cx="112" cy="42" rx="6" ry="4" fill={color} opacity={0.4} />
      <Ellipse cx="16" cy="42" rx="5" ry="3.5" fill={color} opacity={0.25} />
    </Svg>
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
          </View>
          <View style={styles.carNameArea}>
            <Text style={styles.carMake}>{car.make}</Text>
            <Text style={styles.carModel}>{car.model}</Text>
            <Text style={styles.carYear}>{car.year}</Text>
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
          <CarSilhouette color="#FFFFFF" />
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

        {/* ROVinieta row */}
        <View style={styles.rovinetaRow}>
          <ExpiryBadge label="ROVinieta" date={car.rovinetaExpiry} />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 16,
    overflow: 'hidden',
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
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
    letterSpacing: 1.5, fontFamily: 'monospace',
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
    marginBottom: 4,
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
