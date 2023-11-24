import Image from "next/image";
import { unstable_noStore as noStore } from "next/cache";
import { CalendarHeart } from "lucide-react";
import { Button } from "@/components/ui/button";

export const EventList = async () => {
  const fetchData = async () => {
    noStore();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return true;
  };
  const isData = await fetchData();

  return (
    <div className="overflow-y-auto h-[600px] border rounded-lg p-4 flex">
      {!isData ? (
        <div className="flex flex-col items-center self-center space-y-4 text-muted-foreground mx-auto">
          <CalendarHeart />
          <p className="flex flex-col text-center">
            <span>No events available for now.</span>
            <span>Come check soon.</span>
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4 self-start">
          {Array.from({ length: 3 }, (_, i) => i + 1).map((id) => (
            <div
              key={id}
              className="border w-full my-1 rounded-md transition-all hover:border-slate-300"
            >
              <div className="flex flex-col items-center px-2 py-4">
                <div className="w-3/6 mx-auto">
                  <Image
                    src="/event.jpg"
                    alt="Random event"
                    className="rounded-md mx-auto"
                    width={120}
                    height={150}
                  />
                </div>
                <div className="flex flex-col pt-2 space-y-2">
                  <h2 className="text-lg text-center font-bold">Event 1</h2>
                  <p className="text-sm text-muted-foreground overflow-y-auto max-h-[150px] border rounded-md p-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                  <Button className="mx-auto" variant={"outline"}>
                    Buy ticket
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
