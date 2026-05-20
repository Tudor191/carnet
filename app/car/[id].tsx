import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Linking,
  ActivityIndicator,
  Modal,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { useCarStore } from '../../store/useCarStore';
import { useThemeStore } from '../../store/useThemeStore';
import { DARK, LIGHT, ThemeColors } from '../../constants/themes';
import CarCard from '../../components/CarCard';
import { Colors } from '../../constants/colors';
import { validateRomanianPlate, formatPlate } from '../../services/rovinieta';
import {
  ErovinetaCreds,
  checkPlateVignette,
  loadCredentials,
  saveCredentials,
  clearCredentials,
} from '../../services/erovinieta';

function DateField({ label, value, onSave, tc }: {
  label: string; value?: string; onSave: (v: string) => void; tc: ThemeColors;
}) {
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
    : tc.muted;

  return (
    <View style={df.field}>
      <View style={df.header}>
        <Text style={[df.label, { color: tc.text }]}>{label}</Text>
        <TouchableOpacity
          onPress={() => { if (editing) { onSave(text); setEditing(false); } else setEditing(true); }}
          style={[df.editBtn, { backgroundColor: tc.bgAlt }]}
        >
          <Text style={[df.editBtnText, { color: Colors.accent }]}>{editing ? 'Salvează' : '✏️ Editează'}</Text>
        </TouchableOpacity>
      </View>
      {editing ? (
        <TextInput
          style={[df.input, { borderColor: Colors.accent, color: tc.inputText, backgroundColor: tc.inputBg }]}
          value={text}
          onChangeText={t => setText(formatDate(t))}
          placeholder="ZZ.LL.AAAA"
          placeholderTextColor={tc.inputPlaceholder}
          keyboardType="numeric"
          autoFocus
          maxLength={10}
          onSubmitEditing={() => { onSave(text); setEditing(false); }}
        />
      ) : (
        <View style={df.valueRow}>
          <View style={[df.dot, { backgroundColor: statusColor }]} />
          <Text style={[df.valueText, { color: value ? statusColor : tc.muted }]}>
            {value || 'Necompletat — apasă Editează'}
          </Text>
        </View>
      )}
      {value && isExpiringSoon(value) && !isExpired(value) && (
        <Text style={df.warn}>⚠️ Expiră în mai puțin de 30 de zile!</Text>
      )}
      {value && isExpired(value) && (
        <Text style={df.danger}>⛔ Expirat! Reînnoiește cât mai curând.</Text>
      )}
    </View>
  );
}

function Field({ label, value, onSave, placeholder, keyboardType, tc }: {
  label: string; value?: string; onSave: (v: string) => void;
  placeholder?: string; keyboardType?: 'default' | 'numeric'; tc: ThemeColors;
}) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(value || '');

  return (
    <View style={df.field}>
      <View style={df.header}>
        <Text style={[df.label, { color: tc.text }]}>{label}</Text>
        <TouchableOpacity
          onPress={() => { if (editing) { onSave(text); setEditing(false); } else setEditing(true); }}
          style={[df.editBtn, { backgroundColor: tc.bgAlt }]}
        >
          <Text style={[df.editBtnText, { color: Colors.accent }]}>{editing ? 'Salvează' : '✏️ Editează'}</Text>
        </TouchableOpacity>
      </View>
      {editing ? (
        <TextInput
          style={[df.input, { borderColor: Colors.accent, color: tc.inputText, backgroundColor: tc.inputBg }]}
          value={text}
          onChangeText={setText}
          placeholder={placeholder || 'Completează...'}
          placeholderTextColor={tc.inputPlaceholder}
          keyboardType={keyboardType || 'default'}
          autoFocus
          onSubmitEditing={() => { onSave(text); setEditing(false); }}
        />
      ) : (
        <View style={df.valueRow}>
          <View style={[df.dot, { backgroundColor: value ? Colors.accent : tc.muted }]} />
          <Text style={[df.valueText, { color: value ? tc.text : tc.muted }]}>
            {value || 'Necompletat — apasă Editează'}
          </Text>
        </View>
      )}
    </View>
  );
}

