import React, { useEffect } from "react";
import Modal, { useModalState } from "react-simple-modal-provider";



import Image from "next/image";
import { useRouter } from "next/router";


export default function RegistrationModal({ children }) {
    const  router  = useRouter();
    const [isOpen, setOpen] = useModalState();

    const handleClose = () => {
        setOpen(false);
        router.push("/");
    };

    return (
        <Modal
            id={"RegistrationModal"}
            consumer={children}
            isOpen={isOpen}
            setOpen={setOpen}
        >
            <div className="p-9 w-[100%] max-w-[520px] bg-white dark:bg-fields text-muted rounded-[10px] mx-auto">
                <div className="flex justify-between items-center  ">
                    <span className="text-dark-text dark:text-light-text font-gilroy font-semibold text-lg">
                        Registration Succesful
                    </span>

                    <div
                        className="flex items-center cursor-pointer"
                        onClick={handleClose}
                    >
                        <span className="text-sm font-gilroy font-semibold text-dark-text dark:text-light-text mr-2">
                            Close
                        </span>
                        <div className="flex justify-center items-center bg-[#E56060] text-[#E56060] bg-opacity-10 rounded-full w-[15px] h-[15px]">
                            &#10005;
                        </div>
                    </div>
                </div>

                <div className="mt-14 flex w-full">
                    {/* Metamask */}
                    <span className="text-gold">
                        You&apos;ve successfully registered!
                    </span>
                </div>
            </div>
        </Modal>
    );
}
