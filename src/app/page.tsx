"use client";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Button, Web3Modal, Web3NetworkSwitch } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { arbitrum, mainnet, polygon } from "wagmi/chains";

export const WalletConnect = ({ children }: { children: React.ReactNode }) => {
  "use client";
  const chains = [arbitrum, mainnet, polygon];
  const projectId = "05dc1422724e6ae6cf9b1fc82fcfc0aa";

  const { publicClient } = configureChains(chains, [
    w3mProvider({ projectId }),
  ]);
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, version: 1, chains }),
    publicClient,
  });
  const ethereumClient = new EthereumClient(wagmiConfig, chains);

  return (
    <>
      <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
};

export default function Home() {
  return (
    <WalletConnect>
      <div className="flex justify-center items-center h-screen ">
        <div>
          <div>Dapp</div>
          <Web3Button />
          <Web3NetworkSwitch />
        </div>
      </div>
    </WalletConnect>
  );
}
