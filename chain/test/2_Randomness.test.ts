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

        // it.only('testing random function', async () => {
        //     let expected, actual
        //    actual = await ZLootInstance.random("COMPANION1")
        //    console.log(actual)
        //    expected = testRandom("COMPANION1")

        //    console.log("exp",expected)

        //    await expect (expected).to.equal(actual);

        //  // Passing but chaned function back to internal
        // })

        
        it.only('gives a companion after every claim', async () => {
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
               console.log(expectedResult);

           await expect(ZLootInstance.getCompanion(constants.NFT.tokenId1)).to.equal(expectedResult);
        });
        it('gives a special power after every claim', async () => {
            let actualResult 
            await ZLootInstance.connect(owner).claim(
                constants.NFT.tokenId1,
                ethers.utils.parseUnits("1", "ether"),
                 {
                     value: ethers.utils.parseUnits("1", "ether")
                 }
               );
               actualResult=  await ZLootInstance.getPower(constants.NFT.tokenId1)
               console.log("power",actualResult)
              // expectedResult = await testPluck(constants.NFT.tokenId1,keyPrefixes.power,arrays.Traits.power);
               // console.log(expectedResult);


           // await expect(ZLootInstance.getPower(constants.NFT.tokenId1).to.equal(expectedResult));
        });

        it('gives a weapon after every claim', async () => {
            let actualResult 
            await ZLootInstance.connect(owner).claim(
                constants.NFT.tokenId1,
                ethers.utils.parseUnits("1", "ether"),
                 {
                     value: ethers.utils.parseUnits("1", "ether")
                 }
               );
               actualResult=  await ZLootInstance.getWeapon(constants.NFT.tokenId1)
               console.log("weapon",actualResult)
              // expectedResult = await testPluck(constants.NFT.tokenId1,keyPrefixes.weapon,arrays.Traits.weapon);
               // console.log(expectedResult);


           // await expect(ZLootInstance.getWeapon(constants.NFT.tokenId1).to.equal(expectedResult));
        })
        it('gives a hand armor after every claim', async () => {
            let actualResult 
            await ZLootInstance.connect(owner).claim(
                constants.NFT.tokenId1,
                ethers.utils.parseUnits("1", "ether"),
                 {
                     value: ethers.utils.parseUnits("1", "ether")
                 }
               );
                  actualResult=  await ZLootInstance.getHand(constants.NFT.tokenId1)
           console.log("hand",actualResult)

           // expectedResult = await testPluck(constants.NFT.tokenId1,keyPrefixes.hand,arrays.Traits.hand);
               // console.log(expectedResult);


           // await expect(ZLootInstance.getHand(constants.NFT.tokenId1).to.equal(expectedResult));
        });

        it('gives a ring after every claim', async () => {

            let actualResult 
            await ZLootInstance.connect(owner).claim(
                constants.NFT.tokenId1,
                ethers.utils.parseUnits("1", "ether"),
                 {
                     value: ethers.utils.parseUnits("1", "ether")
                 }
               );
           actualResult=  await ZLootInstance.getRing(constants.NFT.tokenId1)
           console.log("ring",actualResult)
           // expectedResult = await ringByTokenId 
             // expectedResult = await testPluck(constants.NFT.tokenId1,keyPrefixes.ring,arrays.Traits.ring);
               // console.log(expectedResult);

           // await expect(ZLootInstance.getRing(constants.NFT.tokenId1).to.equal(expectedResult));
        });

    })
})

