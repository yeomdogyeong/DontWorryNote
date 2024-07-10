import { create } from "zustand";

interface UserState {
  users: { score: number };
  increaseScore: (points: number) => void;
  removeScore: () => void;
}

const useUserStore = create<UserState>((set) => ({
  users: { score: 0 },
  increaseScore: (points: number) =>
    set((state) => ({
      users: { ...state.users, score: state.users.score + points },
    })),
  removeScore: () => set((state) => ({ ...state.users, users: { score: 0 } })),
}));

export default useUserStore;
