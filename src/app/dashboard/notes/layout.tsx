"use client"

import Image from "next/image";
import Link from "next/link";
import { useMutation, useQuery } from "convex/react";
import CreateNoteButton from "./create-note-button";
import { api } from '../../../../convex/_generated/api'
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";




export default function NotesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


   // function to display notes from the db
  const notes = useQuery(api.notes.getNotes)

  // useParams is returning an object that we're 
  // destructuring to retrieve the noteId
  const { noteId } = useParams()
  // console.log(noteId)

  return (
     <main className="border container">

      <div className="border flex justify-between gap-10 items-center mb-4">
        <h1 className="text-4xl font-semibold">Notes</h1>
        <CreateNoteButton />

      </div>

         {notes && notes.length === 0 && (
          <div className="flex flex-col gap-6 items-center mt-8 mb-4">
            <Image 
            src="/documents-img.svg" 
            width="150"
            height="150"
            alt="an image of documents"
            className=""
            />
            <h2 className="text-2xl font-semibold">You have no notes</h2>
            <CreateNoteButton />
          </div>
        )}

        {/* if notes are found, then display the data in cards */}

        <div className="flex gap-6">

          <ul className="border flex flex-col gap-4 w-[25rem] p-4">
            {notes?.map(note => (
              <Link href={`/dashboard/notes/${note._id}`}>
                <li
                className={cn("text-xl",
                { "text-[#FAAC34] font-bold" : note._id === noteId }
                )}
                key={note._id}>
                  {note.text.substring(0, 20) + "..."}
                  </li>
              </Link>
            ))}
          </ul>

          <aside className="border w-full p-4 rounded-lg">
          {children}
          </aside>

        </div>
    </main>
  ) 
}
       

       
   

  
   