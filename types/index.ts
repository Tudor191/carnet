export interface Car {
  id: string;
  userId: string;
  vin: string;
  make: string;
  model: string;
  year: number;
  color: string;
  engineType: string;
  engineDisplacement: string;
  horsepower: number;
  fuelType: string;
  transmission: string;
  bodyType: string;
  registrationNumber?: string;
  insuranceExpiry?: string;
  itpExpiry?: string;
  createdAt: number;
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  isPremium: boolean;
  carCount: number;
  isGuest: boolean;
}

export interface RovinetaStatus {
  valid: boolean;
  expiryDate?: string;
  type?: string;
  plate?: string;
  error?: string;
}

export interface VinLookupResult {
  make: string;
  model: string;
  year: number;
  color: string;
  engineType: string;
  engineDisplacement: string;
  horsepower: number;
  fuelType: string;
  transmission: string;
  bodyType: string;
  error?: string;
}
