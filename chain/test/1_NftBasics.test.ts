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


    describe("View functions", async () => {
        it("returns name properly", async () => {
      
         expect(await ZLootInstance.name()).to.equal('zLoot');
        });
    
        it("returns symbol properly", async () => {
          expect(await ZLootInstance.symbol()).to.be.equal('ZLT');
        });

    
        it("ownerOf returns the owner's address", async () => {
          await ZLootInstance.claim(
           constants.NFT.tokenId1
          );
          expect(await ZLootInstance.ownerOf(constants.NFT.tokenId1)).to.equal(ownerAddress);
        });
    
        it("reverts if the owner of unclaied ZLootInstances is queried", async () => {
          await expect (ZLootInstance.ownerOf(3))
            .to.be.revertedWith("ERC721: owner query for nonexistent token");
        });
    
        it("balanceOf returns balance of address on contract",async () => {
        
          await ZLootInstance.claim(
            constants.NFT.tokenId1
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

         

    describe("Transactions", async () => {

      it("transfer should revert transfer if item is not owned by account", async () => {
        await ZLootInstance.claim(
         constants.NFT.tokenId1
        );
        await expect(
          ZGldInstance.connect(alice).transfer(ownerAddress,aliceAddress, 1)
        ).to.be.revertedWith("transfer caller is not owner nor approved");
      });
})
        it("transfer should revert transfer if item is not owned by account", async () => {
        
        await ZLootInstance.claim(
         constants.NFT.tokenId1
        );
          await expect(
            ZGldInstance.connect(alice).transfer(ownerAddress,aliceAddress, 1)
          ).to.be.revertedWith("transfer caller is not owner nor approved");
        });
    
        it("transfer reverts when givenconstants.NFT.tokenId1does not exist", async () => {
          await expect(
            ZGldInstance.connect(alice).transfer(aliceAddress, ownerAddress, 2)
          ).to.be.revertedWith("operator query for nonexistent token");
        });
    
        it.only("transfer should transfer nft between different accounts", async () => {
          const recipient = (await ethers.getSigners())[2];
          const recipientAddress = await recipient.getAddress();

          const params = [{
            from: ownerAddress,
            to: ZLootInstance.address,
            value: ethers.utils.parseEther("1")
    }];
    
    const transactionHash =   await ethers.provider.send('eth_sendTransaction', params);
    console.log("tx hash",transactionHash)

          await ZLootInstance.claim(
           constants.NFT.tokenId1
          );
          await ZGldInstance.connect(owner).transfer(ownerAddress,aliceAddress, constants.NFT.tokenId1);
    
          expect(await ZGldInstance.balanceOf(ownerAddress)).to.equal(0);
          expect(await ZGldInstance.balanceOf(aliceAddress)).to.equal(1);
        });
    
        it("transfer clears the approval for the token ID", async () => {
          const recipient = (await ethers.getSigners())[2];
          const recipientAddress = await recipient.getAddress();
          await ZLootInstance.claim(
           constants.NFT.tokenId1
          );
          await ZGldInstance.approve(aliceAddress,constants.NFT.tokenId1);
          expect(await ZGldInstance.getApproved(constants.NFT.tokenId1)).to.be.equal(aliceAddress);
    
          await ZGldInstance.connect(owner).transfer(ownerAddress, recipientAddress, constants.NFT.tokenId1);
          expect(await ZGldInstance.balanceOf(recipientAddress)).to.equal(BigNumber.from("1"));
          expect(await ZGldInstance.ownerOf(constants.NFT.tokenId1)).to.equal(recipientAddress);
          expect(await ZGldInstance.balanceOf(ownerAddress)).to.equal(ethers.constants.Zero);
    
          expect(await ZGldInstance.getApproved(constants.NFT.tokenId1)).to.equal(ethers.constants.AddressZero);
        });
    
        it("transfer adjusts owner balances", async () => {
          await ZLootInstance.claim(
           constants.NFT.tokenId1
          );
    
          expect(await ZGldInstance.balanceOf(ownerAddress)).to.equal(BigNumber.from("1"));
        });
    
        it("transferFrom",async () => {
        await ZLootInstance.claim(
         constants.NFT.tokenId1
        );
          await ZGldInstance.connect(owner).transferFrom(ownerAddress,aliceAddress, constants.NFT.tokenId1);
          expect(await ZGldInstance.ownerOf(constants.NFT.tokenId1)).to.equal(aliceAddress);
        });
    })


})