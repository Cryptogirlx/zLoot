const { BigNumber } = require("@ethersproject/bignumber");
const { ethers } = require("hardhat");
import {arrays,keyPrefixes} from "./Arrays";

export const constants = {
    NFT: {
        tokenId1: 1,
        tokenId2:2,
        maxSupply:600,
    }
}


export const testRandom= (string:string) => {

// the original random function takes a string and turns it into a hash than turns that to a number

const hash = ethers.utils.id(string);
// const hashToNumber = parseFloat(hash);

 return hash
 console.log(hash.toString())
}

export const testPluck = (tokenId:number,keyPrefix:string,sourceArray:any) => {
  
    let turnToString = (keyPrefix).concat(tokenId.toString()); // creating string from tokenID + keyprefix
     let rand= testRandom(turnToString);// turn it into a hash then number with randomfunction
     let index = rand % sourceArray.length; // calculate index
     let output = sourceArray[index];

     let greatness = rand % 21;

     if (greatness >= 19){
        return output
     }
    if (greatness = 19){

    }
     
    else {
        
    }

        }






