require("dotenv").config();
const sdk = require("@eth-optimism/sdk");
const ethers = require("ethers");
const infuraKey = process.env["INFURA_KEY"];

module.exports = async function (deployer) {
  //TODO Replace this
  const l2tx =
    "0xbe56290a3b6776006ad1f183965eb41690c592d37d8ef11fba8c770e3aeffc3d";
  const provider = new ethers.providers.Web3Provider(deployer.provider);
  const l1Signer = await provider.getSigner();
  console.log("signers");
  const crossChainMessenger = new sdk.CrossChainMessenger({
    l1ChainId: 42,
    l1SignerOrProvider: l1Signer,
    l2SignerOrProvider: new ethers.providers.JsonRpcProvider(
      "wss://optimism-kovan.infura.io/ws/v3/" + infuraKey
    ),
  });
  // (await crossChainMessenger.getMessageStatus(l2tx)) ==
  //   sdk.MessageStatus.READY_FOR_RELAY;
  const finalize = await crossChainMessenger.finalizeMessage(l2tx);
  console.log(finalize);
};
