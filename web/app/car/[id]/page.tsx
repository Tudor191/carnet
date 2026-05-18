'use client';
import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useStore } from '@/lib/store';
import Sidebar from '@/components/Sidebar';
import CarCard from '@/components/CarCard';

function statusColor(date?: string) {
  if (!date) return '#94A3B8';
  const [d, m, y] = date.split('.').map(Number);
  const exp = new Date(y, m - 1, d);
  const diff = exp.getTime() - Date.now();
  if (diff < 0) return '#EF4444';
  if (diff < 30 * 86400000) return '#F59E0B';
  return '#10B981';
}

function DateField({ label, value, onSave }: { label: string; value?: string; onSave: (v: string) => void }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(value || '');

  const fmt = (t: string) => {
    const d = t.replace(/\D/g, '');
    if (d.length <= 2) return d;
    if (d.length <= 4) return `${d.slice(0, 2)}.${d.slice(2)}`;
    return `${d.slice(0, 2)}.${d.slice(2, 4)}.${d.slice(4, 8)}`;
  };

  const color = statusColor(value);

  return (
    <div className="py-3 border-b border-gray-100 last:border-0">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-semibold text-gray-800">{label}</span>
        <button
          onClick={() => { if (editing) { onSave(text); setEditing(false); } else setEditing(true); }}
          className="text-xs text-accent bg-gray-100 px-3 py-1 rounded-lg hover:bg-gray-200 font-semibold"
        >
          {editing ? 'Salvează' : '✏️ Editează'}
        </button>
      </div>
      {editing ? (
        <input
          autoFocus
          value={text}
          onChange={e => setText(fmt(e.target.value))}
          maxLength={10}
          placeholder="ZZ.LL.AAAA"
          className="w-full border border-accent rounded-lg px-3 py-2 text-sm text-gray-900 bg-gray-50 focus:outline-none"
        />
      ) : (
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: color }} />
          <span className="text-sm font-semibold" style={{ color }}>{value || 'Necompletat — apasă Editează'}</span>
        </div>
      )}
    </div>
  );
}

function TextField({ label, value, onSave, placeholder }: { label: string; value?: string; onSave: (v: string) => void; placeholder?: string }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(value || '');
  return (
    <div className="py-3 border-b border-gray-100 last:border-0">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-semibold text-gray-800">{label}</span>
        <button
          onClick={() => { if (editing) { onSave(text); setEditing(false); } else setEditing(true); }}
          className="text-xs text-accent bg-gray-100 px-3 py-1 rounded-lg hover:bg-gray-200 font-semibold"
        >
          {editing ? 'Salvează' : '✏️ Editează'}
        </button>
      </div>
      {editing ? (
        <input
          autoFocus
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder={placeholder || 'Completează...'}
          className="w-full border border-accent rounded-lg px-3 py-2 text-sm text-gray-900 bg-gray-50 focus:outline-none"
        />
      ) : (
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: value ? '#3B82F6' : '#94A3B8' }} />
          <span className={`text-sm font-semibold ${value ? 'text-gray-800' : 'text-gray-400'}`}>
            {value || 'Necompletat — apasă Editează'}
          </span>
        </div>
      )}
    </div>
  );
}

export default function CarDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { cars, updateCar, deleteCar } = useStore();
  const car = cars.find(c => c.id === id);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (!car) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-primary text-white">
        <div className="text-center">
          <p className="text-xl mb-4">Mașina nu a fost găsită.</p>
          <button onClick={() => router.push('/home')} className="text-accent hover:underline">← Acasă</button>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    deleteCar(car.id);
    router.replace('/home');
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-primary to-[#0D1F3C]">
      <Sidebar onAddCar={() => router.push('/add-car')} />

      <main className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors">
            ←
          </button>
          <h1 className="text-lg font-bold text-white">{car.make} {car.model}</h1>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="w-10 h-10 flex items-center justify-center bg-red-200 hover:bg-red-300 rounded-xl transition-colors"
          >
            🗑
          </button>
        </div>

        {/* Card */}
        <div className="flex justify-center mb-6">
          <CarCard car={car} />
        </div>

        {/* Technical details */}
        <Section title="Date tehnice">
          {[
            { label: 'Marcă', value: car.make },
            { label: 'Model', value: car.model },
            { label: 'An fabricație', value: String(car.year) },
            { label: 'Număr șasiu', value: car.vin },
          ].map((r, i) => (
            <div key={i} className="flex justify-between py-3 border-b border-gray-100 last:border-0">
              <span className="text-sm text-gray-500">{r.label}</span>
              <span className="text-sm font-semibold text-gray-900 select-all">{r.value || '—'}</span>
            </div>
          ))}
        </Section>

        {/* Documents */}
        <Section title="Documente & Termene">
          <DateField label="RCA / Asigurare" value={car.insuranceExpiry} onSave={v => updateCar(car.id, { insuranceExpiry: v || undefined })} />
          <DateField label="ITP (Inspecție Tehnică Periodică)" value={car.itpExpiry} onSave={v => updateCar(car.id, { itpExpiry: v || undefined })} />
        </Section>

        {/* ROVinieta */}
        <Section title="Plăcuță & ROVinieta">
          <TextField label="Număr de înmatriculare" value={car.registrationNumber} onSave={v => updateCar(car.id, { registrationNumber: v || undefined })} placeholder="Ex: B-12-ABC" />
          <DateField label="Dată expirare ROVinieta" value={car.rovinetaExpiry} onSave={v => updateCar(car.id, { rovinetaExpiry: v || undefined })} />
        </Section>

        {/* Service */}
        <Section title="Ultimul schimb de ulei">
          <DateField label="Data schimbului" value={car.lastServiceDate} onSave={v => updateCar(car.id, { lastServiceDate: v || undefined })} />
          <TextField label="KM la schimb" value={car.lastServiceKm} onSave={v => updateCar(car.id, { lastServiceKm: v || undefined })} placeholder="Ex: 150000" />
          <TextField label="KM următor schimb" value={car.nextServiceKm} onSave={v => updateCar(car.id, { nextServiceKm: v || undefined })} placeholder="Ex: 160000" />
          <TextField label="Observații" value={car.lastServiceNotes} onSave={v => updateCar(car.id, { lastServiceNotes: v || undefined })} placeholder="Ex: Ulei 5W-40" />
        </Section>
      </main>

      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-8" onClick={() => setShowDeleteModal(false)}>
          <div className="bg-white rounded-3xl border-[2.5px] border-red-500 p-7 w-full max-w-sm flex flex-col items-center" onClick={e => e.stopPropagation()}>
            <p className="text-5xl mb-3">🗑️</p>
            <h3 className="text-xl font-black text-red-500 mb-3">Șterge mașina</h3>
            <p className="text-gray-600 text-sm text-center leading-relaxed mb-5">
              Ești sigur că vrei să ștergi<br />
              <strong className="text-gray-900">{car.make} {car.model}</strong>?<br />
              Această acțiune este ireversibilă.
            </p>
            <button onClick={handleDelete} className="w-full bg-red-500 text-white font-black py-3 rounded-xl mb-3 hover:bg-red-600 transition-colors">
              Da, șterge
            </button>
            <button onClick={() => setShowDeleteModal(false)} className="text-gray-400 text-sm">Nu, anulează</button>
          </div>
        </div>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl p-5 mb-4 shadow-sm">
      <h2 className="text-base font-black text-gray-900 mb-3">{title}</h2>
      {children}
    </div>
  );
}
