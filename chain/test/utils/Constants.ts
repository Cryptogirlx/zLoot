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
}

export const testPluck = (tokenId:number,keyPrefix:string,sourceArray:any) => {
  
    let turnToString = (keyPrefix).concat(tokenId.toString()); // creating string from tokenID + keyprefix
   
     let rand= testRandom(turnToString);// turn it into a hash then number with randomfunction
     console.log("rand",rand,BigNumber.from(rand).toString())
     let index = BigNumber.from(rand).mod(sourceArray.length); // calculate index
     console.log("index",index.toString())
     index = parseInt(index.toString())
     let output = sourceArray[index];
     
     rand = BigNumber.from(rand).toString().slice(0,10) // get the last 10 characters of the string and convert it back to a number
     console.log("sliced",rand) 
     rand = parseInt(rand);
     let greatness = BigNumber.from(rand).mod(21);
     greatness = parseInt(greatness.toString())
     console.log("greatness",greatness.toString())

     if (greatness > 14){
        let index = BigNumber.from(rand).mod(arrays.Traits.suffix.length)
        output = arrays.Traits.suffix[index] + " " + output
     }
     
    if (greatness >= 19){

        let name1 = rand % arrays.Traits.namePrefix.length
        let name2 = rand % arrays.Traits.nameSuffix.length
   if (greatness = 19) {
    output = arrays.Traits.namePrefix[name1] + " " + arrays.Traits.nameSuffix[name2] + " " + output
   }
   else {
    let name1 = rand % arrays.Traits.namePrefix.length
    let name2 = rand % arrays.Traits.nameSuffix.length
    output = arrays.Traits.namePrefix[name1] + " " + arrays.Traits.nameSuffix[name2] + " " + output + " " + "+1"
}
}
     


    return output 

        }






