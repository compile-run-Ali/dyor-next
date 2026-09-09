import { formatAddress } from '@/utils/formatAddress';
import { useEthers } from '@usedapp/core';
import { useTheme } from 'next-themes'
import Image from 'next/image'
import React, { useEffect } from 'react'
import ClickAwayListener from 'react-click-away-listener';
import { useModal } from 'react-simple-modal-provider'
import BaseLogo from '../BaseLogo/BaseLogo';

export default function Header({ toggleSidebar }) {
    const { account, deactivate } = useEthers();
    const { theme, setTheme } = useTheme()
    const [tempfixed, setTempFixed] = React.useState(false)
    const { open: openModal } = useModal("ConnectionModal");
    const [dropdown, setDropdown] = React.useState(false)

    useEffect(() => {
        if (theme === 'dark') {
            setTempFixed(false)
        } else {
            setTempFixed(true)
        }
    }, [theme])

    const handleTempFixed = () => {
        setTempFixed(!tempfixed)
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    const handleOpen = () => {
        if (!account) {
            openModal()
        }
    }

    const handleDropdown = () => {
        setDropdown(!dropdown)
    }


    const handleLogout = () => {
        deactivate()
    }


    return (
        <header className="flex justify-between items-center pt-5">
            <div className="w-full flex justify-start ml-8 max-w-[50%] items-center">
                <span className="brand">
                    <BaseLogo />
                </span>

                <div className="flex ml-3 cursor-pointer" onClick={toggleSidebar}>
                    <i className='icon la la-bars !text-[#57534E]'></i>
                </div>
            </div>


            <div className='flex'>
                <label htmlFor="default-toggle" className="inline-flex relative items-center cursor-pointer mr-5">
                    <input
                        type="checkbox"
                        value=""
                        checked={tempfixed ? false : true}
                        id="default-toggle"
                        className="sr-only peer"
                        onChange={handleTempFixed}
                    />
                    <div className={`w-10 h-6 bg-transparent peer-focus:outline-none peer-focus:ring-0 peer-focus:ring-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-gold after:content-[''] after:absolute after:top-[12px] after:md:top-[12.2px] ${account ? "after:md:top-[14.2px] after:top-[13px]" : ""} after:left-[2px] peer-checked:after:left-[6px] after:bg-gold after:border-gold after:border after:rounded-full after:h-4 after:w-4 after:transition-all border border-gold`} />
                </label>
                <div className='cursor-pointer' onClick={handleOpen}>

                    {
                        account ?
                            <div className='flex flex-col items-center'>
                                <span className='py-[9px] font-nunito_sans px-4 border border-gold rounded-xl text-gold font-light'
                                    onClick={handleDropdown}>{formatAddress(account)}</span>

                                {dropdown &&
                                    <ClickAwayListener onClickAway={() => setDropdown(false)}>
                                        <div className='absolute mt-[52px]'>
                                            <span className='py-[9px] font-nunito_sans px-6 border border-gold bg-gold rounded-b-lg text-white font-light'
                                                onClick={handleLogout}>
                                                Logout
                                            </span>
                                        </div>
                                    </ClickAwayListener>
                                }
                            </div>
                            : (!tempfixed ?
                                <Image className="brand-image" src="/images/wallet.svg" alt='logo' width={40} height={40} />
                                :
                                <Image className="brand-image" src="/images/wallet-light.svg" alt='logo' width={40} height={40} />
                            )
                    }

                </div>
            </div>
        </header>
    )
}
