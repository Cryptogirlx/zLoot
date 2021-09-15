const { BigNumber } = require("@ethersproject/bignumber");
const { ethers } = require("hardhat");
import {arrays} from "./Arrays";

export const constants = {
    NFT: {
        tokenId1: 1,
        tokenId2:2,
        maxSupply:600,
    }
}


   

const testRandomFunction = async(string:string,arrayLength:number) => {
 let rand, index

 rand = ethers.utils.keccak256(string);
 index = (rand % arrayLength)

 return index

}

export const testPluck = async(tokenId:number,keyPrefix:string,sourceArray:string) => {

    const random = testRandomFunction()

}




