import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Linking,
  Platform,
} from 'react-native';
import { checkRovinieta, validateRomanianPlate, formatPlate } from '../services/rovinieta';
import { RovinetaStatus } from '../types';
import { Colors } from '../constants/colors';

interface Props {
  initialPlate?: string;
}

export default function RovinetaChecker({ initialPlate = '' }: Props) {
  const [plate, setPlate] = useState(initialPlate);
  const [status, setStatus] = useState<RovinetaStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [inputError, setInputError] = useState('');

  const handleCheck = async () => {
    setInputError('');
    setStatus(null);

    if (!plate.trim()) {
      setInputError('Introduceți numărul de înmatriculare.');
      return;
    }
    if (!validateRomanianPlate(plate)) {
      setInputError('Format invalid. Exemplu: B-12-ABC sau CJ-12-XYZ');
      return;
    }

    setLoading(true);
    const result = await checkRovinieta(plate);
    setStatus(result);
    setLoading(false);
  };

  const openOfficialSite = () => {
    const normalized = plate.replace(/[\s\-\.]/g, '').toUpperCase();
    Linking.openURL(`https://www.roviniete.ro/ro/verificare-rovinieta?plate=${encodeURIComponent(normalized)}`);
  };

  const isExternal = status?.error === 'VERIFICARE_EXTERNA';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verificare ROViniete</Text>
      <Text style={styles.subtitle}>
        Introduceți numărul de înmatriculare pentru a verifica dacă vehiculul are rovinietă valabilă.
      </Text>

      <View style={styles.inputRow}>
        <View style={styles.flagBadge}>
          <Text style={styles.flagText}>RO</Text>
        </View>
        <TextInput
          style={[styles.input, inputError ? styles.inputError : null]}
          placeholder="Ex: B-12-ABC"
          placeholderTextColor={Colors.gray400}
          value={plate}
          onChangeText={text => {
            setPlate(text.toUpperCase());
            setInputError('');
            setStatus(null);
          }}
          autoCapitalize="characters"
          autoCorrect={false}
          maxLength={10}
          returnKeyType="search"
          onSubmitEditing={handleCheck}
        />
        <TouchableOpacity
          style={[styles.checkButton, loading && styles.checkButtonDisabled]}
          onPress={handleCheck}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" size="small" />
          ) : (
            <Text style={styles.checkButtonText}>Verifică</Text>
          )}
        </TouchableOpacity>
      </View>

      {!!inputError && <Text style={styles.errorText}>{inputError}</Text>}

      {status && !isExternal && (
        <View
          style={[
            styles.resultCard,
            status.valid ? styles.resultValid : styles.resultInvalid,
          ]}
        >
          <Text style={styles.resultIcon}>{status.valid ? '✓' : '✗'}</Text>
          <View style={styles.resultContent}>
            <Text style={[styles.resultTitle, { color: status.valid ? Colors.success : Colors.danger }]}>
              {status.valid ? 'ROVinieta VALABILĂ' : 'ROVinieta INVALIDĂ sau EXPIRATĂ'}
            </Text>
            {status.valid && status.expiryDate && (
              <Text style={styles.resultDetail}>
                Valabilă până: <Text style={styles.resultDetailBold}>{status.expiryDate}</Text>
              </Text>
            )}
            {status.valid && status.type && (
              <Text style={styles.resultDetail}>
                Tip: <Text style={styles.resultDetailBold}>{status.type}</Text>
              </Text>
            )}
            <Text style={styles.resultPlate}>{formatPlate(plate)}</Text>
          </View>
        </View>
      )}

      {status && isExternal && (
        <View style={styles.externalCard}>
          <Text style={styles.externalIcon}>🔍</Text>
          <View style={styles.externalContent}>
            <Text style={styles.externalTitle}>Verificare pe site-ul oficial</Text>
            <Text style={styles.externalDesc}>
              Verificarea automată nu este disponibilă momentan. Apăsați butonul de mai jos pentru a verifica pe site-ul oficial CNAIR.
            </Text>
            <TouchableOpacity style={styles.officialButton} onPress={openOfficialSite}>
              <Text style={styles.officialButtonText}>Verifică pe roviniete.ro</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: Colors.gray500,
    marginBottom: 12,
    lineHeight: 17,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  flagBadge: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flagText: {
    color: Colors.white,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  input: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: Colors.gray200,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    fontWeight: '600',
    color: Colors.primary,
    letterSpacing: 2,
    backgroundColor: Colors.gray100,
  },
  inputError: {
    borderColor: Colors.danger,
  },
  checkButton: {
    backgroundColor: Colors.accent,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 11,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 80,
  },
  checkButtonDisabled: {
    opacity: 0.6,
  },
  checkButtonText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
  errorText: {
    color: Colors.danger,
    fontSize: 12,
    marginTop: 6,
  },
  resultCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
    gap: 12,
    borderWidth: 1.5,
  },
  resultValid: {
    backgroundColor: '#F0FDF4',
    borderColor: Colors.success + '50',
  },
  resultInvalid: {
    backgroundColor: '#FEF2F2',
    borderColor: Colors.danger + '50',
  },
  resultIcon: {
    fontSize: 24,
    fontWeight: '700',
  },
  resultContent: {
    flex: 1,
  },
  resultTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  resultDetail: {
    fontSize: 12,
    color: Colors.gray500,
  },
  resultDetailBold: {
    fontWeight: '600',
    color: Colors.gray700,
  },
  resultPlate: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary,
    letterSpacing: 1,
    marginTop: 4,
  },
  externalCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
    gap: 10,
    backgroundColor: '#EFF6FF',
    borderWidth: 1.5,
    borderColor: Colors.accent + '40',
  },
  externalIcon: {
    fontSize: 22,
  },
  externalContent: {
    flex: 1,
  },
  externalTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 4,
  },
  externalDesc: {
    fontSize: 11,
    color: Colors.gray500,
    lineHeight: 16,
    marginBottom: 10,
  },
  officialButton: {
    backgroundColor: Colors.accent,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    alignSelf: 'flex-start',
  },
  officialButtonText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
});
