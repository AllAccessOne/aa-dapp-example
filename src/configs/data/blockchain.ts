export type ChainID = "1" | "5" | "9" | "56" | "97" | "flow-testnet";
type ChainCore = "evm" | "fvm";
const RPC_GOERLI = process.env.REACT_APP_GOERLI_TESTNET as string;
const RPC_BCS = process.env.REACT_APP_BSC_TESTNET as string;
const RPC_FLOW = process.env.REACT_APP_FLOW_TESTNET as string;
export type ChainNetwork = {
  chainID: ChainID;
  core: ChainCore;
  rpcUrls: string;
  title: string;
  description: string;
  apiTransactionHash?: string;
};
export const listNetWorks: ChainNetwork[] = [

  {
    chainID: "97",
    core: "evm",
    rpcUrls: RPC_BCS || "https://data-seed-prebsc-2-s2.binance.org:8545",
    title: "BNB",
    description: "Binance Smart Chain Testnet",
    apiTransactionHash: `https://testnet.bscscan.com/tx/{transactionHash}`,
  },
  {
    chainID: "flow-testnet",
    core: "fvm",
    rpcUrls: RPC_FLOW || "https://access-testnet.onflow.org",
    title: "Flow",
    description: "Flow blockchain Testnet",
  },
  {
    chainID: "5",
    core: "evm",
    rpcUrls: RPC_GOERLI || "https://goerli.blockpi.network/v1/rpc/public",
    title: "ETH",
    description: "Goerli Testnet",
    apiTransactionHash: "https://goerli.etherscan.io/tx/{transactionHash}",
  },
];

// export const myToken: Token[] = [
//   {
//     chainId: "5",
//     rpcUrls: "https://goerli.blockpi.network/v1/rpc/public",
//     name: "Ethereum",
//     symbol: "ETH",
//   },
//   {
//     chainId: "1",
//     rpcUrls: "https://eth.llamarpc.com",
//     name: "Ethereum",
//     symbol: "ETH",
//   },
//   {
//     chainId: "1",
//     rpcUrls: "https://eth.llamarpc.com",
//     name: "Dai Stablecoin",
//     symbol: "DAI",
//     tokenContract: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
//   },
//   {
//     chainId: "1",
//     rpcUrls: "https://eth.llamarpc.com",
//     name: "Tether",
//     symbol: "USDT",
//     tokenContract: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
//   },
//   {
//     chainId: "1",
//     rpcUrls: "https://eth.llamarpc.com",
//     name: "Tether",
//     symbol: "USDT",
//     tokenContract: "0xe802376580c10fe23f027e1e19ed9d54d4c9311e",
//   },
//   {
//     chainId: "56",
//     rpcUrls: "https://api.bscscan.com/api?module=account&action=txlist&address={address}&sort=asc&apikey=I1JJ6MQZRU7BG9WNH1FU69M3T377FIC4JW",
//     name: "BNB",
//     symbol: "BNB",
//   },
// ];