function PlateField({ value, onSave, tc }: {
  value?: string; onSave: (plate: string) => Promise<void>; tc: ThemeColors;
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
    <View style={df.field}>
      <View style={df.header}>
        <Text style={[df.label, { color: tc.text }]}>Număr de înmatriculare</Text>
        <TouchableOpacity
          onPress={() => editing ? handleSave() : setEditing(true)}
          style={[df.editBtn, { backgroundColor: tc.bgAlt }]}
          disabled={saving}
        >
          {saving
            ? <ActivityIndicator size="small" color={Colors.accent} />
            : <Text style={[df.editBtnText, { color: Colors.accent }]}>{editing ? 'Salvează' : '✏️ Editează'}</Text>
          }
        </TouchableOpacity>
      </View>
      {editing ? (
        <TextInput
          style={[df.input, { borderColor: Colors.accent, color: tc.inputText, backgroundColor: tc.inputBg }]}
          value={text}
          onChangeText={t => setText(t.toUpperCase().replace(/[^A-Z0-9\-]/g, ''))}
          placeholder="Ex: B-12-ABC sau CJ-12-XYZ"
          placeholderTextColor={tc.inputPlaceholder}
          autoCapitalize="characters"
          autoCorrect={false}
          maxLength={10}
          autoFocus
          onSubmitEditing={handleSave}
        />
      ) : (
        <View style={df.valueRow}>
          <View style={[df.dot, { backgroundColor: value ? Colors.accent : tc.muted }]} />
          <Text style={[df.valueText, { color: value ? tc.text : tc.muted }]}>
            {value ? formatPlate(value) : 'Necompletat — apasă Editează'}
          </Text>
        </View>
      )}
    </View>
  );
}

type RovinetaStatus = 'no_plate' | 'checking' | 'active' | 'expiring_soon' | 'expired' | 'unknown';

function getRovinetaStatus(plate: string | undefined, expiry: string | undefined, checking: boolean): RovinetaStatus {
  if (!plate) return 'no_plate';
  if (checking) return 'checking';
  if (!expiry) return 'unknown';
  const [d, m, y] = expiry.split('.').map(Number);
  const exp = new Date(y, m - 1, d);
  const now = new Date();
  if (exp < now) return 'expired';
  if (exp.getTime() - now.getTime() < 30 * 24 * 60 * 60 * 1000) return 'expiring_soon';
  return 'active';
}

const ROVINIETA_LABELS: Record<RovinetaStatus, { label: string; color: string; icon: string }> = {
  no_plate:      { label: 'Adaugă plăcuța pentru verificare', color: Colors.gray400, icon: '—' },
  checking:      { label: 'Se verifică...', color: Colors.accent, icon: '⟳' },
  active:        { label: 'ROVinieta ACTIVĂ', color: Colors.success, icon: '✓' },
  expiring_soon: { label: 'Expiră în curând', color: Colors.warning, icon: '⚠' },
  expired:       { label: 'ROVinieta EXPIRATĂ', color: Colors.danger, icon: '✗' },
  unknown:       { label: 'Status necunoscut — verificați manual', color: Colors.gray400, icon: '?' },
};

