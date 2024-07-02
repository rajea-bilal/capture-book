'use client'


import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { PageCard } from "@/app/dashboard/documents/page-card";
import { Id } from "../../../../../convex/_generated/dataModel";
import ChatPanel from "./chat-panel";
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






export default function DocumentPage({ params } : { params : { documentId: Id<"documents"> }}) {

  // function to add data to db
  const documentId = params.documentId
  const router = useRouter()
  const deleteDocument = useMutation(api.documents.deleteDocument)
  const document = useQuery(api.documents.getDocument, { 
    documentId: params.documentId
  })

  // if(!document) {
  //   return <div>You don't have access to view this document.</div>
  // }

  return (
    <main className="border p-24">

      {/* if document is undefined then show loading */}
      {!document && <div>Loading...</div>}

      {/* if document is true then show the document */}
      {document && (
        
        <>
          <div className="border flex justify-between">
            <h1 className="text-3xl font-semibold mb-10">{document.title}</h1>


            <AlertDialog>
              <AlertDialogTrigger>
                <Button variant="destructive" className="flex gap-2 items-center">
                    <TrashIcon className="w-4 h-4" /> Delete
                </Button>
              </AlertDialogTrigger>


              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to delete this document?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Your document cannot be recovered after its been deleted. 
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => {
                    deleteDocument({ documentId, fileId: document.fileId }).then(() => { router.push('/')})
                  }}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

             
            
          </div>

          <div className="flex gap-12 mt-6">
            <Tabs defaultValue="account" className="border w-full">
              <TabsList className="mb-4">
              <TabsTrigger value="document" className="mr-5">Document</TabsTrigger>
              <TabsTrigger value="chat">Chat</TabsTrigger>
              </TabsList>

              <TabsContent value="document">
                {/* uploaded document view box */}
                <div className="bg-gray-800 p-4 rounded-xl flex-1 h-[400px]">
                { document.documentUrl && <iframe src={document.documentUrl} className="w-full h-full"/> }
                </div>
              </TabsContent>

              <TabsContent value="chat" className="w-full border">
                {/* chat */}
                <ChatPanel documentId={document._id} />
              </TabsContent>
            </Tabs>
          </div>
        </>
      )
    }

  </main>
  );  
}
  
          
      

      

       
    


    
      