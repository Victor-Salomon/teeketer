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
};

export type EventsType = {
  success: boolean;
  allEvents: EventType[];
};
