pragma solidity 0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "./interfaces/IZLoot.sol";

contract ZGold is Context, Ownable, ERC20 {
    address public ZLootContractAddress;
    IZLoot public ZLootContract;
    IERC721Enumerable public Ownership;
    uint256 public ZGoldPerToken = 1000;

    uint256 _totalSupply = 600000;
    mapping(address => uint256) public zGoldBalance;

    mapping(address => bool) public zGoldClaimed;

    constructor(address _ZLootContractAddress) public ERC20("ZGold", "ZGLD") {
        ZLootContractAddress = _ZLootContractAddress;
        ZLootContract = IZLoot(ZLootContractAddress);
        Ownership = IERC721Enumerable(ZLootContractAddress);
    }

    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }

    function getZGLDBalance(address tokenOwner) public view returns (uint256) {
        return zGoldBalance[tokenOwner];
    }

    function isZGLDClaimed(address tokenOwner) public view returns (bool) {
        return zGoldClaimed[tokenOwner];
    }

    function claimGold(uint256 tokenId, address tokenOwner) public {
        // check for valid token ID
        // require(tokenId <= 600, "Invalid token ID"); ==> is this necesarry if only the already minted tokens have ids?
        // has to check if address is owner of token
        require(
            _msgSender() == Ownership.ownerOf(tokenId),
            "Must own ZLoot token to claim gold"
        );

        // check that they haven't claim the gold yet
        require(zGoldClaimed[tokenOwner] == false, "Can only claim gold once");
        _claim(tokenId, tokenOwner);
    }

    function _claim(uint256 tokenId, address tokenOwner) public {
        zGoldClaimed[tokenOwner] = true;
        zGoldBalance[tokenOwner] = ZGoldPerToken;
        _mint(tokenOwner, ZGoldPerToken);
    }
}
