export const GetBalanceFlowScript = `
  import FungibleToken from 0xFungibleToken
  import FlowToken from 0xFlowToken

  pub fun main(account: Address): UFix64 {

  let vaultRef = getAccount(account)
  .getCapability(/public/flowTokenBalance)
  .borrow<&FlowToken.Vault{FungibleToken.Balance}>()
  ?? panic("Could not borrow Balance reference to the Vault")

  return vaultRef.balance
}
`;
