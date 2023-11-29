export type signedPayload = {
  sourceChainWallet: string;
  sourceChainType: string;
  sourceChainId: string;
  signature: string;
  data: string;
};

export type Event = {
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
  fileUrl: string;
};

export type Events = {
  success: boolean;
  allEvents: Event[];
};

export type UserEventTicket = {
  eventId: string;
  ticketId: number;
};

export type UsersTickets = {
  success: boolean;
  tickets: UserEventTicket[];
};

export type PopulatedUsersTicket = {
  description: string;
  fileUrl: string;
  title: string;
} & UserEventTicket;

export type RetrieveKey = {
  success: boolean;
  privateKey: string;
};
