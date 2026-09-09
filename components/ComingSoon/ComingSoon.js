import Image from 'next/image'
import React from 'react'

export default function ComingSoon() {
    return (
        <main className="workspace">
            <section className="breadcrumb">
                <h1 className='text-[32px] text-muted'>DOGE your own research</h1>
                <ul className='text-[#57534E] text-sm flex mb-4'>
                    <li><a href="#">Home</a></li>
                    <Image width={12} height={10} className="mx-2 w-3" src="/images/arrow.svg" alt="arrow" />
                    <li className='text-muted'>Coming Soon</li>
                </ul>
            </section>

            <div className="card !bg-white dark:!bg-primary text-muted p-5 mt-5">
                Coming Soon
            </div>
        </main>
    )
}
