import Web3 from "web3";

import { formatValue } from "./format";
import { getBalance } from "./balance";
import { transfer } from "./transfer";
import { useEffect, useState } from "react";
import { ChainNetwork } from "../../configs/data/blockchain";

export const useEVMBlockchain = (network: ChainNetwork, address: string) => {
  const [web3Instance, setWeb3Instance] = useState<Web3 | null>(new Web3());

  useEffect(() => {
    const web3 = new Web3(network.rpcUrls);
    web3.defaultAccount = address;
    setWeb3Instance(web3);
  }, [network])


  return { web3: web3Instance, getBalance, transfer, formatValue };
};

export { getBalance, transfer, formatValue };
