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

    describe("claimng", () => {

        it('reverts if address is trying to claim more than one token ', async () => {
            await ZLootInstance.connect(owner).claim(
                constants.NFT.tokenId1,
                 {
                     value: ethers.utils.parseUnits("1", "ether")
                 }
               );
               await expect( ZLootInstance.connect(owner).claim(
                constants.NFT.tokenId2,
                 {
                     value: ethers.utils.parseUnits("1", "ether")
                 }
               )).to.be.revertedWith("Each address may only claim one token")
         
        });
        it('reverts if price sent is under limit', async () => {
       
               await expect( ZLootInstance.connect(owner).claim(
                constants.NFT.tokenId2,
                 {
                     value: ethers.utils.parseUnits("0.1", "ether")
                 }
               )).to.be.revertedWith("Not enough ETH sent; check price!")
        });

        it('total supply of tokens cannot be more than 600', async () => {
            await expect( ZLootInstance.connect(owner).claim(
                601,
                 {
                     value: ethers.utils.parseUnits("1", "ether")
                 }
               )).to.be.revertedWith("No more tokens available,all tokens are minted")
         
        
        });

        it('each address can only claim a different token', async () => {
            await ZLootInstance.connect(owner).claim(
                constants.NFT.tokenId1,
                 {
                     value: ethers.utils.parseUnits("1", "ether")
                 }
               );
               await ZLootInstance.connect(alice).claim(
                constants.NFT.tokenId2,
                 {
                     value: ethers.utils.parseUnits("1", "ether")
                 }
               );

            expect(   await ZLootInstance.ownerOf(constants.NFT.tokenId1)).to.equal(ownerAddress);
              expect( await ZLootInstance.ownerOf(constants.NFT.tokenId2)).to.equal(aliceAddress);

        });

    })
})
