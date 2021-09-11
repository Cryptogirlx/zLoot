const { expect } = require("chai");
const { ethers } = require('hardhat');
const hre = require("hardhat");
import { BigNumber, Contract, Signer } from "ethers";
// import { constants } from '../utils/TestConstants';

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


    


})

    describe("Randomness", () => {

        it('gives random companion after every claim', async () => {
           
        });
        it('gives random special power after every claim', async () => {
            
        });

        it('gives random weapon after every claim', async () => {
            
        })
        it('gives random hand armor after every claim', async () => {
        
        });

        it('gives random ring after every claim', async () => {
        
        });

    })
    // describe("claing", () => {

    //     it('reverts if user is trying to clai more tokens than limit', async () => {
           
    //     });
    //     it('reverts if price sent is under limit', async () => {
            
    //     });

    //     it('', async () => {
            
    //     })
    //     it('', async () => {
        
    //     });

    //     it('', async () => {
        
    //     });

    // })
