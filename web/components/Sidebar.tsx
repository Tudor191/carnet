'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { useState } from 'react';

export default function Sidebar({ onAddCar }: { onAddCar: () => void }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout, canAddCar } = useStore();
  const [limitModal, setLimitModal] = useState(false);

  const handleAdd = () => {
    if (!canAddCar()) { setLimitModal(true); return; }
    onAddCar();
  };

  const handleLogout = () => { logout(); router.replace('/login'); };
  const isHome = pathname === '/home' || pathname.startsWith('/car/');

  return (
    <>
      <aside className="w-[215px] flex-shrink-0 bg-primary border-r border-white/7 flex flex-col px-3 py-5">
        {/* Brand */}
        <button onClick={() => router.push('/home')} className="flex items-center gap-3 mb-5 px-1 hover:opacity-80">
          <span className="text-2xl">🚗</span>
          <div>
            <p className="text-white font-black text-sm tracking-wide">CarNet</p>
            <p className="text-gray-400 text-[9px] tracking-widest uppercase">România</p>
          </div>
        </button>

        {/* New car button */}
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-white/6 border border-white/10 rounded-xl px-3 py-2 mb-4 hover:bg-white/10 transition-colors"
        >
          <span className="text-white text-xl font-light leading-none">+</span>
          <span className="text-gray-400 text-sm font-medium">Mașină nouă</span>
        </button>

        {/* Nav */}
        <nav className="flex flex-col gap-1">
          <button
            onClick={() => router.push('/home')}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${isHome ? 'bg-blue-500/14 text-white font-bold' : 'text-gray-400 hover:text-white'}`}
          >
            🚗 Mașinile mele
          </button>
        </nav>

        <div className="flex-1" />

        {/* Premium card */}
        {!user?.isPremium && (
          <button
            onClick={() => router.push('/premium')}
            className="rounded-xl overflow-hidden mb-3 text-left"
            style={{ background: 'linear-gradient(135deg, #78350F, #B45309, #D97706)' }}
          >
            <div className="p-3">
              <p className="text-2xl mb-1">👑</p>
              <p className="text-white font-black text-sm">Premium</p>
              <p className="text-white/70 text-xs leading-relaxed mt-1 mb-3">Mașini nelimitate și funcții avansate</p>
              <span className="bg-white/20 border border-white/30 text-white text-xs font-bold px-3 py-1 rounded-lg">Upgrade</span>
            </div>
          </button>
        )}

        <div className="h-px bg-white/7 mb-3" />

        {/* User row */}
        {user ? (
          <div className="flex items-center gap-2 px-1">
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              {(user.displayName || 'U')[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-semibold truncate">{user.displayName}</p>
              <p className="text-gray-400 text-[10px]">{user.isPremium ? '⭐ Premium' : 'Cont gratuit'}</p>
            </div>
            <button onClick={handleLogout} className="text-gray-400 hover:text-white px-1 text-base">↪</button>
          </div>
        ) : (
          <button onClick={() => router.push('/login')} className="flex items-center gap-2 px-1 text-gray-400 hover:text-white text-sm">
            🔑 Autentifică-te
          </button>
        )}
      </aside>

      {/* Limit modal */}
      {limitModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-8" onClick={() => setLimitModal(false)}>
          <div className="bg-white rounded-3xl border-[2.5px] border-red-500 p-7 w-full max-w-sm flex flex-col items-center" onClick={e => e.stopPropagation()}>
            <p className="text-5xl mb-3">🔒</p>
            <h3 className="text-xl font-black text-red-500 mb-3">Limită atinsă</h3>
            <p className="text-gray-600 text-sm text-center leading-relaxed mb-5">
              Contul gratuit permite o singură mașină.<br />
              Treci la <strong className="text-gray-900">CarNet Premium</strong> pentru mașini nelimitate.
            </p>
            <button
              onClick={() => { setLimitModal(false); router.push('/premium'); }}
              className="w-full bg-gray-900 text-white font-black py-3 rounded-xl mb-3 hover:bg-gray-800 transition-colors"
            >
              👑 Upgrade Premium
            </button>
            <button onClick={() => setLimitModal(false)} className="text-gray-400 text-sm">Anulează</button>
          </div>
        </div>
      )}
    </>
  );
}
