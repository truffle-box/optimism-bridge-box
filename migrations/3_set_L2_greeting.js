var Greeter = artifacts.require("Greeter");

module.exports = async function (deployer) {
  const instance = await Greeter.deployed();
  console.log("Updating the Greetings contract on L2! 👋👋");
  const tx = await instance.setGreeting("👋 Greetings from Truffle!");
  console.log(`🙌 Greeter txn confirmed on L1! ${tx.receipt.transactionHash}`);
  console.log(`🛣️  Bridging message to L2 Greeter contract...`);
  console.log(
    `🕐 In about 1 minute, check the Greeter contract "read" function: https://kovan-optimistic.etherscan.io/address/0xD4c204223d6F1Dfad0b7a0b05BB0bCaB6665e0c9#readContract`
  );
};
