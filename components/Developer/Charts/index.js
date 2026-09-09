import { useTheme } from 'next-themes';
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { useEthers } from '@usedapp/core'
import { useModal } from 'react-simple-modal-provider';
import axios from 'axios';
import TokenInfo from './TokenInfo';
import DexScreener from './DexScreener';

export default function Charts({ wallet }) {
    const { account } = useEthers();
    const [profile, setProfile] = useState(true)
    const [currentCharts, setCurrentCharts] = useState(true)
    const [menuOpen, setMenuOpen] = useState(false)
    const [tablemenu, setTableMenu] = useState(false)
    const graph = useRef(null)
    const [projects, setProjects] = useState(null)
    const [developer, setDeveloper] = useState()
    const { open: openModal } = useModal("OpenProject");
    const [loaded, setLoaded] = useState(true)


    const fetchOldProjects = async () => {
        try {
            const response = await axios.post('/api/fetch_old_projects', { developer_wallet: wallet })
            let data = await response.data
            setProjects(data)
            console.log(data)
        } catch (err) {
            console.log(err)
        }
    }


    const fetchDeveloper = async () => {
        try {
            const response = await axios.post('/api/fetch_developer', { developer_wallet: wallet })
            let data = await response.data
            setDeveloper(data[0])
            console.log(data[0])
        } catch (err) {
            console.log(err)
        }
        setLoaded(true)
    }



    useEffect(() => {
        console.log(account)
        if (account) {
            setLoaded(false)
            fetchDeveloper()
            fetchOldProjects()
        }
    }, [account])



    const toggleProfile = (bool) => {
        setProfile(bool)
    }

    const toggleCurrentCharts = (bool) => {
        setCurrentCharts(bool)
    }

    const toggleMenu = (bool) => {
        setMenuOpen(bool)
    }

    const toggleTableMenu = (bool) => {
        setTableMenu(bool)
    }

    const toggleMenuProfile = () => {
        toggleMenu(false);
        toggleProfile(true);
    }

    if (!loaded) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div role="status">
                    <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gold fill-gold" viewBox="0 0 100 101" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    }
    else {
        return (

            <main className="workspace font-nunito">
                <section className="breadcrumb">
                    <h1 className='text-[32px] text-muted'>DOGE your own research</h1>
                    <ul className='text-[#57534E] text-sm flex mb-4'>
                        <li><a href="#">Home</a></li>
                        <Image width={12} height={10} className="mx-2" src="/images/arrow.svg" alt="arrow" />

                        <li><a href="#">Developers</a></li>
                        <Image width={12} height={10} className="mx-2" src="/images/arrow.svg" alt="arrow" />

                        <li className='text-muted'>Charts</li>
                    </ul>
                </section>
                <div className="card !bg-[#F9F9F9] dark:!bg-[#292524] py-10 mt-5 mb-10 hidden lg:block">
                    <div className="grid grid-rows-4">
                        <div className=" row-span-4">
                            <div className="grid grid-cols-10">
                                <div className=" col-span-3">
                                    <div className="grid grid-rows-5">
                                        <div className=" row-span-3 h-full w-full flex justify-end items-center">
                                            <div className=" rounded-3xl !bg-white dark:!bg-[#1C1917] w-[90%]">
                                                <div className="flex flex-row justify-around items-center mt-5">
                                                    {/* <div>
                                                        <img className="" src="/images/Vector.png" />
                                                    </div> */}
                                                    <div className="flex flex-col justify-center text-center">
                                                        {developer?.profile_picture ?
                                                            <Image className='rounded-lg' width={130} height={130} src={`${developer?.profile_picture}`} alt="profile-picture" />
                                                            :
                                                            <img src="/images/profile-pic.png" />
                                                        }
                                                        <span className="mt-3 font-extrabold text-gold text-xl">
                                                            {developer?.developer_name ? developer?.developer_name : "Pim Kfale"}
                                                        </span>
                                                        <span className="text-sm font-semibold text-[#57534E]">@
                                                            {developer?.developer_telegram ? developer?.developer_telegram : "pimkfale"}
                                                        </span>
                                                    </div>
                                                    {/* <div>
                                                        <img src="/images/more.png" />
                                                    </div> */}
                                                </div>
                                                <div className="px-10 my-5 flex flex-col">
                                                    <span className="text-xl font-extrabold text-gold">About</span>
                                                    {developer?.developer_about ? <span className="text-[12px] font-normal text-[#57534E]">
                                                        {developer?.developer_about}
                                                    </span>
                                                        :
                                                        <span className="text-[12px] font-normal text-[#57534E] dark:text-[#292524]">

                                                            If we can imagine web3 as a car then, web3 libraries/dApps are the car&apos;s
                                                            chassis, smart contracts/blockchain are the internal hardware
                                                            components, wallets.. <span className="text-gold">read more</span></span>}
                                                </div>
                                                {developer && developer?.developer_wallet === account &&

                                                    <div className="px-10 my-5 flex flex-col">
                                                        <button className="bg-gold text-white font-semibold py-2 px-4 rounded-full"
                                                            onClick={openModal}>
                                                            Open a New Project
                                                        </button>
                                                    </div>
                                                }
                                                <div className="px-7 my-10 flex flex-row justify-between ">
                                                    <a href={`https://twitter.com/${developer?.developer_twitter}`} target="_blank" rel="noreferrer">
                                                        <div className="flex flex-row items-center">
                                                            <img className="mr-2 dark:hidden" src="/images/twitter.svg" />
                                                            <img className="mr-2 hidden dark:block" src="/images/twitter.png" />
                                                            <span
                                                                className="text-sm font-semibold text-[#57534E]">@
                                                                {developer?.developer_twitter ? developer?.developer_twitter : "pimkfalecomunity"}
                                                            </span>
                                                        </div>
                                                    </a>

                                                    <a href={`https://t.me/${developer?.developer_telegram}`} target="_blank" rel="noreferrer">
                                                        <div className="flex flex-row items-center">
                                                            <img className="mr-2 dark:hidden" src="/images/telegram.svg" />
                                                            <img className="mr-2 hidden dark:block" src="/images/telegram.png" />
                                                            <span className="text-sm font-semibold text-[#57534E]">@
                                                                {developer?.developer_telegram ? developer?.developer_telegram : "pimkfaleee"}
                                                            </span>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        {developer ?
                                            <TokenInfo contract_address={developer?.contract_address} />
                                            :
                                            <TokenInfo />
                                        }
                                    </div>
                                </div>
                                <div className=" col-span-7 px-8 h-full w-full flex justify-center items-center" >
                                    <div className='h-full w-full flex justify-center items-center  dark:bg-primary' ref={graph}>
                                        {<DexScreener chartAddress={developer?.contract_address} networkName={"bsc"} />}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {projects && projects.length > 0 &&
                            <div className="row-span-2 my-10 ">
                                <div className="grid grid-cols-3 h-full gap-3">
                                    {projects?.map((project, index) => (
                                        <div key={index} className="col-span-1 p-2 h-[400px] w-full flex justify-center items-center">
                                            <div className="w-full h-full " id="small-graph">
                                                <DexScreener chartAddress={project.contract_address} networkName={"bsc"} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>}
                    </div>
                    {projects &&
                        <div className="w-full mt-14 flex justify-center items-center">
                            <button className=" rounded-3xl bg-white dark:bg-[#1C1917] text-[#292524] text-xs font-bold uppercase py-2 px-5 infobox-shadow">
                                See More
                            </button>
                        </div>}
                </div>

                <div className="card !bg-[#F9F9F9] dark:!bg-[#292524] py-10 mt-[50px] mb-10 lg:hidden flex items-center justify-center relative">
                    <div className="absolute top-[-30px] w-full h-[70px] flex flex-row ">
                        <div onClick={toggleMenuProfile} className={`w-[50%] rounded-t-3xl  h-full flex justify-center ${!profile ? 'bg-[#F2F2F1] dark:bg-[#1E1916]' : "bg-[#F9F9F9] dark:bg-[#292524]"}`} >
                            <span className="text-[#57534E] font-semibold text-[25px] mt-6">Profile</span>
                        </div>
                        <div className={`w-[50%] rounded-t-3xl h-full flex flex-row justify-center relative ${profile ? 'bg-[#F2F2F1] dark:bg-[#1E1916]' : "bg-[#F9F9F9] dark:bg-[#292524]"}`}>
                            <div onClick={() => toggleMenu(true)} className="flex flex-row">
                                <span className="text-[#57534E] font-semibold text-[25px] mt-6">{profile ? "Charts" : currentCharts ? "Current" : "Previous"}</span>
                                <img className="ml-2 w-[14px] h-[8px] mt-8" src="/images/mobile/arrow-down.png" />
                            </div>
                            <div className={`w-full absolute top-0 right-0 !rounded-t-3xl rounded-b-3xl flex flex-col z-50 ${menuOpen ? 'block' : "hidden"}`} >
                                <div onClick={() => toggleMenu(false)} className="w-full h-[60px] bg-[#F9F9F9] dark:bg-[#292524] flex flex-row justify-center items-center">
                                    <span className="text-[#57534E] font-semibold text-[25px]">Charts</span>
                                    <img className="ml-2 w-[14px] h-[8px]" src="/images/mobile/arrow-up.png" />
                                </div>
                                <div onClick={() => { toggleCurrentCharts(true); toggleProfile(false); toggleMenu(false) }} className="w-full h-[60px] bg-[#F2F2F1] dark:bg-[#282423] flex flex-row justify-center items-center">
                                    <span className="text-[#393532] font-semibold text-[25px]">Current</span>
                                    <img className="ml-2 w-[14px] h-[8px]" src="/images/mobile/current.png" />
                                </div>
                                <div onClick={() => { toggleCurrentCharts(false); toggleProfile(false); toggleMenu(false) }} className="w-full h-[60px] bg-[#F2F2F1] dark:bg-[#282423] flex flex-row justify-center items-center">
                                    <span className="text-[#393532] font-semibold text-[25px]">Previous</span>
                                    <img className="ml-2 w-[14px] h-[8px]" src="/images/mobile/previous.png" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={` rounded-3xl !bg-[#F9F9F9] dark:!bg-[#292524] w-full max-w-[550px] mt-10 ${profile ? "block" : "hidden"}`} >
                        <div className="flex flex-row justify-around items-center mt-5">
                            <div>
                                <img className="dark:hidden" src="/images/mobile/shareicon-light.png" />
                                <img className="hidden dark:block" src="/images/mobile/shareicon-dark.png" />
                            </div>
                            <div className="flex flex-col justify-center text-center">
                                {developer?.profile_picture ?
                                    <Image className='rounded-lg' width={130} height={130} src={`${developer?.profile_picture}`} alt="profile-picture" />
                                    :
                                    <img src="/images/profile-pic.png" />
                                }
                                <span className="mt-3 font-extrabold text-gold text-xl">
                                    {developer?.developer_name ? developer?.developer_name : "Pim Kfale"}
                                </span>
                                <span className="text-sm font-semibold text-[#57534E]">
                                    {developer?.developer_telegram ? developer?.developer_telegram : "pimkfale"}
                                </span>
                            </div>
                            <div>
                                <img className="dark:hidden" src="/images/mobile/menuicon-light.png" />
                                <img className="hidden dark:block" src="/images/mobile/menuicon-dark.png" />
                            </div>
                        </div>
                        <div className="px-10 my-5 flex flex-col">
                            <span className="text-xl font-extrabold text-[#292524]">About</span>
                            {developer?.developer_about ? <span className="text-[12px] font-normal text-[#57534E]">
                                {developer?.developer_about}
                            </span> :
                                <span className="text-[12px] font-normal text-[#57534E] dark:text-[#78716C]">If
                                    we can imagine web3 as a car then, web3 libraries/dApps are the car&apos;s
                                    chassis, smart contracts/blockchain are the internal hardware
                                    components, wallets.. <span className="text-gold">read more</span></span>
                            }
                        </div>
                        {developer && developer?.developer_wallet === account &&

                            <div className="px-10 my-5 flex flex-col">
                                <button className="bg-gold text-white font-semibold py-2 px-4 rounded-full"
                                    onClick={openModal}>
                                    Open a New Project
                                </button>
                            </div>
                        }
                        <div className="px-7 my-10 flex flex-row justify-between ">
                            <a href={`https://twitter.com/${developer?.developer_twitter}`} target="_blank" rel="noreferrer">
                                <div className="flex flex-row items-center">
                                    <img className="mr-2 dark:hidden" src="/images/twitter.svg" />
                                    <img className="mr-2 hidden dark:block" src="/images/twitter.png" />
                                    <span
                                        className="text-sm font-semibold text-[#57534E]">@
                                        {developer?.developer_twitter ? developer?.developer_twitter : "pimkfalecomunity"}
                                    </span>
                                </div>
                            </a>

                            <a href={`https://t.me/${developer?.developer_telegram}`} target="_blank" rel="noreferrer">
                                <div className="flex flex-row items-center">
                                    <img className="mr-2 dark:hidden" src="/images/telegram.svg" />
                                    <img className="mr-2 hidden dark:block" src="/images/telegram.png" />
                                    <span className="text-sm font-semibold text-[#57534E]">@
                                        {developer?.developer_telegram ? developer?.developer_telegram : "pimkfaleee"}
                                    </span>
                                </div>
                            </a>
                        </div>
                    </div>

                    <div className={` !bg-[#F9F9F9] dark:!bg-[#292524] w-full mt-10 flex flex-col p-5 ${!profile && currentCharts ? "block" : "hidden"}`}>
                        <div className="w-full">
                            <div className=" mt-5 mb-10 text-center h-[400px]" >
                                <DexScreener networkName={"bsc"} chartAddress={developer?.contract_address} />
                            </div>
                        </div>
                        {developer ?
                            <TokenInfo contract_address={developer?.contract_address} />
                            :
                            <TokenInfo />
                        }
                        <div
                            className={`w-[350px] !bg-white dark:!bg-[#1C1917] rounded-2xl text-xs !text-[#78716C] dark:!text-[#292524] font-extrabold flex flex-col pl-3 py-3 mt-10 ${tablemenu ? "block" : "hidden"}`}>
                            <span className="mt-2">Initial LP</span>
                            <span className="mt-1">MAX Xs at ATH</span>
                            <span className="mt-1">Holders</span>
                            <span className="mt-1 mb-2">ETC</span>
                        </div>
                    </div>

                    <div className={` !bg-[#F9F9F9] dark:!bg-[#292524] w-full  mt-10 flex flex-col p-5 ${!profile && !currentCharts ? "block" : "hidden"}`} >

                        {projects?.map((project, index) => (
                            <div key={index} className="w-full h-[400px] my-5">
                                <DexScreener networkName={"bsc"} chartAddress={project?.contract_address} />
                            </div>
                        ))}

                    </div>
                </div>

            </main>
        )
    }
}
