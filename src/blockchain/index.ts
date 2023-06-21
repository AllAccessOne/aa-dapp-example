import Web3 from "web3";
import { formatValue } from "./format";
import { getBalance } from "./balance";
const privateKey = "e19d5570950218a0f385f098b9b6c050a63aca31a286da271075a33a8ae7b3da";
import Cookies from 'universal-cookie';
export const useBlockchain = (rpcUrl: string = "https://goerli.blockpi.network/v1/rpc/public") => {
  const cookies = new Cookies();
  const myAddress = cookies.get("masterKey") || "";
  try {
    const web3 = new Web3(rpcUrl);
    web3.defaultAccount = myAddress;
    return { web3, getBalance, formatValue };
  } catch (error) {
    console.log(error);
    return { error };
  }
};
export { getBalance, formatValue, };
