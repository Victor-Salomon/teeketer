import { Skeleton } from "./ui/skeleton";

export function EventListSkeleton() {
  return (
    <div className="overflow-hidden h-[600px] border rounded-lg p-4 flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 self-start">
        {Array.from({ length: 30 }, (_, i) => i + 1).map((id) => (
          <div
            key={id}
            className="border w-full my-1 rounded-md transition-all hover:bg-accent"
          >
            <div className="flex flex-col items-center text-left px-2 py-4">
              <Skeleton className="h-20 w-16 rounded-md my-4" />
              <div className="flex flex-col ps-2">
                <Skeleton className="h-4 w-[150px] my-1 mx-auto" />
                <Skeleton className="h-2 w-[220px] my-1" />
                <Skeleton className="h-2 w-[220px] my-1" />
                <Skeleton className="h-2 w-[220px] my-1" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TicketListSkeleton() {
  return (
    <div className="overflow-y-auto h-[600px] border rounded-lg p-4 flex justify-center">
      <div className="w-full self-start">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((id) => (
          <div
            key={id}
            className="border w-full my-2 rounded-md transition-all"
          >
            <div className="flex items-center text-left px-2 py-4">
              <Skeleton className="h-32 w-32 rounded-full my-4" />
              <div className="flex flex-col ps-2">
                <Skeleton className="h-4 w-[220px] my-1" />
                <Skeleton className="h-2 w-[320px] my-1" />
                <Skeleton className="h-2 w-[320px] my-1" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

