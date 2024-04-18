// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract Stabilizor {
  function stabilizeMultiple(uint256[] calldata amounts, uint256 balance, IERC20 token) public {
    address sender = msg.sender;

    // First transfer the sender's full balance
    token.transferFrom(sender, address(this), balance);

    // For each amount, stabilize the NFT
    for (uint256 i = 0; i < amounts.length; i++) {
      token.transfer(sender, amounts[i]);
      token.transferFrom(sender, address(this), amounts[i]);
      token.transfer(sender, amounts[i]);

      // If this underflows, this means the user did not have a high enough balance
      balance -= amounts[i];
    }

    // Transfer back the remaining balance
    token.transfer(sender, balance);
  }

  function destabilize(uint256 amount, ERC20 token) public {
    address sender = msg.sender;
    uint256 decimals = token.decimals();
    uint256 one = 10 ** decimals;
    uint256 amountMinusOne = amount - one;

    // Transfer the amount from the sender to the contract
    token.transferFrom(sender, address(this), amount);

    // Transfer the amount back to the sender in two parts
    // - First transfer the amount minus 1
    token.transfer(sender, amountMinusOne);
    // - Then transfer the remaining 1 token
    token.transfer(sender, one);

    // Create a dynamic array
    uint256[] memory amounts = new uint256[](2);
    amounts[0] = amountMinusOne;
    amounts[1] = one;

    combineMultiple(amounts, token);
  }

  function stabilize(uint256 amount, IERC20 token) public {
    address sender = msg.sender;

    token.transferFrom(sender, address(this), amount);
    token.transfer(sender, amount);
  }

  function combineMultiple(uint256[] memory amounts, IERC20 token) public {
    address sender = msg.sender;
    uint256 totalAmount = 0;

    // Combine all the amounts
    for (uint256 i = 0; i < amounts.length; i++) {
      token.transferFrom(sender, address(this), amounts[i]);
      totalAmount += amounts[i];
    }

    // Transfer the total amount back to the sender
    token.transfer(msg.sender, totalAmount);
  }

  function sendMultipleTo(address to, uint256[] memory amounts, IERC20 token) public {
    address sender = msg.sender;

    // For each amount, send it to the specified address
    for (uint256 i = 0; i < amounts.length; i++) {
      token.transferFrom(sender, to, amounts[i]);
    }
  }
}
