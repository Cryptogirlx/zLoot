pragma solidity 0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "./interfaces/IZLoot.sol";

contract ZGold is Context, Ownable, ERC20 {
    address public ZLootContractAddress =
        0xBA6ad4a2794B82876984FdDFA9CAE6A66249FfC8;
    IZLoot public ZLootContract;
    IERC721Enumerable public Ownership;
    uint256 public ZGoldPerToken = 1000 * (10**decimals());

    mapping(address => uint256) public zGoldBalance;

    mapping(address => bool) public zGoldClaimed;

    constructor() public ERC20("ZGold", "ZGLD") {
        ZLootContract = IZLoot(ZLootContractAddress);
        Ownership = IERC721Enumerable(ZLootContractAddress);
    }

    function getZGLDBalance(address tokenOwner) public view returns (uint256) {
        return zGoldBalance[tokenOwner];
    }

    function isZGLDClaimed(address tokenOwner) public view returns (bool) {
        return zGoldClaimed[tokenOwner];
    }

    function claimGold(uint256 tokenId, address tokenOwner) public {
        // has to check if address is owner of token

        require(
            _msgSender() == Ownership.ownerOf(tokenId),
            "Must own ZLoot token to claim gold"
        );
        // check for valid token ID
        require(tokenId <= 600, "Invalid token ID");
        // check that they haven't claim the gold yet
        require(zGoldClaimed[tokenOwner] == false, "Can only claim gold once");
        _claim(tokenOwner, ZGoldPerToken);
    }

    function _claim(address tokenOwner, uint256 amount) internal {
        // address cannot claim twice
        // require(zGoldBalance[tokenOwner] = 0, "Tokens already claimed");
        _mint(tokenOwner, ZGoldPerToken);
        zGoldClaimed[tokenOwner] == true;
    }
}
