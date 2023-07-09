import { SHA3 } from "sha3";
import { formatUnits } from "ethers";
import * as EC from "elliptic";
import { useLocalStorage } from "usehooks-ts";
import { useEffect, useState } from "react";
import * as fcl from "@onflow/fcl";
import { TransferFlowScript } from "./transactions";
import { isEmpty } from "lodash";
import { createFlowAccount } from "./apis";
import { Callbacks, DefaultCallbacks, SignedTransferResponse, TransferNative, TransferToken } from "../types";
import numeral from "numeral";
import { GetBalanceFlowScript } from "./scripts";
import { TransactionStatus } from "./types";
import { ChainNetwork } from "../../configs/data/blockchain";
const { t } = fcl;
const ec = new EC.ec("secp256k1");

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
    console.log(account);
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
