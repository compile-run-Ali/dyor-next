import axios from "axios";
import { ethers } from "ethers";
import Image from "next/image";
import React, { useState } from "react";
import ERC_ABI from "@/config/abi/ERC20.json";
import OwnerABI from "@/config/abi/OwnerABI.json";
import RevenueShareABI from "@/config/abi/RevenueShare.json";
import GetOwnerABI from "@/config/abi/GetOwnerABI.json";
import { useEthers } from "@usedapp/core";
import { useModal } from "react-simple-modal-provider";
import { registrationFee } from "@/config/constants/registration_constants";
import Web3 from "web3";
import {
  USDT_ADDRESS,
  WALLET_TRANSFER,
  REVENUE_SHARE_ADDRESS,
} from "@/config/constants/tokens";

export default function Registration() {
  const { account } = useEthers();
  const [errors, setErrors] = useState({});
  const [profile_picture, setProfilePicture] = useState("");
  const [developer_name, setDeveloperName] = useState("");
  const [scam_type, setScamType] = useState("");
  const [developer_wallet, setDeveloperWallet] = useState("");
  const [developer_website, setDeveloperWebsite] = useState("");
  const [developer_telegram, setDeveloperTelegram] = useState("");
  const [developer_twitter, setDeveloperTwitter] = useState("");
  const [telegram_project, setTelegramProject] = useState("");
  const [contract_address, setContractAddress] = useState("");
  const [contract_owner, setContractOwner] = useState("");
  const { open: openModal } = useModal("ConnectionModal");
  const { open: openModalRegistration } = useModal("RegistrationModal");

  const getOwner = async (contractAddress) => {
    const web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
    try {
      const uploadedContract = new web3.eth.Contract(OwnerABI, contractAddress);
      let owner = await uploadedContract.methods.owner().call();
      console.log(owner, "contract owner");
      setContractOwner(owner);
    } catch (e) {
      try {
        const uploadedContract = new web3.eth.Contract(
          GetOwnerABI,
          contractAddress
        );
        let owner = await uploadedContract.methods.getOwner().call();
        console.log(owner, "contract owner");
        setContractOwner(owner);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleTransfer = async () => {
    if (!account) {
      openModal();
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    debugger;
    const USDTcontract = new ethers.Contract(USDT_ADDRESS, ERC_ABI, signer);
    const RevenueShareContract = new ethers.Contract(
      REVENUE_SHARE_ADDRESS,
      RevenueShareABI,
      signer
    );
    const previous_balance = await USDTcontract.balanceOf(account);
    const decimals = await USDTcontract.decimals();
    const balanceInToken = ethers.utils.formatEther(previous_balance, decimals); // Convert balance to BNB

    console.log(balanceInToken);
    if (balanceInToken > registrationFee) {
      try {
        //await contract.transfer("0x4475F395590f6E75474502C915A44DFe9A5FA652", ethers.utils.parseUnits("100", 18));
        await USDTcontract.approve(
          REVENUE_SHARE_ADDRESS,
          ethers.utils.parseUnits("100", decimals)
        );
        await RevenueShareContract.receiveUSDT();
      } catch (e) {
        return;
      }
    } else {
      alert("You do not have enough USDT in your wallet to register");
      return;
    }

    await axios.post("/api/register", {
      profile_picture: profile_picture,
      developer_name: developer_name,
      developer_about: scam_type,
      developer_wallet: developer_wallet,
      developer_website: developer_website,
      developer_telegram: developer_telegram,
      developer_twitter: developer_twitter,
      telegram_project: telegram_project,
      contract_address: contract_address,
    });

    openModalRegistration();
  };

  const checkForm = async (e) => {
    e.preventDefault();
    let errors = {};
    if (developer_name === "") {
      errors.developer_name = "Developer name is required";
    }
    if (scam_type === "") {
      errors.scam_type = "Scam type is required";
    }
    if (developer_wallet === "") {
      errors.developer_wallet = "Developer wallet is required";
    }
    if (developer_website === "") {
      errors.developer_website = "Developer website is required";
    }
    if (developer_telegram === "") {
      errors.developer_telegram = "Developer telegram is required";
    }

    if (developer_twitter === "") {
      errors.developer_twitter = "Developer twitter is required";
    }
    if (telegram_project === "") {
      errors.telegram_project = "Telegram project is required";
    }
    if (contract_address === "") {
      errors.contract_address = "Transaction address is required";
    }

    setErrors(errors);
    console.log(errors);

    if (Object.keys(errors).length === 0) {
      const res = await axios.post("/api/registration_check", {
        developer_wallet: developer_wallet,
        contract_address: contract_address,
      });

      try {
        await getOwner(contract_address);
      } catch (e) {
        console.log(e);
        alert("Unable to get contract owner");
        return;
      }

      if (developer_wallet.toLowerCase() !== contract_owner.toLowerCase()) {
        alert("This contract is not owned by this wallet");
        return;
      }

      console.log(res.data);
      if (res.data.length > 0) {
        alert("This wallet or contract address is already registered");
        return;
      }

      handleTransfer();
    }
  };

  return (
    <main className="workspace">
      <section className="breadcrumb">
        <h1 className="text-[32px] text-muted">DOGE your own research</h1>
        <ul className="text-[#57534E] text-sm flex mb-4">
          <li>
            <a href="#">Home</a>
          </li>
          <Image
            width={12}
            height={10}
            className="mx-2 "
            src="/images/arrow.svg"
            alt="arrow"
          />

          <li>
            <a href="#">Developers</a>
          </li>
          <Image
            width={12}
            height={10}
            className="mx-2"
            src="/images/arrow.svg"
            alt="arrow"
          />

          <li className="text-muted">Registration</li>
        </ul>
      </section>
      <div className="card !bg-white dark:!bg-primary p-5 mt-5 mb-10 flex flex-row">
        <div className="w-full">
          <span className="text-gold font-bold text-lg">
            Developer Registration
          </span>
          <div className="mt-5">
            <form
              id="app"
              onSubmit={checkForm}
              action="/"
              method="post"
              className="text-muted font-bold text-sm"
            >
              <div className="mb-7 relative flex">
                <input
                  id="profile-picture "
                  name="profile-picture"
                  type="text"
                  className="form-control w-full"
                  onChange={(e) => setProfilePicture(e.target.value)}
                  placeholder="Link to Image"
                />
                <div className="input-addon  input-group-item w-[200px] !bg-gold !text-white dark:!text-[#1C1917] p-2 font-bold rounded-[3.3px] rounded-br-[3.3px] text-[12px] uppercase">
                  Profile Picture
                </div>
              </div>
              <div className="mb-5">
                <label className="label block mb-2" htmlFor="developer_name">
                  Developer Name <span className="invalid-feedback">*</span>
                </label>
                <input
                  id="developer_name"
                  name="developer_name"
                  type="text"
                  className="form-control"
                  placeholder="Your name"
                  onChange={(e) => setDeveloperName(e.target.value)}
                  defaultValue={developer_name}
                />
                <small
                  v-if="errors.developer_wallet"
                  className="block mt-2 invalid-feedback"
                >
                  {errors.developer_wallet}
                </small>
              </div>
              <div className="mb-5">
                <label className="label block mb-2" htmlFor="scam_type">
                  Description <span className="invalid-feedback">*</span>
                </label>
                <textarea
                  id="scam_type"
                  name="scam_type"
                  className="form-control"
                  rows="4"
                  placeholder="Tell us few things about you"
                  onChange={(e) => setScamType(e.target.value)}
                  defaultValue={scam_type}
                ></textarea>
                {errors.scam_type && (
                  <small className="block mt-2 invalid-feedback">
                    {errors.scam_type}
                  </small>
                )}
              </div>
              <div className="mb-5">
                <label className="label block mb-2" htmlFor="developer_wallet">
                  Developer Wallet <span className="invalid-feedback">*</span>
                </label>
                <input
                  id="developer_wallet"
                  name="developer_wallet"
                  type="text"
                  className="form-control"
                  placeholder="Please input a valid address"
                  onChange={(e) => setDeveloperWallet(e.target.value)}
                  value={developer_wallet}
                />
                {errors.developer_wallet && (
                  <small className="block mt-2 invalid-feedback">
                    {errors.developer_wallet}
                  </small>
                )}
              </div>

              <div className="w-full flex flex-row mb-5">
                <div className="w-full">
                  <label
                    className="label block mb-2"
                    htmlFor="telegram_username"
                  >
                    Telegram Username{" "}
                    <span className="invalid-feedback">*</span>
                  </label>
                  <div className="input-group">
                    <div className="input-addon input-addon-prepend input-group-item !bg-[#CA8A04] dark:!bg-[#292524] !text-white dark:!text-[#57534E]">
                      @
                    </div>
                    <input
                      id="telegram_username"
                      type="text"
                      name="telegram_username"
                      className="form-control input-group-item"
                      placeholder="Telegram Username"
                      onChange={(e) => setDeveloperTelegram(e.target.value)}
                      value={developer_telegram}
                    />
                  </div>
                  {errors.telegram_username && (
                    <small className="block mt-2 invalid-feedback">
                      {errors.telegram_username}
                    </small>
                  )}
                </div>
                <div className="w-full ml-5">
                  <label
                    className="label block mb-2"
                    htmlFor="twitter_username"
                  >
                    Twitter Username <span className="invalid-feedback">*</span>
                  </label>
                  <div className="input-group">
                    <div className="input-addon input-addon-prepend input-group-item !bg-[#CA8A04] dark:!bg-[#292524] !text-white dark:!text-[#57534E]">
                      @
                    </div>
                    <input
                      id="twitter_username"
                      type="text"
                      name="twitter_username"
                      className="form-control input-group-item"
                      placeholder="Twitter Username"
                      onChange={(e) => setDeveloperTwitter(e.target.value)}
                      value={developer_twitter}
                    />
                  </div>
                </div>
              </div>

              <div className="w-full flex flex-row mb-5">
                <div className="w-full ">
                  <label
                    className="label block mb-2"
                    htmlFor="telegram_project"
                  >
                    Telegram Project <span className="invalid-feedback">*</span>
                  </label>
                  <div className="input-group">
                    <input
                      id="telegram_project"
                      type="text"
                      name="telegram_project"
                      className="form-control input-group-item"
                      placeholder="Telegram Project"
                      onChange={(e) => setTelegramProject(e.target.value)}
                      value={telegram_project}
                    />
                  </div>
                  {errors.telegram_username && (
                    <small className="block mt-2 invalid-feedback">
                      {errors.telegram_username}
                    </small>
                  )}
                </div>
                <div className="w-full ml-5 ">
                  <label className="label block mb-2" htmlFor="website">
                    Website <span className="invalid-feedback">*</span>
                  </label>
                  <div className="input-group">
                    <input
                      id="website"
                      type="text"
                      name="website"
                      className="form-control input-group-item"
                      placeholder="Website"
                      onChange={(e) => setDeveloperWebsite(e.target.value)}
                      value={developer_website}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-5">
                <label className="label block mb-2" htmlFor="title">
                  Contract Address
                </label>
                <input
                  id="transactions"
                  name="transactions"
                  type="text"
                  className="form-control"
                  placeholder="Contract Address"
                  onChange={(e) => setContractAddress(e.target.value)}
                  value={contract_address}
                />
              </div>
              <div className="mb-5">
                <small>
                  Please ensure you have the required 100USDT on the BEP20
                  network to register
                </small>
              </div>
              <div className="mb-5">
                <small>
                  All fields with (<span className="invalid-feedback">*</span>)
                  are Required.
                </small>
              </div>
              <div className="">
                <button
                  type="submit"
                  className="bg-gold py-2 px-5 rounded-full  text-white dark:text-primary text-sm uppercase"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
