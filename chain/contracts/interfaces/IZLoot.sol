pragma solidity 0.8.0;

interface IZLoot {
    function claim(uint256 tokenId, uint256 minPrice) external;
}
