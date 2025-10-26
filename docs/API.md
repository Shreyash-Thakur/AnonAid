# API Documentation

## Smart Contract API

### DonationPool Contract

**Address (Sepolia):** `TBD - Deploy to get address`

#### Functions

##### `donate(uint256 amount, string memory message)`
- **Description:** Donate PYUSD to the pool
- **Parameters:**
  - `amount`: Amount of PYUSD to donate (in wei)
  - `message`: Optional message with donation
- **Requirements:** Caller must approve PYUSD transfer first

##### `withdraw(uint256 amount, string memory reason)`
- **Description:** Withdraw funds (NGO only)
- **Parameters:**
  - `amount`: Amount to withdraw
  - `reason`: Reason for withdrawal
- **Requirements:** Only authorized NGO wallet

##### `getTotalRaised()`
- **Returns:** `uint256` - Total amount raised
- **Description:** Get total donations received

##### `getTotalWithdrawn()`
- **Returns:** `uint256` - Total amount withdrawn by NGO
- **Description:** Get total withdrawals

## Envio GraphQL API

### Schema

```graphql
type Donation {
  id: ID!
  donor: String!
  amount: BigInt!
  message: String
  timestamp: BigInt!
  txHash: String!
}

type Withdrawal {
  id: ID!
  amount: BigInt!
  reason: String!
  timestamp: BigInt!
  txHash: String!
}

type Query {
  donations: [Donation!]!
  withdrawals: [Withdrawal!]!
  totalRaised: BigInt!
  totalWithdrawn: BigInt!
}
```

### Example Queries

```graphql
# Get recent donations
query RecentDonations {
  donations(orderBy: "timestamp", orderDirection: "desc", first: 10) {
    id
    donor
    amount
    message
    timestamp
  }
}

# Get withdrawal history
query WithdrawalHistory {
  withdrawals(orderBy: "timestamp", orderDirection: "desc") {
    id
    amount
    reason
    timestamp
  }
}
```

## Frontend API

### Mock Data Endpoints

The Vite demo uses mock data for demonstration:

- `/mock/donations` - Recent donation history
- `/mock/stats` - Donation statistics
- `/mock/withdrawals` - NGO withdrawal history