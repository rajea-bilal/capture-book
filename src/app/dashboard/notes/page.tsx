"use client"

import CreateNoteButton from "./create-note-button";
import { useMutation, useQuery } from "convex/react";
import { api } from '../../../../convex/_generated/api'
import { NoteCard } from "./note-card";
import Image from "next/image";
import Link from "next/link";

export default function NotesPage() {


   // function to display notes from the db
  const notes = useQuery(api.notes.getNotes)
  console.log(notes)

  return (
     <main className="border container">

        {/* if notes are found, then display the data in cards */}
         {/* if documents are found, then display the data in cards */}
         <ul className="border flex flex-col gap-4">
          {notes?.map(note => (
            <Link href={`/dashboard/notes/${note._id}`}>
              <li 
              key={note._id}
              
              >
                {note.text.substring(0, 20) + "..."}
              </li>
            </Link>
          ))}
         </ul>
       
    </main>
  )
}

       

