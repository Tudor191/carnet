import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Car, User } from '../types';
import { loadPersistedSession, clearSession } from '../services/auth';

// Each user gets their own storage key — prevents data leaking between accounts
const storageKey = (userId: string) => `@carnet_data_${userId}`;

interface CarStore {
  user: User | null;
  cars: Car[];
  isLoading: boolean;

  setUser: (user: User | null) => Promise<void>;
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

async function loadCarsForUser(userId: string): Promise<Car[]> {
  try {
    const stored = await AsyncStorage.getItem(storageKey(userId));
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

async function saveCarsForUser(userId: string, cars: Car[]): Promise<void> {
  await AsyncStorage.setItem(storageKey(userId), JSON.stringify(cars));
}

export const useCarStore = create<CarStore>((set, get) => ({
  user: null,
  cars: [],
  isLoading: false,

  // Called on login/register — sets user and loads ONLY their cars
  setUser: async (user) => {
    if (!user) {
      set({ user: null, cars: [] });
      return;
    }
    set({ user, cars: [] }); // clear previous user's cars immediately
    const cars = await loadCarsForUser(user.id);
    set({ cars });
  },

  // Called on logout — clears both user and cars from state
  logout: async () => {
    await clearSession();
    set({ user: null, cars: [] });
  },

  // Called once on app mount — restores persisted session and loads their cars
  loadCars: async () => {
    set({ isLoading: true });
    try {
      const persistedUser = await loadPersistedSession();
      if (persistedUser) {
        set({ user: persistedUser });
        const cars = await loadCarsForUser(persistedUser.id);
        set({ cars });
      }
    } catch {
      // ignore
    } finally {
      set({ isLoading: false });
    }
  },

  addCar: async (carData) => {
    const { user, cars } = get();
    const userId = user?.id || 'local';
    const newCar: Car = {
      ...carData,
      id: generateId(),
      userId,
      createdAt: Date.now(),
    };
    const updated = [...cars, newCar];
    set({ cars: updated });
    await saveCarsForUser(userId, updated);
    return newCar;
  },

  updateCar: async (id, updates) => {
    const { user, cars } = get();
    const updated = cars.map(c => (c.id === id ? { ...c, ...updates } : c));
    set({ cars: updated });
    await saveCarsForUser(user?.id || 'local', updated);
  },

  deleteCar: async (id) => {
    const { user, cars } = get();
    const updated = cars.filter(c => c.id !== id);
    set({ cars: updated });
    await saveCarsForUser(user?.id || 'local', updated);
  },

  canAddCar: () => {
    const { user, cars } = get();
    if (user?.isPremium) return true;
    return cars.length < 1;
  },
}));
