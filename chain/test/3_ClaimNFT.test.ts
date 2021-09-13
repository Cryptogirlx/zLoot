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

        it('reverts if user is trying to claims more tokens than limit', async () => {
           
        });
        it.only('reverts if price sent is under limit', async () => {
            await ZLootInstance.claim(
                constants.NFT.tokenId1
               );
               await expect(
                 ZLootInstance.connect(alice).transfer(ownerAddress,aliceAddress, 1)
               ).to.be.revertedWith("Not enough ETH sent; check price!");
             });
        });

        it('one account can own only one token', async () => {
            
        })
        it('total supply of tokens cannot be more than X', async () => {
        
        });

        it('', async () => {
        
        });

    })
