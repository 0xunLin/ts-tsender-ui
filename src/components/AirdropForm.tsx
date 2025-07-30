"use client"

import InputField from "./InputField"
import { useState } from "react"
import { chainsToTSender, tsenderAbi, erc20Abi } from "@/constants"
import { useChainId, useConfig, useAccount } from "wagmi"
import { readContract } from "@wagmi/core"

export default function AirdropForm() {
    const [tokenAddress, setTokenAddress] = useState("")
    const [recipients, setRecipients] = useState("")
    const [amounts, setAmounts] = useState("")
    const chainId = useChainId()
    const config = useConfig()
    const accouunt = useAccount()

    async function getApprovedAmount(tSenderAddress: string | null): Promise<number> {
        if (!tSenderAddress) {
            alert("No address found, please use a supported chain")
            return 0
        }

        const response = await readContract(config, {
            abi: erc20Abi,
            address: tokenAddress as `0x${string}`,
            functionName: "allowance",
            args: [accouunt.address, tSenderAddress as `0x${string}`],
        }) // solidity equivalent of `token.allowance(account, tSenderAddress)`

        return response as number
    }

    async function handleSubmit() {
        // 1a. If already approved, move to step 2
        // 1b. Approve our tsender contract to send the tokens
        // 2. Call the airdrop function on the tsender contract with the token address, recipients, and amounts
        // 3. Wait for the transaction to be mined
        const tSenderAddress = chainsToTSender[chainId]["tsender"]
        const approvedAmount = await getApprovedAmount(tSenderAddress)
        console.log(approvedAmount)
    }

    return (
        <div>
            <InputField
                label="Token Address"
                placeholder="0x"
                value={tokenAddress}
                onChange={e => setTokenAddress(e.target.value)}
            />
            <InputField
                label="Recipients"
                placeholder="0x357f12fw617t81w...,0x632egd829y3273y...,..."
                value={recipients}
                onChange={e => setRecipients(e.target.value)}
                large={true}
            />
            <InputField
                label="Amount"
                placeholder="Enter the amount to airdrop"
                value={amounts}
                onChange={e => setAmounts(e.target.value)}
                large={true}
            />
            <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md"
            >
                Send Tokens
            </button>

        </div>
    )
}