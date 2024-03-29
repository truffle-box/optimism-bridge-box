//SPDX-License-Identifier: Unlicense
// This contracts runs on L2, and controls a Greeter on L1.
pragma solidity ^0.8.0;

import { ICrossDomainMessenger } from
    "@eth-optimism/contracts/libraries/bridge/ICrossDomainMessenger.sol";

contract GreeterL2 {
    address crossDomainMessengerAddr = 0x4200000000000000000000000000000000000007;

    address greeterL1Addr = 0x7fA4D972bB15B71358da2D937E4A830A9084cf2e;

    function setGreeting(string calldata _greeting) public {
        bytes memory message;

        message = abi.encodeWithSignature("setGreeting(string)",
            _greeting);

        ICrossDomainMessenger(crossDomainMessengerAddr).sendMessage(
            greeterL1Addr,
            message,
            1000000   // irrelevant here
        );
    }      // function setGreeting

}          // contract GreeterL2
