import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Car, User } from '../types';
import { loadPersistedSession, clearSession } from '../services/auth';

const STORAGE_KEY = '@carnet_data';

interface CarStore {
  user: User | null;
  cars: Car[];
  isLoading: boolean;

  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
  loadCars: () => Promise<void>;
  addCar: (car: Omit<Car, 'id' | 'userId' | 'createdAt'>) => Promise<Car>;
  updateCar: (id: string, updates: Partial<Car>) => Promise<void>;
  deleteCar: (id: string) => Promise<void>;
  canAddCar: () => boolean;
}

function generateId(): string {
  return `car_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export const useCarStore = create<CarStore>((set, get) => ({
  user: null,
  cars: [],
  isLoading: false,

  setUser: (user) => {
    set({ user });
  },

  logout: async () => {
    await clearSession();
    set({ user: null });
  },

  loadCars: async () => {
    set({ isLoading: true });
    try {
      // Load cars
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        set({ cars: JSON.parse(stored) });
      }
      // Load persisted session (only if keepLoggedIn was checked)
      const persistedUser = await loadPersistedSession();
      if (persistedUser) {
        set({ user: persistedUser });
      }
    } catch {
      // ignore
    } finally {
      set({ isLoading: false });
    }
  },

  addCar: async (carData) => {
    const { user, cars } = get();
    const newCar: Car = {
      ...carData,
      id: generateId(),
      userId: user?.id || 'local',
      createdAt: Date.now(),
    };
    const updated = [...cars, newCar];
    set({ cars: updated });
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newCar;
  },

  updateCar: async (id, updates) => {
    const { cars } = get();
    const updated = cars.map(c => (c.id === id ? { ...c, ...updates } : c));
    set({ cars: updated });
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },

  deleteCar: async (id) => {
    const { cars } = get();
    const updated = cars.filter(c => c.id !== id);
    set({ cars: updated });
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },

  canAddCar: () => {
    const { user, cars } = get();
    if (user?.isPremium) return true;
    return cars.length < 1;
  },
}));
