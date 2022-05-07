// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract ChainlinkCronJob {
    address owner;
    bool readyToFlip;

    error NotReadyToFlip();

    constructor() {
        owner = msg.sender;
    }

    function checkFlipStatus() external view returns (bool flipStatus) {
        if ((flipStatus = !readyToFlip))
            revert NotReadyToFlip();
    }

    function flip() external returns (bool flipStatus) {
        if ((flipStatus = !readyToFlip))
            revert NotReadyToFlip();
        readyToFlip = flipStatus;
    }

    function toggle() external {
        require(msg.sender == owner);
        readyToFlip = !readyToFlip;
    }
}