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
        ZGoldInstance = await ZGoldContract.connect(owner).deploy();
    
    })

    describe("Token basics", () => {

        it('sets the name correctly', async () => {
            expect(await ZGoldContract.name()).to.equal("ZGold");
        });
        it('sets symbol correctly', async () => {
            expect(await ZGoldContract.symbol()).to.equal("ZGLD");
        });

        it('sets total supply correctly', async () => {
            expect(await ZGoldContract.totalSupply()).to.equal(BigNumber.from("600000"));
        });


        it('returns balanceOf an account correctly', async () => {
            
           
            expect (await ZGoldContract.balanceOf(ownerAddress)).to.equal(BigNumber.from("600000"));
  
          });
      
          it('decreases the balance of the sender after transfer', async () => {
              
              
              await ZGoldContract.connect(alice).claimGold(constants.NFT.tokenId1,aliceAddress);
              await ZGoldContract.connect(owner).transfer(aliceAddress,20);
              await ZGoldContract.decreaseAllowance(ownerAddress,0); // WHY 0 ?!
              expect (await ZGoldContract.balanceOf(ownerAddress)).to.equal(BigNumber.from("999999999999999980"));
            });
         
          it('increases the balance of the reciever after transfer', async () => {
              
              await ZGoldContract.connect(owner).transfer(aliceAddress,20);
              await ZGoldContract.increaseAllowance(aliceAddress,20);
        
              expect (await ZGoldContract.balanceOf(aliceAddress)).to.equal(BigNumber.from("20"));
            });
          
      
          it('spender is allowed to transfer on behalf of the token owner ', async () => {

            await ZGoldContract.approve(aliceAddress,100);
            expect(await ZGoldContract.allowance(ownerAddress,aliceAddress)).to.equal(100);
   })

   it('emits Trasfer properly', async () => {
    await expect(
        ZGoldContract
          .connect(owner)
          .transfer(bobAddress,100)).to.emit(ZGoldContract, "Transfer")
        .withArgs(ownerAddress,bobAddress,100);
    });
it('emits Approval properly', async () => {
    expect ( await ZGoldContract.connect(owner).approve(aliceAddress,100))
    .to.emit(ZGoldContract, "Approval")
    .withArgs(ownerAddress, aliceAddress,100)
});

   
    

        it('owner of NFT should be able to claim zGold', async () => {

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
            //check if tokens are recived
            expect(await ZGoldInstance.balanceOf(aliceAddress)).to.be.equal(BigNumber.from("1000"))
            
            })
       
            it('address has not claimed gold prior', async () => {
            
                expect(await ZGoldInstance.isZGLDClaimed(aliceAddress)).to.equal(false);
            })

        it('address has to own NFT to claim gold', async () => {

            await expect (ZGoldInstance.connect(bob).claimGold(constants.NFT.tokenId1,bobAddress)).to.be.revertedWith("Must own ZLoot token to claim gold")
            
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
                await expect(await ZGoldInstance.connect(alice).claimGold(constants.NFT.tokenId1,aliceAddress)).to.be.revertedWith("Can only claim gold once")
        })
        it('address has to be owner of NFT', async () => {
            await ZLootInstance.connect(alice).claim(
                constants.NFT.tokenId1,
                ethers.utils.parseUnits("1", "ether"),
                 {
                     value: ethers.utils.parseUnits("1", "ether")
                 }
               );
        expect(await ZLootInstance.ownerOf(constants.NFT.tokenId1)).to.equal(aliceAddress);
        });
   
    
    })
});

