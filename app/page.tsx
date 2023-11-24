import { Suspense } from "react";
import { EventList } from "@/components/events/List/List";
import { EventListSkeleton } from "@/components/Skeletons";

export default async function Home() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tighter md:text-5xl py-6">
          Events overview
        </h1>
        <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
          Discover all the events available. Events whitelist attendees
          according to the NFTs they own.
        </p>
      </div>
      <Suspense fallback={<EventListSkeleton />}>
        <EventList />
      </Suspense>
    </div>
  );
}
