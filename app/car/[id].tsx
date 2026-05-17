import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useCarStore } from '../../store/useCarStore';
import CarCard from '../../components/CarCard';
import { Colors } from '../../constants/colors';
import { checkRovinieta, validateRomanianPlate, formatPlate } from '../../services/rovinieta';

function DateField({ label, value, onSave }: { label: string; value?: string; onSave: (v: string) => void }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(value || '');

  const formatDate = (t: string) => {
    const d = t.replace(/\D/g, '');
    if (d.length <= 2) return d;
    if (d.length <= 4) return `${d.slice(0, 2)}.${d.slice(2)}`;
    return `${d.slice(0, 2)}.${d.slice(2, 4)}.${d.slice(4, 8)}`;
  };

  const isExpired = (dateStr: string) => {
    const [d, m, y] = dateStr.split('.').map(Number);
    return new Date(y, m - 1, d) < new Date();
  };

  const isExpiringSoon = (dateStr: string) => {
    const [d, m, y] = dateStr.split('.').map(Number);
    const diff = new Date(y, m - 1, d).getTime() - Date.now();
    return diff > 0 && diff < 30 * 24 * 60 * 60 * 1000;
  };

  const statusColor = value
    ? isExpired(value) ? Colors.danger : isExpiringSoon(value) ? Colors.warning : Colors.success
    : Colors.gray400;

  return (
    <View style={detailStyles.dateField}>
      <View style={detailStyles.dateFieldHeader}>
        <Text style={detailStyles.dateLabel}>{label}</Text>
        <TouchableOpacity
          onPress={() => {
            if (editing) { onSave(text); setEditing(false); }
            else setEditing(true);
          }}
          style={detailStyles.editBtn}
        >
          <Text style={detailStyles.editBtnText}>{editing ? 'Salvează' : '✏️ Editează'}</Text>
        </TouchableOpacity>
      </View>
      {editing ? (
        <TextInput
          style={detailStyles.dateInput}
          value={text}
          onChangeText={t => setText(formatDate(t))}
          placeholder="ZZ.LL.AAAA"
          placeholderTextColor={Colors.gray400}
          keyboardType="numeric"
          autoFocus
          maxLength={10}
          onSubmitEditing={() => { onSave(text); setEditing(false); }}
        />
      ) : (
        <View style={detailStyles.dateValue}>
          <View style={[detailStyles.statusDot, { backgroundColor: statusColor }]} />
          <Text style={[detailStyles.dateText, { color: statusColor }]}>
            {value || 'Necompletat — apasă Editează'}
          </Text>
        </View>
      )}
      {value && isExpiringSoon(value) && !isExpired(value) && (
        <Text style={detailStyles.expiryWarning}>⚠️ Expiră în mai puțin de 30 de zile!</Text>
      )}
      {value && isExpired(value) && (
        <Text style={detailStyles.expiryError}>⛔ Expirat! Reînnoiește cât mai curând.</Text>
      )}
    </View>
  );
}

function Field({ label, value, onSave, placeholder, keyboardType }: {
  label: string;
  value?: string;
  onSave: (v: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'numeric';
}) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(value || '');

  return (
    <View style={detailStyles.dateField}>
      <View style={detailStyles.dateFieldHeader}>
        <Text style={detailStyles.dateLabel}>{label}</Text>
        <TouchableOpacity
          onPress={() => {
            if (editing) { onSave(text); setEditing(false); }
            else setEditing(true);
          }}
          style={detailStyles.editBtn}
        >
          <Text style={detailStyles.editBtnText}>{editing ? 'Salvează' : '✏️ Editează'}</Text>
        </TouchableOpacity>
      </View>
      {editing ? (
        <TextInput
          style={detailStyles.dateInput}
          value={text}
          onChangeText={setText}
          placeholder={placeholder || 'Completează...'}
          placeholderTextColor={Colors.gray400}
          keyboardType={keyboardType || 'default'}
          autoFocus
          onSubmitEditing={() => { onSave(text); setEditing(false); }}
        />
      ) : (
        <View style={detailStyles.dateValue}>
          <View style={[detailStyles.statusDot, { backgroundColor: value ? Colors.accent : Colors.gray400 }]} />
          <Text style={[detailStyles.dateText, { color: value ? Colors.primary : Colors.gray400 }]}>
            {value || 'Necompletat — apasă Editează'}
          </Text>
        </View>
      )}
    </View>
  );
}

