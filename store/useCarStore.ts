import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Car, User } from '../types';

const STORAGE_KEY = '@carnet_data';
const USER_KEY = '@carnet_user';

interface CarStore {
  user: User | null;
  cars: Car[];
  isLoading: boolean;

  setUser: (user: User | null) => void;
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
    if (user) {
      AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      AsyncStorage.removeItem(USER_KEY);
    }
  },

  loadCars: async () => {
    set({ isLoading: true });
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const cars: Car[] = JSON.parse(stored);
        set({ cars });
      }
      const storedUser = await AsyncStorage.getItem(USER_KEY);
      if (storedUser) {
        set({ user: JSON.parse(storedUser) });
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
