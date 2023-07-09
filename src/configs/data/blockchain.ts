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
