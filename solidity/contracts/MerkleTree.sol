// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "./MerkleTreeLib.sol";

contract MerkleTree {
    using MerkleTreeLib for *;

    constructor() {
        uint32(20).initialize();
    }

    function insert(bytes32 leaf) public returns (uint32) {
        return leaf.insert();
    }

    function zeros(uint i) public view returns (uint) {
        return i.zeros();
    }

    function filledSubtrees(uint i) public view returns (uint) {
        return i.filledSubtrees();
    }

    function nextIndex() public view returns (uint32) {
        return MerkleTreeLib.nextIndex();
    }
}