"use client"

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FaGithub } from "react-icons/fa";

export default function Header() {
  return (
    <header className="w-full flex justify-between items-center p-4 border-b shadow-sm bg-white">
      {/* Logo Section */}
      <div className="flex items-center gap-2">
        {/* <Image src="/logo.png" alt="Logo" width={32} height={32} /> */}
        <span className="font-semibold text-lg">TSender</span>
      </div>

      {/* Right Side: GitHub + Wallet Connect */}
      <div className="flex items-center gap-4">
        <a
          href="https://github.com/Priyantar-Jonak/ts-tsender-ui"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-black"
        >
          <FaGithub size={20} />
        </a>
        <ConnectButton />
      </div>
    </header>
  );
}
