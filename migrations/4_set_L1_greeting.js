// This contracts runs on L2, and controls a Greeter on L1.
require("dotenv").config();
const sdk = require("@eth-optimism/sdk");
const Greeter = artifacts.require("GreeterL2");
const ethers = require("ethers");
const infuraKey = process.env["INFURA_KEY"];
const kovanMnemonic = process.env["KOVAN_MNEMONIC"];

module.exports = async function (deployer) {
  const instance = await Greeter.deployed();
  console.log("Updating the Greetings contract on L1! 👋");
  const tx = await instance.setGreeting("👋 Greetings from Truffle!");
  const txHash = tx.receipt.transactionHash;
  console.log(`🙌🙌 Greeter txn confirmed on L2! ${txHash}`);
  console.log(`🛣️  Bridging message to L1 Greeter contract...`);
  console.log(
    `🕐 In about 1 minute, check the Greeter contract "read" function: https://kovan.etherscan.io/address/0x11fB328D5Bd8E27917535b6d40b881d35BC39Be0#readContract`
  );

  // Set providers for Optimism sdk
  const l1Provider = new ethers.providers.InfuraProvider("kovan", infuraKey);
  const wallet = ethers.Wallet.fromMnemonic(kovanMnemonic, l1Provider);
  const l1Signer = wallet.connect(l1Provider);

  const l2Provider = new ethers.providers.InfuraProvider(
    "optimism-kovan",
    infuraKey
  );
  //const l2Signer = await l2Provider.getSigner();

  // Initialize messenger
  const crossChainMessenger = new sdk.CrossChainMessenger({
    l1ChainId: 42,
    l1SignerOrProvider: l1Signer,
    l2SignerOrProvider: l2Provider,
  });

  let expectedBlockTime = 1000;
  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };
  let statusReady = false;
  while (!statusReady) {
    // Waiting expectedBlockTime until the transaction is mined
    let status = await crossChainMessenger.getMessageStatus(txHash);
    console.log("Message status: ", status);
    statusReady = status == sdk.MessageStatus.READY_FOR_RELAY;
    await sleep(expectedBlockTime);
  }
  const finalize = await crossChainMessenger.finalizeMessage(tx);
  console.log("finalized!", finalize);
};
