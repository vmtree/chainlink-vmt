const { ethers } = require('hardhat');

async function main() {
    const factory = await ethers.getContractFactory('ChainlinkCronJob');
    const cronJob = await factory.deploy();
    console.log(cronJob.address);
};

main().then(() => process.exit());