// imports
const { ethers, run, network } = require("hardhat")

// async function

async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Deploying contract...")
    // hardhat comes packed with a fake network know as hardhat network (it is similar to Ganache but doesn't require user interaction).
    // hardhat network brings dummy RPC url and Private key to facilitate wallet and contract interaction
    const simpleStorage = await SimpleStorageFactory.deploy()
    await simpleStorage.deployed()
    console.log(`Deployed contract to address: ${simpleStorage.address}`)

    // we want to avoid verification process when the deployment is done on hardhat network, chainId of hardhat network - 31337 (found using network.config which is maintained everytime a network interacts with a contract)
    if (network.config.chainId !== 31337 && process.env.ETHERSCAN_API_KEY) {
        // wait for confirmation of blocks
        await simpleStorage.deployTransaction.wait(2)
        // verify function call
        await verify(simpleStorage.address, [])
    }

    const currentFavouriteNumber = await simpleStorage.retrieve()
    console.log(`Current value: ${currentFavouriteNumber}`)

    //update the value of favouriteNumber
    const transactionResponse = await simpleStorage.store(7)
    await transactionResponse.wait(1)
    const updatedValue = await simpleStorage.retrieve()
    console.log(`Updated value: ${updatedValue}`)
}

//Programmatic verification of smart contracts (etherscan verification)
async function verify(contractAddress, args) {
    console.log("Verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (error) {
        if (error.message.toLowerCase().includes("already verified")) {
            console.log("Already verified")
        } else {
            console.log("Verification failed due to error, ", error)
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
