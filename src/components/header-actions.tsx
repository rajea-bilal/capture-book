"use client"

import { SignInButton, UserButton } from "@clerk/nextjs";
import { Unauthenticated, Authenticated, AuthLoading } from "convex/react";
import { Button } from "./ui/button";
import { Avatar } from "./ui/avatar";




export default function HeaderActions() {
  return (
    <>
       <Unauthenticated>
          <Button>
            <SignInButton />
          </Button>
            
          </Unauthenticated>

          <Authenticated>
            <Avatar>
              <UserButton />
            </Avatar>
          </Authenticated>
          <AuthLoading>Loading...</AuthLoading>
    </>
  )
}
