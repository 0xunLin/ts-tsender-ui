"use client"

import InputField from "./InputField"
import { useState, useMemo, useEffect } from "react"
import { chainsToTSender, tsenderAbi, erc20Abi } from "@/constants"
import { useChainId, useConfig, useAccount, useWriteContract } from "wagmi"
import { readContract, waitForTransactionReceipt } from "@wagmi/core"
import { calculateTotal } from "@/utils" // used index.ts in utils to shorten the import(location)
import { write } from "fs"
import { AiOutlineLoading3Quarters } from "react-icons/ai" // Spinner icon from react-icons

export default function AirdropForm() {
    // Read from localStorage on initial load
    const [tokenAddress, setTokenAddress] = useState("")
    const [recipients, setRecipients] = useState("")
    const [amounts, setAmounts] = useState("")
    const [loading, setLoading] = useState(false)

    const chainId = useChainId()
    const config = useConfig()
    const accouunt = useAccount()

    const total: number = useMemo(() => calculateTotal(amounts), [amounts]) // this says whenever the amounts variable changes, call the function calculateTotal
    const { data: hash, isPending, writeContractAsync } = useWriteContract()

    // Load initial values from localStorage on client side
    useEffect(() => {
        if (typeof window !== "undefined") {
            setTokenAddress(localStorage.getItem("tokenAddress") || "")
            setRecipients(localStorage.getItem("recipients") || "")
            setAmounts(localStorage.getItem("amounts") || "")
        }
    }, [])

    // state to localStorage when values change
    useEffect(() => {
        localStorage.setItem("tokenAddress", tokenAddress)
    }, [tokenAddress])

    useEffect(() => {
        localStorage.setItem("recipients", recipients)
    }, [recipients])

    useEffect(() => {
        localStorage.setItem("amounts", amounts)
    }, [amounts])

    async function getApprovedAmount(tSenderAddress: string | null): Promise<number> {
        if (!tSenderAddress) {
            alert("No address found, please use a supported chain")
            return 0
        }

        console.log("Token:", tokenAddress)
        console.log("Recipients:", recipients)
        console.log("Amounts:", amounts)
        console.log("Total:", total)

        const response = await readContract(config, {
            abi: erc20Abi,
            address: tokenAddress as `0x${string}`,
            functionName: "allowance",
            args: [accouunt.address, tSenderAddress as `0x${string}`],
        }) // solidity equivalent of `token.allowance(account, tSenderAddress)`

        return response as number
    }

    async function handleSubmit() {
        const trimmedToken = tokenAddress.trim()
        const recipientList = recipients.split(/[,\n]+/).map(addr => addr.trim()).filter(addr => addr !== "")
        const amountList = amounts.split(/[,\n]+/).map(amount => amount.trim()).filter(amount => amount !== "")

        if (
            !trimmedToken ||
            !trimmedToken.startsWith("0x") ||
            trimmedToken.length !== 42 ||
            recipientList.length === 0 ||
            amountList.length === 0 ||
            recipientList.length !== amountList.length
        ) {
            alert("Please provide a valid token address, recipients, and matching amounts.")
            return
        }

        setLoading(true)
        // 1a. If already approved, move to step 2
        // 1b. Approve our tsender contract to send the tokens
        // 2. Call the airdrop function on the tsender contract with the token address, recipients, and amounts
        // 3. Wait for the transaction to be mined
        const tSenderAddress = chainsToTSender[chainId]["tsender"]
        const approvedAmount = await getApprovedAmount(tSenderAddress)

        // 1b. and 2.
        if (approvedAmount < total) {
            const approvalHash = await writeContractAsync({
                abi: erc20Abi,
                address: tokenAddress as `0x${string}`,
                functionName: "approve",
                args: [tSenderAddress as `0x${string}`, BigInt(total)],
            })
            const approvalReceipt = await waitForTransactionReceipt(config, {
                hash: approvalHash
            })
            console.log("Approval receipt:", approvalReceipt)

            await writeContractAsync({
                abi: tsenderAbi,
                address: tSenderAddress as `0x${string}`,
                functionName: "airdropERC20",
                args: [
                    tokenAddress,
                    // comma or newline seperated
                    recipients.split(/[,\n]+/).map(addr => addr.trim()).filter(addr => addr !== ""),
                    amounts.split(/[,\n]+/).map(amount => amount.trim()).filter(amount => amount !== ""),
                    BigInt(total),
                ],
            })
        } else { // 1a. and 2.
            await writeContractAsync({
                abi: tsenderAbi,
                address: tSenderAddress as `0x${string}`,
                functionName: "airdropERC20",
                args: [
                    tokenAddress,
                    // comma or newline seperated
                    recipients.split(/[,\n]+/).map(addr => addr.trim()).filter(addr => addr !== ""),
                    amounts.split(/[,\n]+/).map(amount => amount.trim()).filter(amount => amount !== ""),
                    BigInt(total),
                ],
            })
        }

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
                disabled={loading}
                className={`flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md ${loading ? "bg-blue-400 cursor-not-allowed" : "hover:bg-blue-700"
                    }`}
            >
                {loading && (
                    <AiOutlineLoading3Quarters className="animate-spin text-white text-lg" />
                )}
                {loading ? "The transaction is taking place..." : "Send Tokens"}
            </button>

        </div>
    )
}