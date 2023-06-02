require("@nomicfoundation/hardhat-toolbox")
require("@nomiclabs/hardhat-etherscan")

require("dotenv").config() // configures .env file and makes it accessible using process.env statement
require("./tasks/block-number") // imports defined task
require("solidity-coverage") // generates report in Istanbul format to show the coverage of test cases
require("hardhat-gas-reporter") // gas reporter package that forms a tabular data structure to showcase gas consumption

/** @type import('hardhat/config').HardhatUserConfig */

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
module.exports = {
    solidity: "0.8.18",
    defaultNetwork: "hardhat", // sets default network as hardhat (explicity specified by us)

    // any other network and there configuration
    networks: {
        sepolia: {
            url: SEPOLIA_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 11155111,
        },
    },
    // Etherscan configuration for verifying smart contracts
    etherscan: {
        apiKey: {
            sepolia: ETHERSCAN_API_KEY,
        },
    },
    // enabling gap reporter feature
    gasReporter: {
        enabled: true,
        outputFile: "gas-report.txt",
        noColors: true,
    },
}
