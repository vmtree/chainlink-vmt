const glob = require('glob');
const path = require('path');
const util = require('util');
const fs = require('fs');
const solc = require('solc');

task(
  "accounts",
  "Prints the list of accounts and balances"
).setAction(
  async (_, hre) => {
    const accounts = await hre.ethers.getSigners();
    for (const account of accounts) {
      const balance = await hre.ethers.provider.getBalance(account.address);
      console.log(`${account.address}: ${balance/1e18} ETH`);
    }
  }
);

task(
  "chainid",
  "Prints the chainid of hardhat node"
).setAction(
  async (_, hre) => {
    const chainId = (await hre.ethers.provider.getNetwork()).chainId;
    console.log(`chainId: ${chainId}`);
  }
);

task(
  "keccak",
  "Performs the solidityKeccak hash of --text"
).addParam(
  "text",
  "The text to take the solidityKeccak hash of"
).setAction(
  async (taskArgs, hre) => {
    console.log(
      hre.ethers.utils.solidityKeccak256(["string"], [taskArgs.text])
    );
  }
);

task(
  "selector",
  "Computes the function selector of --signature"
).addParam(
  "signature",
  "e.g. transferFrom(address,address,uint256)"
).setAction(
  async (taskArgs, hre) => {
    let fullHash = hre.ethers.utils.solidityKeccak256(
      ["string"], [taskArgs.signature]
    );
    console.log(fullHash.slice(0, 10));
  }
);

task(
  "solidityKeccak",
  "Performs the solidityKeccak hash of --values with given --types"
).addParam(
  "types",
  "JSON string e.g. '[\"uint256\", \"string\"]'"
).addParam(
  "values",
  "JSON string e.g. '[42, \"Jason Parser\"]'"
).setAction(
  async (taskArgs, hre) => {
    console.log(
      hre.ethers.utils.solidityKeccak256(
        JSON.parse(taskArgs.types), JSON.parse(taskArgs.values)
      )
    );
  }
);

// this task compiles yul files after all solidity files are compiled. the
// bytecode is stored in a json file with the contract's name as the file name,
// in the /build dir
task(
    "compile",
    async (_, { config }, runSuper) => {
        await runSuper();

        const yulPattern = path.join(config.paths.sources, "**/*.yul");
        const files = await util.promisify(glob)(yulPattern);

        for (const file of files.map(path.normalize)) {
            try {
                const fileName = file.match(/\w+\.yul/)[0];
                const contractName = fileName.match(/\w+/)[0];
                const content = fs.readFileSync(file).toString();
                const override = config.solidity
                    .overrides[`contracts/${fileName}`];
                const input = {
                    language: "Yul",
                    settings: override.settings,
                    sources: {},
                };
                input.sources[`${fileName}`] = { content };

                // TODO: handle solc output being an error
                const output = JSON.parse(solc.compile(JSON.stringify(input)));
                const bytecode = output
                    .contracts[`${fileName}`][`${contractName}`].evm
                    .bytecode.object;
                const savePath = path.join(
                    config.paths.sources, '../build', `${contractName}.json`
                );
                fs.writeFileSync(savePath, JSON.stringify({bytecode}, null, 4));
            } catch (err) {
                console.error(err);
                process.exit(1);
            }
        }
    }
);
