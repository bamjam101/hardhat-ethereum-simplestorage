const { task } = require("hardhat/config")

// task definition to fetch the current block number - for Hardhat network it is always 0 after a reset and for actual networks it varies.
task("block-number", "Prints the current block number").setAction(
    // hre -Hardhat Runtime Environment is an object containing all the functionality that Hardhat exposes when running a task, test or script.
    async function (taskArgs, hre) {
        const blockNumber = await hre.ethers.provider.getBlockNumber() // function present on the provider to fetch the block number from the blockchain network
        console.log(`Current block number: ${blockNumber}`)
    }
)
