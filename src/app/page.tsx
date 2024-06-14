'use client'


import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { PageCard } from "@/components/page-card";
import CreateDocumentButton from "@/components/create-document-button";



export default function Home() {

  // function to add data to db
  const createDocument = useMutation(api.documents.createDocument)
  const documents = useQuery(api.documents.getDocuments)


  return (
    <main className="border p-24">

      <div className="border flex justify-between">
        <h1 className="text-3xl font-semibold mb-10">My Documents</h1>
        <CreateDocumentButton />
      </div>


      <section className="border grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 ">
        {documents?.map((document) => (
          <PageCard document={document} key={document._id} />
        ))}
      </section>
    </main>
  );
}
