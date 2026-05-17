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
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { lookupVin } from '../services/vinLookup';
import { useCarStore } from '../store/useCarStore';
import { VinLookupResult } from '../types';
import { Colors } from '../constants/colors';

interface FieldProps {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
  editable?: boolean;
  keyboardType?: 'default' | 'numeric';
  hint?: string;
}

function Field({ label, value, onChangeText, placeholder, editable = true, keyboardType = 'default', hint }: FieldProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={[styles.fieldInput, !editable && styles.fieldInputReadOnly]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder || label}
        placeholderTextColor={Colors.gray400}
        editable={editable}
        keyboardType={keyboardType}
        autoCorrect={false}
      />
      {hint ? <Text style={styles.fieldHint}>{hint}</Text> : null}
    </View>
  );
}

function DateField({ label, value, onChangeText }: { label: string; value: string; onChangeText: (t: string) => void }) {
  const formatDate = (text: string) => {
    const digits = text.replace(/\D/g, '');
    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
    return `${digits.slice(0, 2)}.${digits.slice(2, 4)}.${digits.slice(4, 8)}`;
  };

  return (
    <Field
      label={label}
      value={value}
      onChangeText={t => onChangeText(formatDate(t))}
      placeholder="ZZ.LL.AAAA"
      keyboardType="numeric"
    />
  );
}

