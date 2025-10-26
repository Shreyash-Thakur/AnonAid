// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title DonationPool
 * @dev A contract that allows users to donate PYUSD to causes and for NGOs to withdraw those funds
 */
contract DonationPool is ReentrancyGuard, Ownable {
    // The PYUSD token contract
    IERC20 public pyusd;

    // Struct to store donation data per cause
    struct CauseData {
        uint256 totalRaised;
        uint256 donorCount;
        uint256 totalWithdrawn;
        mapping(address => bool) hasDonated;
    }

    // Mapping from cause ID to cause data
    mapping(bytes32 => CauseData) public causes;

    // Events
    event Donated(address indexed donor, uint256 amount, bytes32 indexed causeId);
    event Withdrawn(address indexed ngo, uint256 amount, bytes32 indexed causeId);

    /**
     * @dev Constructor sets the owner (NGO) address and the PYUSD token address
     * @param _owner The address of the NGO that will be able to withdraw funds
     * @param _pyusdAddress The address of the PYUSD ERC20 token
     */
    constructor(address _owner, address _pyusdAddress) Ownable(_owner) {
        require(_pyusdAddress != address(0), "PYUSD address cannot be zero");
        pyusd = IERC20(_pyusdAddress);
    }

    /**
     * @dev Allows users to donate PYUSD to a specific cause
     * @param amount The amount of PYUSD to donate
     * @param causeId The ID of the cause to donate to
     */
    function donate(uint256 amount, bytes32 causeId) external nonReentrant {
        require(amount > 0, "Donation amount must be greater than 0");
        
        // Transfer PYUSD from the donor to this contract
        bool success = pyusd.transferFrom(msg.sender, address(this), amount);
        require(success, "PYUSD transfer failed");
        
        // Update cause data
        CauseData storage causeData = causes[causeId];
        causeData.totalRaised += amount;
        
        // Increment donor count if this is the first donation from this address
        if (!causeData.hasDonated[msg.sender]) {
            causeData.hasDonated[msg.sender] = true;
            causeData.donorCount++;
        }
        
        // Emit donation event
        emit Donated(msg.sender, amount, causeId);
    }

    /**
     * @dev Allows the NGO to withdraw PYUSD from a specific cause
     * @param amount The amount of PYUSD to withdraw
     * @param causeId The ID of the cause to withdraw from
     */
    function withdrawForNGO(uint256 amount, bytes32 causeId) external onlyOwner nonReentrant {
        CauseData storage causeData = causes[causeId];
        
        // Calculate available balance (totalRaised - totalWithdrawn)
        uint256 availableBalance = causeData.totalRaised - causeData.totalWithdrawn;
        require(amount > 0, "Withdrawal amount must be greater than 0");
        require(amount <= availableBalance, "Insufficient funds available");
        
        // Update total withdrawn
        causeData.totalWithdrawn += amount;
        
        // Transfer PYUSD to the NGO
        bool success = pyusd.transfer(msg.sender, amount);
        require(success, "PYUSD transfer failed");
        
        // Emit withdrawal event
        emit Withdrawn(msg.sender, amount, causeId);
    }

    /**
     * @dev Returns the total amount raised for a specific cause
     * @param causeId The ID of the cause
     * @return The total amount raised for the cause
     */
    function totalRaised(bytes32 causeId) external view returns (uint256) {
        return causes[causeId].totalRaised;
    }

    /**
     * @dev Returns the number of unique donors for a specific cause
     * @param causeId The ID of the cause
     * @return The number of unique donors for the cause
     */
    function donorCount(bytes32 causeId) external view returns (uint256) {
        return causes[causeId].donorCount;
    }

    /**
     * @dev Returns the total amount withdrawn for a specific cause
     * @param causeId The ID of the cause
     * @return The total amount withdrawn for the cause
     */
    function totalWithdrawn(bytes32 causeId) external view returns (uint256) {
        return causes[causeId].totalWithdrawn;
    }

    /**
     * @dev Returns the available balance for a specific cause
     * @param causeId The ID of the cause
     * @return The available balance for the cause
     */
    function availableBalance(bytes32 causeId) external view returns (uint256) {
        CauseData storage causeData = causes[causeId];
        return causeData.totalRaised - causeData.totalWithdrawn;
    }
}