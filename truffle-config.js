require("babel-register");
require("babel-polyfill");

const HDWalletProvider = require('@truffle/hdwallet-provider');
const provider = new HDWalletProvider({
  privateKeys: ['a3e4009ad572307623b53666084735ce8cd8a90774463792076a311340b152e1'],
  providerOrUrl: 'wss://data-seed-prebsc-2-s2.binance.org:8545/'
});

module.exports = {
  networks: {
    development: {
      provider: () => provider,
      network_id: "97",
      networkCheckTimeout: 1000000,
      timeoutBlocks: 200,
    },
  },
  contracts_directory: "./src/contracts/",
  contracts_build_directory: "./src/abis/",
  compilers: {
    solc: {
      version: "pragma",
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    bscscan: 'P35NPJXH2E614WCQJE15IH9BTYJZXSJ2EI'
  },
};
