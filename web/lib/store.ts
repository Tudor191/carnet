'use client';
import { create } from 'zustand';
import { Car, User } from './types';
import { clearSession } from './auth';

const carKey = (uid: string) => `@carnet_data_${uid}`;

function loadCars(uid: string): Car[] {
  try { return JSON.parse(localStorage.getItem(carKey(uid)) || '[]'); } catch { return []; }
}
function saveCars(uid: string, cars: Car[]) {
  localStorage.setItem(carKey(uid), JSON.stringify(cars));
}
function genId() { return `car_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`; }

interface Store {
  user: User | null;
  cars: Car[];
  isLoading: boolean;
  setUser: (u: User | null) => void;
  logout: () => void;
  initFromStorage: () => void;
  addCar: (data: Omit<Car, 'id' | 'userId' | 'createdAt'>) => Car;
  updateCar: (id: string, updates: Partial<Car>) => void;
  deleteCar: (id: string) => void;
  canAddCar: () => boolean;
}

export const useStore = create<Store>((set, get) => ({
  user: null,
  cars: [],
  isLoading: true,

  setUser: (user) => {
    if (!user) { set({ user: null, cars: [] }); return; }
    const cars = loadCars(user.id);
    set({ user, cars });
  },

  logout: () => {
    clearSession();
    set({ user: null, cars: [] });
  },

  initFromStorage: () => {
    const { loadPersistedSession } = require('./auth');
    const user: User | null = loadPersistedSession();
    if (user) {
      const cars = loadCars(user.id);
      set({ user, cars, isLoading: false });
    } else {
      set({ isLoading: false });
    }
  },

  addCar: (data) => {
    const { user, cars } = get();
    const uid = user?.id || 'local';
    const car: Car = { ...data, id: genId(), userId: uid, createdAt: Date.now() };
    const updated = [...cars, car];
    set({ cars: updated });
    saveCars(uid, updated);
    return car;
  },

  updateCar: (id, updates) => {
    const { user, cars } = get();
    const updated = cars.map(c => c.id === id ? { ...c, ...updates } : c);
    set({ cars: updated });
    saveCars(user?.id || 'local', updated);
  },

  deleteCar: (id) => {
    const { user, cars } = get();
    const updated = cars.filter(c => c.id !== id);
    set({ cars: updated });
    saveCars(user?.id || 'local', updated);
  },

  canAddCar: () => {
    const { user, cars } = get();
    return user?.isPremium === true || cars.length < 1;
  },
}));
