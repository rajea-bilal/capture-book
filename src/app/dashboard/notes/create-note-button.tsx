'use client'


import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import CreateNoteForm from "./create-note-form";
import { useState } from 'react'
import { PlusIcon, Upload } from "lucide-react";




export default function CreateNoteButton() {

  const [isOpen, setIsOpen] = useState(false)

  // function to add data to db
  const createNote = useMutation(api.notes.createNote)
 
  return (
    <>
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button  className="flex gap-2 items-center">
          <PlusIcon className="w-4 h-4" /> Create Note
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a Note</DialogTitle>
          <DialogDescription>
            Type a note to search over in the future.
          </DialogDescription>
        </DialogHeader>

      {/* passing a callback to close the dialog when the form is successfully submitted.*/}
        <CreateNoteForm onNoteCreated={() => setIsOpen(false)} />
      </DialogContent>
      
    </Dialog>

   
    </>
);
}


    
     