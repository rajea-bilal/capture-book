'use client'


import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { PageCard } from "@/components/page-card";
import { Id } from "../../../../convex/_generated/dataModel";




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

      <div className="border flex justify-between">
        <h1 className="text-3xl font-semibold mb-10">{document.title}</h1>
      </div>
      {document.documentUrl}

      <div className="flex gap-12">
        <div className="bg-gray-800 p-4 rounded flex-1 h-[400px]">
          { document.documentUrl && <iframe src={document.documentUrl} className="w-full h-full"/> }
        </div>

        <div className="w-[300px] bg-gray-800 rounded"></div>
      </div>
    </main>
  );

}
    


    
      