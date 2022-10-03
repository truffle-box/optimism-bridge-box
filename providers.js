require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");

const goerliMnemonic = process.env["GOERLI_MNEMONIC"];
const infuraKey = process.env["INFURA_KEY"];

const optimismGoerliProvider = new HDWalletProvider(
  goerliMnemonic,
  "wss://optimism-goerli.infura.io/ws/v3/" + infuraKey
);

module.exports = optimismGoerliProvider;
