'use client'


import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { PageCard } from "@/components/page-card";
import { Id } from "../../../../convex/_generated/dataModel";
import ChatPanel from "./chat-panel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";




export default function DocumentPage({ params } : { params : { documentId: Id<"documents"> }}) {

  // function to add data to db
  const documentId = params.documentId
 
  const document = useQuery(api.documents.getDocument, { 
    documentId: params.documentId
  })

  if(!document) {
    return <div>You don't have access to view this document.</div>
  }

  return (
    <main className="border p-24">

      {/* if document is undefined then show loading */}
      {!document && <div>Loading...</div>}

      {/* if document is true then show the document */}
      {document && (
        
        <>
          <div className="border flex justify-between">
            <h1 className="text-3xl font-semibold mb-10">{document.title}</h1>
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
  
          
      

      

       
    


    
      