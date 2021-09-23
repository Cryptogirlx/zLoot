const { expect } = require("chai");
const { ethers } = require('hardhat');
const hre = require("hardhat");
import { BigNumber, Contract, Signer } from "ethers";
import { constants } from './utils/Constants';

describe("Deployment", () => {
    let ZLootContract: Contract;
    let ZLootInstance: Contract;
    let ZGoldContract: Contract;
    let ZGoldInstance: Contract;
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
        ZGoldContract = await ethers.getContractFactory("ZGold");
        ZGoldInstance = await ZGoldContract.connect(owner).deploy(ZLootInstance.address);
    
    })

    describe("Token basics", () => {

        it('sets the name correctly', async () => {
            expect(await ZGoldInstance.name()).to.equal("ZGold");
        });
        it('sets symbol correctly', async () => {
            expect(await ZGoldInstance.symbol()).to.equal("ZGLD");
        });

        it('sets total supply correctly', async () => {
            expect(await ZGoldInstance.totalSupply()).to.equal(BigNumber.from("600000"));
        });


      
          it('decreases the balance of the sender after transfer', async () => {
              
            await ZLootInstance.connect(alice).claim(
                constants.NFT.tokenId1,
                ethers.utils.parseUnits("1", "ether"),
                 {
                     value: ethers.utils.parseUnits("1", "ether")
                 }
               );
              await ZGoldInstance.connect(alice).claimGold(constants.NFT.tokenId1,aliceAddress);
              await ZGoldInstance.connect(alice).transfer(bobAddress,20);
              await ZGoldInstance.decreaseAllowance(aliceAddress,0); // WHY 0 ?!
              expect (await ZGoldInstance.balanceOf(aliceAddress)).to.equal(BigNumber.from("980"));
            });
         
          it.only('increases the balance of the reciever after transfer', async () => {
            await ZLootInstance.connect(alice).claim(
                constants.NFT.tokenId1,
                ethers.utils.parseUnits("1", "ether"),
                 {
                     value: ethers.utils.parseUnits("1", "ether")
                 }
               );
              await ZGoldInstance.connect(alice).claimGold(constants.NFT.tokenId1,aliceAddress);
              await ZGoldInstance.connect(alice).transfer(bobAddress,20);
              await ZGoldInstance.increaseAllowance(bobAddress,20);
        
              expect (await ZGoldInstance.balanceOf(bobAddress)).to.equal(BigNumber.from("20"));
            });
          
      
          it('spender is allowed to transfer on behalf of the token owner ', async () => {
              

            await ZGoldInstance.approve(aliceAddress,100);
            expect(await ZGoldInstance.allowance(ownerAddress,aliceAddress)).to.equal(100);
   })

   it('emits Trasfer properly', async () => {
    await ZLootInstance.connect(alice).claim(
        constants.NFT.tokenId1,
        ethers.utils.parseUnits("1", "ether"),
         {
             value: ethers.utils.parseUnits("1", "ether")
         }
       );
      await ZGoldInstance.connect(alice).claimGold(constants.NFT.tokenId1,aliceAddress);
      await ZGoldInstance.connect(alice).transfer(bobAddress,20);
    await expect(
        ZGoldInstance.connect(alice).transfer(bobAddress,20)).to.emit(ZGoldContract, "Transfer").withArgs(aliceAddress,bobAddress,20);
    });
it('emits Approval properly', async () => {
    expect ( await ZGoldInstance.connect(owner).approve(aliceAddress,100))
    .to.emit(ZGoldContract, "Approval")
    .withArgs(ownerAddress, aliceAddress,100)
});
    })
})