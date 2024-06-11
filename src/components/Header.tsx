"use client"

import { SignInButton, UserButton } from '@clerk/nextjs'
import { Authenticated, Unauthenticated } from 'convex/react'
import React from 'react'
import { ModeToggle } from './ui/mode-toggle'
import Image from 'next/image'
import { Button } from './ui/button'

const Header = () => {
  return (
    <header className="border py-4">
      <nav className="container mx-auto border flex justify-between items-center">
        <div className="text-2xl font-bold border flex gap-2 items-center">
          <Image src="/book-open-logo.png" alt="open-book-logo" width={50} height={50} className="rounded" />
          CaptureBook
        </div>

        <div className="border flex gap-6">
         <Unauthenticated>
          <Button>
            <SignInButton />
          </Button>
            
          </Unauthenticated>

          <Authenticated>
             <ModeToggle />
            <UserButton />
          </Authenticated>
        </div>
      </nav>
    </header>
  )
}



export default Header