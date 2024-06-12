

import React from 'react'
import { ModeToggle } from './ui/mode-toggle'
import Image from 'next/image'
import HeaderActions from './header-actions'

const Header = () => {
  return (
    <header className="border py-4">
      <nav className="container mx-auto border flex justify-between items-center">
        <div className="text-2xl font-bold border flex gap-2 items-center">
          <Image src="/book-open-logo.png" alt="open-book-logo" width={50} height={50} className="rounded" />
          CaptureBook
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