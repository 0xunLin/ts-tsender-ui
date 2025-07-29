"use client"

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { anvil, zksync, mainnet } from "wagmi/chains";

export default getDefaultConfig({
    appName: "TSender",
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    chains: [anvil, zksync, mainnet],
    ssr: false, // server side rendering is set to false beacuse at the moment we want to make it a static site
})