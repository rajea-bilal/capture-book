'use client'


import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import UploadDocumentForm from "./upload-document-form";
import { useState } from 'react'




export default function CreateDocumentButton() {

  const [isOpen, setIsOpen] = useState(false)

  // function to add data to db
  const createDocument = useMutation(api.documents.createDocument)
 
  return (
    <>
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button>
          Upload Documents
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload a document</DialogTitle>
          <DialogDescription>
            Upload a document for you to search over in the future.
          </DialogDescription>
        </DialogHeader>

      {/* passing a callback to close the dialog when the form is successfully submitted.*/}
        <UploadDocumentForm onUpload={() => setIsOpen(false)} />
      </DialogContent>
      
    </Dialog>

   
    </>
);
}


    
     