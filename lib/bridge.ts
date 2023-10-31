import { hex } from "./helpers";
import { BridgeConfigLike } from "./types";

export const bridgeConfig: BridgeConfigLike = {
  version: 2,
  fuse: {
    chainId: 138,
    wrapped: "0x353af4878d7452e974538706273887F7ED90Da47",
  },
  original: [
    {
      address: "0x8f5D6332eD11338D2dA4fAAC6675e9A6757BeC8b",
      chainId: 109,
    },
    {
      address: "0xb0F9cE8598c623Ff42e52388F9b452B7CDc409a1",
      chainId: 145,
    },
    {
      address: "0x081dF5af5d022D4A4a4520D4D0D336B8432fDBBb",
      chainId: 111,
    },
    {
      address: "0x081dF5af5d022D4A4a4520D4D0D336B8432fDBBb",
      chainId: 110,
    },
  ],
  wrapped: [
    {
      address: "0xe453d6649643F1F460C371dC3D1da98F7922fe51",
      chainId: 109,
    },
    {
      address: "0x4014115fB4816Bc8343d8e69d2708Fa738dCaa15",
      chainId: 145,
    },
    {
      address: "0xEEd9154F63f6F0044E6b00dDdEFD895b5B4ED580",
      chainId: 111,
    },
    {
      address: "0xe453d6649643F1F460C371dC3D1da98F7922fe51",
      chainId: 110,
    },
  ],
  originalFuse: [
    {
      address: "0x36207130CF22d8C54842569A32a0Cd5D711f3580",
      chainId: 109,
    },
    {
      address: "0xc465107230c21f154627e017b6727A3C18984B02",
      chainId: 145,
    },
    {
      address: "0xeC3FD32cd5389FbC581427A648d6dc1bc5cfFE3B",
      chainId: 111,
    },
    {
      address: "0x56dF61E9f39C75e2d84C05753557bEBB9841Eb5B",
      chainId: 110,
    },
  ],
  tokens: [
    [
      {
        chainId: 138,
        decimals: 6,
        symbol: "USDC",
        name: "USD Coin",
        isBridged: true,
        isNative: false,
        address: "0x28C3d1cD466Ba22f6cae51b1a4692a831696391A",
      },
      {
        chainId: 109,
        decimals: 6,
        symbol: "USDC",
        name: "USD Coin (PoS)",
        isBridged: false,
        isNative: false,
        address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
      },
      {
        chainId: 111,
        decimals: 6,
        symbol: "USDC",
        name: "USDC Coin",
        isBridged: false,
        isNative: false,
        address: "0x7F5c764cBc14f9669B88837ca1490cCa17c31607",
      },
      {
        chainId: 110,
        decimals: 6,
        symbol: "USDC",
        name: "USDC Coin",
        isBridged: false,
        isNative: false,
        address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
      },
    ],
    [
      {
        chainId: 138,
        decimals: 18,
        symbol: "FUSE",
        name: "FUSE",
        isBridged: false,
        isNative: true,
        address: hex,
      },
      {
        chainId: 109,
        decimals: 18,
        symbol: "FUSE",
        name: "FUSE",
        isBridged: true,
        isNative: true,
        address: "0x6b021b3f68491974bE6D4009fEe61a4e3C708fD6",
      },
      {
        chainId: 111,
        decimals: 18,
        symbol: "FUSE",
        name: "FUSE",
        isBridged: true,
        isNative: true,
        address: "0xe453d6649643F1F460C371dC3D1da98F7922fe51",
      },
      {
        chainId: 110,
        decimals: 18,
        symbol: "FUSE",
        name: "FUSE",
        isBridged: true,
        isNative: true,
        address: "0x6b021b3f68491974bE6D4009fEe61a4e3C708fD6",
      },
    ],
    [
      {
        chainId: 138,
        decimals: 18,
        symbol: "WETH",
        name: "Wrapped Ether",
        isBridged: true,
        isNative: false,
        address: "0x5622F6dC93e08a8b717B149677930C38d5d50682",
      },
      {
        chainId: 109,
        decimals: 18,
        symbol: "WETH",
        name: "Wrapped Ether",
        isBridged: false,
        isNative: false,
        address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
      },
      {
        chainId: 111,
        decimals: 18,
        symbol: "WETH",
        name: "Wrapped Ether",
        isBridged: false,
        isNative: false,
        address: "0x4200000000000000000000000000000000000006",
      },
      {
        chainId: 110,
        decimals: 18,
        symbol: "WETH",
        name: "Wrapped Ether",
        isBridged: false,
        isNative: false,
        address: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
      },
    ],
    [
      {
        chainId: 138,
        decimals: 6,
        symbol: "USDT",
        name: "Tether USD",
        isBridged: true,
        isNative: false,
        address: "0x68c9736781E9316ebf5c3d49FE0C1f45D2D104Cd",
      },
      {
        chainId: 109,
        decimals: 6,
        symbol: "USDT",
        name: "Tether USD",
        isBridged: false,
        isNative: false,
        address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
      },
      {
        chainId: 111,
        decimals: 6,
        symbol: "USDT",
        name: "Tether USD",
        isBridged: false,
        isNative: false,
        address: "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
      },
      {
        chainId: 110,
        decimals: 6,
        symbol: "USDT",
        name: "Tether USD",
        isBridged: false,
        isNative: false,
        address: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
      },
    ],
  ],
};
