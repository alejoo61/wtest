// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.8.0;
pragma abicoder v2;

import "./ERC721.sol";

contract WildersR is ERC721 {
    string public collectionName;
    string public collectionNameSymbol;
    uint256 public WildersrFCounter;
    uint256 public mintPrice;
    address payable owner;

    struct WildersrF {
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

    mapping(uint256 => WildersrF) public allWildersR;
    mapping(string => bool) public tokenNameExists;
    mapping(string => bool) public tokenURIExists;

    constructor() ERC721("WildersrF Collection", "WILDR") {
        collectionName = name();
        collectionNameSymbol = symbol();
        mintPrice = 0.01 * 1000000000000000000;
        owner = msg.sender;
    }

    function mintWildersrF(
        string memory _name,
        string memory _tokenURI,
        uint256 _price
    ) public payable {
        require(msg.sender != address(0));
        WildersrFCounter++;
        require(!_exists(WildersrFCounter));

        require(!tokenURIExists[_tokenURI]);
        require(!tokenNameExists[_name]);

        _mint(msg.sender, WildersrFCounter);
        _setTokenURI(WildersrFCounter, _tokenURI);

        tokenURIExists[_tokenURI] = true;
        tokenNameExists[_name] = true;

        address payable sendTo = owner;
        sendTo.transfer(msg.value);

        WildersrF memory newWildersrF = WildersrF(
            WildersrFCounter,
            _name,
            _tokenURI,
            msg.sender,
            msg.sender,
            address(0),
            _price,
            0,
            false
        );
        allWildersR[WildersrFCounter] = newWildersrF;
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
        WildersrF memory WildersrF = allWildersR[_tokenId];
        require(msg.value >= WildersrF.price);
        require(WildersrF.forSale);
        _transfer(tokenOwner, msg.sender, _tokenId);
        address payable sendTo = WildersrF.currentOwner;
        sendTo.transfer(msg.value);
        WildersrF.previousOwner = WildersrF.currentOwner;
        WildersrF.currentOwner = msg.sender;
        WildersrF.numberOfTransfers += 1;
        allWildersR[_tokenId] = WildersrF;
    }

    function giftToken(uint256 _tokenId, address payable _receiver) public payable {
        require(msg.sender != address(0));
        require(_exists(_tokenId));
        address tokenOwner = ownerOf(_tokenId);
        require(tokenOwner != address(0));
        require(tokenOwner == msg.sender);
        WildersrF memory WildersrF = allWildersR[_tokenId];

        _transfer(tokenOwner, _receiver, _tokenId);

        WildersrF.previousOwner = WildersrF.currentOwner;
        WildersrF.currentOwner = _receiver;
        WildersrF.numberOfTransfers += 1;
        allWildersR[_tokenId] = WildersrF;
    }

    function changeTokenPrice(uint256 _tokenId, uint256 _newPrice) public {
        require(msg.sender != address(0));
        require(_exists(_tokenId));
        address tokenOwner = ownerOf(_tokenId);
        require(tokenOwner == msg.sender);
        WildersrF memory WildersrF = allWildersR[_tokenId];
        WildersrF.price = _newPrice;
        allWildersR[_tokenId] = WildersrF;
    }

    function toggleForSale(uint256 _tokenId) public {
        require(msg.sender != address(0));
        require(_exists(_tokenId));
        address tokenOwner = ownerOf(_tokenId);
        require(tokenOwner == msg.sender);
        WildersrF memory WildersrF = allWildersR[_tokenId];
        if (WildersrF.forSale) {
            WildersrF.forSale = false;
        } else {
            WildersrF.forSale = true;
        }
        allWildersR[_tokenId] = WildersrF;
    }
}