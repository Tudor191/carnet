'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import Sidebar from '@/components/Sidebar';
import CarCard from '@/components/CarCard';

export default function HomePage() {
  const router = useRouter();
  const { user, cars, canAddCar, deleteCar } = useStore();
  const [deleteModal, setDeleteModal] = useState<{ visible: boolean; carId: string; carName: string }>({
    visible: false, carId: '', carName: '',
  });
  const [limitModal, setLimitModal] = useState(false);

  const handleAddCar = () => {
    if (!canAddCar()) { setLimitModal(true); return; }
    router.push('/add-car');
  };

  const confirmDelete = () => {
    deleteCar(deleteModal.carId);
    setDeleteModal({ visible: false, carId: '', carName: '' });
  };

  const activeRCA = cars.filter(c => {
    if (!c.insuranceExpiry) return false;
    const [d, m, y] = c.insuranceExpiry.split('.').map(Number);
    return new Date(y, m - 1, d) > new Date();
  }).length;

  const activeITP = cars.filter(c => {
    if (!c.itpExpiry) return false;
    const [d, m, y] = c.itpExpiry.split('.').map(Number);
    return new Date(y, m - 1, d) > new Date();
  }).length;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-primary to-[#0D1F3C]">
      <Sidebar onAddCar={handleAddCar} />

      <main className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-gray-400 text-sm">Bună ziua,</p>
            <h1 className="text-2xl font-bold text-white">{user?.displayName || 'Utilizator'}</h1>
          </div>
          {!user?.isPremium && (
            <span className="text-xs font-black tracking-widest text-yellow-400 border border-yellow-400/40 bg-yellow-400/10 px-3 py-1 rounded-lg">
              GRATUIT
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { num: cars.length, label: 'Mașini' },
            { num: activeRCA, label: 'RCA Active' },
            { num: activeITP, label: 'ITP Valid' },
          ].map((s, i) => (
            <div key={i} className="bg-white/5 border border-white/8 rounded-2xl p-4 text-center">
              <p className="text-3xl font-black text-white">{s.num}</p>
              <p className="text-xs text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Cars list */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Mașinile mele</h2>
          <span className="text-gray-400 text-sm">{cars.length}/{user?.isPremium ? '∞' : '1'}</span>
        </div>

        {cars.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-5xl mb-4">🚗</p>
            <p className="text-xl font-bold text-white mb-2">Nicio mașină adăugată</p>
            <p className="text-sm">Apasă butonul + pentru a adăuga prima ta mașină.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {cars.map(car => (
              <div key={car.id} className="relative">
                <CarCard car={car} onClick={() => router.push(`/car/${car.id}`)} />
                <button
                  onClick={() => setDeleteModal({ visible: true, carId: car.id, carName: `${car.make} ${car.model}` })}
                  className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-black/50 hover:bg-red-500/80 rounded-full transition-colors text-sm"
                >
                  🗑
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* FAB */}
      <button
        onClick={handleAddCar}
        className="fixed bottom-8 right-8 w-14 h-14 bg-accent hover:bg-blue-500 rounded-full text-white text-3xl font-light shadow-lg shadow-accent/40 transition-colors flex items-center justify-center"
      >
        +
      </button>

      {/* Premium limit modal */}
      {limitModal && (
        <Modal onClose={() => setLimitModal(false)}>
          <p className="text-5xl mb-3">🔒</p>
          <h3 className="text-xl font-black text-danger mb-3">Limită atinsă</h3>
          <p className="text-gray-600 text-sm text-center leading-relaxed mb-5">
            Contul gratuit permite o singură mașină.<br />
            Treci la <strong className="text-primary">CarNet Premium</strong> pentru mașini nelimitate.
          </p>
          <button
            onClick={() => { setLimitModal(false); router.push('/premium'); }}
            className="w-full bg-primary text-white font-black py-3 rounded-xl mb-3 hover:bg-secondary transition-colors"
          >
            👑 Upgrade Premium
          </button>
          <button onClick={() => setLimitModal(false)} className="text-gray-400 text-sm">Anulează</button>
        </Modal>
      )}

      {/* Delete modal */}
      {deleteModal.visible && (
        <Modal onClose={() => setDeleteModal({ visible: false, carId: '', carName: '' })}>
          <p className="text-5xl mb-3">🗑️</p>
          <h3 className="text-xl font-black text-danger mb-3">Șterge mașina</h3>
          <p className="text-gray-600 text-sm text-center leading-relaxed mb-5">
            Ești sigur că vrei să ștergi<br />
            <strong className="text-primary">{deleteModal.carName}</strong>?<br />
            Această acțiune este ireversibilă.
          </p>
          <button
            onClick={confirmDelete}
            className="w-full bg-danger text-white font-black py-3 rounded-xl mb-3 hover:bg-red-600 transition-colors"
          >
            Da, șterge
          </button>
          <button
            onClick={() => setDeleteModal({ visible: false, carId: '', carName: '' })}
            className="text-gray-400 text-sm"
          >
            Nu, anulează
          </button>
        </Modal>
      )}
    </div>
  );
}

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-8" onClick={onClose}>
      <div
        className="bg-white rounded-3xl border-[2.5px] border-danger p-7 w-full max-w-sm flex flex-col items-center"
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
