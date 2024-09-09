# Voting dApp

This decentralized application (dApp) is designed to simulate voting for candidates using a smart contract on the Sepolia Testnet(to test in other networks deploy the contracts to another chains) Users can participate in the voting process, the contract will verify if the user is eligible by checking his wallet holdings to see if he possess the required NFT to participate in the vote.
## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) 
- [npm](https://www.npmjs.com/) 

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/voting-dapp.git
   cd voting-dapp
   
2. **Install dependencies** 

Run the following command to install the necessary node modules:

npm install


3. **Running the Application**

To start the application, run:

npm start
This will launch the dApp in your default web browser at http://localhost:3000.

**Smart Contract**

The smart contract for the voting simulation is deployed on the seplia testnet network. The contract allows for:

Adding candidates
Adding the nftcontract
Casting votes
Querying vote counts
Checking Users Eligibility
