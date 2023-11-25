"use client";

import { useState } from "react";
import Image from "next/image";
import { ethers } from "ethers";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { middleEllipsis } from "@/lib/utils";
import { useUserWalletStore } from "@/stores/walletStore";
import Link from "next/link";
import Create from "@/components/events/Create";
import {
  generateSignedPayload,
  getWalletRegistration,
  registerWallet,
} from "@/lib/keeper";

const UserConnection = () => {
  const user = useUserWalletStore((state) => state.userWallet);
  const setUser = useUserWalletStore((state) => state.setUserWallet);
  const resetUser = useUserWalletStore((state) => state.resetUserWallet);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [showErroDialog, setShowErrorDialog] = useState<boolean>(false);
  const [isWalletRegistered, setIsWalletRegistered] = useState<boolean>(false);

  const checkRegistration = async () => {
    const checkRegistration = await getWalletRegistration(user.address);
    checkRegistration && !checkRegistration.walletDetails
      ? setIsWalletRegistered(false)
      : setIsWalletRegistered(true);
  };

  const registerNewWallet = async () => {
    try {
      const checkRegistration = await getWalletRegistration(user.address);

      if (checkRegistration && !checkRegistration.walletDetails) {
        setIsWalletRegistered(true);
        const ethereum = (window as any).ethereum;
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const signPayload = await generateSignedPayload(signer, { block: 1234 });
        const data = await registerWallet(signPayload);
        console.log("NEW ACCOUNT REGISTRATION: ", data);
      }
    } catch (error: Error | any) {
      const errDesc = `Error connecting to MetaMask: ${
        error?.message ?? error
      }`;
      console.log(errDesc);
    }
  };

  const connectToMetaMask = async () => {
    setLoading(true);
    const ethereum = (window as any).ethereum;
    if (typeof ethereum !== "undefined") {
      try {
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();

        const checkRegistration = await getWalletRegistration(signer.address);

        if (checkRegistration && !checkRegistration.walletDetails) {
          const signPayload = await generateSignedPayload(signer, { block: 1234 });
          const register = await registerWallet(signPayload);
          console.log("ACCOUNT REGISTRATION: ", register);
        }

        setUser({
          address: signer.address,
          isConnected: true,
          sourceChainWallet: signer.address,
          sourceChainId: "0",
          sourceChainType: "ERC",
          isKeeperRegistered: true,
        });

        ethereum.on("accountsChanged", async function () {
          const provider = new ethers.BrowserProvider(ethereum);
          const signer = await provider.getSigner();

          setUser({
            address: signer.address,
            isConnected: true,
            sourceChainWallet: signer.address,
            sourceChainId: "0",
            sourceChainType: "ERC",
          });
        });
        setLoading(false);
      } catch (error: Error | any) {
        const errDesc = `Error connecting to MetaMask: ${
          error?.message ?? error
        }`;
        alert(errDesc);
        setError(errDesc);
        setShowErrorDialog(true);
        setLoading(false);
      }
    } else {
      const errDesc = "MetaMask not installed";
      alert(errDesc);
      setError(errDesc);
      setShowErrorDialog(true);
      setLoading(false);
    }
  };

  return !user.isConnected ? (
    <>
      {/* <Dialog open={showErroDialog} onOpenChange={setShowErrorDialog}>
     <DialogTrigger asChild> */}
      <Button variant={"outline"} onClick={() => connectToMetaMask()}>
        <Image
          src="/metamask.svg"
          alt="MetaMask Logo"
          className="dark:invert pe-1"
          width={30}
          height={30}
          priority
        />
        {!loading ? (
          "Connect"
        ) : (
          <span className="from-purple-500 via-pink-500 to-blue-500 bg-gradient-to-r bg-clip-text text-transparent font-light">
            Registering...
          </span>
        )}
      </Button>
      {/* {error && (
        <Dialog open={showErroDialog} onOpenChange={setShowErrorDialog}>
          <DialogContent className="sm:max-w-[425px] px-2 sm:px-6">
            <div>
              <div className="py-4 w-72 m-2 rounded-md bg-gradient-to-r from-pink-900 via-fuchsia-900 to-red-900">
                <div className="text-sm text-center font-light bg-gradient-to-r from-red-300 to-pink-600 bg-clip-text text-transparent mx-2">
                  {error}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )} */}
    </>
  ) : (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          onClick={() => checkRegistration()}
        >
          <Image
            src="/metamask.svg"
            alt="MetaMask Logo"
            className="dark:invert pe-1"
            width={30}
            height={30}
            priority
          />
          <span className="from-purple-500 via-pink-500 to-blue-500 bg-gradient-to-r bg-clip-text text-transparent font-light">
            {!loading ? middleEllipsis(user.address, 15) : "Registering..."}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-max" align="end">
        <div className="flex flex-col px-5 py-3 space-y-1">
          <Create />
          <Link href="/tickets" className={buttonVariants({ variant: "link" })}>
            My tickets
          </Link>
          {!isWalletRegistered && (
            <Button
              variant="default"
              className="text-xs font-light mx-auto"
              onClick={() => registerNewWallet()}
            >
              Register now
            </Button>
          )}
        </div>
        <div className="border-t text-end">
          <Button
            variant={"outline"}
            size={"sm"}
            className="text-xs text-muted-foreground font-light m-2"
            onClick={() => resetUser()}
          >
            Logout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserConnection;