export default function CarDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { cars, updateCar, deleteCar } = useCarStore();
  const { theme } = useThemeStore();
  const tc = theme === 'dark' ? DARK : LIGHT;
  const car = cars.find(c => c.id === id);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [rovinetaChecking, setRovinetaChecking] = useState(false);
  const [creds, setCreds] = useState<ErovinetaCreds | null>(null);
  const [showCredsForm, setShowCredsForm] = useState(false);
  const [credsUser, setCredsUser] = useState('');
  const [credsPass, setCredsPass] = useState('');
  const [credsError, setCredsError] = useState('');
  const [credsSaving, setCredsSaving] = useState(false);

  useEffect(() => { loadCredentials().then(setCreds); }, []);

  const handleSaveCreds = async () => {
    if (!credsUser.trim() || !credsPass.trim()) { setCredsError('Completează ambele câmpuri.'); return; }
    setCredsSaving(true);
    setCredsError('');
    const newCreds = { username: credsUser.trim(), password: credsPass.trim() };
    await saveCredentials(newCreds);
    setCreds(newCreds);
    setShowCredsForm(false);
    setCredsSaving(false);
    if (car?.registrationNumber) triggerCheck(newCreds, car.registrationNumber);
  };

  const handleClearCreds = async () => {
    await clearCredentials();
    setCreds(null);
    setCredsUser('');
    setCredsPass('');
  };

  const triggerCheck = async (useCreds: ErovinetaCreds, plate: string) => {
    if (!validateRomanianPlate(plate)) return;
    setRovinetaChecking(true);
    try {
      const result = await checkPlateVignette(useCreds, plate);
      if (result?.expiryDate) await updateCar(id!, { rovinetaExpiry: result.expiryDate });
    } catch { /* silent */ } finally { setRovinetaChecking(false); }
  };

  if (!car) {
    return (
      <View style={[s.root, { backgroundColor: tc.bg }]}>
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: tc.text, fontSize: 18 }}>Mașina nu a fost găsită.</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={{ color: Colors.accent, marginTop: 16 }}>← Înapoi</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    );
  }

  const rovinetaStatus = getRovinetaStatus(car.registrationNumber, car.rovinetaExpiry, rovinetaChecking);
  const rovinetaInfo = ROVINIETA_LABELS[rovinetaStatus];

  const confirmDelete = async () => {
    setShowDeleteModal(false);
    await deleteCar(car.id);
    router.replace('/dashboard');
  };

  const handleSavePlate = async (plate: string) => {
    await updateCar(car.id, { registrationNumber: plate || undefined });
    if (plate && creds) triggerCheck(creds, plate);
  };

  const openRovinieta = () => {
    Linking.openURL('https://www.erovinieta.ro/vignettes-portal-web/#/checkRoadTax');
  };

  return (
    <View style={[s.root, { backgroundColor: tc.bg }]}>
      <SafeAreaView style={s.safe} edges={['top']}>

        {/* Header */}
        <View style={[s.header, { borderBottomColor: tc.navBorder, backgroundColor: tc.navBg }]}>
          <TouchableOpacity onPress={() => router.back()} style={[s.backBtn, { backgroundColor: tc.card, borderColor: tc.border }]}>
            <Text style={[s.backIcon, { color: tc.text }]}>←</Text>
          </TouchableOpacity>
          <Text style={[s.headerTitle, { color: tc.text }]}>{car.make} {car.model}</Text>
          <TouchableOpacity onPress={() => setShowDeleteModal(true)} style={s.deleteBtn}>
            <Text style={s.deleteIcon}>🗑</Text>
          </TouchableOpacity>
        </View>

        {/* Delete modal */}
        <Modal visible={showDeleteModal} transparent animationType="fade">
          <Pressable style={s.modalOverlay} onPress={() => setShowDeleteModal(false)}>
            <Pressable style={[s.modalBox, { backgroundColor: tc.card, borderColor: Colors.danger }]} onPress={() => {}}>
              <Text style={s.modalIconText}>🗑️</Text>
              <Text style={s.modalTitle}>Șterge mașina</Text>
              <Text style={[s.modalText, { color: tc.sub }]}>
                Ești sigur că vrei să ștergi{'\n'}
                <Text style={[s.modalBold, { color: tc.text }]}>{car.make} {car.model}</Text>?{'\n'}
                Această acțiune este ireversibilă.
              </Text>
              <TouchableOpacity style={s.modalDeleteBtn} onPress={confirmDelete}>
                <Text style={s.modalDeleteBtnText}>Da, șterge</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowDeleteModal(false)}>
                <Text style={[s.modalCancelText, { color: tc.muted }]}>Nu, anulează</Text>
              </TouchableOpacity>
            </Pressable>
          </Pressable>
        </Modal>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>

          {/* Car Card */}
          <View style={s.cardContainer}>
            <CarCard car={car} />
          </View>

          {/* Technical details */}
          <View style={[s.section, { backgroundColor: tc.card, borderColor: tc.border, shadowColor: tc.shadowColor, shadowOpacity: tc.shadowOpacity }]}>
            <Text style={[s.sectionTitle, { color: tc.text }]}>Date tehnice</Text>
            <View>
              {[
                { label: 'Marcă', value: car.make },
                { label: 'Model', value: car.model },
                { label: 'An fabricație', value: car.year > 0 ? String(car.year) : '—' },
                ...(car.generation ? [{ label: 'Generație', value: car.generation }] : []),
                { label: 'Număr șasiu', value: car.vin },
              ].map((item, i) => (
                <View key={i} style={[s.detailRow, { borderBottomColor: tc.border }]}>
                  <Text style={[s.detailLabel, { color: tc.sub }]}>{item.label}</Text>
                  <Text style={[s.detailValue, { color: tc.text }]} selectable>{item.value || '—'}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Documents & expiry */}
          <View style={[s.section, { backgroundColor: tc.card, borderColor: tc.border, shadowColor: tc.shadowColor, shadowOpacity: tc.shadowOpacity }]}>
            <Text style={[s.sectionTitle, { color: tc.text }]}>Documente & Termene</Text>
            <DateField label="RCA / Asigurare" value={car.insuranceExpiry} onSave={v => updateCar(car.id, { insuranceExpiry: v || undefined })} tc={tc} />
            <View style={[s.divider, { backgroundColor: tc.border }]} />
            <DateField label="ITP (Inspecție Tehnică Periodică)" value={car.itpExpiry} onSave={v => updateCar(car.id, { itpExpiry: v || undefined })} tc={tc} />
          </View>

          {/* Plate & ROVinieta */}
          <View style={[s.section, { backgroundColor: tc.card, borderColor: tc.border, shadowColor: tc.shadowColor, shadowOpacity: tc.shadowOpacity }]}>
            <Text style={[s.sectionTitle, { color: tc.text }]}>Plăcuță & ROViniete</Text>

            <PlateField value={car.registrationNumber} onSave={handleSavePlate} tc={tc} />

            {car.registrationNumber && (
              <View style={[s.rovinetaBadge, { borderColor: rovinetaInfo.color + '40', backgroundColor: rovinetaInfo.color + '12' }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  {rovinetaStatus === 'checking'
                    ? <ActivityIndicator size="small" color={rovinetaInfo.color} />
                    : <Text style={{ fontSize: 18, color: rovinetaInfo.color, fontWeight: '800' }}>{rovinetaInfo.icon}</Text>
                  }
                  <View style={{ flex: 1 }}>
                    <Text style={[s.rovinetaBadgeLabel, { color: rovinetaInfo.color }]}>{rovinetaInfo.label}</Text>
                    {car.rovinetaExpiry && rovinetaStatus !== 'expired' && (
                      <Text style={[s.rovinetaBadgeSub, { color: tc.sub }]}>Valabil până la {car.rovinetaExpiry}</Text>
                    )}
                    {car.rovinetaExpiry && rovinetaStatus === 'expired' && (
                      <Text style={[s.rovinetaBadgeSub, { color: Colors.danger }]}>A expirat la {car.rovinetaExpiry}</Text>
                    )}
                  </View>
                  {creds && car.registrationNumber && !rovinetaChecking && (
                    <TouchableOpacity onPress={() => triggerCheck(creds, car.registrationNumber!)} style={[s.reCheckBtn, { backgroundColor: tc.bgAlt }]}>
                      <Text style={[s.reCheckBtnText, { color: Colors.accent }]}>↻ Verifică</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            )}

            {/* erovinieta.ro credentials */}
            <View style={{ marginTop: 10, marginBottom: 2 }}>
              {!creds && !showCredsForm && (
                <TouchableOpacity onPress={() => setShowCredsForm(true)} style={[s.credsConnectBtn, { backgroundColor: Colors.accent + '12', borderColor: Colors.accent + '30' }]}>
                  <Text style={[s.credsConnectText, { color: Colors.accent }]}>🔐  Conectează erovinieta.ro pentru verificare automată</Text>
                </TouchableOpacity>
              )}
              {showCredsForm && (
                <View>
                  <Text style={[s.credsTitle, { color: tc.text }]}>Cont erovinieta.ro</Text>
                  <TextInput
                    style={[s.credsInput, { borderColor: Colors.accent, color: tc.inputText, backgroundColor: tc.inputBg }]}
                    value={credsUser} onChangeText={setCredsUser}
                    placeholder="Email / utilizator" placeholderTextColor={tc.inputPlaceholder}
                    autoCapitalize="none" autoCorrect={false} keyboardType="email-address"
                  />
                  <TextInput
                    style={[s.credsInput, { marginTop: 8, borderColor: Colors.accent, color: tc.inputText, backgroundColor: tc.inputBg }]}
                    value={credsPass} onChangeText={setCredsPass}
                    placeholder="Parolă" placeholderTextColor={tc.inputPlaceholder}
                    secureTextEntry
                  />
                  {credsError ? <Text style={s.credsError}>{credsError}</Text> : null}
                  <View style={{ flexDirection: 'row', gap: 8, marginTop: 10 }}>
                    <TouchableOpacity onPress={handleSaveCreds} style={[s.credsSaveBtn, credsSaving && { opacity: 0.6 }]} disabled={credsSaving}>
                      {credsSaving
                        ? <ActivityIndicator size="small" color={Colors.white} />
                        : <Text style={s.credsSaveBtnText}>Salvează & verifică</Text>
                      }
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setShowCredsForm(false)} style={[s.credsCancelBtn, { backgroundColor: tc.bgAlt }]}>
                      <Text style={[s.credsCancelBtnText, { color: tc.sub }]}>Anulează</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              {creds && !showCredsForm && (
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text style={s.credsConnectedText}>✓ Conectat: {creds.username}</Text>
                  <TouchableOpacity onPress={handleClearCreds}>
                    <Text style={s.credsDisconnectText}>Deconectează</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <View style={[s.divider, { backgroundColor: tc.border }]} />
            <DateField label="Dată expirare ROVinieta (manual)" value={car.rovinetaExpiry} onSave={v => updateCar(car.id, { rovinetaExpiry: v || undefined })} tc={tc} />

            <TouchableOpacity style={[s.rovinetaLink, { backgroundColor: Colors.accent + '12', borderColor: Colors.accent + '30' }]} onPress={openRovinieta}>
              <Text style={[s.rovinetaLinkText, { color: Colors.accent }]}>🔍  Verifică pe erovinieta.ro</Text>
            </TouchableOpacity>
          </View>

          {/* Oil change */}
          <View style={[s.section, { backgroundColor: tc.card, borderColor: tc.border, shadowColor: tc.shadowColor, shadowOpacity: tc.shadowOpacity }]}>
            <Text style={[s.sectionTitle, { color: tc.text }]}>Ultimul schimb de ulei</Text>
            <DateField label="Data schimbului" value={car.lastServiceDate} onSave={v => updateCar(car.id, { lastServiceDate: v || undefined })} tc={tc} />
            <View style={[s.divider, { backgroundColor: tc.border }]} />
            <Field label="KM la schimb" value={car.lastServiceKm} onSave={v => updateCar(car.id, { lastServiceKm: v || undefined })} placeholder="Ex: 150000" keyboardType="numeric" tc={tc} />
            <View style={[s.divider, { backgroundColor: tc.border }]} />
            <Field label="KM următor schimb" value={car.nextServiceKm} onSave={v => updateCar(car.id, { nextServiceKm: v || undefined })} placeholder="Ex: 160000" keyboardType="numeric" tc={tc} />
            <View style={[s.divider, { backgroundColor: tc.border }]} />
            <Field label="Observații" value={car.lastServiceNotes} onSave={v => updateCar(car.id, { lastServiceNotes: v || undefined })} placeholder="Ex: Ulei 5W-40, filtru schimbat" tc={tc} />
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },
  safe: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1,
  },
  backBtn: {
    width: 40, height: 40, justifyContent: 'center', alignItems: 'center',
    borderRadius: 12, borderWidth: 1,
  },
  backIcon: { fontSize: 20, fontWeight: '600' },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  deleteBtn: {
    width: 40, height: 40, justifyContent: 'center', alignItems: 'center',
    backgroundColor: '#FCA5A5', borderRadius: 12,
  },
  deleteIcon: { fontSize: 18 },
  scroll: { padding: 16 },
  cardContainer: { alignItems: 'center', marginBottom: 20 },
  section: {
    borderRadius: 20, padding: 20, marginBottom: 16, borderWidth: 1,
    shadowOffset: { width: 0, height: 2 }, shadowRadius: 8, elevation: 3,
  },
  sectionTitle: { fontSize: 17, fontWeight: '800', marginBottom: 14 },
  detailRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start',
    paddingVertical: 10, borderBottomWidth: 1,
  },
  detailLabel: { fontSize: 13, flex: 1 },
  detailValue: { fontSize: 13, fontWeight: '600', flex: 1, textAlign: 'right' },
  divider: { height: 1, marginVertical: 8 },
  rovinetaLink: {
    marginTop: 14, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10,
    alignSelf: 'flex-start', borderWidth: 1,
  },
  rovinetaLinkText: { fontSize: 13, fontWeight: '700' },
  rovinetaBadge: { borderWidth: 1.5, borderRadius: 14, padding: 14, marginTop: 12, marginBottom: 4 },
  rovinetaBadgeLabel: { fontSize: 14, fontWeight: '800', letterSpacing: 0.3 },
  rovinetaBadgeSub: { fontSize: 12, marginTop: 2, fontWeight: '500' },
  reCheckBtn: { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 6 },
  reCheckBtnText: { fontSize: 12, fontWeight: '700' },
  credsConnectBtn: { borderRadius: 10, padding: 12, borderWidth: 1 },
  credsConnectText: { fontSize: 13, fontWeight: '600' },
  credsTitle: { fontSize: 14, fontWeight: '700', marginBottom: 8 },
  credsInput: { borderWidth: 1.5, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, fontSize: 14 },
  credsError: { fontSize: 12, color: Colors.danger, marginTop: 6, fontWeight: '500' },
  credsSaveBtn: { flex: 1, backgroundColor: Colors.accent, borderRadius: 10, paddingVertical: 10, alignItems: 'center' },
  credsSaveBtnText: { color: Colors.white, fontSize: 13, fontWeight: '700' },
  credsCancelBtn: { flex: 1, borderRadius: 10, paddingVertical: 10, alignItems: 'center' },
  credsCancelBtnText: { fontSize: 13, fontWeight: '600' },
  credsConnectedText: { fontSize: 13, color: Colors.success, fontWeight: '600' },
  credsDisconnectText: { fontSize: 12, color: Colors.danger, fontWeight: '600' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center', padding: 32 },
  modalBox: { borderRadius: 24, borderWidth: 2.5, padding: 28, alignItems: 'center', width: '100%', maxWidth: 340 },
  modalIconText: { fontSize: 48, marginBottom: 12 },
  modalTitle: { fontSize: 20, fontWeight: '800', color: Colors.danger, marginBottom: 10 },
  modalText: { fontSize: 14, textAlign: 'center', lineHeight: 21, marginBottom: 20 },
  modalBold: { fontWeight: '800' },
  modalDeleteBtn: { backgroundColor: Colors.danger, borderRadius: 14, paddingVertical: 13, paddingHorizontal: 28, marginBottom: 12, width: '100%', alignItems: 'center' },
  modalDeleteBtnText: { color: Colors.white, fontSize: 15, fontWeight: '800' },
  modalCancelText: { fontSize: 13, fontWeight: '500' },
});

const df = StyleSheet.create({
  field: { paddingVertical: 8 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  label: { fontSize: 14, fontWeight: '600' },
  editBtn: { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4, minWidth: 80, alignItems: 'center' },
  editBtnText: { fontSize: 12, fontWeight: '600' },
  input: {
    borderWidth: 1.5, borderRadius: 10,
    paddingHorizontal: 12, paddingVertical: 10,
    fontSize: 15, letterSpacing: 1,
  },
  valueRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  valueText: { fontSize: 15, fontWeight: '600' },
  warn: { fontSize: 12, color: Colors.warning, marginTop: 4, fontWeight: '500' },
  danger: { fontSize: 12, color: Colors.danger, marginTop: 4, fontWeight: '500' },
});
