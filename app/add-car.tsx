import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { lookupVin } from '../services/vinLookup';
import { useCarStore } from '../store/useCarStore';
import { useThemeStore } from '../store/useThemeStore';
import { DARK, LIGHT, ThemeColors } from '../constants/themes';
import { VinLookupResult } from '../types';
import { Colors } from '../constants/colors';

function Field({ label, value, onChangeText, placeholder, editable = true, keyboardType = 'default', hint, tc }: {
  label: string; value: string; onChangeText: (t: string) => void;
  placeholder?: string; editable?: boolean; keyboardType?: 'default' | 'numeric'; hint?: string;
  tc: ThemeColors;
}) {
  return (
    <View style={f.field}>
      <Text style={[f.fieldLabel, { color: tc.text }]}>{label}</Text>
      <TextInput
        style={[
          f.fieldInput,
          { borderColor: tc.inputBorder, color: tc.inputText, backgroundColor: tc.inputBg },
          !editable && { backgroundColor: tc.bgAlt, color: tc.muted },
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder || label}
        placeholderTextColor={tc.inputPlaceholder}
        editable={editable}
        keyboardType={keyboardType}
        autoCorrect={false}
      />
      {hint ? <Text style={[f.fieldHint, { color: tc.muted }]}>{hint}</Text> : null}
    </View>
  );
}

function DateField({ label, value, onChangeText, tc }: {
  label: string; value: string; onChangeText: (t: string) => void; tc: ThemeColors;
}) {
  const fmt = (t: string) => {
    const d = t.replace(/\D/g, '');
    if (d.length <= 2) return d;
    if (d.length <= 4) return `${d.slice(0, 2)}.${d.slice(2)}`;
    return `${d.slice(0, 2)}.${d.slice(2, 4)}.${d.slice(4, 8)}`;
  };
  return (
    <Field label={label} value={value} onChangeText={t => onChangeText(fmt(t))}
      placeholder="ZZ.LL.AAAA" keyboardType="numeric" tc={tc} />
  );
}

export default function AddCarScreen() {
  const { addCar } = useCarStore();
  const { theme } = useThemeStore();
  const tc = theme === 'dark' ? DARK : LIGHT;

  const [vin, setVin] = useState('');
  const [lookupResult, setLookupResult] = useState<VinLookupResult | null>(null);
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupError, setLookupError] = useState('');
  const [saving, setSaving] = useState(false);

  const [model, setModel] = useState('');
  const [manualYear, setManualYear] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [insuranceExpiry, setInsuranceExpiry] = useState('');
  const [itpExpiry, setItpExpiry] = useState('');

  const [lastServiceDate, setLastServiceDate] = useState('');
  const [lastServiceKm, setLastServiceKm] = useState('');
  const [nextServiceKm, setNextServiceKm] = useState('');
  const [lastServiceNotes, setLastServiceNotes] = useState('');

  const scrollRef = useRef<ScrollView>(null);

  const handleLookup = async () => {
    setLookupError('');
    setLookupResult(null);
    const trimmed = vin.trim().replace(/\s/g, '').toUpperCase();
    if (trimmed.length !== 17) {
      setLookupError('Numărul de șasiu (VIN) trebuie să aibă exact 17 caractere.');
      return;
    }
    setVin(trimmed);
    setLookupLoading(true);
    const result = await lookupVin(trimmed);
    setLookupLoading(false);
    if (result.error) { setLookupError(result.error); return; }
    setLookupResult(result);
    setManualYear('');
    setModel(result.model && result.model !== 'Necunoscut' ? result.model : '');
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 300);
  };

  const handleSave = async () => {
    if (!lookupResult) return;
    setSaving(true);
    try {
      await addCar({
        vin: vin.toUpperCase(),
        make: lookupResult.make,
        model: model.trim() || 'Necunoscut',
        year: manualYear ? parseInt(manualYear, 10) : lookupResult.year,
        color: 'Necunoscut',
        engineType: lookupResult.engineType,
        engineDisplacement: lookupResult.engineDisplacement,
        horsepower: lookupResult.horsepower,
        fuelType: lookupResult.fuelType,
        transmission: lookupResult.transmission,
        bodyType: lookupResult.bodyType,
        origin: lookupResult.origin,
        generation: lookupResult.generation,
        registrationNumber: registrationNumber.trim() || undefined,
        insuranceExpiry: insuranceExpiry || undefined,
        itpExpiry: itpExpiry || undefined,
        lastServiceDate: lastServiceDate || undefined,
        lastServiceKm: lastServiceKm || undefined,
        nextServiceKm: nextServiceKm || undefined,
        lastServiceNotes: lastServiceNotes.trim() || undefined,
      });
      router.replace('/dashboard');
    } catch {
      Alert.alert('Eroare', 'Nu s-a putut salva mașina. Încearcă din nou.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={[styles.root, { backgroundColor: tc.bg }]}>
      <SafeAreaView style={styles.safe} edges={['top']}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>

          {/* Header */}
          <View style={[styles.header, { borderBottomColor: tc.navBorder, backgroundColor: tc.navBg }]}>
            <TouchableOpacity onPress={() => router.back()} style={[styles.backBtn, { backgroundColor: tc.card, borderColor: tc.border }]}>
              <Text style={[styles.backIcon, { color: tc.text }]}>←</Text>
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { color: tc.text }]}>Adaugă mașină</Text>
            <View style={{ width: 40 }} />
          </View>

          <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

            {/* VIN input */}
            <View style={[styles.card, { backgroundColor: tc.card, borderColor: tc.border, shadowColor: tc.shadowColor, shadowOpacity: tc.shadowOpacity }]}>
              <Text style={[styles.cardTitle, { color: tc.text }]}>Număr de șasiu (VIN)</Text>
              <Text style={[styles.cardDesc, { color: tc.sub }]}>
                Introduceți seria șasiului (17 caractere) și datele vehiculului vor fi completate automat.
                Seria se găsește pe cartea de identitate a vehiculului sau pe bord.
              </Text>
              <View style={styles.vinInputRow}>
                <TextInput
                  style={[
                    styles.vinInput,
                    { borderColor: lookupError ? Colors.danger : tc.inputBorder, color: tc.inputText, backgroundColor: tc.inputBg },
                  ]}
                  value={vin}
                  onChangeText={v => { setVin(v.toUpperCase().replace(/\s/g, '')); setLookupError(''); setLookupResult(null); }}
                  placeholder="Ex: WBA3A5G5XHN123456"
                  placeholderTextColor={tc.inputPlaceholder}
                  autoCapitalize="characters"
                  autoCorrect={false}
                  maxLength={17}
                  returnKeyType="search"
                  onSubmitEditing={handleLookup}
                />
                <Text style={[styles.vinCounter, { color: tc.muted }]}>{vin.length}/17</Text>
              </View>
              {!!lookupError && <Text style={styles.errorText}>{lookupError}</Text>}
              <TouchableOpacity
                style={[styles.lookupBtn, (lookupLoading || vin.length !== 17) && styles.lookupBtnDisabled]}
                onPress={handleLookup}
                disabled={lookupLoading || vin.length !== 17}
              >
                {lookupLoading
                  ? <ActivityIndicator color="#FFF" size="small" />
                  : <Text style={styles.lookupBtnText}>🔍  Caută vehiculul</Text>}
              </TouchableOpacity>
            </View>

            {/* Results */}
            {lookupResult && (
              <View style={styles.resultsSection}>
                {/* Banner */}
                <View style={[styles.resultsBanner, { backgroundColor: Colors.success + '18', borderColor: Colors.success + '40' }]}>
                  <Text style={[styles.resultsBannerIcon, { color: Colors.success }]}>✓</Text>
                  <Text style={[styles.resultsBannerText, { color: Colors.success }]}>
                    Vehicul identificat: {lookupResult.make} {model || '—'} ({lookupResult.year > 0 ? lookupResult.year : '?'})
                  </Text>
                </View>

                {/* Auto-filled */}
                <View style={[styles.card, { backgroundColor: tc.card, borderColor: tc.border, shadowColor: tc.shadowColor, shadowOpacity: tc.shadowOpacity }]}>
                  <Text style={[styles.cardTitle, { color: tc.text }]}>Date completate automat</Text>
                  <View>
                    {[
                      { label: 'Marcă', value: lookupResult.make, corrected: false },
                      { label: 'Model', value: lookupResult.model !== 'Necunoscut' ? lookupResult.model : '—', corrected: false },
                      { label: 'An fabricație', value: manualYear || (lookupResult.year > 0 ? String(lookupResult.year) : '—'), corrected: !!manualYear },
                      ...(lookupResult.generation ? [{ label: 'Generație', value: lookupResult.generation, corrected: false }] : []),
                    ].map((item, i) => (
                      <View key={i} style={[styles.infoItem, { borderBottomColor: tc.border }]}>
                        <Text style={[styles.infoLabel, { color: tc.sub }]}>{item.label}</Text>
                        <Text style={[styles.infoValue, { color: item.corrected ? Colors.accent : tc.text }]}>{item.value || '—'}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                {/* Manual fields */}
                <View style={[styles.card, { backgroundColor: tc.card, borderColor: tc.border, shadowColor: tc.shadowColor, shadowOpacity: tc.shadowOpacity, gap: 12 }]}>
                  <Text style={[styles.cardTitle, { color: tc.text }]}>Completează manual</Text>
                  <Field
                    label={lookupResult.model !== 'Necunoscut' ? 'Model (corectați dacă e necesar)' : 'Model *'}
                    value={model} onChangeText={setModel}
                    placeholder="Ex: Touareg, Seria 5, Golf..."
                    hint={lookupResult.model === 'Necunoscut' ? 'Modelul nu a putut fi detectat automat — introduceți manual' : undefined}
                    tc={tc}
                  />
                  <Field
                    label="An fabricație (corectați dacă e necesar)"
                    value={manualYear} onChangeText={t => setManualYear(t.replace(/\D/g, '').slice(0, 4))}
                    placeholder={lookupResult.year > 0 ? String(lookupResult.year) : 'Ex: 2022'}
                    keyboardType="numeric"
                    hint={lookupResult.year === 0 ? 'Anul nu a putut fi detectat automat — introduceți manual' : undefined}
                    tc={tc}
                  />
                  <Field
                    label="Număr de înmatriculare (opțional)"
                    value={registrationNumber}
                    onChangeText={t => setRegistrationNumber(t.toUpperCase().replace(/[^A-Z0-9\-]/g, ''))}
                    placeholder="Ex: B-12-ABC sau CJ-12-XYZ"
                    tc={tc}
                  />
                  <DateField label="Expirare RCA / Asigurare" value={insuranceExpiry} onChangeText={setInsuranceExpiry} tc={tc} />
                  <DateField label="Expirare ITP" value={itpExpiry} onChangeText={setItpExpiry} tc={tc} />
                </View>

                {/* Oil change section */}
                <View style={[styles.card, { backgroundColor: tc.card, borderColor: tc.border, shadowColor: tc.shadowColor, shadowOpacity: tc.shadowOpacity, gap: 12 }]}>
                  <View style={styles.serviceTitleRow}>
                    <Text style={styles.serviceIcon}>🔧</Text>
                    <Text style={[styles.cardTitle, { color: tc.text }]}>Ultimul schimb de ulei</Text>
                  </View>
                  <Text style={[styles.cardDesc, { color: tc.muted }]}>
                    Opțional — completați dacă cunoașteți istoricul de service al vehiculului.
                  </Text>
                  <DateField label="Data schimbului" value={lastServiceDate} onChangeText={setLastServiceDate} tc={tc} />
                  <Field label="KM la schimb" value={lastServiceKm} onChangeText={setLastServiceKm} placeholder="Ex: 125000" keyboardType="numeric" tc={tc} />
                  <Field label="KM următor schimb" value={nextServiceKm} onChangeText={setNextServiceKm} placeholder="Ex: 135000" keyboardType="numeric" tc={tc} />
                  <Field label="Observații (opțional)" value={lastServiceNotes} onChangeText={setLastServiceNotes} placeholder="Ex: Ulei 5W-30 sintetic, filtru schimbat..." tc={tc} />
                </View>

                {/* Save button */}
                <TouchableOpacity style={[styles.saveBtn, saving && styles.saveBtnDisabled]} onPress={handleSave} disabled={saving}>
                  <LinearGradient colors={[Colors.accent, '#1D4ED8']} style={styles.saveBtnGradient}>
                    {saving
                      ? <ActivityIndicator color="#FFF" size="small" />
                      : <Text style={styles.saveBtnText}>💾  Salvează mașina</Text>}
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            )}

            <View style={{ height: 40 }} />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  safe: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backBtn: {
    width: 40, height: 40, justifyContent: 'center', alignItems: 'center',
    borderRadius: 12, borderWidth: 1,
  },
  backIcon: { fontSize: 20, fontWeight: '600' },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  scroll: { padding: 16, gap: 16 },

  card: {
    borderRadius: 20, padding: 20, borderWidth: 1,
    shadowOffset: { width: 0, height: 2 }, shadowRadius: 8, elevation: 3,
  },
  cardTitle: { fontSize: 15, fontWeight: '700', marginBottom: 8 },
  cardDesc: { fontSize: 13, lineHeight: 18, marginBottom: 16 },

  vinInputRow: { position: 'relative', marginBottom: 8 },
  vinInput: {
    borderWidth: 2, borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 14, paddingRight: 50,
    fontSize: 14, letterSpacing: 2,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  vinCounter: { position: 'absolute', right: 12, top: '50%', marginTop: -8, fontSize: 11 },
  errorText: { color: Colors.danger, fontSize: 12, marginBottom: 8 },
  lookupBtn: { backgroundColor: Colors.accent, borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginTop: 8 },
  lookupBtnDisabled: { opacity: 0.5 },
  lookupBtnText: { color: Colors.white, fontSize: 15, fontWeight: '700' },

  resultsSection: { gap: 16 },
  resultsBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    borderRadius: 12, padding: 12, borderWidth: 1,
  },
  resultsBannerIcon: { fontSize: 18, fontWeight: '700' },
  resultsBannerText: { fontSize: 14, fontWeight: '600', flex: 1 },

  infoItem: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 10, borderBottomWidth: 1,
  },
  infoLabel: { fontSize: 13, flex: 1 },
  infoValue: { fontSize: 13, fontWeight: '600', flex: 1, textAlign: 'right' },

  serviceTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: -4 },
  serviceIcon: { fontSize: 20 },

  saveBtn: {
    borderRadius: 16,
    shadowColor: Colors.accent, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4, shadowRadius: 12, elevation: 8,
  },
  saveBtnGradient: { borderRadius: 16, paddingVertical: 16, alignItems: 'center' },
  saveBtnDisabled: { opacity: 0.6 },
  saveBtnText: { color: Colors.white, fontSize: 16, fontWeight: '700' },
});

const f = StyleSheet.create({
  field: { gap: 4 },
  fieldLabel: { fontSize: 13, fontWeight: '600' },
  fieldInput: {
    borderWidth: 1.5, borderRadius: 10,
    paddingHorizontal: 12, paddingVertical: 11, fontSize: 14,
  },
  fieldHint: { fontSize: 11, fontStyle: 'italic' },
});
