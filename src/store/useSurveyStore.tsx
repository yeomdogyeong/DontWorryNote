import { create } from "zustand";
import { SubjectType } from "../types/common";

interface UserState {
  users: { score: number };
  userType: SubjectType;
}

interface UserActions {
  increaseScore: (points: number) => void;
  removeScore: () => void;
  setStatus: (newType: SubjectType) => void;
}

type StoreState = UserState & UserActions;

const useStore = create<StoreState>((set) => ({
  users: { score: 0 },
  userType: SubjectType.BAEZZANGE,

  increaseScore: (points: number) =>
    set((state) => ({
      users: { ...state.users, score: state.users.score + points },
    })),

  removeScore: () =>
    set((state) => ({
      users: { ...state.users, score: 0 },
    })),

  setStatus: (newType: SubjectType) =>
    set(() => ({
      userType: newType,
    })),
}));

export default useStore;
