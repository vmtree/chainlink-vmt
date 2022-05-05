require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require('dotenv').config();
require('./scripts/hardhat.tasks.js');

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            // loggingEnabled: true,
        },
        rinkeby: {
            accounts: [process.env.RINKEBY_PKEY],
            url: process.env.RINKEBY_URL,
        }
    },
    paths: {
        sources: "./contracts",
        cache: "./build/cache",
        artifacts: "./build/artifacts",
        tests: "./test",
    },
    solidity: {
        compilers: [
            {
                version: "0.8.10",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 100000,
                    }
                }
            },
        ],
        overrides: {
            "contracts/MerkleTreeWithHistory.yul": {
                version: "0.8.10",
                settings: {}
            }
        },
    }
};
