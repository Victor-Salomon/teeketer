"use client";
import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useState } from "react";

const Create = () => {
  const [showCreateEventDialog, setShowCreateEventDialog] =
    useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  return (
    <Dialog
      open={showCreateEventDialog}
      onOpenChange={setShowCreateEventDialog}
    >
      <DialogTrigger asChild>
        <div
          className={cn(
            buttonVariants({ variant: "outline" }),
            "cursor-pointer"
          )}
        >
          Create an Event
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] px-2 sm:px-6">
        <DialogHeader>
          {error ? (
            <>
              <DialogTitle>Event Creation Error</DialogTitle>
              <DialogDescription>
                Something went wrong during the event creation.
              </DialogDescription>
            </>
          ) : (
            <>
              <DialogTitle>Create an event</DialogTitle>
              <DialogDescription>
                Fill the following form to register your new event.
              </DialogDescription>
            </>
          )}
        </DialogHeader>
        {error ? (
          <div className="flex flex-col justify-center items-center mt-4 rounded-md bg-gradient-to-r from-pink-900 via-fuchsia-900 to-red-900 py-4">
            <div className="m-4 bg-gradient-to-r from-red-300 to-pink-600 bg-clip-text text-transparent">
              {error}
            </div>
          </div>
        ) : (
          <div>Inputs</div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Create;
