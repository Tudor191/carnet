'use client';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';

const AUTH_PATHS = ['/login', '/register'];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { initFromStorage, user, isLoading } = useStore();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => { initFromStorage(); }, []);

  useEffect(() => {
    if (isLoading) return;
    const onAuth = AUTH_PATHS.includes(pathname);
    if (!user && !onAuth) router.replace('/login');
    if (user && onAuth) router.replace('/home');
  }, [user, isLoading, pathname]);

  return <>{children}</>;
}
