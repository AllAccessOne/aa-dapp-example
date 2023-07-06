import Web3 from "web3";

export const getBalance = async (web3: Web3, address: string) => {
  if (address) {
    const balance = await web3.eth.getBalance(address as string);
    const formatBalance = web3.utils.fromWei(balance, "ether");
    return formatBalance.slice(0, 6);
  }
  return "0";
};