export default function AddCarScreen() {
  const { addCar } = useCarStore();

  const [vin, setVin] = useState('');
  const [lookupResult, setLookupResult] = useState<VinLookupResult | null>(null);
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupError, setLookupError] = useState('');
  const [saving, setSaving] = useState(false);

  // Editable fields
  const [color, setColor] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [insuranceExpiry, setInsuranceExpiry] = useState('');
  const [itpExpiry, setItpExpiry] = useState('');

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
    if (result.error) {
      setLookupError(result.error);
      return;
    }
    setLookupResult(result);
    setColor(result.color || '');
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 300);
  };

  const handleSave = async () => {
    if (!lookupResult) return;

    if (!color.trim()) {
      Alert.alert('Completează culoarea', 'Introduceți culoarea vehiculului.');
      return;
    }

    setSaving(true);
    try {
      await addCar({
        vin: vin.toUpperCase(),
        make: lookupResult.make,
        model: lookupResult.model,
        year: lookupResult.year,
        color: color.trim() || 'Necunoscut',
        engineType: lookupResult.engineType,
        engineDisplacement: lookupResult.engineDisplacement,
        horsepower: lookupResult.horsepower,
        fuelType: lookupResult.fuelType,
        transmission: lookupResult.transmission,
        bodyType: lookupResult.bodyType,
        registrationNumber: registrationNumber.trim() || undefined,
        insuranceExpiry: insuranceExpiry || undefined,
        itpExpiry: itpExpiry || undefined,
      });
      router.replace('/home');
    } catch {
      Alert.alert('Eroare', 'Nu s-a putut salva mașina. Încearcă din nou.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <LinearGradient colors={[Colors.primary, '#0D1F3C']} style={styles.gradient}>
      <SafeAreaView style={styles.safe} edges={['top']}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Adaugă mașină</Text>
            <View style={{ width: 40 }} />
          </View>

          <ScrollView
            ref={scrollRef}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
          >
            {/* VIN input section */}
            <View style={styles.vinSection}>
              <Text style={styles.vinTitle}>Număr de șasiu (VIN)</Text>
              <Text style={styles.vinDesc}>
                Introduceți seria șasiului (17 caractere) și datele vehiculului vor fi completate automat.
                Seria se găsește pe cartea de identitate a vehiculului sau pe bord.
              </Text>
              <View style={styles.vinInputRow}>
                <TextInput
                  style={[styles.vinInput, lookupError ? styles.vinInputError : null]}
                  value={vin}
                  onChangeText={v => {
                    setVin(v.toUpperCase().replace(/\s/g, ''));
                    setLookupError('');
                    setLookupResult(null);
                  }}
                  placeholder="Ex: WBA3A5G5XHN123456"
                  placeholderTextColor={Colors.gray400}
                  autoCapitalize="characters"
                  autoCorrect={false}
                  maxLength={17}
                  returnKeyType="search"
                  onSubmitEditing={handleLookup}
                />
                <Text style={styles.vinCounter}>{vin.length}/17</Text>
              </View>
              {!!lookupError && <Text style={styles.errorText}>{lookupError}</Text>}

              <TouchableOpacity
                style={[styles.lookupBtn, (lookupLoading || vin.length !== 17) && styles.lookupBtnDisabled]}
                onPress={handleLookup}
                disabled={lookupLoading || vin.length !== 17}
              >
                {lookupLoading ? (
                  <ActivityIndicator color="#FFF" size="small" />
                ) : (
                  <Text style={styles.lookupBtnText}>🔍  Caută vehiculul</Text>
                )}
              </TouchableOpacity>
            </View>

            {/* Results */}
            {lookupResult && (
              <View style={styles.resultsSection}>
                <View style={styles.resultsBanner}>
                  <Text style={styles.resultsBannerIcon}>✓</Text>
                  <Text style={styles.resultsBannerText}>
                    Vehicul găsit: {lookupResult.make} {lookupResult.model} ({lookupResult.year})
                  </Text>
                </View>

                <View style={styles.autoFields}>
                  <Text style={styles.autoFieldsTitle}>Date completate automat</Text>

                  <View style={styles.infoGrid}>
                    {[
                      { label: 'Marcă', value: lookupResult.make },
                      { label: 'Model', value: lookupResult.model },
                      { label: 'An fabricație', value: String(lookupResult.year) },
                      { label: 'Motor', value: lookupResult.engineType },
                      { label: 'Cilindree', value: lookupResult.engineDisplacement },
                      { label: 'Putere (est.)', value: lookupResult.horsepower > 0 ? `~${lookupResult.horsepower} CP` : 'N/A' },
                      { label: 'Combustibil', value: lookupResult.fuelType },
                      { label: 'Transmisie', value: lookupResult.transmission },
                      { label: 'Caroserie', value: lookupResult.bodyType },
                    ].map((item, i) => (
                      <View key={i} style={styles.infoItem}>
                        <Text style={styles.infoLabel}>{item.label}</Text>
                        <Text style={styles.infoValue}>{item.value || '—'}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                <View style={styles.manualFields}>
                  <Text style={styles.manualFieldsTitle}>Completează manual</Text>

                  <Field
                    label="Culoare *"
                    value={color}
                    onChangeText={setColor}
                    placeholder="Ex: Negru, Alb, Argintiu..."
                    hint="Culoarea nu poate fi detectată automat"
                  />
                  <Field
                    label="Număr de înmatriculare (opțional)"
                    value={registrationNumber}
                    onChangeText={t => setRegistrationNumber(t.toUpperCase().replace(/[^A-Z0-9\-]/g, ''))}
                    placeholder="Ex: B-12-ABC sau CJ-12-XYZ"
                  />
                  <DateField
                    label="Expirare RCA / Asigurare"
                    value={insuranceExpiry}
                    onChangeText={setInsuranceExpiry}
                  />
                  <DateField
                    label="Expirare ITP"
                    value={itpExpiry}
                    onChangeText={setItpExpiry}
                  />
                </View>

                <TouchableOpacity
                  style={[styles.saveBtn, saving && styles.saveBtnDisabled]}
                  onPress={handleSave}
                  disabled={saving}
                >
                  <LinearGradient
                    colors={[Colors.accent, '#1D4ED8']}
                    style={styles.saveBtnGradient}
                  >
                    {saving ? (
                      <ActivityIndicator color="#FFF" size="small" />
                    ) : (
                      <Text style={styles.saveBtnText}>💾  Salvează mașina</Text>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            )}

            <View style={{ height: 40 }} />
          </ScrollView>
        </KeyboardAvoidingView>
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
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
  },
  backIcon: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: '600',
  },
  headerTitle: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '700',
  },
  scroll: {
    padding: 16,
  },
  vinSection: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  vinTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.primary,
    marginBottom: 8,
  },
  vinDesc: {
    fontSize: 13,
    color: Colors.gray500,
    lineHeight: 18,
    marginBottom: 16,
  },
  vinInputRow: {
    position: 'relative',
    marginBottom: 8,
  },
  vinInput: {
    borderWidth: 2,
    borderColor: Colors.gray200,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    paddingRight: 50,
    fontSize: 14,
    color: Colors.primary,
    letterSpacing: 2,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    backgroundColor: Colors.gray100,
  },
  vinInputError: {
    borderColor: Colors.danger,
  },
  vinCounter: {
    position: 'absolute',
    right: 12,
    top: '50%',
    marginTop: -8,
    color: Colors.gray400,
    fontSize: 11,
  },
  errorText: {
    color: Colors.danger,
    fontSize: 12,
    marginBottom: 8,
  },
  lookupBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  lookupBtnDisabled: {
    opacity: 0.5,
  },
  lookupBtnText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
  resultsSection: {
    gap: 16,
  },
  resultsBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.success + '40',
  },
  resultsBannerIcon: {
    color: Colors.success,
    fontSize: 18,
    fontWeight: '700',
  },
  resultsBannerText: {
    color: Colors.success,
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  autoFields: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  autoFieldsTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 12,
  },
  infoGrid: {
    gap: 0,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray100,
  },
  infoLabel: {
    fontSize: 13,
    color: Colors.gray500,
    flex: 1,
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.primary,
    flex: 1,
    textAlign: 'right',
  },
  manualFields: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    gap: 12,
  },
  manualFieldsTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.primary,
  },
  field: {
    gap: 4,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.gray700,
  },
  fieldInput: {
    borderWidth: 1.5,
    borderColor: Colors.gray200,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 11,
    fontSize: 14,
    color: Colors.primary,
    backgroundColor: Colors.gray100,
  },
  fieldInputReadOnly: {
    backgroundColor: Colors.gray200,
    color: Colors.gray500,
  },
  fieldHint: {
    fontSize: 11,
    color: Colors.gray400,
    fontStyle: 'italic',
  },
  saveBtn: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  saveBtnDisabled: {
    opacity: 0.6,
  },
  saveBtnGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
