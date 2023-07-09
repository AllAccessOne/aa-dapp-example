
import { useEffect } from "react";
import * as fcl from "@onflow/fcl";
import { isEmpty } from "lodash";
import { GetBalanceFlowScript } from "./scripts";
import { ChainNetwork } from "../../configs/data/blockchain";
const { t } = fcl;

export const useFlowBlockchain = (networkState: ChainNetwork, address: string) => {
  const getAccount = async () => {
    const accountResponse = await fcl.send([fcl.getAccount(address || "") as any]);
    return await fcl.decode(accountResponse);
  };

  useEffect(() => {
    if (isEmpty(networkState)) return;
    if (!networkState.chainID.includes("flow")) return;
    const { rpcUrls, chainID } = networkState;
    const config = {
      "accessNode.api": rpcUrls,
      "flow.network": chainID.split("-")[1],
    };
    fcl.config(config);
  }, [networkState]);


  const getBalance = async () => {
    const account = await getAccount();
    if (account) {
      const response = await fcl.send([fcl.script(GetBalanceFlowScript), fcl.args([fcl.arg(account, t.Address)])]);
      const res = await fcl.decode(response);
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
