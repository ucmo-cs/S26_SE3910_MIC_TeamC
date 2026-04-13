import React, { createContext, useContext, useState, ReactNode } from "react";
import dayjs, { Dayjs } from "dayjs";

interface AppointmentData {
  reason: string;
  branchId: number;
  branchTopicId: number;
  branchTopicName: string;
  date: string;       // "YYYY-MM-DD" string from Step3
  time: string;       // "HH:mm" string from Step3
  startTime: string;  // ISO string "YYYY-MM-DDTHH:mm:ss" for backend
  name: string;
  email: string;
  phone: string;
}

interface AppointmentContextType {
  formData: AppointmentData;
  updateFormData: (newData: Partial<AppointmentData>) => void;
  resetFormData: () => void;
}

const defaultData: AppointmentData = {
  reason: "",
  branchId: 0,
  branchTopicId: 0,
  branchTopicName: "",
  date: "",
  time: "",
  startTime: "",
  name: "",
  email: "",
  phone: "",
};

const AppointmentContext = createContext<AppointmentContextType>({
  formData: defaultData,
    updateFormData: () => {},
                                                                 resetFormData: () => {},
});

export const AppointmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<AppointmentData>(defaultData);

  const updateFormData = (newData: Partial<AppointmentData>) => {
    setFormData((prev) => {
      const updated = { ...prev, ...newData };

      // If date or time changed, automatically update startTime
      if (newData.date || newData.time) {
        if (updated.date && updated.time) {
          const combined = dayjs(`${updated.date}T${updated.time}`);
          if (combined.isValid()) {
            updated.startTime = combined.format("YYYY-MM-DDTHH:mm:ss");
          } else {
            updated.startTime = "";
          }
        }
      }

      return updated;
    });
  };

  const resetFormData = () => setFormData(defaultData);

  return (
    <AppointmentContext.Provider value={{ formData, updateFormData, resetFormData }}>
    {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointment = () => useContext(AppointmentContext);
