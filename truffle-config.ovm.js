// create a file at the root of your project and name it .env -- there you can set process variables
// like the mnemomic below. Note: .env is ignored by git in this project to keep your private information safe
require('dotenv').config();
const ganacheMnemonic = process.env["GANACHE_MNEMONIC"];
const kovanMnemonic = process.env["KOVAN_MNEMONIC"];
const mnemonic = process.env["MNEMONIC"];
const infuraKey = process.env["INFURA_KEY"];

//uncomment to use mainnetMnemonic, set in .env file
//const mainnetMnemonic = process.env["MAINNET_MNEMONIC"]

const { ganache } = require('@eth-optimism/plugins/ganache');
const HDWalletProvider = require('@truffle/hdwallet-provider');

const GAS_LIMIT = 10000000
const GAS_PRICE = 0

module.exports = {

  /**
  * contracts_build_directory tells Truffle where to store compiled contracts
  */
  contracts_build_directory: './build/optimism-contracts',

  /**
  *  contracts_directory tells Truffle where to find your contracts
  */
  contracts_directory: './contracts/optimism',

  networks: {
    development: {
      url: "http://127.0.0.1:7545",
      network_id: "*",
    },
    ganache: {
      network_id: 108,
      networkCheckTimeout: 100000,
      provider: function() {
        return ganache.provider({
          mnemonic: ganacheMnemonic,
          network_id: 108,
          default_balance_ether: 100,
        })
      }
    },
    //for use with local environment -- use `npm runLocalOptimism` to start
    optimistic_ethereum: {
      network_id: 420,
      provider: function() {
        return new HDWalletProvider({
          mnemonic: {
            phrase: mnemonic
          },
          providerOrUrl: "http://127.0.0.1:8545/",
          addressIndex: 0,
          numberOfAddresses: 1,
          chainId: 420
        })
      }
    },
    optimistic_kovan: {
      network_id: 69,
      provider: function() {
        return new HDWalletProvider({
          mnemonic: {
            phrase: kovanMnemonic
          },
          providerOrUrl: "https://optimism-kovan.infura.io/v3/" + infuraKey,
          addressIndex: 0,
          numberOfAddresses: 1,
          chainId: 69
        })
      }
    },
    // requires a mainnet mnemonic; you can save this in .env or in whatever secure location
    // you wish to use
    optimistic_mainnet: {
      network_id: 10,
      chain_id: 10,
      provider: function() {
        return new HDWalletProvider(mainnetMnemonic, "https://optimism-mainnet.infura.io/v3/" + infuraKey, 0, 1);
      }
    }

  },

  mocha: {
    timeout: 100000
  },
  compilers: {
    solc: {
      version: "node_modules/@eth-optimism/solc",
      settings:  {
        optimizer: {
          enabled: true,
          runs: 800
        }
      }
    },
  },
  db: {
    enabled: true
  }
}
