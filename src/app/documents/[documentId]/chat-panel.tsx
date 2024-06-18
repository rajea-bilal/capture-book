'use client'


import { useAction, useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { PageCard } from "@/components/page-card";
import { Id } from "../../../../convex/_generated/dataModel";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";




export default function ChatPanel({ documentId }: { documentId : Id<"documents"> }) {

  // function to add data to db
  const askQuestion = useAction(api.documents.askQuestion)

  return (
    
        <div className="w-[300px] bg-gray-800 rounded flex flex-col justify-between gap-2 p-4">

          <div className="h-[350px] overflow-y-auto">
           Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi, error debitis! Natus quibusdam harum earum quas tempore corporis atque labore nemo debitis, iure dignissimos mollitia in excepturi numquam quam voluptatum doloribus necessitatibus, deserunt incidunt, possimus magnam saepe magni cumque! Mollitia, excepturi. Nemo, tenetur dolores, alias rem nesciunt dolore assumenda ipsum explicabo expedita iure natus non voluptas. Suscipit dolore asperiores sit a corrupti recusandae sapiente repellendus voluptatem at quo pariatur, molestias voluptates vero doloribus facere labore ab itaque impedit possimus sint natus repudiandae doloremque ipsam. Possimus beatae distinctio sint, quos repellat hic nostrum consequuntur exercitationem, tempore dolor officiis veniam eligendi iure?
          </div>
          <div>
            <form className="flex gap-2" onSubmit={async (event) => {
              event.preventDefault()

              console.log('form has been submitted')
              const form = event.target as HTMLFormElement
              const formData = new FormData(form)
              const text = formData.get("text") as string
              const result = await askQuestion({ question: text, documentId })
              console.log(result)
              }}
              >
              <Input name="text" required />
              <Button>Submit</Button>
            </form>
          </div>
        </div>
  
  );
 
}

    
