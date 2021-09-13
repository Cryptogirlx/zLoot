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

    describe("Token uri", () => {
        it('returns the right text for given tokenID', async () => {
    
        });
       
        it('', async () => {
    
        });
    })
})