// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

library MerkleTreeLib {
    function currentRootIndex() public {}
    function initialize(uint32 levels) public {}
    function insert(bytes32 _leaf) public returns (uint32) {}
    function isKnownRoot(bytes32 _root) public view returns (bool) {}
    function getLastRoot() public view returns (bytes32) {}
    function filledSubtrees(uint i) public view returns (uint) {}
    function nextIndex() public view returns (uint32) {}
    function setCurrentRootIndex() public {}
    function setNextIndex(uint32 i) public {}
    function zeros(uint i) public view returns (uint) {}
}