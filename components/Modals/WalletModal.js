import React, { useEffect, useState } from "react";
import Modal, { useModalState } from "react-simple-modal-provider";

import WalletConnectProvider from '@walletconnect/web3-provider/dist/umd/index.min.js'

import { useEthers } from '@usedapp/core'

import { wallets } from "@/data/wallets";
import Image from "next/image";
import { networkConfig } from "@/config/networks";


export default function ConnectionModal({ children }) {
  const [isOpen, setOpen] = useModalState();
  const [logged, setLogged] = useState();
  const { activate, account, activateBrowserWallet, switchNetwork, chainId } = useEthers();


  const onConnect = async () => {
    try {
      const provider = new WalletConnectProvider({
        rpc: networkConfig.readOnlyUrls,
      })
      await provider.enable()
      await activate(provider)
    } catch (error) {
      console.error(error)
    }
  }


  const onMetamask = async () => {
    try {
      activateBrowserWallet()
    } catch (error) {
      console.error(error)
    }
  }


  useEffect(() => {
    if (account) {
      setOpen(false)
    }
  }, [account, setOpen])

  useEffect(() => {
    if (typeof account == "undefined") {
      return;
    }
    if (account && typeof logged == "undefined") {
      if (chainId !== 56) {
        switchNetwork(56);
      }

      setLogged(account);
      return;
    }
    if (account !== logged) {
      window.location.reload();
    }
  }, [account, logged]);


  return (
    <Modal
      id={"ConnectionModal"}
      consumer={children}
      isOpen={isOpen}
      setOpen={setOpen}
    >
      <div className="p-9 w-[90%] max-w-[520px] bg-white dark:bg-fields text-muted rounded-[10px] mx-auto">
        <div className="flex justify-between items-center  ">
          <span className="text-dark-text dark:text-light-text font-gilroy font-semibold text-lg">
            Connect Wallet
          </span>

          <div
            className="flex items-center cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <span className="text-sm font-gilroy font-semibold text-dark-text dark:text-light-text mr-2">
              Close
            </span>
            <div className="flex justify-center items-center bg-[#E56060] text-[#E56060] bg-opacity-10 rounded-full w-[15px] h-[15px]">
              &#10005;
            </div>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-8">
          {/* Metamask */}
          <button
            className="flex focus:outline-none focus:outline-gold py-4 px-4 flex-col items-center justify-center"
            key={wallets[0].id}
            onClick={onMetamask}
          >
            <Image
              src={wallets[0].image}
              alt={wallets[0].name}
              width={50}
              height={50}
              className="mb-4"
            />
            <span className="font-gilroy font-semibold text-dark-text dark:text-light-text">
              {wallets[0].name}
            </span>
          </button>
          <button
            className="flex focus:outline-none focus:outline-gold active:outline-none py-4 px-4 flex-col items-center justify-center"
            key={wallets[1].id}
            onClick={onConnect}
          >
            <Image
              src={wallets[1].image}
              alt={wallets[1].name}
              width={50}
              height={50}
              className="mb-4"
            />
            <span className="font-gilroy font-semibold text-dark-text dark:text-light-text">
              {wallets[1].name}
            </span>
          </button>
        </div>

        <div className="flex justify-center mt-12">
          <span className="text-gray dark:text-gray-dark font-semibold font-gilroy">
            Haven’t got a crypto wallet yet?
          </span>
        </div>

        <div className="flex justify-center mt-5">
          <span className="text-primary-green font-semibold font-gilroy">
            Learn how to connect
          </span>
        </div>
      </div>
    </Modal>
  );
}
