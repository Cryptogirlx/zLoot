pragma solidity 0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Context.sol";

abstract contract ZGold is Context, Ownable, ERC20 {
    address public ZLootContractAddress =
      // address nedded here 
    IERC721Enumerable public ZLootContract;
    uint256 public ZGoldPerToken= 10000 * (10**decimals());


     mapping(address=>uint)zGoldBalance;

    constructor() public ERC20("ZGold", "ZGLD") {
        _mint(msg.sender, 100000000);
    }

    function claimGold(uint256 tokenId,address tokenOwner) public {
        // has to check if address is owner of token

                require(
            _msgSender() == ZLootContract.ownerOf(tokenId),
            "must own token"
        );
        // check for valid token ID
         require(
            tokenId >= 600; "Invalid token ID"
        );
     _claim(tokenId,msg.sender);
    }
    
     function _claim(uint256 tokenId, address tokenOwner) internal {
       // address cannot claim twice
       require(zGoldBalance[msg.sender] = 0, "Tokens already claimed");
         _mint(tokenOwner, ZGoldPerToken);
     }
}
