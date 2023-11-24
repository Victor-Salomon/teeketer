import * as z from "zod";

export const formSchema = z.object({
  eventTitle: z.string(),
  eventDescription: z.string(),
  maximumTickets: z.string().default("0"),
  collection: z.string(),
});

export type FormSchemaType = z.infer<typeof formSchema>;
