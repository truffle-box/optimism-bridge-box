// This contracts runs on L2, and controls a Greeter on L1.
var Greeter = artifacts.require("GreeterL2");

module.exports = async function(deployer) {
  const instance = await Greeter.deployed();
  console.log("Updating the Greetings contract on L1! 👋");
  const tx = await instance.setGreeting("👋 Greetings from Truffle!")
  console.log(
    `🙌 Greeter txn confirmed on L1! ${tx.receipt.transactionHash}`
  );
  console.log(`🛣️  Bridging message to 12greeter contrct...`);
  console.log(
    `🕐 In about 10 minutes, check the Greeter contract "read" function: https://kovan.etherscan.io/address/0x11fB328D5Bd8E27917535b6d40b881d35BC39Be0#readContract`
  );
};
