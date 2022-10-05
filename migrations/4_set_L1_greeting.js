require("dotenv").config();
const sdk = require("@eth-optimism/sdk");
const ethers = require("ethers");
const Greeter = artifacts.require("GreeterL2");
const goerliMnemonic = process.env["GOERLI_MNEMONIC"];
const infuraKey = process.env["INFURA_KEY"];

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

/**
 * Set L1 Greeting
 * Run this migration on L1 to update the L1 greeting.
 */
module.exports = async function (deployer) {
  const newGreeting = "👋 Greetings from Truffle!"; //<---- CHANGE THIS VALUE TO YOUR NAME!!!
  const instance = await Greeter.deployed();

  console.log("Updating the L1 Greetings contract from L2! 👋");

  const tx = await instance.setGreeting(newGreeting);
  const txHash = tx.receipt.transactionHash;

  console.log(`🙌🙌 Greeter txn confirmed on L2! ${txHash}`);
  console.log(
    `🛣️  Bridging message to L1 Greeter contract.\n 🕐 This will take at least 1-5 min...`
  );

  // Set providers for Optimism sdk
  const l1Provider = new ethers.providers.JsonRpcProvider(
    "https://goerli.infura.io/v3/" + infuraKey
  );
  const l2Provider = new ethers.providers.JsonRpcProvider(
    "https://optimism-goerli.infura.io/v3/" + infuraKey
  );

  // Connect an L1 signer
  const wallet = ethers.Wallet.fromMnemonic(goerliMnemonic);
  const l1Signer = wallet.connect(l1Provider);

  // Initialize sdk messenger
  const crossChainMessenger = new sdk.CrossChainMessenger({
    l1ChainId: 5,
    l2ChainId: 420,
    l1SignerOrProvider: l1Signer,
    l2SignerOrProvider: l2Provider,
  });

  let statusReady = false;

  // Sleep for 1 min during L2 -> L1 bridging
  await sleep(60000); // 60 seconds

  // Poll the L1 msg status
  while (!statusReady) {
    let status = null;
    status = await crossChainMessenger.getMessageStatus(txHash);
    statusReady = status == sdk.MessageStatus.READY_FOR_RELAY;
    if (!statusReady) {
      console.log(
        "Message not yet received on L1.\n 🕐 Retrying in 10 seconds..."
      );
      await sleep(10000); // 10 seconds
    }
  }

  console.log("📬 Message received! Finalizing...");

  // Open the message on L1
  finalize = await crossChainMessenger.finalizeMessage(txHash);
  console.log(
    `🎉 Message finalized. Check the L1 Greeter contract "read" function: https://goerli.etherscan.io/address/0x7fA4D972bB15B71358da2D937E4A830A9084cf2e#readContract`
  );
};
