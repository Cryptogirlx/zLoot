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

    // describe("Token basics", () => {

        // it.only('sets the name correctly', async () => {
        //     expect(await ZGoldContract.name()).to.equal("ZGold");
        // });
        // it.only('sets symbol correctly', async () => {
        //     expect(await ZGoldContract.symbol()).to.equal("ZGLD");
        // });

        // it.only('sets total supply correctly', async () => {
        //     expect(await ZGoldContract.totalSupply()).to.equal(BigNumber.from("600000"));
        // });


        // it.only('returns balanceOf an account correctly', async () => {
            
           
        //     expect (await ZGoldContract.balanceOf(ownerAddress)).to.equal(BigNumber.from("600000"));
  
        //   });
      
//           it('decreases the balance of the sender after transfer', async () => {
              
              
//               await ZGoldContract.claimGold()
//               await ZGoldContract.connect(owner).transfer(aliceAddress,20);
//               await ZGoldContract.decreaseAllowance(ownerAddress,0); // WHY 0 ?!
//               expect (await ZGoldContract.balanceOf(ownerAddress)).to.equal(BigNumber.from("999999999999999980"));
//             });
         
//           it('increases the balance of the reciever after transfer', async () => {
              
//               await ZGoldContract.connect(owner).transfer(aliceAddress,20);
//               await ZGoldContract.increaseAllowance(aliceAddress,20);
        
//               expect (await ZGoldContract.balanceOf(aliceAddress)).to.equal(BigNumber.from("20"));
//             });
//           });
      
//           it('spender is allowed to transfer on behalf of the token owner ', async () => {

//             await ZGoldContract.approve(aliceAddress,100);
//             expect(await ZGoldContract.allowance(ownerAddress,aliceAddress)).to.equal(100);
//    })
//     })
//    it('emits Trasfer properly', async () => {
//     await expect(
//         ZGoldContract
//           .connect(owner)
//           .transfer(bobAddress,100)).to.emit(ZGoldContract, "Transfer")
//         .withArgs(ownerAddress,bobAddress,100);
//     });
// it('emits Approval properly', async () => {
//     expect ( await ZGoldContract.connect(owner).approve(aliceAddress,100))
//     .to.emit(ZGoldContract, "Approval")
//     .withArgs(ownerAddress, aliceAddress,100)
// });
// });
   
    describe("Claiming tokens", () => {

        it.only('owner of NFT should be able to claim zGold', async () => {

            // first mint NFT
            await ZLootInstance.connect(alice).claim(
                constants.NFT.tokenId1,
                ethers.utils.parseUnits("1", "ether"),
                 {
                     value: ethers.utils.parseUnits("1", "ether")
                 }
               );
            // then claim tokens
            await ZGoldInstance.claimGold(constants.NFT.tokenId1,aliceAddress);
            //check if tokens are recived
            expect(await ZGoldInstance.balanceOf(aliceAddress)).to.be.equal(BigNumber.from("1000"))
            
            })
        it('address should have no tokens prior to claiming', async () => {
            
        });

        it('address cannot claim twice', async () => {
            
        })
        it('address has to be owner of NFT', async () => {
        
        });
   
    it('only claim tokens 1 time per address', async () => {
    
    });
    })

})