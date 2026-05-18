'use client';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';

export default function PremiumPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-primary to-[#0D1F3C]">
      <Sidebar onAddCar={() => router.push('/add-car')} />
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="rounded-2xl overflow-hidden mb-6" style={{ background: 'linear-gradient(135deg, #78350F, #B45309, #D97706)' }}>
            <div className="p-8 text-center">
              <p className="text-5xl mb-3">👑</p>
              <h1 className="text-3xl font-black text-white mb-2">CarNet Premium</h1>
              <p className="text-white/80 text-sm">Deblocă tot potențialul aplicației</p>
            </div>
          </div>

          {[
            '✅ Mașini nelimitate',
            '✅ Verificare automată ROVinieta',
            '✅ Notificări expirare documente',
            '✅ Export date mașini',
            '✅ Suport prioritar',
          ].map((f, i) => (
            <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 mb-2">
              <span className="text-sm text-white font-medium">{f}</span>
            </div>
          ))}

          <div className="mt-6 space-y-3">
            <button className="w-full py-4 rounded-2xl font-black text-white text-lg" style={{ background: 'linear-gradient(135deg, #78350F, #D97706)' }}>
              👑 Lunar — 4,99 €/lună
            </button>
            <button className="w-full py-4 rounded-2xl font-black text-white text-lg border border-yellow-600/40 bg-yellow-900/20">
              👑 Anual — 39,99 €/an <span className="text-yellow-400 text-sm font-normal">(economisești 33%)</span>
            </button>
          </div>

          <button onClick={() => router.back()} className="w-full mt-4 text-center text-gray-400 text-sm hover:text-white">
            Înapoi
          </button>
        </div>
      </main>
    </div>
  );
}
