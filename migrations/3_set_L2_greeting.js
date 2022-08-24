var Greeter = artifacts.require("GreeterL1");

/**
 * Set L2 Greeting
 * Run this migration on L1 to update the L1 greeting.
 */
module.exports = async function (deployer) {
  console.log("Updating the L2 Greetings contract from L1! 👋👋");

  const instance = await Greeter.deployed();
  const tx = await instance.setGreeting("👋 Greetings from Truffle!");

  console.log(`🙌 Greeter txn confirmed on L1! ${tx.receipt.transactionHash}`);
  console.log(`🛣️  Bridging message to L2 Greeter contract...`);
  console.log(
    `🕐 In about 1 minute, check the Greeter contract "read" function: https://goerli-optimistic.etherscan.io/address/0xC0836cCc8FBa87637e782Dde6e6572aD624fb984#readContract`
  );
};
