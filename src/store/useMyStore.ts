import { SubjectType } from "@/types/common";
import { create } from "zustand";

interface MyState {
  isSignedIn: boolean;
  nickname: string;
  tendency: SubjectType;
  userId?: number;
  profileImagePath: string;
  wannabe: string;
}

interface MyStore extends MyState {
  setInitializeState(v: Omit<MyState, "isSignedIn">): void;
  setIsSignedIn: (v: boolean) => void;
  setWannabe: (v: string) => void;
}

const initialState = {
  isSignedIn: false,
  tendency: SubjectType.GAEMI,
  nickname: "",
  profileImagePath: "",
  wannabe: "행복한 개짱이",
};

const useMyStore = create<MyStore>((set) => ({
  ...initialState,

  setInitializeState: (v: Omit<MyState, "isSignedIn">) =>
    set(() => ({
      ...v,
      isSignedIn: true,
    })),

  setIsSignedIn: (v: boolean) =>
    set(() => ({
      isSignedIn: v,
    })),

  setWannabe: (v: string) => {
    set(() => ({
      wannabe: v,
    }));
  },
}));

export default useMyStore;
