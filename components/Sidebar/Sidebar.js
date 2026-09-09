import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function Sidebar({ handleSideBar }) {
    const [openSub1, setOpenSub1] = useState(false)

    useEffect(() => {
        if (handleSideBar) {
            setOpenSub1(false)
        }
    }, [handleSideBar])

    return (
        <div className='h-screen w-full overflow-y-scroll font-nunito_sans bg-white dark:bg-primary'>

            <div className="menu-items pb-20">
                <div className="w-full h-[120px] flex items-center justify-center border-b dark:border-fields">
                    <Link href="/" className="flex flex-col items-center text-muted hover:text-gold   justify-center">
                        <i className='icon la la-home'></i>
                        <span className=" mt-2 text-sm">Home</span>
                    </Link>
                </div>
                <div className="w-full h-[120px] flex items-center text-muted hover:text-gold cursor-pointer justify-center border-b dark:border-fields"
                onClick={() => setOpenSub1(!openSub1)}>
                    <div className="flex flex-col items-center  justify-start">
                        <div >
                            <i className='icon la la-users'></i>
                        </div>
                        <div className="flex items-center cursor-pointer">
                            <span className="mt-2 text-sm flex flex-row items-center">
                                Developers
                            </span>
                        </div>
                    </div>
                </div>
                {openSub1 && (
                    <div className='bg-fields bg-opacity-10 w-full flex  flex-col items-center justify-center'>
                        <div className="w-full flex justify-center text-center h-10 sidebarsub">
                            <Link href="/developers/registration" className="flex flex-row items-center h-full justify-start">
                                <span className=" text-muted text-sm">Registration</span>
                            </Link>
                        </div>
                        <div className="w-full flex justify-center text-center h-10 sidebarsub">
                            <Link href="/developers/overview" className="flex flex-row items-center h-full justify-start">
                                <span className="text-muted text-sm">Overview</span>
                            </Link>
                        </div>
                    </div>
                )}
                <div className="w-full h-[120px] flex items-center justify-center border-b dark:border-fields text-muted hover:text-gold">
                    <div className="flex flex-col items-center  justify-start" >
                        <Link href="/kyc_audit">
                            <i className='icon la la-file-alt'></i>
                        </Link>
                        <span className="mt-2 text-sm">KYC & Audit</span>
                    </div>
                </div>
                <div className="w-full h-[120px] flex items-center justify-center border-b text-muted hover:text-gold dark:border-fields">
                    <div className="flex flex-col items-center  justify-start">
                        <Link href="/reviews">
                            <i className='icon la la-check-circle' />
                        </Link>
                        <span className="text-sm mt-2">Reviews</span>
                    </div>
                </div>
                <div className="w-full h-[120px] flex items-center justify-center border-b dark:border-fields text-muted hover:text-gold">
                    <div className="flex flex-col items-center  justify-start">
                        <Link href="/map">
                            <i className='icon la la-sitemap'></i>
                        </Link>
                        <span className="text-sm mt-2">Bubble Map</span>
                    </div>
                </div>
                <div className="w-full h-[120px] flex items-center justify-center border-b text-muted hover:text-gold dark:border-fields">
                    <div className="flex flex-col items-center  justify-center">
                        <i className='icon la la-wallet'></i>
                        <span className="text-sm mt-2">Scan for<br/> scammer</span>
                    </div>
                </div>
                <div className="w-full h-[120px] flex items-center text-muted hover:text-gold justify-center">
                    <div className="flex flex-col items-center  justify-start">
                        <i className='icon la la-robot'></i>
                        <span className="text-sm mt-2">Buy Bot</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
