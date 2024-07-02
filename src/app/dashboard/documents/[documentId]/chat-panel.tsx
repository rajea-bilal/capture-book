'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAction, useMutation, useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { PageCard } from "@/app/dashboard/documents/page-card";
import { Id } from "../../../../../convex/_generated/dataModel";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { QuestionForm } from "./question-form";




export default function ChatPanel({ documentId }: { documentId : Id<"documents"> }) {

  // function to add data to db
  const askQuestion = useAction(api.documents.askQuestion)
   const chats = useQuery(api.chats.getChatsForDocument, {
    documentId: documentId,
  })

  return (
    
        <div className="bg-gray-900 rounded flex flex-col justify-between gap-2 p-6">
          <div className="h-[350px] overflow-y-auto space-y-2">
            <div className="bg-slate-950 rounded p-2">
              AI: Ask any question using AI about the document below
            </div>
              { chats?.map(chat => (

                 <div className={cn(
                { 
                  "bg-slate-800": chat.isHuman,
                  "bg-slate-950": !chat.isHuman,
                  "text-right": chat.isHuman 
                }, 
                  "rounded p-4"
              )}>
              { chat.isHuman ? 'YOU:' : 'AI:' } { chat.text }
              </div>

              ))}
            
          </div>

          <div className="">
           <QuestionForm documentId={documentId}/>
          </div>

        </div>
  
  );
 
}
        

    
