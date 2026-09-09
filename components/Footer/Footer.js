import React from 'react'

export default function Footer() {
    return (
        <footer className="mt-auto flex">
            <div className="footer flex items-center text-sm border-t  border-[#D6D3D1] dark:border-muted w-full justify-between mt-10 py-5 text-muted">
                <span className='uppercase font-semibold'>&copy; 2022 DYOR</span>
                <nav className='text-gold flex gap-x-3'>
                    <a href="mailto:info@dogeyourownresearch.com" target="_blank" rel="noreferrer">Support</a>
                    <span className="divider text-[#44403C]">|</span>
                    <a href="https://docs.dogeyourownresearch.com/" target="_blank" rel="noreferrer">Whitepaper</a>
                </nav>
            </div>
        </footer>
    )
}
