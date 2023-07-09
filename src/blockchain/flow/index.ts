
import { useEffect, useState } from "react";
import * as fcl from "@onflow/fcl";
import { isEmpty } from "lodash";
import { GetBalanceFlowScript } from "./scripts";
import { ChainNetwork } from "../../configs/data/blockchain";
import { createFlowAccount } from "./apis";
import { Account } from "../wrapper";
const { t } = fcl;

export const useFlowBlockchain = (networkState: ChainNetwork, masterKey: Account) => {
  const [account, setAccount] = useState("");

  const createOrGetAccount = async (): Promise<string> => {
    const { data, error } = await createFlowAccount({ publicKey: masterKey?.publicKey || "", hashAlgo: 3, signAlgo: 2 });
    if (error) {
      throw new Error(error);
    }
    setAccount(data);
    return data;
  };
  useEffect(() => {
    if (isEmpty(networkState)) return;
    if (!networkState.chainID.includes("flow")) return;
    if (!masterKey.publicKey) return;
    const { rpcUrls, chainID } = networkState;
    createOrGetAccount();
    const config = {
      "accessNode.api": rpcUrls,
      "flow.network": chainID.split("-")[1],
    };
    fcl.config(config);
  }, [masterKey, networkState]);

  const getAccount = async () => {
    const accountResponse = await fcl.send([fcl.getAccount(account) as any]);
    return await fcl.decode(accountResponse);
  };


  const getBalance = async () => {
    const account = await getAccount();
    if (account) {
      const response = await fcl.send([fcl.script(GetBalanceFlowScript), fcl.args([fcl.arg(account, t.Address)])]);
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
