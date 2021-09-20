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

 return hash
}

export const testPluck = (tokenId:number,keyPrefix:string,sourceArray:any) => {
  
    let turnToString = (keyPrefix).concat(tokenId.toString()); // creating string from tokenID + keyprefix
   
     let rand= testRandom(turnToString);// turn it into a hash then number with randomfunction
     const randBN = ethers.BigNumber.from(rand);
     const index = randBN.mod(sourceArray.length).toString();
     const greatness = parseInt(randBN.mod(21).toString());

 
     console.log("rand",rand,BigNumber.from(rand).toString())
    //  let index = BigNumber.from(rand).mod(sourceArray.length); // calculate index
     console.log("index",index.toString())
    //  index = parseInt(index.toString())
     let output = sourceArray[index];
     
    //  rand = BigNumber.from(rand).toString()
    //  rand = rand.slice(rand.length - 10,rand.length) // get the last 10 characters of the string and convert it back to a number
    //  console.log("sliced",randBN) 
    //  rand = parseInt(rand);
    //  let greatness = BigNumber.from(rand).mod(21);
    //  greatness = parseInt(greatness.toString())
     console.log("greatness",greatness.toString())

     if (greatness > 14){
        let index = BigNumber.from(rand).mod(arrays.Traits.suffix.length)
        output = " " + output + " " + arrays.Traits.suffix[index] 
     }
     
    if (greatness >= 19){

        let name1 = rand % arrays.Traits.namePrefix.length
        let name2 = rand % arrays.Traits.nameSuffix.length
   if (greatness === 19) {
    output = arrays.Traits.namePrefix[name1] + " " + arrays.Traits.nameSuffix[name2] + " " + output
   }
   else {
    let name1 = rand % arrays.Traits.namePrefix.length
    let name2 = rand % arrays.Traits.nameSuffix.length
    output = '"' + arrays.Traits.namePrefix[name1] + " " + arrays.Traits.nameSuffix[name2] + '" ' + " " + output + " " + "+1"
}
}
    return output 

        }






