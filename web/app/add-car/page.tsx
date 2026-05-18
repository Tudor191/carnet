'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import Sidebar from '@/components/Sidebar';

export default function AddCarPage() {
  const router = useRouter();
  const addCar = useStore(s => s.addCar);
  const [form, setForm] = useState({ make: '', model: '', year: '', vin: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.make || !form.model || !form.year || !form.vin) { setError('Completează toate câmpurile.'); return; }
    const yr = parseInt(form.year);
    if (isNaN(yr) || yr < 1900 || yr > new Date().getFullYear() + 1) { setError('An de fabricație invalid.'); return; }
    setLoading(true);
    addCar({ make: form.make.trim(), model: form.model.trim(), year: yr, vin: form.vin.trim().toUpperCase() });
    router.replace('/home');
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-primary to-[#0D1F3C]">
      <Sidebar onAddCar={() => router.push('/add-car')} />
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <button onClick={() => router.back()} className="text-gray-400 hover:text-white mb-6 flex items-center gap-2">
            ← Înapoi
          </button>
          <h1 className="text-2xl font-black text-white mb-6">Mașină nouă</h1>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 space-y-4">
            {error && <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-2 text-sm">{error}</div>}

            {[
              { label: 'Marcă', key: 'make', ph: 'Ex: BMW, Dacia, Ford' },
              { label: 'Model', key: 'model', ph: 'Ex: X5, Logan, Focus' },
              { label: 'An fabricație', key: 'year', ph: 'Ex: 2020' },
              { label: 'Serie șasiu (VIN)', key: 'vin', ph: 'Ex: WBAXXX...' },
            ].map(f => (
              <div key={f.key}>
                <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wider font-semibold">{f.label}</label>
                <input
                  value={form[f.key as keyof typeof form]}
                  onChange={set(f.key as keyof typeof form)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-accent"
                  placeholder={f.ph}
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent text-white font-bold py-3 rounded-xl hover:bg-blue-500 transition-colors disabled:opacity-60"
            >
              {loading ? 'Se adaugă...' : 'Adaugă mașina'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
