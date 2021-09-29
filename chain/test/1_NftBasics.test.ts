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


    describe("Token Basics", async () => {
        it("returns name properly", async () => {
      
         expect(await ZLootInstance.name()).to.equal('zLoot');
        });
    
        it("returns symbol properly", async () => {
          expect(await ZLootInstance.symbol()).to.be.equal('ZLT');
        });

    
        it("ownerOf returns the owner's address", async () => {
          await ZLootInstance.connect(owner).claim(
            constants.NFT.tokenId1,

             {
                 value: ethers.utils.parseUnits("1", "ether")
             }
           );
          expect(await ZLootInstance.ownerOf(constants.NFT.tokenId1)).to.equal(ownerAddress);
        });
    
        it("reverts if the owner of unclaied ZLootInstances is queried", async () => {
          await expect (ZLootInstance.ownerOf(3))
            .to.be.revertedWith("ERC721: owner query for nonexistent token");
        });
    
        it("balanceOf returns balance of address on contract",async () => {
        
          await ZLootInstance.connect(owner).claim(
            constants.NFT.tokenId1,

             {
                 value: ethers.utils.parseUnits("1", "ether")
             }
           );
          expect(await ZLootInstance.balanceOf(ownerAddress)).to.equal(BigNumber.from("1"))
        });
        
        it("balanceOf returns 0 when no tokens are owned by the address", async () => {
          expect(await ZLootInstance.balanceOf(aliceAddress)).to.equal(0);
        });

        it("isApprovedForAll returns of address is approved on all",async () => {
            const isApproved = true;
            await ZLootInstance.setApprovalForAll(aliceAddress,isApproved);
            expect(await ZLootInstance.isApprovedForAll(ownerAddress,aliceAddress)).to.equal(isApproved);
          });

         


      it("transfer should revert transfer if item is not owned by account", async () => {
        await ZLootInstance.connect(owner).claim(
          constants.NFT.tokenId1,
           {
               value: ethers.utils.parseUnits("1", "ether")
           }
         );
        await expect(
          ZLootInstance.connect(alice).transfer(ownerAddress,aliceAddress, 1)
        ).to.be.revertedWith("transfer caller is not owner nor approved");
      });

        it("transfer should revert transfer if item is not owned by account", async () => {
        
          await ZLootInstance.connect(owner).claim(
            constants.NFT.tokenId1,

             {
                 value: ethers.utils.parseUnits("1", "ether")
             }
           );
          await expect(
            ZLootInstance.connect(alice).transfer(ownerAddress,aliceAddress, 1)
          ).to.be.revertedWith("transfer caller is not owner nor approved");
        });
    
        it("transfer reverts when givenconstants.NFT.tokenId1does not exist", async () => {
          await ZLootInstance.connect(owner).claim(
            constants.NFT.tokenId1,

             {
                 value: ethers.utils.parseUnits("1", "ether")
             }
           );
          await expect(
            ZLootInstance.connect(alice).transfer(aliceAddress, ownerAddress, 2)
          ).to.be.revertedWith("operator query for nonexistent token");
        });
    
        it("transfer should transfer nft between different accounts", async () => {

          await ZLootInstance.connect(owner).claim(
           constants.NFT.tokenId1,

            {
                value: ethers.utils.parseUnits("1", "ether")
            }
          );
          await ZLootInstance.connect(owner).transfer(ownerAddress,aliceAddress, constants.NFT.tokenId1);
    
          expect(await ZLootInstance.balanceOf(ownerAddress)).to.equal(0);
          expect(await ZLootInstance.balanceOf(aliceAddress)).to.equal(1);
        });
    
        it("transfer clears the approval for the token ID", async () => {
          const recipient = (await ethers.getSigners())[2];
          const recipientAddress = await recipient.getAddress();
          await ZLootInstance.connect(owner).claim(
            constants.NFT.tokenId1,

             {
                 value: ethers.utils.parseUnits("1", "ether")
             }
           );
          await ZLootInstance.approve(aliceAddress,constants.NFT.tokenId1);
          expect(await ZLootInstance.getApproved(constants.NFT.tokenId1)).to.be.equal(aliceAddress);
    
          await ZLootInstance.connect(owner).transfer(ownerAddress, recipientAddress, constants.NFT.tokenId1);
          expect(await ZLootInstance.balanceOf(recipientAddress)).to.equal(BigNumber.from("1"));
          expect(await ZLootInstance.ownerOf(constants.NFT.tokenId1)).to.equal(recipientAddress);
          expect(await ZLootInstance.balanceOf(ownerAddress)).to.equal(ethers.constants.Zero);
    
          expect(await ZLootInstance.getApproved(constants.NFT.tokenId1)).to.equal(ethers.constants.AddressZero);
        });
    
        it("transfer adjusts owner balances", async () => {
          await ZLootInstance.connect(owner).claim(
            constants.NFT.tokenId1,

             {
                 value: ethers.utils.parseUnits("1", "ether")
             }
           );
    
          expect(await ZLootInstance.balanceOf(ownerAddress)).to.equal(BigNumber.from("1"));
        });
    
        it("transferFrom",async () => {
          await ZLootInstance.connect(owner).claim(
            constants.NFT.tokenId1,

             {
                 value: ethers.utils.parseUnits("1", "ether")
             }
           );
          await ZLootInstance.connect(owner).transferFrom(ownerAddress,aliceAddress, constants.NFT.tokenId1);
          expect(await ZLootInstance.ownerOf(constants.NFT.tokenId1)).to.equal(aliceAddress);
        });
    

  })
})