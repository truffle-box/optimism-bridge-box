// This contracts runs on L2, and controls a Greeter on L1.
require("dotenv").config();
const sdk = require("@eth-optimism/sdk");
const Greeter = artifacts.require("GreeterL2");
const ethers = require("ethers");
const infuraKey = process.env["INFURA_KEY"];
const kovanMnemonic = process.env["KOVAN_MNEMONIC"];

module.exports = async function (deployer) {
  const newGreeting = "👋 Greetings from Truffle!"; //<---- CHANGE THIS VALUE TO YOUR NAME!!!
  const instance = await Greeter.deployed();
  console.log("Updating the L1 Greetings contract from L2! 👋");
  const tx = await instance.setGreeting(newGreeting);
  const txHash = tx.receipt.transactionHash;
  console.log(`🙌🙌 Greeter txn confirmed on L2! ${txHash}`);
  console.log(`🛣️  Bridging message to L1 Greeter contract...`);

  // Set providers for Optimism sdk
  const l1Provider = new ethers.providers.InfuraProvider("kovan", infuraKey);
  const l2Provider = new ethers.providers.InfuraProvider(
    "optimism-kovan",
    infuraKey
  );

  // Set a signer for L1
  const wallet = ethers.Wallet.fromMnemonic(kovanMnemonic);
  const l1Signer = wallet.connect(l1Provider);

  // Initialize messenger
  const crossChainMessenger = new sdk.CrossChainMessenger({
    l1ChainId: 42,
    l1SignerOrProvider: l1Signer,
    l2SignerOrProvider: l2Provider,
  });

  let expectedBlockTime = 10000;
  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };
  let statusReady = false;

  // Poll the L1 msg status
  while (!statusReady) {
    let status = null;
    status = await crossChainMessenger.getMessageStatus(txHash);
    statusReady = status == sdk.MessageStatus.READY_FOR_RELAY;
    if (!statusReady) {
      console.log(
        "Message not yet received on L1.\n 🕐 Retrying in 10 seconds..."
      );
      await sleep(expectedBlockTime);
    }
  }
  console.log("📬 Message received! Finalizing...");

  // Open the message and run on L1
  finalize = await crossChainMessenger.finalizeMessage(txHash);
  console.log(
    `🎉 Message finalized. Check the L1 Greeter contract "read" function: https://kovan.etherscan.io/address/0x11fB328D5Bd8E27917535b6d40b881d35BC39Be0#readContract`
  );
};
