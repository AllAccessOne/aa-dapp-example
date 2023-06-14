import Web3 from "web3";
import { useState } from "react";
type FormData = {
  addressTo: string;
  amount: string;
}
export const sendTransaction = async (web3: Web3, data: FormData) => {
  const privateKey = "e19d5570950218a0f385f098b9b6c050a63aca31a286da271075a33a8ae7b3da";
  const { addressTo, amount } = data;
  try {
    const weiValue = Math.round(parseFloat(amount) * 10 ** 18);
    const hexValue = web3.utils.toHex(weiValue ? weiValue : 0);

    const price = await web3.eth.getGasPrice();
    const gasLimit = await web3.eth.estimateGas({
      to: addressTo,
      from: web3.defaultAccount as string,
      value: hexValue,
      data: "0x",
    });

    const tx = {
      to: addressTo,
      from: web3.defaultAccount as string,
      value: hexValue,
      gas: gasLimit,
      gasPrice: price,
      data: "0x",
    };
    const signedTransaction: any = await web3.eth.accounts.signTransaction(tx, privateKey);
    const sendSignedTransaction = web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
    sendSignedTransaction
      .on("transactionHash", (transactionHash) => {
        return transactionHash;
      })
      .on("receipt", () => {
        return "success";
      });
  } catch (error) {
    console.log(error);
    return "Error";
  }
};

