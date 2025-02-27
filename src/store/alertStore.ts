import { create } from "zustand";

interface AlertState {
  isSuccess: boolean;
  message: string;
}

interface AlertActions {
  showSuccessAlert: (message: string) => void;
  hideSuccessAlert: () => void;
}

export const useAlertStore = create<AlertState & AlertActions>((set) => ({
  isSuccess: false,
  message: "",
  showSuccessAlert: (message: string) =>
    set({
      isSuccess: true,
      message: message,
    }),
  hideSuccessAlert: () => set((state) => ({ ...state, isSuccess: false })),
}));
