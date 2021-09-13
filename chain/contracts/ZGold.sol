pragma solidity 0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract ZGold is Context, Ownable, ERC20 {
    address public ZLootContractAddress =
        0xFF9C1b15B16263C61d017ee9F65C50e4AE0113D7; // ADDRESS NOT CORRECT, just using it for compile
    IERC721Enumerable public ZLootContract;
    uint256 public ZGoldPerToken = 1000 * (10**decimals());

    // mapping address to tokenID then tokenID to gold balance

    mapping(address => uint256) public zGoldBalance;

    constructor() public ERC20("ZGold", "ZGLD") {
        _mint(msg.sender, 600000);
    }

    function getZGLDBalance(address tokenOwner) public view returns (uint256) {
        return zGoldBalance[tokenOwner];
    }

    function claimGold(uint256 tokenId, address tokenOwner) public {
        // has to check if address is owner of token

        require(
            _msgSender() == ZLootContract.ownerOf(tokenId),
            "must own token"
        );
        // check for valid token ID
        require(tokenId >= 600, "Invalid token ID");
        _claim(tokenId, msg.sender);
    }

    function _claim(uint256 tokenId, address tokenOwner) internal {
        // address cannot claim twice
        // require(zGoldBalance[tokenOwner] = 0, "Tokens already claimed");
        _mint(tokenOwner, ZGoldPerToken);
    }
}
