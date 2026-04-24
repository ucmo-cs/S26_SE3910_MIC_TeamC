import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { Appointment, AppointmentFormData } from "../types";

interface AppointmentContextType {
  formData: Partial<AppointmentFormData>;
  appointments: Appointment[];
  setFormData: (data: Partial<AppointmentFormData>) => void;
  updateFormData: (data: Partial<AppointmentFormData>) => void;
  saveAppointment: (data: AppointmentFormData) => void;
  clearFormData: () => void;
  deleteAppointment: (id: string) => void;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(
  undefined,
);

const STORAGE_KEY = "appointments";

export const AppointmentProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [formData, setFormDataState] = useState<Partial<AppointmentFormData>>(
    {},
  );
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  const setFormData = (data: Partial<AppointmentFormData>) => {
    setFormDataState(data);
  };

  const updateFormData = (data: Partial<AppointmentFormData>) => {
    setFormDataState((prev) => ({ ...prev, ...data }));
  };

  const saveAppointment = (data: AppointmentFormData) => {
    const newAppointment: Appointment = {
      id: `apt-${Date.now()}`,
      ...data,
      createdAt: new Date().toISOString(),
    };

    const updated = [...appointments, newAppointment];
    setAppointments(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setFormDataState({});
  };

  const clearFormData = () => {
    setFormDataState({});
  };

  const deleteAppointment = (id: string) => {
    const updated = appointments.filter((apt) => apt.id !== id);
    setAppointments(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <AppointmentContext.Provider
      value={{
        formData,
        appointments,
        setFormData,
        updateFormData,
        saveAppointment,
        clearFormData,
        deleteAppointment,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointment = () => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error("useAppointment must be used within AppointmentProvider");
  }
  return context;
};
