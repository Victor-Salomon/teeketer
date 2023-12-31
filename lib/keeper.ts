import { ethers } from "ethers";
import { Events, RetrieveKey, UsersTickets, signedPayload } from "./types";

export const getWalletRegistration = async (userAddress: string) => {
  const apiUrl =
    "https://alphanet-admin-c1.ternoa.dev:3001/api/keeper/getWalletRegistration";

  const userPayload = {
    sourceChainWallet: userAddress,
    sourceChainId: "0",
    sourceChainType: "ERC",
  };
  return fetch(apiUrl, {
    cache: "no-store",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userPayload),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.error("Error during fetch:", error);
    });
};

export const generateSignedPayload = async (
  signer: ethers.JsonRpcSigner,
  payload: any
): Promise<signedPayload> => {
  const data = JSON.stringify(payload);
  const sourceChainId = "0";
  const sourceChainType = "ERC";
  const sourceChainWallet = signer.address;
  const signature = await signer.signMessage(data);

  return {
    sourceChainWallet,
    sourceChainType,
    sourceChainId,
    signature,
    data,
  };
};

export const registerWallet = async (signedPayload: signedPayload) => {
  const apiUrl =
    "https://alphanet-admin-c1.ternoa.dev:3001/api/keeper/registerWallet";

  return fetch(apiUrl, {
    cache: "no-store",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signedPayload),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.error("Error during fetch:", error);
    });
};

export const registerEvent = async (signedPayload: signedPayload) => {
  const apiUrl =
    "https://alphanet-admin-c1.ternoa.dev:3001/api/keeper/registerEvent";

  return fetch(apiUrl, {
    cache: "no-store",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signedPayload),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.error("Error during fetch:", error);
    });
};

export const getEvents = async (address?: string): Promise<Events> => {
  const apiUrl =
    "https://alphanet-admin-c1.ternoa.dev:3001/api/keeper/getAllEvents";

  return fetch(apiUrl, {
    cache: "no-store",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sourceChainWallet: address }),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.error("Error during fetch:", error);
    });
};

export const buyEventTicket = async (signedPayload: signedPayload) => {
  const apiUrl =
    "https://alphanet-admin-c1.ternoa.dev:3001/api/keeper/buyTicket";

  return fetch(apiUrl, {
    cache: "no-store",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signedPayload),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.error("Error during fetch:", error);
    });
};

export const getUserTickets = async (address?: string): Promise<UsersTickets> => {
  const apiUrl =
    "https://alphanet-admin-c1.ternoa.dev:3001/api/keeper/getUserTickets";

  return fetch(apiUrl, {
    cache: "no-store",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sourceChainWallet: address }),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.error("Error during fetch:", error);
    });
};

export const retrieveTicketKey = async (signedPayload: signedPayload):Promise<RetrieveKey> => {
  const apiUrl =
    "https://alphanet-admin-c1.ternoa.dev:3001/api/keeper/retriveTicketKey";

  return fetch(apiUrl, {
    cache: "no-store",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signedPayload),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.error("Error during fetch:", error);
    });
};
