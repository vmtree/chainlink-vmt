// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "./verifiers/UpdateVerifier.sol";
import "./verifiers/MassUpdateVerifier.sol";

contract ChainlinkVMT is UpdateVerifier, MassUpdateVerifier {
    uint public nextIndex;
    uint[20] public filledSubtrees;
    uint public constant TREE_CAPACITY = 2 ** 20;    

    mapping(uint => uint) commitments;

    uint public latestIndex;

    event LeafCommitted(uint leaf, uint index);
    event TreeUpdated(uint previousIndex, uint nextIndex);

    constructor () {
        filledSubtrees = [
            0x2fe54c60d3acabf3343a35b6eba15db4821b340f76e741e2249685ed4899af6c,
            0x256a6135777eee2fd26f54b8b7037a25439d5235caee224154186d2b8a52e31d,
            0x1151949895e82ab19924de92c40a3d6f7bcb60d92b00504b8199613683f0c200,
            0x20121ee811489ff8d61f09fb89e313f14959a0f28bb428a20dba6b0b068b3bdb,
            0x0a89ca6ffa14cc462cfedb842c30ed221a50a3d6bf022a6a57dc82ab24c157c9,
            0x24ca05c2b5cd42e890d6be94c68d0689f4f21c9cec9c0f13fe41d566dfb54959,
            0x1ccb97c932565a92c60156bdba2d08f3bf1377464e025cee765679e604a7315c,
            0x19156fbd7d1a8bf5cba8909367de1b624534ebab4f0f79e003bccdd1b182bdb4,
            0x261af8c1f0912e465744641409f622d466c3920ac6e5ff37e36604cb11dfff80,
            0x0058459724ff6ca5a1652fcbc3e82b93895cf08e975b19beab3f54c217d1c007,
            0x1f04ef20dee48d39984d8eabe768a70eafa6310ad20849d4573c3c40c2ad1e30,
            0x1bea3dec5dab51567ce7e200a30f7ba6d4276aeaa53e2686f962a46c66d511e5,
            0x0ee0f941e2da4b9e31c3ca97a40d8fa9ce68d97c084177071b3cb46cd3372f0f,
            0x1ca9503e8935884501bbaf20be14eb4c46b89772c97b96e3b2ebf3a36a948bbd,
            0x133a80e30697cd55d8f7d4b0965b7be24057ba5dc3da898ee2187232446cb108,
            0x13e6d8fc88839ed76e182c2a779af5b2c0da9dd18c90427a644f7e148a6253b6,
            0x1eb16b057a477f4bc8f572ea6bee39561098f78f15bfb3699dcbb7bd8db61854,
            0x0da2cb16a1ceaabf1c16b838f7a9e3f2a3a3088d9e0a6debaa748114620696ea,
            0x24a3b3d822420b14b5d8cb6c28a574f01e98ea9e940551d2ebd75cee12649f9d,
            0x198622acbd783d1b0d9064105b1fc8e4d8889de95c4c519b3f635809fe6afc05
        ];
    }

    function currentRoot() public view returns (uint) {
        return filledSubtrees[19];
    }

    function getFilledSubtrees() public view returns (uint[20] memory) {
        return filledSubtrees;
    }

    function commit(uint leaf) public returns (uint) {
        uint i = latestIndex;
        if (i == TREE_CAPACITY)
            revert TreeIsFull();
        commitments[i] = leaf;
        unchecked { latestIndex = i + 1; }
        emit LeafCommitted(leaf, i);
        return i;
    }

    function checkMassUpdate()
        external
        view
        returns (uint[10] memory, uint[20] memory, uint)
    {
        uint next = nextIndex;
        uint latest = latestIndex;
        unchecked {
            if ((latest - next) < 10)
                revert InsufficientInbox();
        }
        uint[10] memory leaves;
        for (uint i; i < 10;) {
            unchecked {
                leaves[i] = commitments[next + i];
                i++;
            }
        }
        return (leaves, filledSubtrees, next);
    }

    function performMassUpdate(
        uint[8] calldata proof,
        uint[20] calldata newSubtrees
    )
        public
        returns (uint finalIndex) 
    {
        uint next = nextIndex;
        unchecked {
            if ((latestIndex - next) < 10)
                revert InsufficientInbox();
            finalIndex = next + 10;
        }

        uint[51] memory publicSignals;
        publicSignals[0] = uint(next);

        for (uint i; i < 10;) {
            unchecked { 
                publicSignals[i + 1] = commitments[i + next];
                delete commitments[i + next];
                i++;
            }
        }

        for (uint i; i < 20;) {
            unchecked { 
                publicSignals[i + 11] = filledSubtrees[i];
                publicSignals[i + 31] = newSubtrees[i];
                i++; 
            }
        }

        if (!_verifyMassUpdateProof(
            proof,
            publicSignals
        ))
            revert InvalidMassUpdateProof();

        for (uint i; i < 20;) {
            // if (publicSignals[i+11] != newSubtrees[i]) {
            //     filledSubtrees[i] = newSubtrees[i];
            // }
            filledSubtrees[i] = newSubtrees[i];
            unchecked { i++; }
        }
        nextIndex = finalIndex;
    }

    function update(
        uint[8] calldata proof,
        uint[20] calldata newSubtrees
    )
        public
        returns (uint finalIndex) 
    {
        uint next = nextIndex;
        if (next > latestIndex)
            revert InsufficientInbox();
        unchecked {
            finalIndex = next + 1;
        }
        uint[42] memory publicSignals;
        publicSignals[0] = uint(next);
        publicSignals[1] = uint(commitments[next]);
        commitments[next] = 0;
        for (uint i; i < 20;) {
            publicSignals[i + 2] = filledSubtrees[i];
            publicSignals[i + 22] = newSubtrees[i];
            unchecked { i++; }
        }

        if (!_verifyUpdateProof(
            proof,
            publicSignals
        ))
            revert InvalidUpdateProof();

        for (uint i; i < 20;) {
            filledSubtrees[i] = newSubtrees[i];
            unchecked { i++; }
        }
        nextIndex = finalIndex;
    }
    error InsufficientInbox();
    error InvalidUpdateProof();
    error InvalidMassUpdateProof();
    error TreeIsFull();
}