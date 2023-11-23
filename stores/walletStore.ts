import { create } from "zustand";

export type UserWalletType = {
  address: string;
  isConnected: boolean;
};

export type UserWalletStoreType = {
  userWallet: UserWalletType;
  setUserWallet: (userWallet: UserWalletType) => void;
  resetUserWallet: () => void;
};

const initialWalletState: UserWalletType = {
  address: "",
  isConnected: false,
};

export const useUserWalletStore = create<UserWalletStoreType>()((set) => ({
  userWallet: initialWalletState,
  setUserWallet: (userWallet: UserWalletType) => set({ userWallet }),
  resetUserWallet: () => {
    set({ userWallet: initialWalletState });
  },
}));
