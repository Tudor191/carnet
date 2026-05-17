import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle, Ellipse, G, Rect } from 'react-native-svg';
import { Car } from '../types';
import { Colors } from '../constants/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = Math.min(SCREEN_WIDTH - 32, 400);
const CARD_HEIGHT = CARD_WIDTH * 0.6;

interface Props {
  car: Car;
  onPress?: () => void;
}

function CarSilhouette({ color }: { color: string }) {
  return (
    <Svg width={140} height={70} viewBox="0 0 140 70">
      {/* Car body */}
      <Path
        d="M10 48 L15 32 L28 22 L88 22 L102 32 L118 48 Z"
        fill={color}
        opacity={0.25}
      />
      {/* Roof */}
      <Path
        d="M30 32 L38 14 H88 L98 32 Z"
        fill={color}
        opacity={0.3}
      />
      {/* Windshield */}
      <Path d="M34 32 L41 17 H85 L92 32 Z" fill={color} opacity={0.15} />
      {/* Side windows */}
      <Path d="M34 32 L41 18 L55 18 L55 32 Z" fill={color} opacity={0.1} />
      <Path d="M57 18 H83 L90 32 H57 Z" fill={color} opacity={0.1} />
      {/* Body line */}
      <Path
        d="M8 48 H122"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity={0.4}
      />
      {/* Wheels */}
      <Circle cx="32" cy="49" r="11" fill={color} opacity={0.35} />
      <Circle cx="32" cy="49" r="6" fill={color} opacity={0.15} />
      <Circle cx="32" cy="49" r="2" fill={color} opacity={0.3} />
      <Circle cx="97" cy="49" r="11" fill={color} opacity={0.35} />
      <Circle cx="97" cy="49" r="6" fill={color} opacity={0.15} />
      <Circle cx="97" cy="49" r="2" fill={color} opacity={0.3} />
      {/* Headlights */}
      <Ellipse cx="112" cy="42" rx="6" ry="4" fill={color} opacity={0.4} />
      <Ellipse cx="16" cy="42" rx="5" ry="3.5" fill={color} opacity={0.25} />
    </Svg>
  );
}

function isExpiringSoon(dateStr?: string): boolean {
  if (!dateStr) return false;
  const [day, month, year] = dateStr.split('.').map(Number);
  const date = new Date(year, month - 1, day);
  const diff = date.getTime() - Date.now();
  return diff > 0 && diff < 30 * 24 * 60 * 60 * 1000;
}

function isExpired(dateStr?: string): boolean {
  if (!dateStr) return false;
  const [day, month, year] = dateStr.split('.').map(Number);
  const date = new Date(year, month - 1, day);
  return date.getTime() < Date.now();
}

function ExpiryBadge({ label, date }: { label: string; date?: string }) {
  const expired = isExpired(date);
  const soon = isExpiringSoon(date);
  const color = expired
    ? Colors.danger
    : soon
    ? Colors.warning
    : Colors.success;

  return (
    <View style={styles.expiryBadge}>
      <Text style={styles.expiryLabel}>{label}</Text>
      <View style={[styles.expiryDateBox, { borderColor: color + '60' }]}>
        <View style={[styles.expiryDot, { backgroundColor: color }]} />
        <Text style={[styles.expiryDate, { color }]}>
          {date || 'Necompletat'}
        </Text>
      </View>
    </View>
  );
}

export default function CarCard({ car, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.92}>
      <LinearGradient
        colors={['#0F2027', '#203A43', '#2C5364']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.card, { width: CARD_WIDTH, height: CARD_HEIGHT }]}
      >
        {/* Shiny overlay circles */}
        <View style={styles.glowCircle1} />
        <View style={styles.glowCircle2} />

        {/* Top row: logo + car name */}
        <View style={styles.topRow}>
          <View style={styles.logoArea}>
            <Text style={styles.logoText}>CarNet</Text>
            <Text style={styles.logoSubText}>România</Text>
          </View>
          <View style={styles.carNameArea}>
            <Text style={styles.carMake}>{car.make}</Text>
            <Text style={styles.carModel}>{car.model}</Text>
            <Text style={styles.carYear}>{car.year}</Text>
          </View>
        </View>

        {/* Car silhouette */}
        <View style={styles.silhouetteArea}>
          <CarSilhouette color="#FFFFFF" />
        </View>

        {/* Chip area */}
        <View style={styles.chipArea}>
          <LinearGradient
            colors={['#D4AF37', '#F5E080', '#D4AF37']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.chip}
          >
            <View style={styles.chipLines}>
              {[0, 1, 2].map(i => (
                <View key={i} style={styles.chipLine} />
              ))}
            </View>
          </LinearGradient>
          <View style={styles.vinArea}>
            <Text style={styles.vinLabel}>SERIE ȘASIU</Text>
            <Text style={styles.vinNumber}>{car.vin.toUpperCase()}</Text>
          </View>
        </View>

        {/* Details row */}
        <View style={styles.detailsRow}>
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>Culoare</Text>
            <Text style={styles.detailValue}>{car.color}</Text>
          </View>
          <View style={styles.detailDivider} />
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>Motor</Text>
            <Text style={styles.detailValue}>{car.engineDisplacement}</Text>
          </View>
          <View style={styles.detailDivider} />
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>Putere</Text>
            <Text style={styles.detailValue}>{car.horsepower > 0 ? `${car.horsepower} CP` : '—'}</Text>
          </View>
          <View style={styles.detailDivider} />
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>Combustibil</Text>
            <Text style={styles.detailValue} numberOfLines={1}>{car.fuelType}</Text>
          </View>
        </View>

        {/* Expiry row */}
        <View style={styles.expiryRow}>
          <ExpiryBadge label="RCA / Asigurare" date={car.insuranceExpiry} />
          <ExpiryBadge label="ITP" date={car.itpExpiry} />
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
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#3B82F6',
    opacity: 0.06,
    top: -60,
    right: -60,
  },
  glowCircle2: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#60A5FA',
    opacity: 0.04,
    bottom: -40,
    left: -30,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  logoArea: {},
  logoText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1,
  },
  logoSubText: {
    color: '#94A3B8',
    fontSize: 9,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  carNameArea: {
    alignItems: 'flex-end',
  },
  carMake: {
    color: '#94A3B8',
    fontSize: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  carModel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  carYear: {
    color: '#60A5FA',
    fontSize: 11,
    fontWeight: '500',
  },
  silhouetteArea: {
    alignItems: 'center',
    marginTop: -4,
    marginBottom: -4,
  },
  chipArea: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  chip: {
    width: 36,
    height: 28,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
  chipLines: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
  chipLine: {
    height: 2,
    backgroundColor: '#92400E',
    borderRadius: 1,
    opacity: 0.5,
  },
  vinArea: {
    flex: 1,
  },
  vinLabel: {
    color: '#64748B',
    fontSize: 8,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  vinNumber: {
    color: '#E2E8F0',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.5,
    fontFamily: 'monospace',
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 8,
    padding: 8,
    marginBottom: 6,
  },
  detail: {
    flex: 1,
    alignItems: 'center',
  },
  detailDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  detailLabel: {
    color: '#64748B',
    fontSize: 8,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  detailValue: {
    color: '#E2E8F0',
    fontSize: 10,
    fontWeight: '600',
  },
  expiryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  expiryBadge: {
    flex: 1,
  },
  expiryLabel: {
    color: '#64748B',
    fontSize: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 3,
  },
  expiryDateBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
    gap: 4,
  },
  expiryDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  expiryDate: {
    fontSize: 10,
    fontWeight: '600',
  },
});
