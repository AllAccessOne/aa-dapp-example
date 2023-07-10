
import { useEffect } from "react";
import * as fcl from "@onflow/fcl";
import { isEmpty } from "lodash";
import { GetBalanceFlowScript } from "./scripts";
import { ChainNetwork } from "../../configs/data/blockchain";
import { Account } from "../wrapper";
const { t } = fcl;

export const useFlowBlockchain = (networkState: ChainNetwork, masterKey: Account) => {
  useEffect(() => {
    if (isEmpty(networkState)) return;
    if (!networkState.chainID.includes("flow")) return;
    if (!masterKey.publicKey) return;
    const { rpcUrls, chainID, flowToken, flowFungibleToken } = networkState;
    const config = {
      "accessNode.api": rpcUrls,
      "flow.network": chainID.split("-")[1],
      "0xFlowToken": flowToken,
      "0xFungibleToken": flowFungibleToken,
    };
    fcl.config(config);
  }, [masterKey, networkState]);



  const getBalance = async () => {
    if (masterKey.address) {
      const response = await fcl.send([fcl.script(GetBalanceFlowScript), fcl.args([fcl.arg(masterKey.address, t.Address)])]);
      const res = await fcl.decode(response);
      console.log(res as string);
      return res as string;
    }
    return;
  };


  const transfer = async (data: string) => {
    const signedTransaction = JSON.parse(data);
    try {
      await fcl.send(signedTransaction)
      return "Sucessfully";
    }
    catch (err) {
      return "Unknown error";
    }
  };

  return { fcl, getBalance, transfer };
};
