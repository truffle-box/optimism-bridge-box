require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");

const ganacheMnemonic = process.env["GANACHE_MNEMONIC"];
const kovanMnemonic = process.env["KOVAN_MNEMONIC"];
const mnemonic = process.env["MNEMONIC"];
const mainnetMnemonic = process.env["MAINNET_MNEMONIC"];
const infuraKey = process.env["INFURA_KEY"];

const optimismKovanProvider = new HDWalletProvider(
  kovanMnemonic,
  "wss://optimism-kovan.infura.io/ws/v3/" + infuraKey
);

module.exports = optimismKovanProvider;
