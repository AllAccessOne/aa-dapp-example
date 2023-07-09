import { useEVMBlockchain } from "./evm";
import { useFlowBlockchain } from "./flow";
import { isEmpty } from "lodash";
// import { Callbacks, DefaultCallbacks, TransferNative } from "./types";
import { ChainNetwork } from "../configs/data/blockchain";
// interface Blockchain {
//   getBalance: () => number;
//   transferNative: () => number;
// }
// interface Callbacks {
//   onError: (msg: string) => void;
// }
export type Account = {
  address: string;
  publicKey: string;
}
const useBlockchain = (networkState: ChainNetwork, account: Account) => {
  const {
    web3,
    transfer: evmTransfer,
    getBalance: evmGetBalance,
  } = useEVMBlockchain(networkState, account.address);
  const {
    transfer: fvmTransfer,
    getBalance: fvmGetBalance,
  } = useFlowBlockchain(networkState, account);

  const getBalance = async () => {
    const { core } = networkState;
    if (core === "evm") {
      return evmGetBalance(web3!, account.address);
    }
    if (core === "fvm" && account.publicKey) {
      return fvmGetBalance();
    }
    return "0";
  };

  const transfer = async (data: string) => {
    if (isEmpty(networkState)) return;
    const { core } = networkState;
    if (core === "evm") {
      return evmTransfer(web3!, data);
    }
    if (core === "fvm" && account.publicKey) {
      return fvmTransfer(data);
    }
    return "";
  };

  return { web3, getBalance, transfer };

};

export default useBlockchain;
