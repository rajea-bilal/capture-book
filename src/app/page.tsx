'use client'

import { SignInButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated, useMutation, useQuery } from "convex/react";
import { Content } from "next/font/google";
import Image from "next/image";
import { api } from "../../convex/_generated/api";

export default function Home() {

  // function to add data to db
  const createDocument = useMutation(api.documents.createDocument)
  const documents = useQuery(api.documents.getDocuments)


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
         <Unauthenticated>
            <SignInButton />
          </Unauthenticated>

          <Authenticated>
            <UserButton />

            <button className="border p-4" onClick={() => {
              createDocument({ title: 'hello world '})
            }}>Click me</button>

            { documents?.map(document => (
              <div key={document._id} className="border">{document.title}</div>
            ))}
          </Authenticated>
    </main>
  );
}
