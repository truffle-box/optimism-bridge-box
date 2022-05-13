const sdk = require("@eth-optimism/sdk");
const ethers = require("ethers");
const Greeter = artifacts.require("GreeterL1");

module.exports = async function (deployer) {
  //TODO Replace this
  const l2tx =
    "0xbe56290a3b6776006ad1f183965eb41690c592d37d8ef11fba8c770e3aeffc3d";
  //l1Signer = await ethers.getSigner()
  const l1Signer = new ethers.providers.Web3Provider(deployer.provider);
  crossChainMessenger = new sdk.CrossChainMessenger({
    l1ChainId: 42,
    l1SignerOrProvider: l1Signer,
    l2SignerOrProvider: new ethers.providers.JsonRpcProvider(
      "https://kovan.optimism.io"
    ),
  });
};
