import { TernoaIPFS } from "ternoa-js";


export const loadNftMetadata = async (offchainData: string) => {
    const IPFS_URL = "https://ipfs-dev.trnnfr.com";
	const ipfsClient = new TernoaIPFS(new URL(IPFS_URL));
	try {
		return await ipfsClient.getFile(offchainData);
	} catch (error) {
		console.log(error);
	}
};
