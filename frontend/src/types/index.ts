export interface Appointment {
  id: number;
  reason: string;
  location: string;
  date: string; // ISO date string (YYYY-MM-DD)
  time: string; // HH:mm format
  name: string;
  email: string;
  phone: string;
  topic: string;
  createdAt: string; // ISO timestamp
}

export interface AppointmentFormData {
  reason: string;
  location: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
}

export interface AppointmentStep {
  step: number;
  data: Partial<AppointmentFormData>;
}
