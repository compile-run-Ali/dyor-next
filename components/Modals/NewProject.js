import { useEthers } from '@usedapp/core';
import axios from 'axios';
import React, { useState } from 'react'
import Modal, { useModalState } from 'react-simple-modal-provider'

export default function OpenProject({ children }) {
    const [isOpen, setOpen] = useModalState();
    const { account } = useEthers();
    const [new_contract_address, setNewContractAddress] = useState('')

    const openNewProject = async () => {
        if (account) {
            try {
                const response = await axios.post('/api/fetch_developer', { developer_wallet: account })
                if (response.data.length === 0) {
                    console.log("No developer found")
                } else {
                    let developer = response.data[0]

                    await axios.post('/api/new_project', {
                        previous_contract_address: developer.contract_address,
                        new_contract_address: new_contract_address
                    })
                }
                setOpen(false)
            } catch (error) {
                alert("Something went wrong")
            }
        }
    }

    return (
        <Modal
            id={"OpenProject"}
            consumer={children}
            isOpen={isOpen}
            setOpen={setOpen}
        >
            <div className="p-9 w-full max-w-[520px] font-nunito_sans bg-white dark:bg-fields text-muted rounded-[10px] mx-auto">
                <div className="flex justify-between items-center  ">
                    <span className="font-semibold text-lg">
                        Open a new Project
                    </span>

                    <div
                        className="flex items-center cursor-pointer ml-20"
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

                <div className="mt-8">
                    <span>
                        Contract Address
                        <span className='text-red-600'>
                            &nbsp; *
                        </span>
                    </span>
                    <input
                        type="text"
                        className="w-full mt-2 p-2 rounded-[10px] border border-gray-300 dark:border-gray-700 bg-lightWhite dark:bg-fields focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                        placeholder='Contract Address'
                        onChange={(e) => setNewContractAddress(e.target.value)}
                    />
                </div>

                <div className="mt-8">
                    <button
                        className="w-full py-2 rounded-[10px] bg-gold text-white font-semibold"
                        onClick={openNewProject}
                    >
                        Open Project
                    </button>
                </div>
            </div>
        </Modal>
    )
}
