const { ethers } = require("hardhat")
const { assert, expect } = require("chai")

// describes the part we are testing and test instances of the same
// executed with command yarn hardhat test
// attaching only keyword as property executes that very test case.

describe("SimpleStorage", function () {
    let simpleStorageFactory, simpleStorage

    // executes everytime a test is ran before any of the it operations are performed - in this case we are deploying the contract newly everytime the test is run.
    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await simpleStorageFactory.deploy()
    })

    // it statements are to describe the kind of testing and it holds the test handler function
    it("Should start with a favouriteNumber valued 0", async function () {
        currentFavouriteNumber = await simpleStorage.retrieve()
        const expectedValue = "0"
        // assert imported from chai library brings powerpacked mechanism to test out smart contract code
        assert.equal(expectedValue, currentFavouriteNumber.toString())
        // similarly, expect imported from chai offers testing (some syntactical differences from assert)
        expect(currentFavouriteNumber.toString()).to.equal(expectedValue)
    })

    it("Should update when we update favourite number", async function () {
        const expectedValue = "7"
        const transactionResponse = await simpleStorage.store(expectedValue)
        await transactionResponse.wait(1) // wait for block confirmation

        const updatedFavouriteNumber = await simpleStorage.retrieve()
        assert.equal(updatedFavouriteNumber.toString(), expectedValue)
    })

    it("Should create a person in people array and name to favourite number mapping", async function () {
        const expectedName = "Jam"
        const expectedValue = "4"
        const transactionResponse = await simpleStorage.addPerson(
            expectedName,
            expectedValue
        ) // push into people array and mapping of nameToFavouriteNumber
        await transactionResponse.wait(1) // await block confirmation

        const peopleArrayValue = await simpleStorage.people("0")
        const mappingValue = await simpleStorage.nameToFavouriteNumber("Jam")

        // mapping test
        assert.equal(mappingValue.toString(), expectedValue)

        // array test
        assert.equal(peopleArrayValue[0], expectedValue)
        assert.equal(peopleArrayValue[1], expectedName)
    })
})