function PlateField({
  value,
  onSave,
}: {
  value?: string;
  onSave: (plate: string) => Promise<void>;
}) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(value || '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    setEditing(false);
    await onSave(text.trim().toUpperCase());
    setSaving(false);
  };

  return (
    <View style={detailStyles.dateField}>
      <View style={detailStyles.dateFieldHeader}>
        <Text style={detailStyles.dateLabel}>Număr de înmatriculare</Text>
        <TouchableOpacity
          onPress={() => editing ? handleSave() : setEditing(true)}
          style={detailStyles.editBtn}
          disabled={saving}
        >
          {saving
            ? <ActivityIndicator size="small" color={Colors.accent} />
            : <Text style={detailStyles.editBtnText}>{editing ? 'Salvează' : '✏️ Editează'}</Text>
          }
        </TouchableOpacity>
      </View>
      {editing ? (
        <TextInput
          style={detailStyles.dateInput}
          value={text}
          onChangeText={t => setText(t.toUpperCase().replace(/[^A-Z0-9\-]/g, ''))}
          placeholder="Ex: B-12-ABC sau CJ-12-XYZ"
          placeholderTextColor={Colors.gray400}
          autoCapitalize="characters"
          autoCorrect={false}
          maxLength={10}
          autoFocus
          onSubmitEditing={handleSave}
        />
      ) : (
        <View style={detailStyles.dateValue}>
          <View style={[detailStyles.statusDot, { backgroundColor: value ? Colors.accent : Colors.gray400 }]} />
          <Text style={[detailStyles.dateText, { color: value ? Colors.primary : Colors.gray400 }]}>
            {value ? formatPlate(value) : 'Necompletat — apasă Editează'}
          </Text>
        </View>
      )}
    </View>
  );
}

