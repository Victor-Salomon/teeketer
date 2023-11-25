import { Suspense } from "react";
import { TicketListSkeleton } from "@/components/Skeletons";
import { TicketsList } from "@/components/userTickets/Tickets";

export default async function Home() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tighter md:text-5xl py-6">
          Your event tickets
        </h1>
      </div>
      <Suspense fallback={<TicketListSkeleton />}>
        <TicketsList />
      </Suspense>
    </div>
  );
}
