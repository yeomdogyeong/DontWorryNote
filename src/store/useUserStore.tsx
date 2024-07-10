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
  //이 값은 users밖에 다른 값들을 유지하는거
  // removeScore: () => set((state) => ({ ...state.users, users: { score: 0 } })),
  //이 값은 users안의 다른 값들은 그대로 두고 users.score만 0으로 초기화하는거
  removeScore: () => set((state) => ({ users: { ...state.users, score: 0 } })),
}));

export default useUserStore;
