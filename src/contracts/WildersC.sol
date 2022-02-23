// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.8.0;
pragma abicoder v2;

import "./ERC721.sol";

contract WildersC is ERC721 {
    string public collectionName;
    string public collectionNameSymbol;
    uint256 public WilderscFCounter;
    uint256 public mintPrice;
    address payable owner;

    struct WilderscF {
        uint256 tokenId;
        string tokenName;
        string tokenURI;
        address payable mintedBy;
        address payable currentOwner;
        address payable previousOwner;
        uint256 price;
        uint256 numberOfTransfers;
        bool forSale;
    }

    mapping(uint256 => WilderscF) public allWildersC;
    mapping(string => bool) public tokenNameExists;
    mapping(string => bool) public tokenURIExists;

    constructor() ERC721("WilderscF Collection", "WILDC") {
        collectionName = name();
        collectionNameSymbol = symbol();
        mintPrice = 0.01 * 1000000000000000000;
        owner = msg.sender;
    }

    function mintWilderscF(
        string memory _name,
        string memory _tokenURI,
        uint256 _price
    ) public payable {
        require(msg.sender != address(0));
        WilderscFCounter++;
        require(!_exists(WilderscFCounter));

        require(!tokenURIExists[_tokenURI]);
        require(!tokenNameExists[_name]);

        _mint(msg.sender, WilderscFCounter);
        _setTokenURI(WilderscFCounter, _tokenURI);

        tokenURIExists[_tokenURI] = true;
        tokenNameExists[_name] = true;

        address payable sendTo = owner;
        sendTo.transfer(msg.value);

        WilderscF memory newWilderscF = WilderscF(
            WilderscFCounter,
            _name,
            _tokenURI,
            msg.sender,
            msg.sender,
            address(0),
            _price,
            0,
            false
        );
        allWildersC[WilderscFCounter] = newWilderscF;
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function getMintPrice() public view returns (uint256) {
        return mintPrice;
    }

    function setMintPrice(uint256 _price) public returns (bool) {
        require(owner == msg.sender);
        mintPrice = _price;
        return true;
    }

    function getTokenOwner(uint256 _tokenId) public view returns (address) {
        address _tokenOwner = ownerOf(_tokenId);
        return _tokenOwner;
    }

    function getTokenMetaData(uint256 _tokenId)
        public
        view
        returns (string memory)
    {
        string memory tokenMetaData = tokenURI(_tokenId);
        return tokenMetaData;
    }

    function getNumberOfTokensMinted() public view returns (uint256) {
        uint256 totalNumberOfTokensMinted = totalSupply();
        return totalNumberOfTokensMinted;
    }

    function getTotalNumberOfTokensOwnedByAnAddress(address _owner)
        public
        view
        returns (uint256)
    {
        uint256 totalNumberOfTokensOwned = balanceOf(_owner);
        return totalNumberOfTokensOwned;
    }

    function getTokenExists(uint256 _tokenId) public view returns (bool) {
        bool tokenExists = _exists(_tokenId);
        return tokenExists;
    }

    function buyToken(uint256 _tokenId) public payable {
        require(msg.sender != address(0));
        require(_exists(_tokenId));
        address tokenOwner = ownerOf(_tokenId);
        require(tokenOwner != address(0));
        require(tokenOwner != msg.sender);
        WilderscF memory WilderscF = allWildersC[_tokenId];
        require(msg.value >= WilderscF.price);
        require(WilderscF.forSale);
        _transfer(tokenOwner, msg.sender, _tokenId);
        address payable sendTo = WilderscF.currentOwner;
        sendTo.transfer(msg.value);
        WilderscF.previousOwner = WilderscF.currentOwner;
        WilderscF.currentOwner = msg.sender;
        WilderscF.numberOfTransfers += 1;
        allWildersC[_tokenId] = WilderscF;
    }

    function giftToken(uint256 _tokenId, address payable _receiver) public payable {
        require(msg.sender != address(0));
        require(_exists(_tokenId));
        address tokenOwner = ownerOf(_tokenId);
        require(tokenOwner != address(0));
        require(tokenOwner == msg.sender);
        WilderscF memory WilderscF = allWildersC[_tokenId];

        _transfer(tokenOwner, _receiver, _tokenId);

        WilderscF.previousOwner = WilderscF.currentOwner;
        WilderscF.currentOwner = _receiver;
        WilderscF.numberOfTransfers += 1;
        allWildersC[_tokenId] = WilderscF;
    }

    function changeTokenPrice(uint256 _tokenId, uint256 _newPrice) public {
        require(msg.sender != address(0));
        require(_exists(_tokenId));
        address tokenOwner = ownerOf(_tokenId);
        require(tokenOwner == msg.sender);
        WilderscF memory WilderscF = allWildersC[_tokenId];
        WilderscF.price = _newPrice;
        allWildersC[_tokenId] = WilderscF;
    }

    function toggleForSale(uint256 _tokenId) public {
        require(msg.sender != address(0));
        require(_exists(_tokenId));
        address tokenOwner = ownerOf(_tokenId);
        require(tokenOwner == msg.sender);
        WilderscF memory WilderscF = allWildersC[_tokenId];
        if (WilderscF.forSale) {
            WilderscF.forSale = false;
        } else {
            WilderscF.forSale = true;
        }
        allWildersC[_tokenId] = WilderscF;
    }
}