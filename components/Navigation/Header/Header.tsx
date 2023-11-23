"use client";
import Link from "next/link";
import TernoaIcon from "@/assets/providers/Ternoa";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ethers } from "ethers";
import { useUserWalletStore } from "@/stores/walletStore";
import { middleEllipsis } from "@/lib/utils";

const Header = () => {
  const user = useUserWalletStore((state) => state.userWallet);
  const setUser = useUserWalletStore((state) => state.setUserWallet);
  const connectToMetaMask = async () => {
    const ethereum = (window as any).ethereum;
    if (typeof ethereum !== "undefined") {
      try {
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        setUser({ address: signer.address, isConnected: true });

        ethereum.on("accountsChanged", async function () {
          const provider = new ethers.BrowserProvider(ethereum);
          const signer = await provider.getSigner();
          setUser({ address: signer.address, isConnected: true });
        });
      } catch (error: Error | any) {
        alert(`Error connecting to MetaMask: ${error?.message ?? error}`);
      }
    } else {
      alert("MetaMask not installed");
    }
  };

  return (
    <nav className="container fixed top-0 left-0 right-0 backdrop-blur-md z-50">
      <div className="flex justify-between items-center py-4">
        <Link href="/" className="flex items-center">
          <TernoaIcon />
          <div className="px-2">
            <div className="text-xl font-bold">Teeketer</div>
            <div className="hidden sm:block font-light text-sm text-muted-foreground">
              Built with Keeper, powered by Ternoa.
            </div>
          </div>
        </Link>
        <Button variant={"outline"} onClick={() => connectToMetaMask()}>
          <Image
            src="/metamask.svg"
            alt="MetaMask Logo"
            className="dark:invert pe-1"
            width={30}
            height={30}
            priority
          />
          {user.address ? middleEllipsis(user.address) : "Connect"}
        </Button>
      </div>
    </nav>
  );
};

export default Header;
