"use client"

import InputField from "./InputField"
import { useState } from "react"

export default function AirdropForm() {
    const [tokenAddress, setTokenAddress] = useState("")
    const [recipients, setRecipients] = useState("")
    const [amounts, setAmounts] = useState("")

    async function handleSubmit() {
        console.log(tokenAddress)
        console.log(recipients)
        console.log(amounts)
    }

    return (
        <div>
            <InputField
                label="Token Address"
                placeholder="0x"
                value={tokenAddress}
                onChange={ e => setTokenAddress(e.target.value)}
            />
            <InputField
                label="Recipients"
                placeholder="0x357f12fw617t81w...,0x632egd829y3273y...,..."
                value={recipients}
                onChange={ e => setRecipients(e.target.value)}
                large={true}
            />
            <InputField
                label="Amount"
                placeholder="Enter the amount to airdrop"
                value={amounts}
                onChange={ e => setAmounts(e.target.value)}
                large={true}
            />
            <button onClick={handleSubmit}>
                Send tokens
            </button>
        </div>
    )
}