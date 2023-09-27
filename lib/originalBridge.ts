import { ethers } from "ethers";
import { OriginalTokenBridgeAbi } from "@/lib/abi/OriginalTokenBridge";
import { AdapterParams } from "@layerzerolabs/ui-core";
import { serializeAdapterParams } from "@layerzerolabs/ui-evm";
import { getPublicClient, getWalletClient } from "wagmi/actions";
import { Address } from "abitype";
import { createPublicClient, http, parseEther, parseUnits } from "viem";

const publicClient = (rpcUrl: string) => {
  return createPublicClient({
    transport: http(rpcUrl)
  })
}

export const bridgeOriginal = async (
  bridgeAddress: Address,
  address: Address,
  tokenAddres: Address,
  amount: string,
  decimals: number,
  dstChainId: number
) => {
  const publicClient = getPublicClient()
  const dstGasLimit = await publicClient.readContract({
    address: bridgeAddress,
    abi: OriginalTokenBridgeAbi,
    functionName: "minDstGasLookup",
    args: [dstChainId, 0]
  })
  const adapterParams = AdapterParams.forV1(Number(dstGasLimit));
  const nativeFee = (await publicClient.readContract({
    address: bridgeAddress,
    abi: OriginalTokenBridgeAbi,
    functionName: "estimateBridgeFee",
    args: [false, serializeAdapterParams(adapterParams) as Address]
  }))[0]
  const increasedNativeFee = (Number(nativeFee) * 1.2).toFixed(0)
  const amt = parseUnits(amount, decimals);
  const callParams = {
    refundAddress: address,
    zroPaymentAddress: ethers.constants.AddressZero as Address,
  };
  const walletClient = await getWalletClient()
  if (walletClient) {
    const tx = await walletClient.writeContract({
      address: bridgeAddress,
      abi: OriginalTokenBridgeAbi,
      functionName: 'bridge',
      args: [
        tokenAddres,
        amt,
        address,
        callParams,
        serializeAdapterParams(adapterParams) as Address
      ],
      value: BigInt(increasedNativeFee)
    })
    return tx
  }
};

export const bridgeNative = async (
  bridgeAddress: Address,
  address: Address,
  amount: string,
  decimals: number,
  dstChainId: number
) => {
  const publicClient = getPublicClient()
  const dstGasLimit = await publicClient.readContract({
    address: bridgeAddress,
    abi: OriginalTokenBridgeAbi,
    functionName: "minDstGasLookup",
    args: [dstChainId, 0]
  })
  const adapterParams = AdapterParams.forV1(Number(dstGasLimit));
  const nativeFee = (await publicClient.readContract({
    address: bridgeAddress,
    abi: OriginalTokenBridgeAbi,
    functionName: "estimateBridgeFee",
    args: [false, serializeAdapterParams(adapterParams) as Address]
  }))[0]
  const increasedNativeFee = (Number(nativeFee) * 1.2).toFixed(0);
  const amt = parseEther(amount);
  const callParams = {
    refundAddress: address,
    zroPaymentAddress: ethers.constants.AddressZero as Address,
  };
  const walletClient = await getWalletClient()
  if (walletClient) {
    const tx = await walletClient.writeContract({
      address: bridgeAddress,
      abi: OriginalTokenBridgeAbi,
      functionName: 'bridgeNative',
      args: [
        amt,
        address,
        callParams,
        serializeAdapterParams(adapterParams) as Address
      ],
      value: amt + BigInt(increasedNativeFee)
    })
    return tx
  }
};

export const estimateOriginalNativeFee = async (
  bridgeAddress: Address,
  rpcUrl: string
) => {
  const dstGasLimit = await publicClient(rpcUrl).readContract({
    address: bridgeAddress,
    abi: OriginalTokenBridgeAbi,
    functionName: "minDstGasLookup",
    args: [138, 0]
  })
  const adapterParams = AdapterParams.forV1(Number(dstGasLimit));
  const nativeFee = (
    await publicClient(rpcUrl).readContract({
      address: bridgeAddress,
      abi: OriginalTokenBridgeAbi,
      functionName: "estimateBridgeFee",
      args: [false, serializeAdapterParams(adapterParams) as Address]
    })
  )[0]
  const increasedNativeFee = (Number(nativeFee) * 1.2).toFixed(0);
  return increasedNativeFee;
};
