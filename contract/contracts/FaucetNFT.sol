// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract FaucetNFT is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter public _totalNFTs;

  event FaucetMinted (
    uint id,
    address to
  );

  constructor(string memory _url) ERC721("FaucetNFT", "FT") {}

  function issueNFT(address to) external {
    _totalNFTs.increment();
    uint id = _totalNFTs.current();
    _mint(to, id);

    emit FaucetMinted(id, to);
  }
}