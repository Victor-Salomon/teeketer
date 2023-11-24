import { create } from "zustand";

export type UserWalletType = {
  address: string;
  isConnected: boolean;
  sourceChainWallet: string, 
  sourceChainId: string,
  sourceChainType: string,
  isKeeperRegistered?: boolean
};

export type UserWalletStoreType = {
  userWallet: UserWalletType;
  setUserWallet: (userWallet: UserWalletType) => void;
  resetUserWallet: () => void;
};

const initialWalletState: UserWalletType = {
  address: "",
  isConnected: false,
  sourceChainWallet: "", 
  sourceChainId: "",
  sourceChainType: "",
};

export const useUserWalletStore = create<UserWalletStoreType>()((set) => ({
  userWallet: initialWalletState,
  setUserWallet: (userWallet: UserWalletType) => set({ userWallet }),
  resetUserWallet: () => {
    set({ userWallet: initialWalletState });
  },
}));
