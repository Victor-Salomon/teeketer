import { ethers } from "ethers";
import { signedPayloadType } from "./types";

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
): Promise<signedPayloadType> => {
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

export const registerWallet = async (signedPayload: signedPayloadType) => {
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

export const registerEvent = async (signedPayload: signedPayloadType) => {
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
