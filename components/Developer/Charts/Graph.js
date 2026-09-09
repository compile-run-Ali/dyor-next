import Image from 'next/image'
import React from 'react'

export default function Graph() {
    return (
        <div className="rounded-2xl !bg-white dark:!bg-[#1C1917] h-full w-[100%]">

            <div className="h-[20%]">
                <div className="flex flex-row justify-between px-5 mt-7">
                    <div className="flex flex-row items-center">
                        <Image width={10} height={10} alt="graph-icon" className="dark:hidden" src="/images/icon.svg" />
                        <img className="hidden dark:block" src="/images/graph/icon.png" />
                        <span className="text-xl text-gold font-extrabold mx-3">WBNB / DYOR</span>
                        <img className="mr-2 dark:hidden" src="/images/binocolars.svg" />
                        <img className="mr-2 dark:hidden" src="/images/star.svg" />
                        <img className="mr-2 hidden dark:block" src="/images/graph/find.png" />
                        <img className="hidden dark:block" src="/images/graph/favorites.png" />
                    </div>
                    <div className="flex flex-row items-center">
                        <span className="text-xl font-semibold text-[#78716C]">$ 0.000001838</span>
                        <div className="flex flex-row items-center mx-2">
                            <img className="mr-1" src="/images/graph/arrow_up_green.png" />
                            <span className="text-sm font-semibold text-[#227A75]">0.01770</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-between px-5 mt-3">
                    <div className="flex flex-row">
                        <span className="text-xs font-normal text-[#57534E]">Doge Your Own Research</span>
                        <div className="flex flex-row ml-4">
                            <span className="text-xs text-[#292524] font-normal">Token: 0xdb9...2b34</span>
                            <img className="ml-2 hidden dark:block" src="/images/graph/copy.png" />
                            <img className="ml-2 dark:hidden" src="/images/graph/copy.svg" />
                        </div>
                        <div className="flex flex-row ml-4">
                            <span className="text-xs text-[#292524] font-normal">Pair: 0xdd2...1v64</span>
                            <img className="ml-2 hidden dark:block" src="/images/graph/copy.png" />
                            <img className="ml-2 dark:hidden" src="/images/graph/copy.svg" />
                        </div>
                    </div>
                    <div className="text-xs font-semibold text-[#57534E]">
                        <span>BNB</span>
                        <span className="mx-2">0.05170</span>
                    </div>
                </div>
                <div className="flex-auto flex flex-row justify-between px-5 mt-3">
                    <div className="flex flex-row items-center">
                        <img className="mx-1 h-[22px] w-[22px] hidden dark:block" src="/images/graph/undo.png" />
                        <img className="mx-1 mt-[3px] dark:hidden" src="/images/graph/return.svg" />
                        <img className="mx-1 h-[22px] w-[22px]" src="/images/graph/screenshot.png" />
                        <img className="mx-1 h-[22px] w-[22px]" src="/images/graph/att.png" />
                        <img className="mx-1 h-[22px] w-[22px] hidden dark:block" src="/images/graph/metamask.png" />
                        <img className="mx-1 mt-[3px] dark:hidden" src="/images/graph/metamask.svg" />
                        <img className="mx-2 hidden dark:block" src="/images/graph/print.png" />
                        <img className="mx-2 dark:hidden" src="/images/graph/monitor.svg" />
                        <div className="rounded-3xl bg-gold px-3 py-1 ml-1 ">
                            <span className="text-white dark:!text-[#292524]  text-xs font-bold">Update info</span>
                        </div>
                    </div>
                    <div className="flex flex-row rounded-xl bg-white dark:bg-[#292524] p-2 infobox-shadow">
                        <span className="text-[#57534E] text-sm font-semibold">24 hours</span>
                        <div className="flex flex-row items-center">
                            <img className="w-[6.6px] h-[3.3px] mx-1" src="/images/graph/arrow_up_green.png" />
                            <span className="font-bold text-sm text-[#227A75]">10.66%</span>
                        </div>
                        <span className="text-[#57534E] text-sm font-semibold ml-3">1 week</span>
                        <div className="flex flex-row items-center">
                            <img className="w-[6.6px] h-[3.3px] mx-1" src="/images/graph/arrow_up_red.png" />
                            <span className="font-bold text-sm text-[#DC3545]">92.88%</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full relative bg-white dark:bg-black h-[76%] rounded-b-2xl">
                <div className="absolute left-0 w-[50px] bg-white dark:bg-[#1C1917] flex flex-col h-full rounded-l-2xl rounded-t-none sidebar-shadow-light dark:sidebar-shadow z-20">
                    <div className="relative w-full p-1 h-full flex flex-col items-center ">
                        <img className="mt-[50px] w-[18px] h-[18px]" src="/images/graph/side1.png" />
                        <img className="mt-5 w-[18px] h-[18px]" src="/images/graph/side2.png" />
                        <img className="mt-5 w-[18px] h-[18px]" src="/images/graph/side3.png" />
                        <img className="mt-5 w-[18px] h-[18px]" src="/images/graph/side4.png" />
                        <img className="mt-5 w-[18px] h-[18px]" src="/images/graph/side5.png" />
                        <img className="mt-5 w-[18px] h-[18px]" src="/images/graph/side6.png" />
                        <img className="mt-5 w-[18px] h-[18px]" src="/images/graph/side7.png" />
                        <img className="mt-5 w-[18px] h-[18px]" src="/images/graph/side8.png" />
                        <img className="mt-5 w-[18px] h-[18px]" src="/images/graph/side9.png" />
                        <img className="mt-5 w-[18px] h-[18px]" src="/images/graph/side10.png" />
                        <img className="mt-5 w-[18px] h-[18px]" src="/images/graph/side11.png" />
                        <img className="absolute bottom-0 w-[16px] h-[16px] mb-3" src="/images/graph/side12.png" />
                    </div>
                </div>


                <div className="absolute flex flex-row justify-between items-center top-0 h-[40px] w-full bg-white dark:bg-[#1C1917] topbar-shadow-light dark:topbar-shadow pl-[50px] z-50">
                    <div className="flex flex-row items-center">
                        <span className="text-xs font-bold text-[#292524] ml-3 mr-4">1m</span>
                        <img className="mx-4 w-[14px] h-[19px]" src="/images/graph/top2.png" />
                        <img className="mx-4 w-[71px] h-[21px]" src="/images/graph/top3.png" />
                        <div className="mx-6 flex flex-row justify-center items-center">
                            <img className="w-[14px] h-[7.5px] mr-1" src="/images/graph/top4.png" />
                            <img className="w-[14px] h-[7.5px]" src="/images/graph/top5.png" />
                        </div>
                        <span className="ml-4 text-gold text-xs font-bold">DYOR/BNB</span>
                        <span className="mx-10 text-xs font-semibold text-[#227A75]">Max: $0.0000537</span>
                        <span className="mr-4 text-xs font-semibold text-[#DC3545]">Min: $0.0000007</span>
                        <img className="ml-4 w-[14.4px] h-[14.4px]" src="/images/graph/top6.png" />
                    </div>
                    <div className="flex flex-row mr-1">
                        <img className="mx-2 w-[19px] h-[19px]" src="/images/graph/top7.png" />
                        <img className="mx-2 w-[21px] h-[15px]" src="/images/graph/top8.png" />
                    </div>
                </div>

                <div className="absolute bottom-0 h-[32px] bg-white dark:bg-[#1C1917] w-full z-10 rounded-b-lg pl-[50px] pr-[90px] flex flex-row justify-between items-center border-t border-[#78716C]">
                    <span className="mx-10 text-xs text-bold text-[#78716C]">21:00</span>
                    <span className="mx-10 text-xs text-bold text-[#78716C]">4</span>
                    <span className="mx-10 text-xs text-bold text-[#78716C]">03:00</span>
                    <span className="mx-10 text-xs text-bold text-[#78716C]">06:00</span>
                    <span className="mx-10 text-xs text-bold text-[#78716C]">09:00</span>
                    <img className="absolute right-0 mr-[45px]" src="/images/graph/bottom1.png" />
                </div>

                <div className="absolute right-0 flex flex-col h-full w-[90px] bg-white dark:bg-[#1C1917] z-0 justify-between items-center border-l border-[#78716C]">
                    <span className="text-xs font-bold text-gold">0.00001900</span>
                    <span className="text-xs font-bold text-gold">0.00001890</span>
                    <span className="text-xs font-bold text-gold">0.00001880</span>
                    <span className="text-xs font-bold text-gold">0.00001870</span>
                    <span className="text-xs font-bold text-gold">0.00001860</span>
                    <span className="text-xs font-bold text-gold">0.00001850</span>
                    <span className="text-xs font-bold text-gold">0.00001830</span>
                    <span className="text-xs font-bold text-gold">0.00001820</span>
                    <span className="text-xs font-bold text-gold">0.00001810</span>
                    <span className="text-xs font-bold text-gold">0.00001800</span>
                    <span className="text-xs font-bold text-gold">0.00001790</span>
                    <span className="text-xs font-bold text-gold">0.00001780</span>
                    <span className="text-xs font-bold text-gold">0.00001770</span>
                </div>

                <div className="absolute right-0 mt-[35px] mr-[90px] h-[calc(100%-37px)] w-[calc(100%-130px)]">
                    <img className="h-full w-full hidden dark:block" src="/images/graph/graph.png" />
                    <img className="h-full w-full dark:hidden" src="/images/graph/graph-white.png" />
                </div>

                <div className="absolute top-0 ml-[50px] mt-[40px] p-5 flex flex-col z-20">
                    <div className="flex flex-row text-sm text-[#57534E] font-bold">
                        <span className="mr-3">DYOR/USD - PAN</span>
                        <span className="mx-3">1</span>
                        <span className="ml-3">DEXTools.io</span>
                    </div>
                    <div className="flex flex-row ">
                        <span className="mr-2 text-xs font-bold text-[#DC3545]"><span className="text-gold">O.</span>000001874</span>
                        <span className="mx-2 text-xs font-bold text-[#DC3545]"><span className="text-gold">H.</span>000001874</span>
                        <span className="mx-2 text-xs font-bold text-[#DC3545]"><span className="text-gold">L.</span>000001874</span>
                        <span className="mx-2 text-xs font-bold text-[#DC3545]"><span className="text-gold">C.</span>000001874</span>
                        <span className="mx-2 text-xs font-bold text-[#DC3545]">-0.00</span>
                        <span className="ml-2 text-xs font-bold text-[#DC3545]">(0,193%)</span>
                    </div>
                    <div className="flex flex-row my-2">
                        <span className="text-xs font-bold text-[#57534E]">Volume SMA 9</span>
                        <span className="text-xs font-bold text-[#DC3545] mx-3">18</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
