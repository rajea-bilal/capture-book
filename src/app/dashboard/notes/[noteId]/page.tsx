'use client'


import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { PageCard } from "@/app/dashboard/documents/page-card";
import { Id } from "../../../../../convex/_generated/dataModel";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation";






export default function SingleNotePage({ params } : { params : { noteId: Id<"notes"> }}) {

  // function to add data to db
  const noteId = params.noteId
  const router = useRouter()
  const deleteDocument = useMutation(api.documents.deleteDocument)
  const note = useQuery(api.notes.getNote, { 
    noteId: params.noteId
  })

  // if(!document) {
  //   return <div>You don't have access to view this document.</div>
  // }

  return (
    <div className="flex flex-col justify-between gap-4">
      <p>{note?.text}</p>
    </div>

);  
}
  






  