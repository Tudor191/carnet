export interface User {
  id: string;
  email: string;
  displayName: string;
  isPremium: boolean;
  carCount: number;
}

export interface Car {
  id: string;
  userId: string;
  make: string;
  model: string;
  year: number;
  vin: string;
  registrationNumber?: string;
  insuranceExpiry?: string;
  itpExpiry?: string;
  rovinetaExpiry?: string;
  lastServiceDate?: string;
  lastServiceKm?: string;
  nextServiceKm?: string;
  lastServiceNotes?: string;
  createdAt: number;
}
