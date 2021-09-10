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
        [owner, alice, bob, ] = await ethers.getSigners();
        ownerAddress = await owner.getAddress();
        aliceAddress = await alice.getAddress();
        bobAddress = await bob.getAddress();
        ZLootContract = await ethers.getContractFactory("ZLoot");
        ZLootInstance = await ZLootContract.connect(owner).deploy();
        ZGldContract = await ethers.getContractFactory("ZGold");
        ZGldInstance = await ZLootContract.connect(owner).deploy()

       
    })

    })

    describe("Token Basics", () => {

        it('sets the name correctly', async () => {
           
        });
        it('sets symbol correctly', async () => {
            
        });

        it('', async () => {
            
        })
        it('', async () => {
        
        });

    })

    describe("Randomness", () => {

        it('gives random companion after every minting', async () => {
           
        });
        it('gives random special power after every minting', async () => {
            
        });

        it('gives random weapon after every minting', async () => {
            
        })
        it('gives random hand armor after every minting', async () => {
        
        });

        it('gives random ring after every minting', async () => {
        
        });

    })
    describe("claiming ZGLD", () => {

        it('', async () => {
           
        });
        it('', async () => {
            
        });

        it('', async () => {
            
        })
        it('', async () => {
        
        });

        it('', async () => {
        
        });

    })
    })