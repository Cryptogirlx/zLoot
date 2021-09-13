const { expect } = require("chai");
const { ethers } = require('hardhat');
const hre = require("hardhat");
import { BigNumber, Contract, Signer } from "ethers";
import { constants } from './utils/Constants';

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

        it('gives a companion after every claim', async () => {
            let actualResult 
            await ZLootInstance.connect(owner).claim(
                constants.NFT.tokenId1,
                ethers.utils.parseUnits("1", "ether"),
                 {
                     value: ethers.utils.parseUnits("1", "ether")
                 }
               );
               actualResult=  await ZLootInstance.getCompanion(constants.NFT.tokenId1)
               console.log("companion",actualResult)
               // expectedResult = await companionByTokenId 

           // await expect(ZLootInstance.getCompanion(constants.NFT.tokenId1).to.equal(expectedResult));
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
               // expectedResult = await powerByTokenId 

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
               // expectedResult = await weaponByTokenId 

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

           // expectedResult = await handByTokenId 

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

           // await expect(ZLootInstance.getRing(constants.NFT.tokenId1).to.equal(expectedResult));
        });

    })
})

