const { expect } = require("chai");
const { ethers } = require('hardhat');
const hre = require("hardhat");
import { BigNumber, Contract, Signer } from "ethers";
import { constants,testPluck,testRandom } from './utils/Constants';
import {arrays,keyPrefixes} from "./utils/Arrays";
describe("Deployment", () => {


    let ZLootContract: Contract;
    let ZLootInstance: Contract;
    let ZGldContract: Contract;
    let ZGldInstance: Contract;
    let owner: Signer;
    let alice: Signer;
    let bob: Signer;
    
    let ownerAddress: string;
    let aliceAddress: string;
    let bobAddress: string;

    beforeEach(async () => {
        [owner, alice, bob] = await ethers.getSigners();
        ownerAddress = await owner.getAddress();
        aliceAddress = await alice.getAddress();
        bobAddress = await bob.getAddress();
        ZLootContract = await ethers.getContractFactory("ZLoot");
        ZLootInstance = await ZLootContract.connect(owner).deploy();

       
    })


    describe("Randomness", () => {

        it('testing random function', async () => {
            let expected, actual
           actual = await ZLootInstance.random("COMPANION1")
           console.log(actual)
           expected = testRandom("COMPANION1")

           console.log("exp",expected)

           await expect (expected).to.equal(actual);

        })


        it('always gives the same companion for given tokenID', async () => {
            let actualResult,expectedResult
            await ZLootInstance.connect(owner).claim(
                constants.NFT.tokenId1,
                ethers.utils.parseUnits("1", "ether"),
                 {
                     value: ethers.utils.parseUnits("1", "ether")
                 }
               );
               actualResult=  await ZLootInstance.getCompanion(constants.NFT.tokenId1)
               console.log("companion",actualResult)
               expectedResult = await testPluck(constants.NFT.tokenId1, keyPrefixes.companion, arrays.Traits.companion);
               console.log("expected",expectedResult);

           await expect(actualResult).to.equal(expectedResult);
        });
        it('always gives the same weapon for given tokenID', async () => {
            let actualResult,expectedResult
            await ZLootInstance.connect(owner).claim(
                constants.NFT.tokenId1,
                ethers.utils.parseUnits("1", "ether"),
                 {
                     value: ethers.utils.parseUnits("1", "ether")
                 }
               );
               actualResult=  await ZLootInstance.getWeapon(constants.NFT.tokenId1)
               console.log("weapon",actualResult)
               expectedResult = await testPluck(constants.NFT.tokenId1, keyPrefixes.weapon, arrays.Traits.weapon);
               console.log("expected",expectedResult);

           await expect(actualResult).to.equal(expectedResult);
    
        });

        it('always gives the same special power for given tokenID', async () => {
            let actualResult,expectedResult
            await ZLootInstance.connect(owner).claim(
                constants.NFT.tokenId1,
                ethers.utils.parseUnits("1", "ether"),
                 {
                     value: ethers.utils.parseUnits("1", "ether")
                 }
               );
               actualResult=  await ZLootInstance.getPower(constants.NFT.tokenId1)
               console.log("power",actualResult)
               expectedResult = await testPluck(constants.NFT.tokenId1, keyPrefixes.power, arrays.Traits.power);
               console.log("expected",expectedResult);

           await expect(actualResult).to.equal(expectedResult);
        })
        it('always gives the same hand armor for given tokenID', async () => {
            let actualResult,expectedResult
            await ZLootInstance.connect(owner).claim(
                constants.NFT.tokenId1,
                ethers.utils.parseUnits("1", "ether"),
                 {
                     value: ethers.utils.parseUnits("1", "ether")
                 }
               );
                  actualResult=  await ZLootInstance.getHand(constants.NFT.tokenId1)
           console.log("hand",actualResult)

           expectedResult = await testPluck(constants.NFT.tokenId1, keyPrefixes.hand, arrays.Traits.hand);
           console.log("expected",expectedResult);

       await expect(actualResult).to.equal(expectedResult);
         
        });

        it('always gives the same ring for given tokenID', async () => {

            let actualResult,expectedResult
            await ZLootInstance.connect(owner).claim(
                constants.NFT.tokenId1,
                ethers.utils.parseUnits("1", "ether"),
                 {
                     value: ethers.utils.parseUnits("1", "ether")
                 }
               );
           actualResult=  await ZLootInstance.getRing(constants.NFT.tokenId1)
           console.log("ring",actualResult)
           expectedResult = await testPluck(constants.NFT.tokenId1, keyPrefixes.ring, arrays.Traits.rings);
           console.log("expected",expectedResult);

       await expect(actualResult).to.equal(expectedResult);
        });

    })
})

