import Web3 from "web3";
import { parseEther } from "ethers";

export const transfer = async (web3: Web3, data: string): Promise<string> => {
    const signedTransaction = JSON.parse(data);
    console.log(signedTransaction);

    try {
        // Add the sender's address to the signed transaction object

        return new Promise((resolve, reject) => {
            web3.eth.sendSignedTransaction(signedTransaction.rawTransaction)
                .on("receipt", receipt => {
                    resolve("Successfully");
                })
                .on("error", error => {
                    reject(error.message ? error.message : "Error");
                });
        });
    } catch (err) {
        alert(err);
        return "Error";
    }
};
