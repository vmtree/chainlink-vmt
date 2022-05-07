const { ethers } = require('hardhat');

async function main() {
    const factory = await ethers.getContractFactory('ChainlinkCronJob');
    const cronJob = await factory.attach("0xE89c65b3F066BE848f85651f5b561Fb72a2d01D0");
    await cronJob.toggle();
};

main().then(() => process.exit());