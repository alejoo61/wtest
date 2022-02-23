// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.8.0;
pragma abicoder v2;

import "./ERC721.sol";

contract WildersU is ERC721 {
    string public collectionName;
    string public collectionNameSymbol;
    uint256 public WildersuFCounter;
    uint256 public mintPrice;
    address payable owner;

    struct WildersuF {
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

    mapping(uint256 => WildersuF) public allWildersU;
    mapping(string => bool) public tokenNameExists;
    mapping(string => bool) public tokenURIExists;

    constructor() ERC721("WildersuF Collection", "WILDU") {
        collectionName = name();
        collectionNameSymbol = symbol();
        mintPrice = 0.01 * 1000000000000000000;
        owner = msg.sender;
    }

    function mintWildersuF(
        string memory _name,
        string memory _tokenURI,
        uint256 _price
    ) public payable {
        require(msg.sender != address(0));
        WildersuFCounter++;
        require(!_exists(WildersuFCounter));

        require(!tokenURIExists[_tokenURI]);
        require(!tokenNameExists[_name]);

        _mint(msg.sender, WildersuFCounter);
        _setTokenURI(WildersuFCounter, _tokenURI);

        tokenURIExists[_tokenURI] = true;
        tokenNameExists[_name] = true;

        address payable sendTo = owner;
        sendTo.transfer(msg.value);

        WildersuF memory newWildersuF = WildersuF(
            WildersuFCounter,
            _name,
            _tokenURI,
            msg.sender,
            msg.sender,
            address(0),
            _price,
            0,
            false
        );
        allWildersU[WildersuFCounter] = newWildersuF;
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
        WildersuF memory _WildersuF = allWildersU[_tokenId];
        require(msg.value >= _WildersuF.price);
        require(_WildersuF.forSale);
        _transfer(tokenOwner, msg.sender, _tokenId);
        address payable sendTo = _WildersuF.currentOwner;
        sendTo.transfer(msg.value);
        _WildersuF.previousOwner = _WildersuF.currentOwner;
        _WildersuF.currentOwner = msg.sender;
        _WildersuF.numberOfTransfers += 1;
        allWildersU[_tokenId] = _WildersuF;
    }

    function giftToken(uint256 _tokenId, address payable _receiver) public payable {
        require(msg.sender != address(0));
        require(_exists(_tokenId));
        address tokenOwner = ownerOf(_tokenId);
        require(tokenOwner != address(0));
        require(tokenOwner == msg.sender);
        WildersuF memory _WildersuF = allWildersU[_tokenId];

        _transfer(tokenOwner, _receiver, _tokenId);

        _WildersuF.previousOwner = _WildersuF.currentOwner;
        _WildersuF.currentOwner = _receiver;
        _WildersuF.numberOfTransfers += 1;
        allWildersU[_tokenId] = _WildersuF;
    }

    function changeTokenPrice(uint256 _tokenId, uint256 _newPrice) public {
        require(msg.sender != address(0));
        require(_exists(_tokenId));
        address tokenOwner = ownerOf(_tokenId);
        require(tokenOwner == msg.sender);
        WildersuF memory _WildersuF = allWildersU[_tokenId];
        _WildersuF.price = _newPrice;
        allWildersU[_tokenId] = _WildersuF;
    }

    function toggleForSale(uint256 _tokenId) public {
        require(msg.sender != address(0));
        require(_exists(_tokenId));
        address tokenOwner = ownerOf(_tokenId);
        require(tokenOwner == msg.sender);
        WildersuF memory _WildersuF = allWildersU[_tokenId];
        if (_WildersuF.forSale) {
            _WildersuF.forSale = false;
        } else {
            _WildersuF.forSale = true;
        }
        allWildersU[_tokenId] = _WildersuF;
    }
}