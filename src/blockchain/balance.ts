import Web3 from "web3";

export const getBalance = async (web3: Web3) => {
  if (web3.defaultAccount) {
    const balance = await web3.eth.getBalance(web3.defaultAccount as string);
    const formatBalance = web3.utils.fromWei(balance, "ether");
    return formatBalance.slice(0, 6);
  }
  return "0";
};