export default function CarDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { cars, updateCar, deleteCar } = useCarStore();
  const car = cars.find(c => c.id === id);

  if (!car) {
    return (
      <LinearGradient colors={[Colors.primary, '#0D1F3C']} style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: Colors.white, fontSize: 18 }}>Mașina nu a fost găsită.</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={{ color: Colors.accent, marginTop: 16 }}>← Înapoi</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  const handleDelete = async () => {
    await deleteCar(car.id);
    router.replace('/home');
  };

  const handleSavePlate = async (plate: string) => {
    await updateCar(car.id, { registrationNumber: plate || undefined });
    if (plate && validateRomanianPlate(plate)) {
      try {
        const result = await checkRovinieta(plate);
        if (result.valid && result.expiryDate) {
          await updateCar(car.id, { rovinetaExpiry: result.expiryDate });
        }
      } catch {
        // silent — user can set manually
      }
    }
  };

  const openRovinieta = () => {
    const norm = (car.registrationNumber || '').replace(/[\s\-\.]/g, '').toUpperCase();
    Linking.openURL(`https://www.roviniete.ro/ro/verificare-rovinieta?plate=${encodeURIComponent(norm)}`);
  };

  return (
    <LinearGradient colors={[Colors.primary, '#0D1F3C']} style={styles.gradient}>
      <SafeAreaView style={styles.safe} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{car.make} {car.model}</Text>
          <TouchableOpacity onPress={handleDelete} style={styles.deleteBtn}>
            <Text style={styles.deleteIcon}>🗑</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
          {/* Car Card */}
          <View style={styles.cardContainer}>
            <CarCard car={car} />
          </View>

          {/* Technical details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Date tehnice</Text>
            <View style={styles.detailsGrid}>
              {[
                { label: 'Marcă', value: car.make },
                { label: 'Model', value: car.model },
                { label: 'An fabricație', value: String(car.year) },
                { label: 'Număr șasiu', value: car.vin },
              ].map((item, i) => (
                <View key={i} style={styles.detailRow}>
                  <Text style={styles.detailLabel}>{item.label}</Text>
                  <Text style={styles.detailValue} selectable>{item.value || '—'}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Documents & expiry */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Documente & Termene</Text>
            <View style={styles.expiryContainer}>
              <DateField
                label="RCA / Asigurare"
                value={car.insuranceExpiry}
                onSave={v => updateCar(car.id, { insuranceExpiry: v || undefined })}
              />
              <View style={styles.expiryDivider} />
              <DateField
                label="ITP (Inspecție Tehnică Periodică)"
                value={car.itpExpiry}
                onSave={v => updateCar(car.id, { itpExpiry: v || undefined })}
              />
            </View>
          </View>

          {/* Plate & ROVinieta */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Plăcuță & ROViniete</Text>
            <View style={styles.expiryContainer}>
              <PlateField
                value={car.registrationNumber}
                onSave={handleSavePlate}
              />
              <View style={styles.expiryDivider} />
              <DateField
                label="ROVinieta — dată expirare"
                value={car.rovinetaExpiry}
                onSave={v => updateCar(car.id, { rovinetaExpiry: v || undefined })}
              />
            </View>

            <TouchableOpacity style={styles.rovinetaLink} onPress={openRovinieta}>
              <Text style={styles.rovinetaLinkText}>🔍  Verifică pe roviniete.ro</Text>
            </TouchableOpacity>

            <Text style={styles.rovinetaHint}>
              Dacă verificarea automată nu funcționează, introduceți data manual sau vizitați site-ul oficial.
            </Text>
          </View>

          {/* Oil change / service history */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ultimul schimb de ulei</Text>
            <View style={styles.expiryContainer}>
              <DateField
                label="Data schimbului"
                value={car.lastServiceDate}
                onSave={v => updateCar(car.id, { lastServiceDate: v || undefined })}
              />
              <View style={styles.expiryDivider} />
              <Field
                label="KM la schimb"
                value={car.lastServiceKm}
                onSave={v => updateCar(car.id, { lastServiceKm: v || undefined })}
                placeholder="Ex: 150000"
                keyboardType="numeric"
              />
              <View style={styles.expiryDivider} />
              <Field
                label="KM următor schimb"
                value={car.nextServiceKm}
                onSave={v => updateCar(car.id, { nextServiceKm: v || undefined })}
                placeholder="Ex: 160000"
                keyboardType="numeric"
              />
              <View style={styles.expiryDivider} />
              <Field
                label="Observații"
                value={car.lastServiceNotes}
                onSave={v => updateCar(car.id, { lastServiceNotes: v || undefined })}
                placeholder="Ex: Ulei 5W-40, filtru schimbat"
              />
            </View>
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safe: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    width: 40, height: 40,
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 12,
  },
  backIcon: { color: Colors.white, fontSize: 20, fontWeight: '600' },
  headerTitle: { color: Colors.white, fontSize: 18, fontWeight: '700' },
  deleteBtn: {
    width: 40, height: 40,
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: '#FCA5A5', borderRadius: 12,
  },
  deleteIcon: { fontSize: 18 },
  scroll: { padding: 16 },
  cardContainer: { alignItems: 'center', marginBottom: 20 },
  section: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: { fontSize: 17, fontWeight: '800', color: Colors.primary, marginBottom: 14 },
  detailsGrid: { gap: 0 },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray100,
  },
  detailLabel: { fontSize: 13, color: Colors.gray500, flex: 1 },
  detailValue: { fontSize: 13, fontWeight: '600', color: Colors.primary, flex: 1, textAlign: 'right' },
  expiryContainer: { gap: 0 },
  expiryDivider: { height: 1, backgroundColor: Colors.gray100, marginVertical: 8 },
  rovinetaLink: {
    marginTop: 14,
    backgroundColor: '#EFF6FF',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: Colors.accent + '30',
  },
  rovinetaLinkText: { color: Colors.accent, fontSize: 13, fontWeight: '700' },
  rovinetaHint: {
    fontSize: 11,
    color: Colors.gray400,
    marginTop: 10,
    lineHeight: 16,
    fontStyle: 'italic',
  },
});

const detailStyles = StyleSheet.create({
  dateField: { paddingVertical: 8 },
  dateFieldHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  dateLabel: { fontSize: 14, fontWeight: '600', color: Colors.primary },
  editBtn: {
    backgroundColor: Colors.gray100,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    minWidth: 80,
    alignItems: 'center',
  },
  editBtnText: { fontSize: 12, color: Colors.accent, fontWeight: '600' },
  dateInput: {
    borderWidth: 1.5,
    borderColor: Colors.accent,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: Colors.primary,
    backgroundColor: Colors.gray100,
    letterSpacing: 1,
  },
  dateValue: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  dateText: { fontSize: 15, fontWeight: '600' },
  expiryWarning: { fontSize: 12, color: Colors.warning, marginTop: 4, fontWeight: '500' },
  expiryError: { fontSize: 12, color: Colors.danger, marginTop: 4, fontWeight: '500' },
});
