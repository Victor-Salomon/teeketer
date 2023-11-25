"use client";
import Image from "next/image";
import { CalendarHeart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buyEventTicket, generateSignedPayload, getEvents } from "@/lib/keeper";
import { EventType, EventsType } from "@/lib/types";
import { useUserWalletStore } from "@/stores/walletStore";
import { useEffect, useState } from "react";
import { EventListSkeleton } from "@/components/Skeletons";
import { ethers } from "ethers";
import { loadNftMetadata } from "@/lib/ternoa";

export const EventList = () => {
  const user = useUserWalletStore((state) => state.userWallet);
  const IPFS_URL = "https://ipfs-dev.trnnfr.com";
  const [isLoadingEvents, setIsLoadingEvents] = useState<boolean>(false);
  const [isPurchaseLoading, setIsPurchaseLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string | undefined>(undefined);
  const [events, setEvents] = useState<EventsType>();

  const handleBuy = async (eventId: string) => {
    setIsPurchaseLoading(true);
    try {
      const ethereum = (window as any).ethereum;
      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      const signPayload = await generateSignedPayload(signer, {
        block: 1234,
        eventId,
      });
      const buyTicket = await buyEventTicket(signPayload);
      console.log(buyTicket);
      setIsPurchaseLoading(false);
    } catch (error: Error | any) {
      const errDesc = `Error buyingTicket: ${error?.message ?? error}`;
      console.log(errDesc);
      setIsPurchaseLoading(false);
    }
  };

  useEffect(() => {
    let shouldUpdate = true;
    setIsLoadingEvents(true);

    const loadEvents = async () => {
      try {
        const events: EventsType = user.isConnected
          ? await getEvents(user.address)
          : await getEvents();
        if (events) {
          events.allEvents = await Promise.all(
            events?.allEvents.map(async (e) => {
              const ipfsData: any = await loadNftMetadata(e.basicNFTIPFS);
              e.fileUrl = `${IPFS_URL}/ipfs/${ipfsData.image}`;
              return e;
            })
          );
          if (shouldUpdate) setEvents(events);
        }

        setIsLoadingEvents(false);
      } catch (error) {
        console.error(error);
        setIsLoadingEvents(false);
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error(error as string);
        }
      }
    };

    loadEvents();

    return () => {
      shouldUpdate = false;
      setIsLoadingEvents(false);
    };
  }, [user]);
  console.log(events);

  return isLoadingEvents ? (
    <EventListSkeleton />
  ) : (
    <div className="overflow-y-auto h-[600px] border rounded-lg p-4 flex">
      {!events || events?.allEvents.length === 0 ? (
        <div className="flex flex-col items-center self-center space-y-4 text-muted-foreground mx-auto">
          <CalendarHeart />
          <p className="flex flex-col text-center">
            <span>No events available for now.</span>
            <span>Come check soon.</span>
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4 self-start w-full">
          {events?.allEvents.map((e: EventType) => (
            <div
              key={e.eventId}
              className="border my-1 rounded-md transition-all hover:border-slate-300 w-full"
            >
              <div className="flex flex-col items-center px-2 py-4">
                <div className="mx-auto">
                  <Image
                    src={e.fileUrl}
                    alt="Random event"
                    className="rounded-md mx-auto"
                    width={120}
                    height={150}
                  />
                </div>
                <div className="flex flex-col pt-2 space-y-2 w-full">
                  <h2 className="text-lg text-center font-bold">{e.title}</h2>
                  <h2 className="text-sm text-muted-foreground font-bold">
                    Description:
                  </h2>
                  <p className="text-sm text-muted-foreground overflow-y-auto max-h-[150px] min-h-[60px] border rounded-md p-2">
                    {e.description}
                  </p>
                  {e.buyAble && (
                    <Button
                      className="mx-auto"
                      variant={"outline"}
                      onClick={() => handleBuy(e.eventId)}
                      disabled={isPurchaseLoading}
                    >
                      {isPurchaseLoading ? (
                        <div className="flex items-center">
                          <Loader2 className="h-4 w-4 animate-spin me-1" />
                          <span className="animate-pulse">
                            Purchase ongoing...
                          </span>
                        </div>
                      ) : (
                        "Buy ticket"
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
