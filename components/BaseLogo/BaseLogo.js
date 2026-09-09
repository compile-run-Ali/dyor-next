import Image from 'next/image'
import React from 'react'

export default function BaseLogo() {
    return (
        <Image className="brand-image" src="/images/logo.svg" alt='logo' width={40} height={40} />
    )
}
