'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { registerWithEmail } from '@/lib/auth';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const setUser = useStore(s => s.setUser);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const errorMessages: Record<string, string> = {
    EMAIL_TAKEN: 'Acest email este deja înregistrat.',
    WEAK_PASSWORD: 'Parola trebuie să aibă minim 6 caractere.',
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await registerWithEmail(name, email, password);
    setLoading(false);
    if ('error' in result) { setError(errorMessages[result.error] || 'Eroare necunoscută.'); return; }
    setUser(result.user);
    router.replace('/home');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-[#0D1F3C] p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-white tracking-wide">CarNet</h1>
          <p className="text-xs text-gray-400 tracking-widest uppercase mt-1">România</p>
        </div>

        <form onSubmit={handleRegister} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-bold text-white mb-2">Cont nou</h2>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-2 text-red-400 text-sm">
              {error}
            </div>
          )}

          {[
            { label: 'Nume', value: name, set: setName, type: 'text', ph: 'Ion Popescu' },
            { label: 'Email', value: email, set: setEmail, type: 'email', ph: 'ion@exemplu.com' },
            { label: 'Parolă', value: password, set: setPassword, type: 'password', ph: '••••••••' },
          ].map(f => (
            <div key={f.label}>
              <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">{f.label}</label>
              <input
                type={f.type}
                value={f.value}
                onChange={e => f.set(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent"
                placeholder={f.ph}
                required
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent hover:bg-blue-500 disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-colors"
          >
            {loading ? 'Se înregistrează...' : 'Creează cont'}
          </button>

          <p className="text-center text-sm text-gray-400">
            Ai deja cont?{' '}
            <Link href="/login" className="text-accent hover:underline font-semibold">Autentifică-te</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
