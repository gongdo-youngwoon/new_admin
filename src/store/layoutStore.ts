import { create } from "zustand";

interface State {
  state: boolean;
}

interface Actions {
  actions: {
    open: () => void;
    close: () => void;
  };
}

export const useLayoutStore = create<State & Actions>((set) => ({
  state: true,
  actions: {
    open: () =>
      set({
        state: true,
      }),
    close: () =>
      set({
        state: false,
      }),
  },
}));
