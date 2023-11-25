export type signedPayloadType = {
  sourceChainWallet: string;
  sourceChainType: string;
  sourceChainId: string;
  signature: string;
  data: string;
};

export type EventType = {
  eventId: string;
  owner: string;
  sourceChainType: string;
  sourceChainId: string;
  title: string;
  description: string;
  basicNFTIPFS: string;
  whitelistedCollections: string[];
  maximumTickets: number;
  buyAble: boolean;
  fileUrl:string,
};

export type EventsType = {
  success: boolean;
  allEvents: EventType[];
};

export type UserEventTicketType = {
  eventId: string;
  ticketId: number;
};

export type UsersTicketsType = {
  success: boolean;
  tickets: UserEventTicketType[]
}
