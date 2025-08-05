"use client"

import { getDefaultConfig } from "@rainbow-me/rainbowkit"
import { anvil, zksync, mainnet } from "wagmi/chains"
import { type Config } from "wagmi"

const config: Config = getDefaultConfig({
  appName: "TSender",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  chains: [anvil, zksync, mainnet],
  ssr: false,
})

export default config
