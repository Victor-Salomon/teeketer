"use client";
import Image from "next/image";
import { CalendarHeart, FileLock, Loader2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  generateSignedPayload,
  getUserTickets,
  retrieveTicketKey,
} from "@/lib/keeper";
import { PopulatedUsersTicket, UsersTickets } from "@/lib/types";
import { useUserWalletStore } from "@/stores/walletStore";
import { useEffect, useState } from "react";
import { TicketListSkeleton } from "@/components/Skeletons";
import Link from "next/link";
import {
  decryptFile,
  getNftData,
  getSecretNftOffchainData,
  initializeApi,
  isApiConnected,
  File as TernoaFile,
} from "ternoa-js";
import { loadNftMetadata } from "@/lib/ternoa";
import { base64ToFile, cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ethers } from "ethers";

export const TicketsList = () => {
  const user = useUserWalletStore((state) => state.userWallet);
  const API_WSS_ENDPOINT = "wss://alphanet.ternoa.com";
  const IPFS_URL = "https://ipfs-dev.trnnfr.com";
  const [isLoadingTickets, setIsLoadingTickets] = useState<boolean>(false);
  const [decryptLoading, setDecryptLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [userTickets, setUserTickets] = useState<UsersTickets>();
  const [populatedUserTickets, setPopulatedUserTickets] = useState<any>();
  const [secretFile, setSecretFile] = useState<string | TernoaFile | undefined>(
    undefined
  );

  const handleDecrypt = async (ticketId: number) => {
    try {
      setSecretFile(undefined);
      setError(undefined);
      setDecryptLoading(true);
      const ethereum = (window as any).ethereum;
      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      const payload = { block: 1234, ticketId };
      const signPayload = await generateSignedPayload(signer, payload);
      const data = await retrieveTicketKey(signPayload);
      console.log("DATA", data);
      if (data) {
        if (!isApiConnected()) {
          await initializeApi(API_WSS_ENDPOINT);
        }
        const secretNftOffchainData = await getSecretNftOffchainData(ticketId);
        console.log(secretNftOffchainData);
        const secretNftData = (await loadNftMetadata(
          secretNftOffchainData
        )) as any;
        console.log(secretNftData);

        const encryptedSecretOffchainData = (await loadNftMetadata(
          secretNftData.properties.encrypted_media.hash
        )) as string;

        console.log(encryptedSecretOffchainData);

        const decryptedBase64 = await decryptFile(
          encryptedSecretOffchainData,
          data.privateKey
        );
        console.log(decryptedBase64);
        const file = base64ToFile(
          decryptedBase64,
          secretNftData.title,
          secretNftData.properties.encrypted_media.type
        );
        const fileUrl = URL.createObjectURL(file);
        setSecretFile(fileUrl);
      }
      setDecryptLoading(false);
    } catch (error: Error | any) {
      const errDesc = `Error connecting to MetaMask: ${
        error?.message ?? error
      }`;
      console.log(errDesc);
      setError(errDesc);
      setDecryptLoading(false);
    }
  };

  useEffect(() => {
    let shouldUpdate = true;
    setIsLoadingTickets(true);

    const loadUserTickets = async () => {
      if (!user.isConnected) {
        setIsLoadingTickets(false);
        console.log("USER_NOT_CONNECTED");
        return;
      }
      try {
        const tickets = await getUserTickets(user.address);
        console.log(tickets);
        if (shouldUpdate) setUserTickets(tickets);
        console.log(tickets);

        setIsLoadingTickets(false);
      } catch (error) {
        console.error(error);
        setIsLoadingTickets(false);
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error(error as string);
        }
      }
    };

    loadUserTickets();

    return () => {
      shouldUpdate = false;
      setIsLoadingTickets(false);
    };
  }, [user]);

  useEffect(() => {
    const populateTickets = async () => {
      if (!isApiConnected()) {
        await initializeApi(API_WSS_ENDPOINT);
      }
      if (userTickets) {
        const fullTickets: PopulatedUsersTicket[] = await Promise.all(
          userTickets?.tickets.map(async (t) => {
            const ticketNFT = await getNftData(t.ticketId);
            const ipfsData: any =
              ticketNFT && (await loadNftMetadata(ticketNFT?.offchainData));
            const fileUrl = `${IPFS_URL}/ipfs/${ipfsData.image}`;

            return {
              title: ipfsData.title,
              description: ipfsData.description,
              fileUrl,
              ...t,
            };
          })
        );
        setPopulatedUserTickets(fullTickets);
        console.log(fullTickets);
      }
    };
    populateTickets();
  }, [userTickets]);

  return isLoadingTickets ? (
    <TicketListSkeleton />
  ) : (
    <div className="overflow-y-auto h-[600px] border rounded-lg p-4 flex">
      {!userTickets || userTickets.tickets.length === 0 ? (
        <div className="flex flex-col items-center self-center space-y-4 text-muted-foreground mx-auto">
          <CalendarHeart />
          <p className="flex flex-col text-center">
            You does not own any tickets for now.
          </p>
          <Link href="/" className={buttonVariants({ variant: "outline" })}>
            Get your ticket now
          </Link>
        </div>
      ) : (
        <div className="w-full self-start">
          {populatedUserTickets?.map((t: any) => (
            <div
              key={t.ticketId}
              className="border my-2 rounded-md transition-all hover:border-slate-300 w-full"
            >
              <div className="flex flex-col sm:flex-row items-center px-2 py-4">
                <div className="mx-auto min-h-auto px-4">
                  <Image
                    src={t.fileUrl}
                    alt={t.title}
                    className="rounded-md"
                    width={250}
                    height={150}
                  />
                </div>
                <div className="flex flex-col pt-2 space-y-2 w-full">
                  <h2 className="text-lg font-bold">{t.title}</h2>
                  <h2 className="text-xs text-muted-foreground font-bold ">
                    ID: {t.ticketId}
                  </h2>
                  <h2 className="text-md text-muted-foreground font-bold ">
                    Description:
                  </h2>
                  <p className="text-sm text-muted-foreground overflow-y-auto max-h-[150px] min-h-[60px] border rounded-md p-2 md:w-4/6">
                    {t.description}
                  </p>
                  <div className="mx-auto sm:mx-0">
                    <Dialog>
                      <DialogTrigger
                        onClick={() => handleDecrypt(t.ticketId)}
                        className={cn(
                          buttonVariants({ variant: "outline" }),
                          "mx-auto text-muted-foreground"
                        )}
                      >
                        <FileLock className="h-4 w-4" />
                        Unlock
                      </DialogTrigger>
                      {error && (
                        <DialogContent className="sm:max-w-[425px] px-2 sm:px-6 rounded-md bg-gradient-to-r from-pink-900 via-fuchsia-900 to-red-900 py-4 w-2/3 mt-2 text-center mx-auto text-white">
                          <DialogHeader>
                            <DialogTitle className="p-4 bg-gradient-to-r from-red-300 to-pink-600 bg-clip-text text-transparent text-center">
                              Decryption failed.
                            </DialogTitle>
                          </DialogHeader>
                          <DialogDescription className="pb-6 bg-gradient-to-r from-red-300 to-pink-600 bg-clip-text text-transparent text-sm max-w-[370px]">
                            {error}
                          </DialogDescription>
                        </DialogContent>
                      )}
                      {decryptLoading && (
                        <DialogContent className="sm:max-w-[425px] px-2 sm:px-6 rounded-md py-4 w-2/3 mt-2 text-center mx-auto">
                          <DialogHeader>
                            <DialogTitle className="p-4 text-center">
                              TICKET DECRYPTION
                            </DialogTitle>
                          </DialogHeader>
                          <DialogDescription className="text-center text-sm pb-10">
                            <span className="flex justify-center items-center">
                              <Loader2 className="h-4 w-4 animate-spin me-1" />
                              <span className="animate-pulse">
                                Event QR code is being decrypted...
                              </span>
                            </span>
                          </DialogDescription>
                        </DialogContent>
                      )}
                      {secretFile && (
                        <DialogContent className="sm:max-w-[425px] px-2 sm:px-6 rounded-md py-4 w-2/3 mt-2 text-center mx-auto">
                          <DialogHeader>
                            <DialogTitle className="p-4 bg-clip-text bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-900 to-yellow-300 text-transparent text-center">
                              {t.title}
                            </DialogTitle>
                          </DialogHeader>
                          <DialogDescription className="flex flex-col pb-6 text-sm space-y-2 mx-3">
                            <span className="font-bold">
                              TICKET ID: {t.ticketId}
                            </span>
                            <span className="text-muted-foreground text-sm">
                              You are in! We can not wait to see you.
                            </span>
                            <span className="flex justify-center">
                              <Image
                                src={secretFile}
                                alt={t.title}
                                className="rounded-md"
                                width={250}
                                height={150}
                              />
                            </span>
                            <span className="text-muted-foreground text-sm">
                              Show this QR code on at the event entrance. Do no
                              share this QR code with anyone.
                            </span>
                          </DialogDescription>
                        </DialogContent>
                      )}
                    </Dialog>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
