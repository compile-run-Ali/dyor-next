import BaseLayout from "@/components/BaseLayout/BaseLayout";
import Overview from "@/components/Developer/Overview/Overview";
import { useEthers } from "@usedapp/core";
import React, { useEffect, useState } from "react";
import ERC_ABI from '@/config/abi/ERC20.json'
import { ethers } from "ethers";
import { useModal } from "react-simple-modal-provider";
import axios from "axios";
import { DYOR_TOKEN } from "@/config/constants/tokens";

const OverviewPage = () => {
  const [data, setData] = useState();
  const [topVoted, setTopVoted] = useState();
  const { account, chainId, switchNetwork } = useEthers();
  const [showPage, setShowPage] = useState(true);
  const { open: openModal } = useModal("ConnectionModal");

  const checkToken = async () => {
    if (!account) {
      openModal();
      return
    }

    const res = await axios.post("/api/fetch_developer", {
      developer_wallet: account,
    });

    if (res.data.length > 0) {
      setShowPage(true)
      return
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const tokenContract = new ethers.Contract(DYOR_TOKEN, ERC_ABI, signer);
    const myaccount = await signer.getAddress();
    const balance = await tokenContract.balanceOf(myaccount);
    let tokenDecimals = 18;
    const balanceInToken = ethers.utils.formatEther(balance, tokenDecimals); // Convert balance to BNB

    if (balanceInToken < 150000) {
      setShowPage(false)
    }

    console.log(`Wallet has ${balanceInToken} DYOR`);
  }


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/fetch_developers");
      const res_data = await response.json();
      let tags = ["BSC"]
      for (let i = 0; i < res_data.length; i++) {
        res_data[i].tags = tags;
      }
      let topVoted = res_data.sort((a, b) => b.votes - a.votes).slice(0, 5);
      setData(res_data);
      setTopVoted(topVoted);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!account) return

    if (chainId !== 56) {
      switchNetwork(56);
      return;
    }

    checkToken()
  }, [account, chainId])




  return (
    <BaseLayout title={"Overview"}>
      {account && showPage ? <Overview data={data} topVoted={topVoted} />
        :
        <div className="bg-gold font-nunito_sans text-white text-center py-2 mt-5">Please connect your wallet to view this page or you don&#39;t have enough tokens</div>}
    </BaseLayout>
  );
};

export default OverviewPage;
