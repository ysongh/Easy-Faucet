require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    // npx hardhat run scripts/deploy.js --network mode
    "mode": {
      url: "https://sepolia.mode.network/",
      accounts: [process.env.PRIVATEKEY],
      chainId: 919,
      gasPrice: 8000000000
    }
  },
  // set the path to compile the contracts
  paths: {
    artifacts: '../frontend/src/artifacts',
    cache: '../frontend/src/cache',
  }
};
