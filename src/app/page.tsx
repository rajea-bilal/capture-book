'use client'


import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { PageCard } from "@/components/page-card";
import CreateDocumentButton from "@/components/create-document-button";
import { Skeleton } from "@/components/ui/skeleton"
import { Page } from "openai/pagination.mjs";
import { Card } from "@/components/ui/card";
import Image from 'next/image'




export default function Home() {

  // function to add data to db
  const createDocument = useMutation(api.documents.createDocument)
  const documents = useQuery(api.documents.getDocuments)


  return (
    <main className="border p-24 container">

      <div className="border flex justify-between gap-10 items-center mb-4">
        <h1 className="text-3xl font-semibold">My Documents</h1>
        <CreateDocumentButton />
      </div>



      {/* if there are no documents coming from the convex db, then show skeletons */}
      {!documents === undefined && (
        <section className="border grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
         <Card className="p-6 flex flex-col justify-between">
              <Skeleton className="h-[20px] rounded-sm" />
              <Skeleton className="h-[20px] rounded-sm" />
              <Skeleton className="h-[20px] rounded-sm" />
              <Skeleton className="w-[90px] h-[20px] rounded-md" />
         </Card>

          <Card className="p-6 flex flex-col gap-3">
              <Skeleton className="h-[20px] rounded-sm" />
              <Skeleton className="h-[20px] rounded-sm" />
              <Skeleton className="h-[20px] rounded-sm" />
              <Skeleton className="w-[90px] h-[20px] rounded-sm" />
         </Card>

          <Card className="p-6 flex flex-col gap-3">
              <Skeleton className="h-[20px] rounded-sm" />
              <Skeleton className="h-[20px] rounded-sm" />
              <Skeleton className="h-[20px] rounded-sm" />
              <Skeleton className="w-[90px] h-[20px] rounded-sm" />
         </Card>

           <Card className="p-6 flex flex-col gap-3">
              <Skeleton className="h-[20px] rounded-sm" />
              <Skeleton className="h-[20px] rounded-sm" />
              <Skeleton className="h-[20px] rounded-sm" />
              <Skeleton className="w-[90px] h-[20px] rounded-sm" />
         </Card>

          <Card className="p-6 flex flex-col gap-3">
              <Skeleton className="h-[20px] rounded-sm" />
              <Skeleton className="h-[20px] rounded-sm" />
              <Skeleton className="h-[20px] rounded-sm" />
              <Skeleton className="w-[90px] h-[20px] rounded-sm" />
         </Card>
        </section>
      )}
        
        {documents && documents.length === 0 && (
          <div className="flex flex-col gap-6 items-center mt-8 mb-4">
            <Image 
            src="/documents-img.svg" 
            width="150"
            height="150"
            alt="an image of documents"
            className=""
            />
            <h2 className="text-2xl font-semibold">You have no documents</h2>
            <CreateDocumentButton />
          </div>
        )}


        {/* if documents are found, then display the data in cards */}
        {documents && documents.length > 0 &&  (
          <section className="border grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">{documents?.map((document) => (
          <PageCard document={document} key={document._id} />
        ))}
      </section>
        )}
      
    </main>
  );
}
