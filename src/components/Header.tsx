

import React from 'react'
import { ModeToggle } from './ui/mode-toggle'
import Image from 'next/image'
import HeaderActions from './header-actions'
import Link from 'next/link'

const Header = () => {
  return (
    <header className="border py-4">
      <nav className="container mx-auto border flex justify-between items-center">
        <div className="border flex gap-12 items-center">
          <Link href="/" className=" text-2xl font-bold flex gap-2 items-center">
            <Image 
            src="/book-open-logo.png" 
            alt="open-book-logo" 
            width={50} 
            height={50} 
            className="rounded cursor-pointer" 
            />
            CaptureBook
          </Link>

          <div>
            <Link href="/dashboard/documents" className="hover:text-zinc-500  font-semibold">Documents</Link>
          </div>
        
        </div>

        <div className="border flex gap-6 items-center font-semibold">
          <ModeToggle />
          <HeaderActions />
        </div>
      </nav>
    </header>
  )
}



export default Header