import { narrow } from 'abitype'

export const PaymasterAbi = narrow([
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      },
      {
        "internalType": "contract IEntryPoint",
        "name": "_entryPoint",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_verifyingSigner",
        "type": "address"
      }
    ],
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "uint32",
        "name": "unstakeDelaySec",
        "type": "uint32"
      }
    ],
    "name": "addStake",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "sponsorId",
        "type": "uint256"
      }
    ],
    "name": "depositFor",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "entryPoint",
    "outputs": [
      {
        "internalType": "contract IEntryPoint",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "sponsorId",
        "type": "uint256"
      }
    ],
    "name": "getBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "balance",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getDeposit",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "type": "address"
          },
          {
            "type": "uint256"
          },
          {
            "type": "bytes"
          },
          {
            "type": "bytes"
          },
          {
            "type": "uint256"
          },
          {
            "type": "uint256"
          },
          {
            "type": "uint256"
          },
          {
            "type": "uint256"
          },
          {
            "type": "uint256"
          },
          {
            "type": "bytes"
          },
          {
            "type": "bytes"
          }
        ],
        "internalType": "struct UserOperation",
        "name": "userOp",
        "type": "tuple"
      },
      {
        "internalType": "uint48",
        "name": "validUntil",
        "type": "uint48"
      },
      {
        "internalType": "uint48",
        "name": "validAfter",
        "type": "uint48"
      },
      {
        "internalType": "uint256",
        "name": "sponsorId",
        "type": "uint256"
      }
    ],
    "name": "getHash",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "sponsorId",
        "type": "uint256"
      }
    ],
    "name": "getOwner",
    "outputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "enum IPaymaster.PostOpMode",
        "name": "mode",
        "type": "uint8"
      },
      {
        "internalType": "bytes",
        "name": "context",
        "type": "bytes"
      },
      {
        "internalType": "uint256",
        "name": "actualGasCost",
        "type": "uint256"
      }
    ],
    "name": "postOp",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_newVerifyingSigner",
        "type": "address"
      }
    ],
    "name": "setVerifyingSigner",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "sponsorBalances",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "sponsorOwners",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "unlockStake",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "type": "address"
          },
          {
            "type": "uint256"
          },
          {
            "type": "bytes"
          },
          {
            "type": "bytes"
          },
          {
            "type": "uint256"
          },
          {
            "type": "uint256"
          },
          {
            "type": "uint256"
          },
          {
            "type": "uint256"
          },
          {
            "type": "uint256"
          },
          {
            "type": "bytes"
          },
          {
            "type": "bytes"
          }
        ],
        "internalType": "struct UserOperation",
        "name": "userOp",
        "type": "tuple"
      },
      {
        "internalType": "bytes32",
        "name": "userOpHash",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "maxCost",
        "type": "uint256"
      }
    ],
    "name": "validatePaymasterUserOp",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "context",
        "type": "bytes"
      },
      {
        "internalType": "uint256",
        "name": "validationData",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "verifyingSigner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "sponsorId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "withdrawFunds",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address payable",
        "name": "withdrawAddress",
        "type": "address"
      }
    ],
    "name": "withdrawStake",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "_sponsorId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "name": "_charge",
        "type": "uint256"
      }
    ],
    "name": "BalanceDeducted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "_sponsorId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "DepositedFunds",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "_sponsorId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "SponsorCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "_sponsorId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "name": "_sender",
        "type": "address"
      }
    ],
    "name": "SponsorSuccessful",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "_sponsorId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "name": "_sender",
        "type": "address"
      }
    ],
    "name": "SponsorUnsuccessful",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "_oldSigner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "_newSigner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "_actor",
        "type": "address"
      }
    ],
    "name": "VerifyingSignerChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "_sponsorId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "WithdrawnFunds",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "CanNotWithdrawToZeroAddress",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "CannotDepositToNotOwnedSponsor",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "CannotWithdrawFromNotOwnedSponsor",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "DepositCanNotBeZero",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "EntryPointCannotBeZero",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amountRequired",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "currentBalance",
        "type": "uint256"
      }
    ],
    "name": "InsufficientBalance",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "sigLength",
        "type": "uint256"
      }
    ],
    "name": "InvalidPaymasterSignatureLength",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "SponsorIdCannotBeZero",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "VerifyingSignerCannotBeZero",
    "type": "error"
  }
]);
