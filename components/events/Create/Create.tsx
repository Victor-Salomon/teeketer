"use client";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { FileUploader } from "react-drag-drop-files";
import { ImageDown, X } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { FormSchemaType, formSchema } from "./zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";

const Create = () => {
  const [showCreateEventDialog, setShowCreateEventDialog] =
    useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const fileTypes = ["JPG", "JPEG", "PNG", "jpg", "jpeg", "png"];
  const [isEventUploading, setIsEventUploading] = useState<boolean>(false);
  const [ticketPreview, setTicketPreview] = useState<File | undefined>(
    undefined
  );
  const [eventData, setEventData] = useState<any>(undefined);

  const handleTicketPreviewChange = async (file: File) => {
    setError(undefined);
    setTicketPreview(file);
  };

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventTitle: "",
      eventDescription: "",
      maximumTickets: "",
    },
  });

  const handleEventForm = async (values: FormSchemaType) => {
    console.log(values);
    setError("nické")
    {
      /* 
        sourceChainWallet
        sourceChainType
        sourceChainId
        ✅imageFile
        signature
        data:
        ✅title
        ✅description
        ✅maximumTickets 
        */
    }
  };

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
          <>
            <div className="w-3/6 mx-auto bg-gradient-to-r from-indigo-400 to-cyan-400 p-0.5 rounded-lg">
              <FileUploader
                handleChange={handleTicketPreviewChange}
                name="file"
                type={fileTypes}
                onTypeError={(err: Error) => console.log(err)}
                onSizeError={(err: Error) => console.log(err)}
              >
                <div className="flex flex-col items-center border rounded-lg p-8 mx-auto bg-white cursor-pointer">
                  <ImageDown />
                  {ticketPreview ? (
                    <p className="font-light text-sm py-2 text-center">
                      Upload a new event ticket preview here.
                    </p>
                  ) : (
                    <p className="font-light text-sm py-2 text-center">
                      Upload or drop the event ticket preview here
                    </p>
                  )}
                </div>
              </FileUploader>
            </div>
            {ticketPreview && (
              <p className="flex items-center justify-center from-purple-500 via-pink-500 to-blue-500 bg-gradient-to-r bg-clip-text text-transparent font-light text-sm">
                <span className="text-primary me-1">File name: </span>
                {ticketPreview.name}
                <X
                  onClick={() => setTicketPreview(undefined)}
                  className="h-3 w-3 text-black cursor-pointer ms-0.5 mt-0.5"
                />
              </p>
            )}
          </>
        )}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleEventForm)}
            className="space-y-8"
          >
            <>
              <FormField
                control={form.control}
                name="eventTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Title</FormLabel>
                    <FormControl className="font-light">
                      <Input
                        placeholder="Add a title to your event"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="eventDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Description</FormLabel>
                    <FormControl className="font-light">
                      <Textarea
                        placeholder="Add a description to your event"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="maximumTickets"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum Tickets</FormLabel>
                    <FormControl className="font-light">
                      <Input
                        placeholder="Set the number of tickets to issue."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
            <Dialog>
              <DialogTrigger asChild>
                <div className="flex justify-center">
                  <Button variant={"outline"} type="submit">
                    Create event
                  </Button>
                </div>
              </DialogTrigger>
              {error && (
                <DialogContent className="sm:max-w-[425px] px-2 sm:px-6 rounded-md bg-gradient-to-r from-pink-900 via-fuchsia-900 to-red-900 py-4 w-2/3 mt-2 text-center mx-auto text-white">
                  <DialogHeader>
                    <DialogTitle className="p-4 bg-gradient-to-r from-red-300 to-pink-600 bg-clip-text text-transparent text-center">
                      Event creation failed.
                    </DialogTitle>
                  </DialogHeader>
                  <DialogDescription className="pb-6 bg-gradient-to-r from-red-300 to-pink-600 bg-clip-text text-transparent text-base text-sm">
                    {error}
                  </DialogDescription>
                </DialogContent>
              )}
              {isEventUploading && (
                <DialogContent className="sm:max-w-[425px] px-2 sm:px-6 rounded-md bg-gradient-to-tr from-violet-500 to-orange-300 py-4 w-2/3 mt-2 text-center mx-auto text-white">
                  <DialogHeader>
                    <DialogTitle className="p-4 text-white text-center">
                      Uploading event.
                    </DialogTitle>
                  </DialogHeader>
                  <DialogDescription className="text-white text-center text-sm">
                    Your event is being uploaded...
                  </DialogDescription>
                </DialogContent>
              )}
              {eventData && (
                <div>C est ok</div>
                // <DialogContent className="sm:max-w-[425px] px-2 sm:px-6 rounded-md bg-gradient-to-r from-teal-200 to-teal-500 text-white py-4 w-2/3 mt-2 text-center mx-auto text-white">
                //   <DialogHeader>
                //     <DialogTitle className="p-4 bg-clip-text bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-900 to-yellow-300 text-transparent text-center">
                //       NFT SUCCESSFULLY CREATED 🌶️
                //     </DialogTitle>
                //     <TernoaIcon className="mx-auto" />
                //   </DialogHeader>
                //   <DialogDescription className="pb-6 text-white text-base text-sm space-y-4 mx-3">
                //     <span className="">
                //       <span className="font-bold me-0.5">Congratulation:</span>
                //       {middleEllipsis(nftData.owner, 15)} just created{" "}
                //       <span className="font-bold bg-clip-text bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-900 to-yellow-300 text-transparent mx-1">
                //         NFT id {nftData.nftId}
                //       </span>
                //       on the Ternoa Blockchain.{" "}
                //     </span>

                //     <span className="m-0.5">
                //       Find the IPFS hash{" "}
                //       <a
                //         className="font-bold cursor-pointer"
                //         href={`https://ipfs-mainnet.trnnfr.com/ipfs/${nftData.offchainData}`}
                //         target="blank"
                //       >
                //         here.
                //       </a>
                //     </span>

                //     {blockData && (
                //       <span className="m-0.5">
                //         See your transaction
                //         <a
                //           className="font-bold cursor-pointer ps-1"
                //           href={getExplorerLink(
                //             Number(blockData.block?.header.number)
                //           )}
                //           target="blank"
                //         >
                //           here.
                //         </a>
                //       </span>
                //     )}
                //   </DialogDescription>
                // </DialogContent>
              )}
            </Dialog>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default Create;
