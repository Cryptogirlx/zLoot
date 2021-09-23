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

    describe("Claiming tokens", () => {

     
        it('address has to own NFT to claim gold', async () => {
            await ZLootInstance.connect(alice).claim(
                constants.NFT.tokenId1,
                ethers.utils.parseUnits("1", "ether"),
                 {
                     value: ethers.utils.parseUnits("1", "ether")
                 }
               );

            await expect (ZGoldInstance.connect(bob).claimGold(constants.NFT.tokenId1,bobAddress)).to.be.revertedWith("Must own ZLoot token to claim gold")
            
        })

        it('has to be a valid tokenId', async () => {
            await ZLootInstance.connect(alice).claim(
                constants.NFT.tokenId1,
                ethers.utils.parseUnits("1", "ether"),
                 {
                     value: ethers.utils.parseUnits("1", "ether")
                 }
               );
               await expect (ZGoldInstance.connect(alice).claimGold(constants.NFT.tokenId2,aliceAddress)).to.be.revertedWith("owner query for nonexistent token")
               // it reverts "ERC721: owner query for nonexistent token" with this buy why
        })

        it('address cannot claim gold twice', async () => {
                  // first mint NFT
                  await ZLootInstance.connect(alice).claim(
                    constants.NFT.tokenId1,
                    ethers.utils.parseUnits("1", "ether"),
                     {
                         value: ethers.utils.parseUnits("1", "ether")
                     }
                   );
                // then claim tokens
                await ZGoldInstance.connect(alice).claimGold(constants.NFT.tokenId1,aliceAddress);
                await expect(ZGoldInstance.connect(alice).claimGold(constants.NFT.tokenId1,aliceAddress)).to.be.revertedWith("Can only claim gold once")
        })
        it('sets zGoldClaimed to true after claiming gold', async () => {
                       // first mint NFT
                       await ZLootInstance.connect(alice).claim(
                        constants.NFT.tokenId1,
                        ethers.utils.parseUnits("1", "ether"),
                         {
                             value: ethers.utils.parseUnits("1", "ether")
                         }
                       );
                    // then claim tokens
                    await ZGoldInstance.connect(alice).claimGold(constants.NFT.tokenId1,aliceAddress);
                    expect(await ZGoldInstance.isZGLDClaimed(aliceAddress)).to.equal(true);

   
        });
        it('returns balance of an account correctly after claiming', async () => {
            
            await ZLootInstance.connect(alice).claim(
                constants.NFT.tokenId1,
                ethers.utils.parseUnits("1", "ether"),
                 {
                     value: ethers.utils.parseUnits("1", "ether")
                 }
               );
               await ZGoldInstance.connect(alice).claimGold(constants.NFT.tokenId1,aliceAddress);
            expect (await ZGoldInstance.getZGLDBalance(aliceAddress)).to.equal(constants.ERC.ZGoldPerToken);
  
          });
    
    })
});

